export interface TeamMember {
  name: string;
  role: string;
  imageUrl?: string;
  fallbackInitials: string;
  bio?: string;
}

export interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  members: TeamMember[];
  className?: string;
}
