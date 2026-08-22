import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils/cn';

import { buttonVariants } from './button.styles';
import type { ButtonProps } from './button.types';

const LoaderIcon = () => {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      leadingIcon,
      trailingIcon,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      asChild = false,
      ...rest
    },
    ref
  ) => {
    const Component = asChild ? Slot : 'button';
    const isDisabled = disabled || isLoading;
    const hasChildren = React.Children.count(children) > 0;
    const iconOnly = !hasChildren && (leadingIcon || trailingIcon);

    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement>}
        type={asChild ? undefined : type}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={isLoading || undefined}
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          iconOnly && 'px-3',
          className
        )}
        {...rest}
      >
        {asChild ? (
          children
        ) : (
          <>
            {isLoading ? <LoaderIcon /> : leadingIcon ? leadingIcon : null}
            {hasChildren ? <span>{children}</span> : null}
            {!isLoading && hasChildren && trailingIcon ? trailingIcon : null}
          </>
        )}
      </Component>
    );
  }
);

Button.displayName = 'Button';
