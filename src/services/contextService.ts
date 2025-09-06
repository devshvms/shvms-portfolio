import { PortfolioData, getPortfolioDataFromFirestore } from '../resources/dataService';

export class ContextService {
  private portfolioData: PortfolioData | null = null;
  private isLoading = false;

  async initializeContext(): Promise<PortfolioData | null> {
    if (this.portfolioData) {
      return this.portfolioData;
    }

    if (this.isLoading) {
      // Wait for existing loading to complete
      return new Promise((resolve) => {
        const checkData = () => {
          if (this.portfolioData) {
            resolve(this.portfolioData);
          } else if (!this.isLoading) {
            resolve(null);
          } else {
            setTimeout(checkData, 100);
          }
        };
        checkData();
      });
    }

    this.isLoading = true;
    try {
      this.portfolioData = await getPortfolioDataFromFirestore();
      return this.portfolioData;
    } catch (error) {
      console.error('Error initializing portfolio context:', error);
      return null;
    } finally {
      this.isLoading = false;
    }
  }

  getPortfolioData(): PortfolioData | null {
    return this.portfolioData;
  }

  // Extract URLs from portfolio data for potential scraping
  extractScrapableUrls(): { github: string[]; linkedin: string[]; other: string[] } {
    if (!this.portfolioData) {
      return { github: [], linkedin: [], other: [] };
    }

    const github: string[] = [];
    const linkedin: string[] = [];
    const other: string[] = [];

    // Extract from works
    this.portfolioData.works.forEach(work => {
      if (work.githubUrl) {
        github.push(work.githubUrl);
      }
      if (work.liveUrl && !work.githubUrl) {
        other.push(work.liveUrl);
      }
    });

    // Extract from intro whatsNew
    this.portfolioData.intro.whatsNew.forEach(item => {
      if (item.githubUrl) {
        github.push(item.githubUrl);
      }
      if (item.liveUrl && !item.githubUrl) {
        other.push(item.liveUrl);
      }
    });

    // Extract from social profiles
    this.portfolioData.social.profiles.forEach(profile => {
      if (profile.url.includes('github.com')) {
        github.push(profile.url);
      } else if (profile.url.includes('linkedin.com')) {
        linkedin.push(profile.url);
      } else {
        other.push(profile.url);
      }
    });

    return { github, linkedin, other };
  }

  // Get formatted context for specific sections
  getFormattedContext(section: keyof PortfolioData): string {
    if (!this.portfolioData) {
      return 'Portfolio data not available.';
    }

    const data = this.portfolioData[section];
    
    switch (section) {
      case 'personal':
        return `Name: ${(data as any).name}
Title: ${(data as any).title}
Tagline: ${(data as any).tagline}
Email: ${(data as any).email}
Location: ${(data as any).location}
Bio: ${(data as any).bio}`;

      case 'skills':
        return (data as any).categories.map((cat: any) => 
          `- ${cat.title}: ${cat.description}`
        ).join('\n');

      case 'experiences':
        return (data as any).map((exp: any) => 
          `- ${exp.position} at ${exp.company} (${exp.duration})
  Technologies: ${exp.technologies.join(', ')}
  Description: ${exp.description.join(' ')}`
        ).join('\n');

      case 'works':
        return (data as any).map((work: any) => 
          `- ${work.title}: ${work.description}
  Technologies: ${work.technologies.join(', ')}
  ${work.githubUrl ? `GitHub: ${work.githubUrl}` : ''}
  ${work.liveUrl ? `Live URL: ${work.liveUrl}` : ''}`
        ).join('\n');

      case 'social':
        return (data as any).profiles.map((profile: any) => 
          `- ${profile.name}: ${profile.url}`
        ).join('\n');

      case 'intro':
        return `Hero: ${(data as any).hero.greeting} ${(data as any).hero.name}
Title: ${(data as any).hero.title}
Subtitle: ${(data as any).hero.subtitle}
Description: ${(data as any).hero.description}

What's New:
${(data as any).whatsNew.map((item: any) => 
  `- ${item.name}: ${item.description}`
).join('\n')}`;

      default:
        return JSON.stringify(data, null, 2);
    }
  }

  // Check if context is ready
  isContextReady(): boolean {
    return this.portfolioData !== null;
  }

  // Reset context (useful for testing or data refresh)
  resetContext(): void {
    this.portfolioData = null;
    this.isLoading = false;
  }
}

// Export singleton instance
export const contextService = new ContextService();
