import { cn } from '@/lib/utils';

export type SideDialogContentProps = {
  children?: React.ReactNode;
};

export function SideDialogContent({ children }: SideDialogContentProps) {
  return (
    <div className={cn('p-[1.5rem] overflow-y-scroll')}>
      <div className="grid gap-[2rem] max-w-[60rem] w-full mx-auto">{children}</div>
    </div>
  );
}

export type SideDialogSectionProps = {
  children?: React.ReactNode;
};

export function SideDialogSection({ children }: SideDialogSectionProps) {
  return (
    <div
      className={cn(
        'grid border border-border1 rounded-lg text-[0.875rem] text-icon5 ',
        '[&>*]:p-[1.5rem] [&>*]:py-[1rem]',
        '[&>*:first-child]:border-b [&>*:first-child]:border-border1 [&>*:first-child]:text-icon4',
      )}
    >
      {children}
    </div>
  );
}
