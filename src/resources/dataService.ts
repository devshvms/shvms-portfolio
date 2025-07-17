import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export interface PortfolioData {
  personal: {
    name: string;
    title: string;
    tagline: string;
    email: string;
    location: string;
    bio: string;
    avatar: string;
    logo: {
      light: string;
      dark: string;
    };
  };
  navigation: {
    items: Array<{
      id: string;
      label: string;
      target: string;
    }>;
  };
  social: {
    profiles: Array<{
      id: string;
      name: string;
      icon: string;
      url: string;
      description: string;
      color: string;
    }>;
  };
  intro: {
    hero: {
      greeting: string;
      name: string;
      title: string;
      subtitle: string;
      description: string;
    };
    whatsNew: Array<{
      id: string;
      name: string;
      description: string;
      technologies: string[];
      githubUrl?: string;
      liveUrl?: string;
    }>;
  };
  skills: {
    categories: Array<{
      id: string;
      title: string;
      description: string;
      image: string;
    }>;
    graph: {
      colorPalette: string[];
    };
  };
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    duration: string;
    description: string[];
    technologies: string[];
    achievements?: string[];
    logo?: string;
  }>;
  works: Array<{
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    isArticle?: boolean;
    githubUrl?: string;
    liveUrl?: string;
    articleUrl?: string;
  }>;
  contact: {
    form: {
      title: string;
      subtitle: string;
      fields: Array<{
        name: string;
        label: string;
        type: string;
        required: boolean;
        rows?: number;
      }>;
      submitButton: string;
    };
    social: {
      title: string;
      subtitle: string;
    };
  };
  footer: {
    text: string;
    links: Array<{
      text: string;
      url: string;
    }>;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
    };
    typography: {
      fontFamily: string;
      h1: {
        fontSize: string;
        fontWeight: number;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
      };
      h3: {
        fontSize: string;
        fontWeight: number;
      };
      body1: {
        fontSize: string;
        fontWeight: number;
      };
    };
  };
  animations: {
    duration: number;
    easing: string;
  };
}

// Async function to fetch portfolio data from Firestore
export async function getPortfolioDataFromFirestore(): Promise<PortfolioData | null> {
  try {
    const docRef = doc(db, 'portfolio', 'main');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as PortfolioData;
    }
    return null;
  } catch (err) {
    console.error('Error fetching portfolio data from Firestore:', err);
    return null;
  }
}

// DataService is now deprecated; use getPortfolioDataFromFirestore instead.

class DataService {
  private data: PortfolioData | null;
  constructor() {
    this.data = null; // This class will now always return null as data is fetched externally
  }
  getAllData(): PortfolioData | null {
    return this.data;
  }

  // Get personal information
  getPersonalInfo() {
    return this.data?.personal;
  }

  // Get navigation items
  getNavigationItems() {
    return this.data?.navigation.items;
  }

  // Get social profiles
  getSocialProfiles() {
    return this.data?.social.profiles;
  }

  // Get intro data
  getIntroData() {
    return this.data?.intro;
  }

  // Get hero data
  getHeroData() {
    return this.data?.intro.hero;
  }

  // Get whats new data
  getWhatsNewData() {
    return this.data?.intro.whatsNew;
  }

  // Get skills data
  getSkillsData() {
    return this.data?.skills;
  }

  // Get skills categories
  getSkillsCategories() {
    return this.data?.skills.categories;
  }

  // Get skills graph data
  getSkillsGraphData() {
    return this.data?.skills.graph;
  }

  // Get experiences
  getExperiences() {
    return this.data?.experiences;
  }

  // Get works
  getWorks() {
    return this.data?.works;
  }

  // Get contact data
  getContactData() {
    return this.data?.contact;
  }

  // Get footer data
  getFooterData() {
    return this.data?.footer;
  }

  // Get theme data
  getThemeData() {
    return this.data?.theme;
  }

  // Get animations data
  getAnimationsData() {
    return this.data?.animations;
  }

  // Generate skills frequency data for graphs
  generateSkillsFrequencyData() {
    const skillCount: { [key: string]: number } = {};
    
    // Process experience data
    this.data?.experiences.forEach(experience => {
      experience.technologies.forEach(tech => {
        const normalizedTech = tech.toLowerCase().trim();
        skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
      });
    });
    
    // Process works data
    this.data?.works.forEach(work => {
      work.technologies.forEach(tech => {
        const normalizedTech = tech.toLowerCase().trim();
        skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
      });
    });
    
    // Convert to array and sort by frequency
    return Object.entries(skillCount)
      .map(([name, frequency], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        frequency,
        category: 'combined' as const,
        color: this.data?.skills.graph.colorPalette[index % this.data?.skills.graph.colorPalette.length],
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 15);
  }

  // Get experience skills only
  getExperienceSkills() {
    const skillCount: { [key: string]: number } = {};
    
    this.data?.experiences.forEach(experience => {
      experience.technologies.forEach(tech => {
        const normalizedTech = tech.toLowerCase().trim();
        skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
      });
    });
    
    return Object.entries(skillCount)
      .map(([name, frequency], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        frequency,
        category: 'experience' as const,
        color: this.data?.skills.graph.colorPalette[index % this.data?.skills.graph.colorPalette.length],
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }

  // Get works skills only
  getWorksSkills() {
    const skillCount: { [key: string]: number } = {};
    
    this.data?.works.forEach(work => {
      work.technologies.forEach(tech => {
        const normalizedTech = tech.toLowerCase().trim();
        skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
      });
    });
    
    return Object.entries(skillCount)
      .map(([name, frequency], index) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        frequency,
        category: 'works' as const,
        color: this.data?.skills.graph.colorPalette[index % this.data?.skills.graph.colorPalette.length],
      }))
      .sort((a, b) => b.frequency - a.frequency)
      .slice(0, 10);
  }
}

export const dataService = new DataService(); 