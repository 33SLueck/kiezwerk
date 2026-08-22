import * as React from 'react';
import type { SkeletonProps } from './skeleton.types';
import { getSkeletonClasses } from './skeleton.styles';

export const Skeleton = ({ className }: SkeletonProps) => {
  return <div className={getSkeletonClasses(className)} />;
};
