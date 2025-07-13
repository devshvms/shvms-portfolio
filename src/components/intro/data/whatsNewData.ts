import { WhatsNewItem } from '../types';

export const whatsNewData: WhatsNewItem[] = [
  {
    id: 'portfolio-refactor',
    name: 'Portfolio Refactor',
    description: 'Refactored my portfolio website with TypeScript, Material-UI, and modern animations. Using Cursor agentic AI to generate the code.',
    technologies: ['React', 'TypeScript', 'Material-UI', 'Framer Motion'],
    githubUrl: 'https://github.com/devshvms/shvms-portfolio',
    liveUrl: 'https://about.shvms.dev',
  },
  {
    id: 'backend-system',
    name: 'Event-Driven Backend System',
    description: 'Designed and implemented fault-tolerant event-based data flows for promotions domain, reducing resource utilization and improving system performance.',
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Event-Driven Architecture'],
  },
  {
    id: 'auth-service',
    name: 'Global Authentication Service',
    description: 'Developed a scalable authentication service supporting multiple geographies, enabling seamless user access across different regions.',
    technologies: ['Java', 'Spring Boot', 'Authentication', 'Microservices'],
    githubUrl: 'https://github.com/devshvms/auth-service',
  },
  {
    id: 'home-labs',
    name: 'Home Lab',
    description: 'ProxMox, Ubuntu, Docker, Kubernetes, TrueNAS and more.',
    technologies: ['Virtualization', 'Containerization', 'Kubernetes', 'TrueNAS', 'ProxMox', 'Ubuntu'],
  },
]; 