export interface Skill {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: string;
}

export interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  isArticle?: boolean;
  githubUrl?: string;
  liveUrl?: string;
  articleUrl?: string;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
}

export interface NavItem {
  id: string;
  label: string;
  target: string;
}

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  logo?: string;
} 