export interface LogoItem {
  name: string;
  src: string;
}

export interface LogoCloudProps {
  title?: string;
  logos: LogoItem[];
  className?: string;
}
