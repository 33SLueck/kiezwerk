import * as React from 'react';
import type { AvatarGroupProps } from './avatar-group.types';
import {
  getAvatarGroupClasses,
  getAvatarGroupItemClasses,
  getAvatarGroupMoreClasses,
} from './avatar-group.styles';

export const AvatarGroup = ({ children, max = 5, className }: AvatarGroupProps) => {
  const childrenArray = React.Children.toArray(children);
  const excess = childrenArray.length - max;
  const visibleChildren = childrenArray.slice(0, max);

  return (
    <div className={getAvatarGroupClasses(className)}>
      {visibleChildren.map((child, index) => {
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<{ className?: string }>;
          return React.cloneElement(element, {
            className: `${getAvatarGroupItemClasses()} ${element.props.className || ''}`,
            key: index,
          });
        }
        return child;
      })}
      {excess > 0 ? <span className={getAvatarGroupMoreClasses()}>+{excess}</span> : null}
    </div>
  );
};
