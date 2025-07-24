import { SideDialog, SideDialogHeader, SideDialogHeaderGroup, SideDialogContent } from '@/components/ui/elements';
import { Button } from '@/components/ui/elements/button';
import { DatabaseIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';

import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

type DialogMode = 'view' | 'create' | 'edit' | 'delete';

type DatasetDialogProps = {
  initialMode?: DialogMode;
  dataset?: {
    id: string;
    name: string;
    description?: string;
  };
  traceId?: string;
  isOpen: boolean;
  onClose?: () => void;
  onCreate?: (dataset: any) => void;
};

export function DatasetDialog({ initialMode = 'view' as DialogMode, dataset, isOpen, onClose }: DatasetDialogProps) {
  const [mode, setMode] = useState<DialogMode>(initialMode);
  const isFormMode = ['create', 'edit'].includes(mode);
  const [targetDataset, setTargetDataset] = useState<string>('');

  // useEffect(() => {
  //   if (isOpen && !item) {
  //     setMode('create');
  //   } else if (isOpen && item) {
  //     setMode('view');
  //   }
  // }, [item, isOpen]);

  const handleDelete = () => {
    // Handle delete logic here

    setMode('delete');
    // onClose?.();
  };

  const handleEdit = () => {
    // Handle edit logic here
    setMode('edit');
    // onClose?.();
  };

  const handleCancel = () => {
    setMode('view');
  };

  return (
    <SideDialog dialogTitle="Dataset Details" isOpen={isOpen} item={dataset} onClose={onClose}>
      <SideDialogHeader>
        <SideDialogHeaderGroup>
          {['edit', 'view', 'delete'].includes(mode) && (
            <>
              <DatabaseIcon /> <span className="truncate">{dataset?.name}</span>
            </>
          )}
          {mode === 'create' && <div>Create a new dataset</div>}
        </SideDialogHeaderGroup>
      </SideDialogHeader>

      <SideDialogContent isCentered={mode === 'delete'}>
        {isFormMode && (
          <div className={cn('grid  gap-[2rem]', {})}>
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem] grid-rows-[auto_1fr]">
              <Label>Name</Label>
              <Input
                className="disabled:opacity-80"
                // placeholder="Enter a name"
                value={dataset?.name || ''}
              />
            </div>
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem] grid-rows-[auto_1fr]">
              <Label>Description</Label>
              <Textarea
                className="disabled:opacity-80"
                // placeholder="Enter a description ..."
                value={dataset?.description || ''}
                rows={5}
              />
            </div>
            <div className="grid gap-[1rem]">
              <Label htmlFor="description">Upload file (csv, json)</Label>
              <Input id="rows" type="file" placeholder="Enter dataset name" />
            </div>
            <div className="grid grid-cols-[3fr_1fr] w-full gap-[1rem] pb-[1rem]">
              <Button onClick={handleCancel} size="lg" variant="outline">
                Save {mode === 'edit' && 'changes'}
              </Button>
              <Button onClick={handleCancel} size="lg" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
        {mode === 'delete' && (
          <div className="text-icon4 text-[0.875rem] grid gap-[2rem] ">
            <h3 className="text-[1rem]">Delete dataset item</h3>
            <p>Are you sure you want to delete the dataset? This action cannot be undone.</p>
            <div className="grid grid-cols-[3fr_1fr] w-full gap-[1rem] max-w-[30rem]">
              <Button onClick={onClose} size="lg" variant="outline">
                Delete <Trash2Icon />
              </Button>
              <Button onClick={handleCancel} size="lg" variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </SideDialogContent>
    </SideDialog>
  );
}
