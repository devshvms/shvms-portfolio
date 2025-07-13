// Export the data service
export { dataService } from './dataService';

// Export the portfolio data directly
export { portfolioDataExport as portfolioData } from './dataService';

// Export the main hook
export { usePortfolioData } from './usePortfolioData';

// Export individual hooks
export {
  usePersonalData,
  useNavigationData,
  useSocialData,
  useIntroData,
  useHeroData,
  useWhatsNewData,
  useSkillsData,
  useExperiencesData,
  useWorksData,
  useContactData,
  useFooterData,
  useThemeData,
  useAnimationsData,
  useSkillsFrequencyData,
  useExperienceSkillsData,
  useWorksSkillsData,
} from './usePortfolioData';

// Export types
export type { PortfolioData } from './dataService'; 