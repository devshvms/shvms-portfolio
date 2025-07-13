import { experienceData } from '../../about/data';
import { worksData } from '../../works/data';

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

export const generateSkillsData = (): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  
  // Process experience data
  experienceData.forEach(experience => {
    experience.technologies.forEach(tech => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  
  // Process portfolio data
  worksData.forEach((work: any) => {
    work.technologies.forEach((tech: string) => {
      const normalizedTech = tech.toLowerCase().trim();
      skillCount[normalizedTech] = (skillCount[normalizedTech] || 0) + 1;
    });
  });
  
  // Convert to array and sort by frequency
  const skillsArray = Object.entries(skillCount)
    .map(([name, frequency], index) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      frequency,
      category: 'combined' as const,
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 15); // Top 15 skills
  
  return skillsArray;
};

export const getExperienceSkills = (): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  
  experienceData.forEach(experience => {
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
      color: colorPalette[index % colorPalette.length],
    }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10);
};

export const getWorksSkills = (): SkillFrequency[] => {
  const skillCount: { [key: string]: number } = {};
  
  worksData.forEach((work: any) => {
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