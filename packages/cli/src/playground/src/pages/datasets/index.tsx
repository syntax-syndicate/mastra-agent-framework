import { Button, DataTable, Header, HeaderTitle, MainContentLayout, DatasetDialog } from '@mastra/playground-ui';
import { datasetsTableColumns } from '@/domains/datasets/table.columns';
import { useState } from 'react';
import { useDatasets } from '@/domains/datasets/useDatasets';

export default function Datasets() {
  const { datasets, isLoading } = useDatasets();
  const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);

  return (
    <>
      <MainContentLayout>
        <Header>
          <HeaderTitle>Datasets</HeaderTitle>
          <Button className="ml-auto" onClick={() => setCreateDialogIsOpen(true)}>
            New Dataset
          </Button>
        </Header>
        <div>
          <DataTable
            columns={datasetsTableColumns}
            data={datasets || []}
            isLoading={false}
            onClick={props => {
              console.log(props);
            }}
          />
        </div>
      </MainContentLayout>
      <DatasetDialog initialMode="create" isOpen={createDialogIsOpen} onClose={() => setCreateDialogIsOpen(false)} />
    </>
  );
}
