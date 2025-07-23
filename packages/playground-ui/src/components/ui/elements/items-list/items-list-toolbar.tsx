import { cn } from '@/lib/utils';

type ItemsListToolbarProps = {
  children?: React.ReactNode;
  className?: string;
};

export function ItemsListToolbar({ children, className }: ItemsListToolbarProps) {
  return (
    <div
      className={cn('flex justify-between bg-surface4 z-[1] mt-[1rem] mb-[1rem] rounded-lg px-[1.5rem] ', className)}
    >
      {children}
    </div>
  );
}
