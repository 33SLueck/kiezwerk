#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "${ROOT}"

readonly TRIVY_VERSION="${TRIVY_VERSION:-0.74.0}"
readonly TRIVY_IMAGE="aquasec/trivy:${TRIVY_VERSION}"
readonly IMAGE_TAG="${IMAGE_TAG:-kiezwerk:scan}"
readonly SKIP_DIRS=".git,node_modules,.next,coverage,.trivycache"
readonly SEVERITY="CRITICAL,HIGH"

usage() {
  echo "Usage: $0 [--config-only] [--skip-build]" >&2
  exit 2
}

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "Docker is required to run Trivy scans." >&2
    exit 1
  fi
}

run_trivy() {
  docker run --rm \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -v "${ROOT}:/project" \
    -v "${ROOT}/.trivycache:/root/.cache/trivy" \
    -w /project \
    "${TRIVY_IMAGE}" \
    "$@"
}

scan_config() {
  run_trivy config \
    --config trivy.yaml \
    --exit-code 1 \
    --severity "${SEVERITY}" \
    .
}

scan_filesystem() {
  run_trivy fs \
    --config trivy.yaml \
    --exit-code 1 \
    --severity "${SEVERITY}" \
    --ignore-unfixed \
    --skip-dirs "${SKIP_DIRS}" \
    .
}

scan_image() {
  run_trivy image \
    --config trivy.yaml \
    --exit-code 1 \
    --severity "${SEVERITY}" \
    --ignore-unfixed \
    "${IMAGE_TAG}"
}

CONFIG_ONLY=0
SKIP_BUILD=0
for arg in "$@"; do
  case "${arg}" in
    --config-only) CONFIG_ONLY=1 ;;
    --skip-build) SKIP_BUILD=1 ;;
    -h|--help) usage ;;
    *)
      echo "Unknown argument: ${arg}" >&2
      usage
      ;;
  esac
done

require_docker
scan_config

if [[ "${CONFIG_ONLY}" -eq 1 ]]; then
  exit 0
fi

scan_filesystem

if [[ "${SKIP_BUILD}" -eq 0 ]]; then
  docker build -t "${IMAGE_TAG}" .
fi

scan_image
