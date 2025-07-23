import {
  SideDialog,
  SideDialogHeader,
  SideDialogHeaderGroup,
  SideDialogFooter,
  SideDialogContent,
  SideDialogSection,
  SideDialogFooterGroup,
  SideDialogKeyValueList,
} from '@/components/ui/elements';
import { Button } from '@/components/ui/elements/button';
import { ChevronRightIcon, DatabaseIcon, EditIcon, FileTextIcon, Trash2Icon } from 'lucide-react';
import { Label } from '@/components/ui/label';

import { formatDate } from 'date-fns';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';

type DialogMode = 'view' | 'create' | 'edit' | 'delete' | 'save';

type DatasetItemDialogProps = {
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
  traceId?: string;
  isOpen: boolean;
  onClose?: () => void;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
};

export function DatasetItemDialog({
  initialMode = 'view' as DialogMode,
  dataset,
  isOpen,
  item,
  onClose,
  onNext,
  onPrevious,
  traceId,
}: DatasetItemDialogProps) {
  const [mode, setMode] = useState<DialogMode>(initialMode);
  const isFormMode = ['create', 'edit', 'save'].includes(mode);
  const [targetDataset, setTargetDataset] = useState<string>('');

  console.log({ initialMode, mode });

  useEffect(() => {
    if (isOpen && !item) {
      setMode('create');
    } else if (isOpen && item) {
      setMode('view');
    }
  }, [item]);

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
          {['edit', 'view', 'delete'].includes(mode) && (
            <>
              <DatabaseIcon /> {dataset?.name} <ChevronRightIcon /> <FileTextIcon /> {item?.id}
            </>
          )}
          {mode === 'create' && <div>Create a new dataset item</div>}
          {mode === 'save' && <div>Trace: {traceId}</div>}
        </SideDialogHeaderGroup>
      </SideDialogHeader>

      <SideDialogContent isCentered={mode === 'delete'} isFullHeight={isFormMode}>
        {mode === 'view' && (
          <>
            <SideDialogSection>
              <div>
                <h3>Info</h3>
              </div>
              <div className="">
                <SideDialogKeyValueList
                  items={[
                    { key: 'Id', value: item?.id || 'N/A' },
                    {
                      key: 'Created at',
                      value: item?.createdAt ? formatDate(new Date(item.createdAt), 'LLL do yyyy, hh:mm bb') : 'N/A',
                    },
                    {
                      key: 'Updated at',
                      value: item?.updatedAt ? formatDate(new Date(item.updatedAt), 'LLL do yyyy, hh:mm bb') : 'N/A',
                    },
                    { key: 'Source', value: traceId || 'N/A' },
                  ]}
                />
              </div>
            </SideDialogSection>
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
        {isFormMode && (
          <div
            className={cn('grid grid-rows-[1fr_2fr_auto] gap-[2rem]', {
              'grid-rows-[auto_1fr_2fr_auto]': mode === 'save',
            })}
          >
            {mode === 'save' && (
              <div className="flex items-baseline gap-[1rem]">
                <label htmlFor="select-dataset" className="text-icon3 text-[0.875rem] font-semibold whitespace-nowrap">
                  Dataset
                </label>
                <Select
                  name="select-dataset"
                  value={targetDataset}
                  defaultValue="1"
                  onValueChange={value => {
                    setTargetDataset(value);
                  }}
                >
                  <SelectTrigger id="select-dataset" className="w-full">
                    <SelectValue placeholder="Select a dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="1" value="1">
                      My first Dataset
                    </SelectItem>
                    <SelectItem key="2" value="2">
                      My second Dataset
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem] grid-rows-[auto_1fr]">
              <Label>Input</Label>
              <Textarea
                className="disabled:opacity-80"
                placeholder="Enter an input ..."
                value={item?.input || ''}
                rows={5}
              />
            </div>
            <div className="grid gap-[1rem] [&>label]:text-icon4 [&>label]:text-[0.875rem] grid-rows-[auto_1fr]">
              <Label>Output</Label>
              <Textarea
                className="disabled:opacity-80"
                placeholder="Enter an output ..."
                value={item?.output || ''}
                rows={5}
              />
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
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
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

      {mode === 'view' && (
        <SideDialogFooter showInnerNav={true} onNext={onNext} onPrevious={onPrevious}>
          <SideDialogFooterGroup>
            <span className="text-icon4 text-[0.75rem] mr-[1rem]">
              Updated at {item?.updatedAt ? formatDate(new Date(item.updatedAt), 'LLL do yyyy, hh:mm bb') : 'n/a'}
            </span>
            <Button onClick={handleEdit} variant="ghost">
              Edit <EditIcon />
            </Button>
            <Button onClick={handleDelete} variant="ghost">
              Delete <Trash2Icon />
            </Button>
          </SideDialogFooterGroup>
        </SideDialogFooter>
      )}
    </SideDialog>
  );
}
