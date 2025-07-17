// Accept data as arguments instead of using dataService
export const generateSkillsData = (experiences: any[] = [], works: any[] = []): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  experiences.forEach((experience: any) => {
    experience.technologies.forEach((tech: string) => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  works.forEach((work: any) => {
    work.technologies.forEach((tech: string) => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  const skillsArray = Object.entries(skillCount)
    .map(([name, frequency], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      frequency,
      category: 'combined' as const,
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15);
  return skillsArray;
};

export const getExperienceSkills = (experiences: any[] = []): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  experiences.forEach((experience: any) => {
    experience.technologies.forEach((tech: string) => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  return Object.entries(skillCount)
    .map(([name, frequency], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      frequency,
      category: 'experience' as const,
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10);
};

export const getWorksSkills = (works: any[] = []): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  works.forEach((work: any) => {
    work.technologies.forEach((tech: string) => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  return Object.entries(skillCount)
    .map(([name, frequency], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      frequency,
      category: 'works' as const,
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10);
};

export interface SkillFrequency {
  name: string;
  frequency: number;
  category: 'experience' | 'works' | 'combined';
  color: string;
}

// Color palette for different skill categories
const colorPalette = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1',
  '#d084d0', '#ff8042', '#00c49f', '#ffbb28', '#ff6b6b',
  '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3',
  '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#10ac84'
]; 