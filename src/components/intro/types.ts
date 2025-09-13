export interface WhatsNewItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface IntroProps {
  // Add any props if needed in the future
}

export interface HeroSectionProps {
  visitorCount: number;
  email?: string;
}

export interface VisitorCounterProps {
  count: number;
} 