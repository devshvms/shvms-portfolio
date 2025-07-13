export interface SocialProfile {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string;
  description: string;
  color: string;
}

export interface SocialSliderProps {
  currentSlide: number;
  socialProfiles: SocialProfile[];
  onSlideChange: (index: number) => void;
  onNextSlide: () => void;
  onPrevSlide: () => void;
} 