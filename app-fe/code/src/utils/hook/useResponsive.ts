import { useViewportSize } from '@mantine/hooks';
import { BREAKPOINTS } from '../constants/variables';

export const useResponsive = () => {
  const { width } = useViewportSize();

  return {
    isMobile: width < BREAKPOINTS.xs,
    isTablet: width >= BREAKPOINTS.xs && width < BREAKPOINTS.sm,
    isDesktop: width >= BREAKPOINTS.sm,
    currentWidth: width,
  };
};
