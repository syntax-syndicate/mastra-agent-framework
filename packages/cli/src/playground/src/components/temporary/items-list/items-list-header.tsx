import { cn } from '@/lib/utils';
import { type Column, getColumnSizesStyle } from './shared';

type ListHeaderProps = {
  columnNames: string[];
  columnSizes?: string;
  columns?: Column[];
};

export function ItemsListHeader({ columns }: ListHeaderProps) {
  const columnSizesStyle = getColumnSizesStyle(columns);

  return (
    <div className={cn('sticky top-0 bg-surface4 z-[1] mt-[1rem] mb-[1rem] rounded-lg px-[1.5rem]')}>
      <div className={cn('grid gap-[1rem] text-left text-[0.75rem] text-icon3 uppercase py-[1rem]', columnSizesStyle)}>
        {columns?.map(col => (
          <span key={col.name} className="text-icon3 font-semibold">
            {col.name}
          </span>
        ))}
      </div>
    </div>
  );
}
