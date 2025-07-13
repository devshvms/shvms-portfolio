import { Experience } from './types';

export const experienceData: Experience[] = [
  {
    id: 'lowes-sse',
    company: 'LOWES',
    position: 'Senior Software Engineer',
    duration: 'January 2026 - Present',
    description: [
      'Utilized Abstraction techniques and industry-standard design patterns to build backend products that are highly extensible, loosely coupled and ensured these are maintainable and scalable.',
      'Designed and implemented fault tolerant Event based Data flows that streamlined the system and processes and reduce high resource utilisation across Promotions domain in Lowes.',
      'Re-architecting a legacy promo execution system into modern maintainable and to keep with current pace of tech in coming years to be able to be adaptable.'
    ],
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Event-Driven Architecture', 'Microservices', 'Design Patterns'],
  },
  {
    id: 'lowes-se',
    company: 'LOWES',
    position: 'Software Engineer',
    duration: 'July 2024 - January 2026',
    description: [
      'Orchestrated the technical integration process of promotions, pricing and competitive intel in fast paced omni channel retail domain in a phased manner, meeting all deadlines and milestones with precision.',
      'Utilized Abstraction techniques and industry-standard design patterns to build backend products that are highly extensible, loosely coupled and ensured these are maintainable and scalable.',
      'Utilized kafka for fault tolerant event-based systems and observed it in realtime with prometheus and grafana.'
    ],
    technologies: ['Java', 'Spring Boot', 'Kafka', 'Prometheus', 'Grafana', 'Event-Driven Systems'],
  },
  {
    id: 'moxey-sde',
    company: 'MoXey (Trukker)',
    position: 'SDE 1 Backend',
    duration: 'February 2023 - July 2024',
    description: [
      'Developed global authentication service for single point of authentication and authorization for our customers to support the expansion of business operations into new regions, ensuring seamless and secure access for users across multiple geographies.',
      'Designed and implemented a scalable and secure gamified real-time customer spending ranking system using Spring Redis MySQL, resulting in 30% month-on-month increase in customer spending and fostering higher customer engagement and loyalty.',
      'Developed 40+ low latency and high performance RESTful APIs that serve data to live mobile and web apps on time by working closely with product, development and QA team.'
    ],
    technologies: ['Java', 'Spring Boot', 'Redis', 'MySQL', 'REST APIs', 'Authentication', 'Gamification'],
    achievements: ['30% month-on-month increase in customer spending', '40+ high-performance RESTful APIs developed']
  },
  {
    id: 'capgemini-ac',
    company: 'Capgemini',
    position: 'Associate Consultant',
    duration: 'January 2022 - February 2023',
    description: [
      'Led 3 microservices and helped other developers on 30+ microservices.',
      'Improved response time of the EIK backend services by 20% by utilising reactive MongoDB for spring.',
      'Rewarded with Young Jedi Award from BU for resolving 50 minor to critical technical issues within 6 months.'
    ],
    technologies: ['Java', 'Spring Boot', 'MongoDB', 'Microservices', 'Reactive Programming'],
    achievements: ['Young Jedi Award', '20% improvement in response time', 'Led 3 microservices']
  },
  {
    id: 'capgemini-sa',
    company: 'Capgemini',
    position: 'Senior Analyst',
    duration: 'September 2020 - January 2022',
    description: [
      'Optimised JVM usage for spring apps by debugging memory leaks by making architecture and code changes.',
      'Implemented several new user stories, starting from discussion to delivery within and before estimated time.',
      'Achievement: 2 times Project star for great contribution to the team and achieving goals on time.'
    ],
    technologies: ['Java', 'Spring Boot', 'JVM Optimization', 'Memory Management'],
    achievements: ['2 times Project Star Award', 'JVM optimization expertise']
  },
  {
    id: 'capgemini-intern',
    company: 'Capgemini',
    position: 'Intern',
    duration: 'January 2020 - August 2020',
    description: [
      'Trained on JEE Spring Boot, Angular, Cloud(AWS Basics), DevOops technologies along with soft skills.',
      'Developed full stack Real-Estate project based on spring boot microservices and Angular deployed all on EC2.'
    ],
    technologies: ['Java', 'Spring Boot', 'Angular', 'AWS', 'DevOps', 'Microservices'],
  },
  {
    id: 'drdo-intern',
    company: 'DRDO - DEAL Dehradun',
    position: 'Intern',
    duration: 'July 2019 - August 2019',
    description: [
      'Trained on JEE Spring Boot, Angular, Cloud(AWS Basics), DevOops technologies along with soft skills.',
      'Developed full stack Real-Estate project based on spring boot microservices and Angular deployed all on EC2.'
    ],
    technologies: ['CPP', 'Networking', 'Linux'],
  },
]; 