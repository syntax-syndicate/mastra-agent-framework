import { cn } from '@/lib/utils';
import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  className?: string;
  href?: string;
  to?: string;
  prefetch?: boolean | null;
  children: React.ReactNode;
  size?: 'md' | 'lg';
  variant?: 'default' | 'light' | 'outline' | 'ghost';
  target?: string;
}

const sizeClasses = {
  md: 'min-h-[2rem] text-[0.875rem]',
  lg: 'min-h-[2.5rem] text-[0.9375rem]',
};

const variantClasses = {
  default: 'bg-surface2 hover:bg-surface4 text-icon3 hover:text-icon6',
  light: 'bg-surface3 hover:bg-surface5 text-icon6',
  outline: cn(
    'border border-border1 bg-transparent text-icon4',
    '[&:not(:disabled):hover]:border-icon2 [&:not(:disabled):hover]:text-icon5',
  ),
  ghost: cn('bg-transparent text-icon4', '[&:not(:disabled):hover]:bg-surface5 [&:not(:disabled):hover]:text-icon6'),
};

export const Button = ({ className, as, size = 'md', variant = 'default', ...props }: ButtonProps) => {
  const Component = as || 'button';

  return (
    <Component
      className={cn(
        // 'bg-surface2 border-sm border-border1 px-lg text-ui-md inline-flex items-center justify-center rounded-md border gap-[1em] px-[1em]',
        'inline-flex items-center justify-center rounded-md  px-[1em] gap-[.7em]',
        '[&>svg]:w-[1.2em] [&>svg]:h-[1.2em] [&>svg]:mx-[-0.3em] [&>svg]:opacity-70',
        variantClasses[variant],
        sizeClasses[size],
        className,
        {
          'cursor-not-allowed opacity-50': props.disabled,
        },
      )}
      {...props}
    />
  );
};
