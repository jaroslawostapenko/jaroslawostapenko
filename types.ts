export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'language';
  description?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: 'education' | 'work';
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}