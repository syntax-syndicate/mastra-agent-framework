import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { ItemsListCell } from './items-list-cell';
import { ItemsListItem } from './items-list-item';
import { getColumnTemplate, type Column } from './shared';

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
  if (isLoading) {
    return (
      <div className="flex border border-border1 w-full h-[3.5rem] items-center justify-center text-[0.875rem] text-icon3 rounded-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="grid mb-[3rem]">
      <div className={cn('sticky top-0 bg-surface4 z-[1] rounded-t-lg border border-border1  px-[1.5rem]')}>
        <div
          className={cn('grid gap-[2rem] text-left text-[0.75rem] text-icon3 uppercase py-[.75rem]')}
          style={{ gridTemplateColumns: getColumnTemplate(columns) }}
        >
          {columns?.map(col => (
            <span key={col.name} className="text-icon3 font-semibold">
              {col.name}
            </span>
          ))}
        </div>
      </div>

      <ul className="grid border border-border1 border-t-0 bg-surface3 rounded-xl rounded-t-none ">
        {items?.length === 0 && (
          <li className="text-icon3 text-[0.875rem] text-center h-[3.5rem] items-center flex justify-center">No</li>
        )}
        {items?.length > 0 &&
          items.map(item => {
            return (
              <ItemsListItem
                key={item.id}
                item={item}
                selectedItem={selectedItem}
                onClick={onItemClick}
                columns={columns}
              >
                {(columns || []).map(col => (
                  <ItemsListCell key={col.name}>{item?.[col.name]}</ItemsListCell>
                ))}
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
