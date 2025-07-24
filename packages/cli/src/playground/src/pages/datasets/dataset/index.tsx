import {
  Breadcrumb,
  Crumb,
  Header,
  MainContentLayout,
  DatasetItemDialog,
  ItemsListPageHeader,
  DatasetItemsList,
  DatasetItemsTools,
} from '@mastra/playground-ui';
import { useParams, Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import { useDataset } from '@/domains/datasets/useDataset';
import { useDatasetItems } from '@/domains/datasets/useDatasetItems';

export default function Dataset() {
  const { datasetId } = useParams()! as { datasetId: string };
  const { dataset, isLoading: isDatasetLoading } = useDataset(datasetId!);
  const { items, isLoading: isItemsLoading } = useDatasetItems(datasetId!);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const [currentVersion, setCurrentVersion] = useState<string>('0');

  const handleOnListItem = (score: any) => {
    if (score.id === selectedItem?.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(score);
      setDialogIsOpen(true);
    }
  };

  const handleOnAdd = () => {
    setSelectedItem(null);
    setDialogIsOpen(true);
  };

  const toPreviousItem = (currentScore: any) => {
    const currentIndex = items?.findIndex(score => score?.id === currentScore?.id);
    if (currentIndex === -1 || currentIndex === (items?.length || 0) - 1) {
      return null; // No next score
    }
    return () => setSelectedItem(items[(currentIndex || 0) + 1]);
  };
  const toNextItem = (currentScore: any) => {
    const currentIndex = items?.findIndex(score => score?.id === currentScore?.id);
    if ((currentIndex || 0) <= 0) {
      return null; // No previous score
    }
    return () => setSelectedItem(items[(currentIndex || 0) - 1]);
  };

  const handleVersionChange = (value: string) => {
    setCurrentVersion(value);
    console.log('Version changed to:', value);
  };

  const columns = [
    { name: 'input', label: 'Input', size: '2fr' },
    { name: 'output', label: 'Output', size: '3fr' },
    { name: 'source', label: 'Source', size: '7rem' },
    { name: 'updatedAtStr', label: 'Updated at', size: '9rem' },
  ];

  return (
    <MainContentLayout>
      <Header>
        <Breadcrumb>
          <Crumb as={Link} to={`/datasets`}>
            Datasets
          </Crumb>
          <Crumb as={Link} to={`/datasets/${datasetId}`} isCurrent>
            {isDatasetLoading ? <Skeleton className="w-20 h-4" /> : dataset?.name || 'Not found'}
          </Crumb>
        </Breadcrumb>
      </Header>
      {dataset ? (
        <>
          <div className={cn(`h-full overflow-y-scroll `)}>
            <div className={cn('max-w-[100rem] px-[3rem] mx-auto grid gap-[1rem]')}>
              <ItemsListPageHeader title={dataset.name} description={dataset.description} />
              <DatasetItemsTools
                onAdd={handleOnAdd}
                currentVersion={currentVersion}
                onVersionChange={handleVersionChange}
                versionOptions={['07/23 10:30 AM', '07/23 9:35 AM', '07/23 9:30 AM']}
              />
              <DatasetItemsList
                items={items || []}
                selectedItem={selectedItem}
                onItemClick={handleOnListItem}
                columns={columns}
                isLoading={isItemsLoading}
              />
            </div>
          </div>
          <DatasetItemDialog
            // initialMode={selectedItem ? 'view' : 'create'}
            dataset={dataset}
            isOpen={dialogIsOpen}
            item={selectedItem}
            onClose={() => setDialogIsOpen(false)}
            onNext={toNextItem(selectedItem)}
            onPrevious={toPreviousItem(selectedItem)}
          />
        </>
      ) : null}
    </MainContentLayout>
  );
}
