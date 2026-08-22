export interface TeaserItem {
  title: string;
  description: string;
  category?: string;
  date?: string;
  imageUrl?: string;
  href: string;
}

export interface ContentTeaserProps {
  title?: string;
  subtitle?: string;
  items: TeaserItem[];
  className?: string;
}
