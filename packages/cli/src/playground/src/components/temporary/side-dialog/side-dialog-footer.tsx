import { cn } from '@/lib/utils';
import { Button } from '@mastra/playground-ui';
import { ArrowDownIcon, ArrowUpIcon, XIcon } from 'lucide-react';

export type SideDialogFooterProps = {
  children?: React.ReactNode;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
  showInnerNav?: boolean;
};

export function SideDialogFooter({ children, onNext, onPrevious, showInnerNav }: SideDialogFooterProps) {
  const handleOnNext = () => {
    onNext?.();
  };

  const handleOnPrevious = () => {
    onPrevious?.();
  };

  return (
    <div
      className={cn(
        'flex items-center justify-end gap-[1rem] px-[1.5rem] py-[1rem] min-h-[4rem] border-t border-border1',

        {
          'justify-between': showInnerNav,
        },
      )}
    >
      {(onNext || onPrevious) && showInnerNav && (
        <div
          className={cn(
            'flex gap-[1rem]',
            '[&>button]:text-[0.8125rem] [&>button]:flex [&>button]:items-center [&>button]:px-[0.5rem] [&>button]:py-[0.8rem] [&>button]:leading-[1] [&>button]:bg-transparent',
            '[&_svg]:w-[1.1em] [&_svg]:h-[1.1em] [&_svg]:text-icon3',
          )}
        >
          <Button onClick={handleOnNext} disabled={!onNext}>
            Close
            <XIcon />
          </Button>
          <Button onClick={handleOnNext} disabled={!onNext}>
            Next
            <ArrowUpIcon />
          </Button>
          <Button onClick={handleOnPrevious} disabled={!onPrevious}>
            Previous
            <ArrowDownIcon />
          </Button>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
