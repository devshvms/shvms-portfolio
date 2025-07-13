import { useMemo } from 'react';
import { dataService } from './dataService';

export const usePortfolioData = () => {
  return useMemo(() => ({
    // Personal information
    personal: dataService.getPersonalInfo(),
    
    // Navigation
    navigation: dataService.getNavigationItems(),
    
    // Social profiles
    social: dataService.getSocialProfiles(),
    
    // Intro data
    intro: dataService.getIntroData(),
    hero: dataService.getHeroData(),
    whatsNew: dataService.getWhatsNewData(),
    
    // Skills data
    skills: dataService.getSkillsData(),
    skillsCategories: dataService.getSkillsCategories(),
    skillsGraph: dataService.getSkillsGraphData(),
    
    // Experiences
    experiences: dataService.getExperiences(),
    
    // Works
    works: dataService.getWorks(),
    
    // Contact data
    contact: dataService.getContactData(),
    
    // Footer data
    footer: dataService.getFooterData(),
    
    // Theme data
    theme: dataService.getThemeData(),
    
    // Animations data
    animations: dataService.getAnimationsData(),
    
    // Generated data
    skillsFrequency: dataService.generateSkillsFrequencyData(),
    experienceSkills: dataService.getExperienceSkills(),
    worksSkills: dataService.getWorksSkills(),
    
    // All data
    allData: dataService.getAllData(),
  }), []);
};

// Individual hooks for specific data
export const usePersonalData = () => {
  return useMemo(() => dataService.getPersonalInfo(), []);
};

export const useNavigationData = () => {
  return useMemo(() => dataService.getNavigationItems(), []);
};

export const useSocialData = () => {
  return useMemo(() => dataService.getSocialProfiles(), []);
};

export const useIntroData = () => {
  return useMemo(() => dataService.getIntroData(), []);
};

export const useHeroData = () => {
  return useMemo(() => dataService.getHeroData(), []);
};

export const useWhatsNewData = () => {
  return useMemo(() => dataService.getWhatsNewData(), []);
};

export const useSkillsData = () => {
  return useMemo(() => dataService.getSkillsData(), []);
};

export const useExperiencesData = () => {
  return useMemo(() => dataService.getExperiences(), []);
};

export const useWorksData = () => {
  return useMemo(() => dataService.getWorks(), []);
};

export const useContactData = () => {
  return useMemo(() => dataService.getContactData(), []);
};

export const useFooterData = () => {
  return useMemo(() => dataService.getFooterData(), []);
};

export const useThemeData = () => {
  return useMemo(() => dataService.getThemeData(), []);
};

export const useAnimationsData = () => {
  return useMemo(() => dataService.getAnimationsData(), []);
};

export const useSkillsFrequencyData = () => {
  return useMemo(() => dataService.generateSkillsFrequencyData(), []);
};

export const useExperienceSkillsData = () => {
  return useMemo(() => dataService.getExperienceSkills(), []);
};

export const useWorksSkillsData = () => {
  return useMemo(() => dataService.getWorksSkills(), []);
}; 