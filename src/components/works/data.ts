import { Work } from '../../types';
import portfolio1 from '../../assets/portfolio-1.png';
import portfolio2 from '../../assets/portfolio-2.png';
import portfolio3 from '../../assets/portfolio-3.png';
import portfolio4 from '../../assets/portfolio-4.png';
import portfolio5 from '../../assets/portfolio-5.png';
import portfolio6 from '../../assets/portfolio-6.png';

export const worksData: Work[] = [
  {
    id: 'spring-boot-3-kafka-over-docker-with-docker-compose',
    title: 'Spring Boot 3 Kafka over Docker with Docker Compose',
    description: 'Getting started with Spring Boot 3 Kafka over Docker with Docker Compose',
    image: portfolio1,
    technologies: ['Spring Boot', 'Kafka', 'Docker', 'Docker Compose', 'YAML'],
    isArticle: true,
    articleUrl: 'https://www.geeksforgeeks.org/advance-java/getting-started-with-spring-boot-3-kafka-over-docker-with-docker-composeyaml/',
  },
  {
    id: 'microservices-architecture-best-practices',
    title: 'Microservices Architecture Best Practices',
    description: 'A comprehensive guide to designing and implementing microservices architecture with best practices, patterns, and real-world examples.',
    image: portfolio2,
    technologies: ['Microservices', 'Spring Boot', 'Docker', 'Kubernetes', 'API Gateway'],
    isArticle: true,
    articleUrl: 'https://medium.com/@yourusername/microservices-architecture-best-practices',
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: portfolio3,
    technologies: ['React', 'Firebase', 'Material-UI', 'TypeScript'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://task-manager-demo.com',
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'A weather application that displays current weather conditions and forecasts using OpenWeatherMap API with beautiful visualizations.',
    image: portfolio4,
    technologies: ['React', 'TypeScript', 'Chart.js', 'OpenWeatherMap API'],
    githubUrl: 'https://github.com/yourusername/weather-app',
    liveUrl: 'https://weather-demo.com',
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website showcasing skills, projects, and contact information with smooth animations.',
    image: portfolio5,
    technologies: ['React', 'Material-UI', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://your-portfolio.com',
  },
  {
    id: 'chat-application',
    title: 'Chat Application',
    description: 'Real-time chat application with user authentication, message history, and file sharing capabilities.',
    image: portfolio6,
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB'],
    githubUrl: 'https://github.com/yourusername/chat-app',
    liveUrl: 'https://chat-demo.com',
  },
]; 