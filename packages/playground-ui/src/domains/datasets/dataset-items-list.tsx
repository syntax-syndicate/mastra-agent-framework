import { type Column, ItemsList } from '@/components/ui/elements';

import { Button } from '@/components/ui/elements/button';
import { ChevronRightIcon, DatabaseIcon, EditIcon, FileTextIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';

import { formatDate } from 'date-fns';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type DatasetItemsListProps = {
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
};

export function DatasetItemsList({ items, selectedItem, onItemClick, columns, isLoading }: DatasetItemsListProps) {
  return (
    <ItemsList
      items={items || []}
      selectedItem={selectedItem}
      onItemClick={onItemClick}
      columns={columns}
      isLoading={isLoading}
      //  total={scoresTotal}
      //  page={scoresPage}
      //  perPage={scoresPerPage}
      //  hasMore={scoresHasMore}
      //  onNextPage={handleNextPage}
      //  onPrevPage={handlePrevPage}
    />
  );
}
