/// <reference types="next" />

/**
 * Strapi CMS Integration Utility
 * Provides headless CMS client functions and configuration guards.
 *
 * --- EJECTED PROJECT USAGE ---
 * Set STRAPI_URL (e.g. http://localhost:1337) and optional STRAPI_API_TOKEN in your .env
 * to automatically switch content fetching to live Strapi CMS.
 */

/** Default timeout in milliseconds to prevent SSR hangs when Strapi is unreachable. */
const CMS_FETCH_TIMEOUT_MS = 3000;

export interface StrapiFetchOptions {
  queryParams?: string;
  revalidate?: number | false;
  /** Override the default fetch timeout (in ms). */
  timeoutMs?: number;
}

/**
 * Returns true if STRAPI_URL is configured in environment variables.
 */
export const isCmsConfigured = (): boolean =>
  typeof process.env.STRAPI_URL === 'string' && process.env.STRAPI_URL.length > 0;

/**
 * Normalize Strapi v5/v4 media/image objects to a plain URL string.
 * Handles:
 *   - plain string URLs (passthrough)
 *   - Strapi v4/v5 media objects: { data: { attributes: { url } } }
 *   - Strapi v5/v4 single media: { url: '...' }
 *   - Arrays of media objects (returns first item's URL)
 */
const normalizeMediaField = (value: unknown): string | unknown => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return value;

  // Handle { data: { attributes: { url } } } or { data: [{ attributes: { url } }] }
  const dataObj = (value as Record<string, unknown>).data;
  if (dataObj) {
    if (Array.isArray(dataObj) && dataObj.length > 0) {
      const attrs = (dataObj[0] as Record<string, unknown>).attributes as
        Record<string, unknown> | undefined;
      return attrs?.url ?? dataObj[0];
    }
    if (typeof dataObj === 'object' && dataObj !== null) {
      const attrs = (dataObj as Record<string, unknown>).attributes as
        Record<string, unknown> | undefined;
      return attrs?.url ?? (dataObj as Record<string, unknown>).url ?? dataObj;
    }
  }

  // Handle direct { url: '...' }
  if ('url' in (value as Record<string, unknown>)) {
    return (value as Record<string, unknown>).url;
  }

  return value;
};

/**
 * Normalize Strapi v4/v5 item attributes into a flat object.
 * Handles both the `{ id, attributes: { ... } }` v4 envelope and flat v5 objects.
 * Media fields (image, thumbnail, cover) are normalized to plain URL strings.
 */
const normalizeStrapiItem = <T>(item: Record<string, unknown>): T => {
  if (!item) return item as T;

  const id = item.id ? String(item.id) : undefined;
  const attributes = (item.attributes as Record<string, unknown>) || item;

  // Build the normalized object
  const normalized: Record<string, unknown> = {
    id: id || attributes.id,
    ...attributes,
  };

  // Normalize known media field names
  const mediaFields = ['image', 'thumbnail', 'cover', 'avatar', 'logo', 'photo'];
  for (const field of mediaFields) {
    if (field in normalized) {
      normalized[field] = normalizeMediaField(normalized[field]);
    }
  }

  // Remove the nested 'attributes' key if it was spread from v4 envelope
  if ('attributes' in normalized && item.attributes) {
    delete normalized.attributes;
  }

  return normalized as T;
};

/**
 * Fetch a collection of items from Strapi CMS REST API.
 * Includes timeout handling to prevent SSR hangs when Strapi is unreachable.
 */
export const fetchStrapiCollection = async <T>(
  collection: string,
  options?: StrapiFetchOptions
): Promise<T[]> => {
  if (!isCmsConfigured()) return [];

  const baseUrl = process.env.STRAPI_URL?.replace(/\/$/, '');
  const token = process.env.STRAPI_API_TOKEN;
  const query = options?.queryParams ? `?${options.queryParams}` : '?populate=*';
  const url = `${baseUrl}/api/${collection}${query}`;
  const timeoutMs = options?.timeoutMs ?? CMS_FETCH_TIMEOUT_MS;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      headers,
      signal: controller.signal,
      next: { revalidate: options?.revalidate ?? 60 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(
        `[Strapi CMS] Error fetching collection "${collection}": ${res.status} ${res.statusText}`
      );
      return [];
    }

    const json = await res.json();
    const rawData = Array.isArray(json.data) ? json.data : [];
    return rawData.map((item: Record<string, unknown>) => normalizeStrapiItem<T>(item));
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error(
        `[Strapi CMS] Timeout after ${timeoutMs}ms fetching collection "${collection}" — falling back to static data.`
      );
    } else {
      console.error(
        `[Strapi CMS] Failed to fetch collection "${collection}":`,
        error instanceof Error ? error.message : error
      );
    }
    return [];
  }
};

/**
 * Fetch a single item by slug from Strapi CMS REST API.
 * Includes timeout handling to prevent SSR hangs when Strapi is unreachable.
 */
export const fetchStrapiSingleBySlug = async <T>(
  collection: string,
  slug: string
): Promise<T | null> => {
  if (!isCmsConfigured()) return null;

  try {
    const queryParams = `filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const items = await fetchStrapiCollection<T>(collection, { queryParams });

    return items.length > 0 ? items[0] : null;
  } catch (error) {
    console.error(
      `[Strapi CMS] Failed to fetch "${collection}" by slug "${slug}":`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
};
