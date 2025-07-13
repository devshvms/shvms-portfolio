declare module 'react-scroll' {
  import { ComponentType } from 'react';

  interface LinkProps {
    to: string;
    spy?: boolean;
    smooth?: boolean;
    offset?: number;
    duration?: number;
    activeClass?: string;
    className?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
    children?: React.ReactNode;
  }

  export const Link: ComponentType<LinkProps>;
} 