// ─── Section wrapper ──────────────────────────────────────────────────────────
const baseSectionClasses = 'w-full bg-background';
const innerClasses = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24';

// ─── Header ───────────────────────────────────────────────────────────────────
const headerClasses = 'mx-auto flex max-w-3xl flex-col gap-4';
const eyebrowClasses = 'text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground';
const titleClasses = 'text-3xl font-semibold tracking-tight text-foreground md:text-4xl';
const descriptionClasses = 'text-base text-muted-foreground md:text-lg';

// ─── Filter pills ─────────────────────────────────────────────────────────────
const filterBarClasses = 'mt-8 flex flex-wrap items-center gap-2';
const filterPillBaseClasses =
  'cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
const filterPillActiveClasses = 'border-primary bg-primary text-primary-foreground';
const filterPillInactiveClasses =
  'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground';

// ─── Grid ─────────────────────────────────────────────────────────────────────
const gridClasses = 'mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3';

// ─── Card ─────────────────────────────────────────────────────────────────────
const cardClasses =
  'group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30';

// ─── Card image ───────────────────────────────────────────────────────────────
const imageWrapClasses = 'relative overflow-hidden aspect-video bg-muted';
const imageClasses =
  'h-full w-full object-cover transition-transform duration-500 group-hover:scale-105';
const imageOverlayClasses =
  'absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100';

// ─── Card body ────────────────────────────────────────────────────────────────
const cardBodyClasses = 'flex flex-1 flex-col gap-3 p-5';
const categoryClasses =
  'inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider';
const cardTitleClasses =
  'text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary';
const cardDescriptionClasses = 'text-sm leading-relaxed text-muted-foreground';

// ─── Tech badges ──────────────────────────────────────────────────────────────
const techRowClasses = 'mt-auto flex flex-wrap gap-1.5 pt-3';
const techBadgeClasses =
  'rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground';

// ─── Card links ───────────────────────────────────────────────────────────────
const linkRowClasses = 'flex items-center gap-3 border-t border-border/60 px-5 py-3';
const linkClasses =
  'inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary';

// ─── Exported getters ────────────────────────────────────────────────────────

export const getSectionClasses = (className?: string) =>
  [baseSectionClasses, className].filter(Boolean).join(' ');

export const getInnerClasses = () => innerClasses;
export const getHeaderClasses = () => headerClasses;
export const getEyebrowClasses = () => eyebrowClasses;
export const getTitleClasses = () => titleClasses;
export const getDescriptionClasses = () => descriptionClasses;
export const getFilterBarClasses = () => filterBarClasses;
export const getFilterPillClasses = (active: boolean) =>
  [filterPillBaseClasses, active ? filterPillActiveClasses : filterPillInactiveClasses]
    .filter(Boolean)
    .join(' ');
export const getGridClasses = () => gridClasses;
export const getCardClasses = () => cardClasses;
export const getImageWrapClasses = () => imageWrapClasses;
export const getImageClasses = () => imageClasses;
export const getImageOverlayClasses = () => imageOverlayClasses;
export const getCardBodyClasses = () => cardBodyClasses;
export const getCategoryClasses = (accentClass?: string) =>
  [categoryClasses, accentClass ?? 'bg-primary/10 text-primary'].filter(Boolean).join(' ');
export const getCardTitleClasses = () => cardTitleClasses;
export const getCardDescriptionClasses = () => cardDescriptionClasses;
export const getTechRowClasses = () => techRowClasses;
export const getTechBadgeClasses = () => techBadgeClasses;
export const getLinkRowClasses = () => linkRowClasses;
export const getLinkClasses = () => linkClasses;
