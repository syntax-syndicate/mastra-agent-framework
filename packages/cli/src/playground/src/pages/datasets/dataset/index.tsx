import { Breadcrumb, Crumb, Header, MainContentLayout, DatasetItemDialog } from '@mastra/playground-ui';
import { useParams, Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

import { ItemsList, ItemsListHeader, ItemsListPageHeader } from '@/components/temporary/items-list';
import { faker } from '@faker-js/faker';

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
  const [detailsIsOpened, setDetailsIsOpened] = useState<boolean>(false);

  const datasetItems = useMemo(
    () =>
      Array.from({ length: 5 }, () => ({
        id: faker.string.uuid(),
        input: faker.lorem.paragraphs({ min: 1, max: 1 }),
        output: faker.lorem.paragraphs({ min: 4, max: 12 }),
        createdAt: new Date(),
        updatedAt: new Date(),
        source: 'user',
      })),
    [],
  );

  const handleOnListItemClick = (score: any) => {
    if (score.id === selectedItem?.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(score);
      setDetailsIsOpened(true);
    }
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
  // if (isLoading) {
  //   return null;
  // }

  const columnNames = ['Input', 'Output', 'Updated at'];
  const columnSizes = '2fr_3fr_9rem';

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
              <ItemsListHeader columnNames={columnNames} columnSizes={columnSizes} />
              <ItemsList
                items={datasetItems || []}
                selectedItem={selectedItem}
                onItemClick={handleOnListItemClick}
                columnSizes={`2fr_3fr_9rem`}
                columnNames={columnNames}
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
            dataset={dataset}
            isOpen={detailsIsOpened}
            item={selectedItem}
            onClose={() => setDetailsIsOpened(false)}
            onNext={toNextItem(selectedItem)}
            onPrevious={toPreviousItem(selectedItem)}
          />
        </>
      ) : null}
    </MainContentLayout>
  );
}
