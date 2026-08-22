export const getSkeletonClasses = (className?: string) => {
  return ['animate-pulse rounded bg-muted', className].filter(Boolean).join(' ');
};
