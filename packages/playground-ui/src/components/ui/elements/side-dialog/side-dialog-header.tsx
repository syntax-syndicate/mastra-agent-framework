import { Button } from '@/components/ui/elements/button';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

export type SideDialogHeaderProps = {
  children?: React.ReactNode;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
  showInnerNav?: boolean;
};

export function SideDialogHeader({ children, onNext, onPrevious, showInnerNav }: SideDialogHeaderProps) {
  const handleOnNext = () => {
    onNext?.();
  };

  const handleOnPrevious = () => {
    onPrevious?.();
  };

  return (
    <div
      className={cn(
        `flex justify-between min-h-[3rem] items-center border-b border-border1 text-icon5 text-[.875rem] pl-[1.5rem]`,
      )}
    >
      <div
        className={cn(
          'flex items-center gap-[2rem] py-[.5rem]',
          '[&_svg]:w-[1.1em] [&_svg]:h-[1.1em] [&_svg]:text-icon3',
        )}
      >
        {children}

        {(onNext || onPrevious) && showInnerNav && (
          <>
            <span className="text-icon3">|</span>
            <div
              className={cn(
                'flex gap-[1rem] items-baseline',
                '[&>button]:text-[0.875rem] [&>button]:flex [&>button]:items-center [&>button]:px-[0.5rem] [&>button]:py-[0.8rem] [&>button]:leading-[1]',
              )}
            >
              <Button onClick={handleOnNext} disabled={!onNext} variant="ghost">
                <VisuallyHidden>Next</VisuallyHidden>
                <ArrowUpIcon />
              </Button>
              <Button onClick={handleOnPrevious} disabled={!onPrevious} variant="ghost">
                <VisuallyHidden>Previous</VisuallyHidden>
                <ArrowDownIcon />
              </Button>
            </div>
          </>
        )}
      </div>

      <Dialog.Close asChild>
        <button
          className="inline-flex  appearance-none items-center justify-center rounded-md h-[3.5rem] w-[3.5rem] focus:shadow-[0_0_0_2px] focus:outline-none"
          aria-label="Close"
        >
          <XIcon />
        </button>
      </Dialog.Close>
    </div>
  );
}

type SideDialogHeaderGroupProps = {
  children: React.ReactNode;
  className?: string;
};

export function SideDialogHeaderGroup({ children, className }: SideDialogHeaderGroupProps) {
  return <div className={cn('flex items-center gap-[.5rem]', className)}>{children}</div>;
}
