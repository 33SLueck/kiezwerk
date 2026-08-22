'use client';

import React from 'react';
import { motion, AnimatePresence, HTMLMotionProps, Variants } from 'framer-motion';

// Export AnimatePresence directly for layout / list animations
export { AnimatePresence };

// Primitives re-exported as client components
export const MotionDiv = motion.div;
export const MotionSection = motion.section;
export const MotionSpan = motion.span;
export const MotionHeader = motion.header;
export const MotionNav = motion.nav;
export const MotionMain = motion.main;
export const MotionFooter = motion.footer;
export const MotionUl = motion.ul;
export const MotionLi = motion.li;
export const MotionImg = motion.img;
export const MotionP = motion.p;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionH3 = motion.h3;

// Direction helper
type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

const getDirectionOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up':
      return { x: 0, y: distance };
    case 'down':
      return { x: 0, y: -distance };
    case 'left':
      return { x: distance, y: 0 };
    case 'right':
      return { x: -distance, y: 0 };
    case 'none':
    default:
      return { x: 0, y: 0 };
  }
};

export interface ViewportOptions {
  once?: boolean;
  amount?: number | 'some' | 'all';
  margin?: string;
}

export interface FadeInProps extends HTMLMotionProps<'div'> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  viewportAmount?: number | 'some' | 'all';
  viewportMargin?: string;
  margin?: string;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 24,
  once = true,
  viewportAmount = 0.2,
  viewportMargin,
  margin,
  className,
  ...props
}) => {
  const { x, y } = getDirectionOffset(direction, distance);
  const activeMargin = viewportMargin ?? margin;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{
        once,
        amount: viewportAmount,
        ...(activeMargin ? { margin: activeMargin } : {}),
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  scale?: boolean;
  offset?: string;
  viewportAmount?: number | 'some' | 'all';
}

/**
 * ScrollReveal Component
 * Trigger animations upon scrolling into view and reverse when leaving view.
 * Configurable offset (viewport margin) for optimal mobile & desktop triggering.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 30,
  once = false, // defaults to false so it repeats when leaving/re-entering
  scale = false,
  offset = '-40px', // mobile-friendly default offset
  viewportAmount = 0.15,
  className,
  ...props
}) => {
  const { x, y } = getDirectionOffset(direction, distance);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x,
        y,
        scale: scale ? 0.95 : 1,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once,
        amount: viewportAmount,
        margin: offset,
      }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerChildren?: number;
  delayChildren?: number;
  once?: boolean;
  viewportAmount?: number | 'some' | 'all';
  viewportMargin?: string;
  margin?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  viewportAmount = 0.2,
  viewportMargin,
  margin,
  className,
  ...props
}) => {
  const activeMargin = viewportMargin ?? margin;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{
        once,
        amount: viewportAmount,
        ...(activeMargin ? { margin: activeMargin } : {}),
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface StaggerItemProps extends HTMLMotionProps<'div'> {
  direction?: Direction;
  distance?: number;
  duration?: number;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  direction = 'up',
  distance = 20,
  duration = 0.4,
  className,
  ...props
}) => {
  const { x, y } = getDirectionOffset(direction, distance);

  const itemVariants: Variants = {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className} {...props}>
      {children}
    </motion.div>
  );
};

export interface HoverScaleProps extends HTMLMotionProps<'div'> {
  scale?: number;
  tapScale?: number;
}

export const HoverScale: React.FC<HoverScaleProps> = ({
  children,
  scale = 1.03,
  tapScale = 0.97,
  className,
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export interface PageTransitionProps extends HTMLMotionProps<'div'> {
  duration?: number;
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  duration = 0.3,
  className,
  ...props
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
