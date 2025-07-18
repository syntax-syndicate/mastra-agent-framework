import {
  SideDialog,
  SideDialogHeader,
  SideDialogHeaderGroup,
  SideDialogFooter,
  SideDialogContent,
  SideDialogSection,
} from '@/components/ui/elements';
import { ChevronRightIcon, DatabaseIcon, EditIcon, FileTextIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';

import { formatDate } from 'date-fns';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/ds/components/Button';
import { useState } from 'react';

type DialogMode = 'view' | 'create' | 'edit' | 'delete' | 'save';

type DatasetItemDetailsDialogProps = {
  initialMode?: DialogMode;
  dataset?: {
    id: string;
    name: string;
  };
  item?: {
    id?: string;
    input?: string;
    output?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  isOpen: boolean;
  onClose?: () => void;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
};

export function DatasetItemDetailsDialog({
  initialMode = 'view' as DialogMode,
  dataset,
  isOpen,
  item,
  onClose,
  onNext,
  onPrevious,
}: DatasetItemDetailsDialogProps) {
  const [mode, setMode] = useState<DialogMode>(initialMode);

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
    <SideDialog dialogTitle="Dataset Item Details" isOpen={isOpen} item={item} onClose={onClose}>
      <SideDialogHeader onNext={onNext} onPrevious={onPrevious} showInnerNav={mode === 'view'}>
        <SideDialogHeaderGroup>
          {mode === 'view' && (
            <>
              <DatabaseIcon /> {dataset?.name} <ChevronRightIcon /> <FileTextIcon /> {item?.id}
            </>
          )}
          {mode === 'create' && <div>Create a new dataset item</div>}
          {mode === 'edit' && <div>Edit dataset item {item?.id}</div>}
          {mode === 'delete' && <div>Delete dataset item {item?.id}</div>}
          {mode === 'save' && <div>Save trace {item?.id} as a dataset item </div>}
        </SideDialogHeaderGroup>
      </SideDialogHeader>

      <SideDialogContent>
        {mode === 'view' && (
          <>
            <SideDialogSection>
              <div>
                <h3>Input</h3>
              </div>
              <div className="font-mono text-[0.875rem] text-[#ccc]">
                {item?.input && <MarkdownRenderer>{item.input}</MarkdownRenderer>}
              </div>
            </SideDialogSection>
            <SideDialogSection>
              <div>
                <h3>Output</h3>
              </div>
              <div className="font-mono text-[0.875rem] text-[#ccc]">
                {item?.output && <MarkdownRenderer>{item.output}</MarkdownRenderer>}
              </div>
            </SideDialogSection>
          </>
        )}
        {mode === 'create' && <div>create mode</div>}
        {['edit', 'save', 'create'].includes(mode) && (
          <>
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem]">
              <Label>Input</Label>
              <Textarea
                className="disabled:opacity-80"
                placeholder="Enter your prompt here..."
                value={item?.input || ''}
                rows={5}
              />
            </div>
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem]">
              <Label>Output</Label>
              <Textarea
                className="disabled:opacity-80"
                placeholder="Enter your prompt here..."
                value={item?.output || ''}
                rows={5}
              />
            </div>
            <div>
              <Button onClick={handleCancel}>Save changes</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </>
        )}
        {mode === 'delete' && (
          <div className="text-icon4 text-[0.875rem]">
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div>
              <Button onClick={handleCancel}>
                Confirm Delete <Trash2Icon />
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          </div>
        )}
      </SideDialogContent>

      {mode === 'view' && (
        <SideDialogFooter showInnerNav={true} onNext={onNext} onPrevious={onPrevious}>
          <span className="text-icon4 text-[0.75rem]">
            Updated at {item?.updatedAt ? formatDate(new Date(item.updatedAt), 'LLL do yyyy, hh:mm bb') : 'n/a'}
          </span>
          <Button onClick={handleEdit}>
            Edit <EditIcon />
          </Button>
          <Button onClick={handleDelete}>
            Delete <Trash2Icon />
          </Button>
        </SideDialogFooter>
      )}
    </SideDialog>
  );
}
