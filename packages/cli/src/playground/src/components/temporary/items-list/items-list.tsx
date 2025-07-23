import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ItemsListCell } from './items-list-cell';
import { ItemsListItem } from './items-list-item';
import { type Column, getColumnSizesStyle } from './shared';

import { cn } from '@/lib/utils';

export function ItemsList({
  items,
  selectedItem,
  onItemClick,
  isLoading,
  total,
  page,
  hasMore,
  onNextPage,
  onPrevPage,
  perPage,
  columns,
}: {
  items: any[];
  selectedItem: any;
  onItemClick?: (item: any) => void;
  isLoading?: boolean;
  total?: number;
  page?: number;
  hasMore?: boolean;
  onNextPage?: () => void;
  onPrevPage?: () => void;
  perPage?: number;
  columns?: Column[];
}) {
  const columnSizesStyle = getColumnSizesStyle(columns);

  if (isLoading) {
    return (
      <div className="flex border border-border1 w-full h-[3.5rem] items-center justify-center text-[0.875rem] text-icon3 rounded-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid gap-[2rem] mb-[3rem]">
      <ul className="grid border border-border1f bg-surface3 rounded-xl ">
        {items?.length === 0 && (
          <li className="text-icon3 text-[0.875rem] text-center h-[3.5rem] items-center flex justify-center">
            No scores found for this scorer.
          </li>
        )}
        {items?.length > 0 &&
          items.map(item => {
            const itemDateStr = item?.updatedAt || item?.createdAt;
            const itemDate = itemDateStr ? new Date(itemDateStr) : null;
            const itemDateFormatted = itemDate ? format(itemDate, 'MMM d HH:mm aa') : 'n/a';

            return (
              <ItemsListItem
                key={item.id}
                item={item}
                selectedItem={selectedItem}
                onClick={onItemClick}
                columnsStyle={'2fr_3fr_9rem'}
                columnSizesStyle={columnSizesStyle}
              >
                <ItemsListCell>{item.input}</ItemsListCell>
                <ItemsListCell>{item.output}</ItemsListCell>
                <ItemsListCell>{itemDateFormatted}</ItemsListCell>
              </ItemsListItem>
            );
          })}
      </ul>

      {typeof page === 'number' && typeof perPage === 'number' && typeof total === 'number' && (
        <div className={cn('flex items-center justify-center text-icon3 text-[0.875rem] gap-[2rem]')}>
          <span>Page {page ? page + 1 : '1'}</span>
          <div
            className={cn(
              'flex gap-[1rem]',
              '[&>button]:flex [&>button]:items-center [&>button]:gap-[0.5rem] [&>button]:text-icon4 [&>button:hover]:text-icon5 [&>button]:transition-colors [&>button]:border [&>button]:border-border1 [&>button]:p-[0.25rem] [&>button]:px-[0.5rem] [&>button]:rounded-md',
              ' [&_svg]:w-[1em] [&_svg]:h-[1em] [&_svg]:text-icon3',
            )}
          >
            {typeof page === 'number' && page > 0 && (
              <button onClick={onPrevPage} disabled={page === 0}>
                <ArrowLeftIcon />
                Previous
              </button>
            )}
            {hasMore && (
              <button onClick={onNextPage} disabled={!hasMore}>
                Next
                <ArrowRightIcon />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
