import { cn } from '@/lib/utils';

export function ItemsListItem({
  item,
  selectedItem,
  onClick,
  children,
  columnSizesStyle,
}: {
  item: any;
  selectedItem: any | null;
  onClick?: (score: any) => void;
  children?: React.ReactNode;
  columnsStyle?: string;
  columnSizesStyle?: string;
}) {
  const isSelected = selectedItem?.id === item.id;

  const handleClick = () => {
    return onClick && onClick(item);
  };

  // const isTodayDate = isToday(new Date(item.createdAt));
  // const dateStr = format(new Date(item.createdAt), 'MMM d yyyy');
  // const timeStr = format(new Date(item.createdAt), 'h:mm:ss bb');
  // const inputPrev = item?.input || '';
  // const outputPrev = item?.output || '';

  return (
    <li
      className={cn('scorerListItem border-b text-[#ccc] border-border1 last:border-b-0 text-[0.875rem]', {
        'bg-surface5': isSelected,
      })}
    >
      <button
        onClick={handleClick}
        className={cn('grid w-full px-[1.5rem] gap-[2rem] text-left items-center min-h-[3.5rem]', columnSizesStyle)}
      >
        {children}
      </button>
    </li>
  );
}
