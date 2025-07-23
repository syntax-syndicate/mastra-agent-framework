import {
  Breadcrumb,
  Crumb,
  Header,
  MainContentLayout,
  DatasetItemDialog,
  ItemsList,
  ItemsListPageHeader,
  UiButton,
} from '@mastra/playground-ui';
import { useParams, Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import { PlusIcon, SearchIcon } from 'lucide-react';

export default function Dataset() {
  const { datasetId } = useParams()! as { datasetId: string };
  const { dataset, isLoading } = {
    dataset: {
      id: datasetId,
      name: 'Sample Dataset',
      description: 'This is a sample dataset description.',
    },
    isLoading: false,
  }; // useDataset(datasetId!);

  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  console.log({ selectedItem });

  const datasetItems = useMemo(
    () =>
      Array.from({ length: 35 }, () => ({
        id: faker.string.uuid(),
        input: faker.lorem.paragraphs({ min: 1, max: 1 }),
        output: faker.lorem.paragraphs({ min: 4, max: 12 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedAtStr: format(new Date(), 'MMM d HH:mm aa'),
        source: 'user',
      })),
    [],
  );

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
    const currentIndex = datasetItems?.findIndex(score => score?.id === currentScore?.id);
    if (currentIndex === -1 || currentIndex === (datasetItems?.length || 0) - 1) {
      return null; // No next score
    }
    return () => setSelectedItem(datasetItems[(currentIndex || 0) + 1]);
  };
  const toNextItem = (currentScore: any) => {
    const currentIndex = datasetItems?.findIndex(score => score?.id === currentScore?.id);
    if ((currentIndex || 0) <= 0) {
      return null; // No previous score
    }
    return () => setSelectedItem(datasetItems[(currentIndex || 0) - 1]);
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
            {isLoading ? <Skeleton className="w-20 h-4" /> : dataset.name || 'Not found'}
          </Crumb>
        </Breadcrumb>
      </Header>
      {dataset ? (
        <>
          <div className={cn(`h-full overflow-y-scroll `)}>
            <div className={cn('max-w-[100rem] px-[3rem] mx-auto')}>
              <ItemsListPageHeader title={dataset.name} description={dataset.description} />
              <div className="flex items-center justify-between mb-4">
                <div className="px-4 flex items-center gap-2 rounded-lg bg-surface5 focus-within:ring-2 focus-within:ring-accent3">
                  <SearchIcon />

                  <input
                    type="text"
                    placeholder="Search for a tool"
                    className="w-full py-2 bg-transparent text-icon3 focus:text-icon6 placeholder:text-icon3 outline-none"
                    value={''}
                    onChange={() => {}}
                  />
                </div>

                <UiButton onClick={handleOnAdd} variant="outline" size="lg">
                  Add <PlusIcon />
                </UiButton>
              </div>
              <ItemsList
                items={datasetItems || []}
                selectedItem={selectedItem}
                onItemClick={handleOnListItem}
                columns={columns}
                //  isLoading={scoresLoading}
                //  total={scoresTotal}
                //  page={scoresPage}
                //  perPage={scoresPerPage}
                //  hasMore={scoresHasMore}
                //  onNextPage={handleNextPage}
                //  onPrevPage={handlePrevPage}
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
