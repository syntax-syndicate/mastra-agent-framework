import { cn } from '@/lib/utils';

export type SideDialogContentProps = {
  children?: React.ReactNode;
  className?: string;
  isCentered?: boolean;
  isFullHeight?: boolean;
};

export function SideDialogContent({ children, className, isCentered, isFullHeight }: SideDialogContentProps) {
  return (
    <div className={cn('p-[1.5rem] overflow-y-scroll', className)}>
      <div
        className={cn('grid gap-[2rem] max-w-[50rem] w-full mx-auto  ', {
          'items-center justify-center h-full content-center': isCentered,
          'min-h-full': isFullHeight,
          'content-start': !isFullHeight && !isCentered,
        })}
      >
        {children}
      </div>
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
        'grid border border-border1 rounded-lg text-[0.875rem] text-icon5',
        '[&>*]:p-[1.5rem] [&>*]:py-[1rem]',
        '[&>*:first-child]:border-b [&>*:first-child]:border-border1 [&>*:first-child]:text-icon4',
        '[&>div>h3]:text-icon3 [&>div>h3]:text-[0.875rem] [&>div>h3]:font-semibold',
      )}
    >
      {children}
    </div>
  );
}

export function SideDialogKeyValueList({ items }: { items: { key: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid gap-[1rem]">
      {items.map((item, index) => (
        <div key={index} className={cn('grid grid-cols-[auto_1fr] gap-[1rem]')}>
          <dt className="text-icon3">{item.key}:</dt>
          <dd className="text-icon4">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}
