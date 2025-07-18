import { cn } from '@/lib/utils';

type ListHeaderProps = {
  columnNames: string[];
  columnSizes?: string;
};

export function ItemsListHeader({ columnNames = [], columnSizes }: ListHeaderProps) {
  const columnsStyle = columnSizes || columnNames.map(() => '1fr').join('_');

  console.log('columnsStyle', columnsStyle);

  return (
    <div className={cn('sticky top-0 bg-surface4 z-[1] mt-[1rem] mb-[1rem] rounded-lg px-[1.5rem]')}>
      <div
        className={cn(
          'grid gap-[1rem] text-left text-[0.75rem] text-icon3 uppercase py-[1rem]',
          columnsStyle && `grid-cols-[${columnsStyle}]`,
        )}
      >
        {columnNames.map(name => (
          <span key={name} className="text-icon3 font-semibold">
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
