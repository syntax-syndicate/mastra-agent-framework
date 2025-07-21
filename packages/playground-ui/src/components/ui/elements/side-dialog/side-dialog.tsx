import * as Dialog from '@radix-ui/react-dialog';
import { cn } from '@/lib/utils';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';

export function SideDialog({
  dialogTitle,
  isOpen,
  onClose,
  children,
}: {
  dialogTitle: string;
  isOpen: boolean;
  item: any;
  onClose?: () => void;
  onNext?: (() => void) | null;
  onPrevious?: (() => void) | null;
  children?: React.ReactNode;
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black top-0 bottom-0 right-0 left-0 fixed z-50 opacity-[0.25]" />
        <Dialog.Content
          className={cn(
            'fixed top-0 bottom-0 right-0 border-l border-border1 w-[calc(100vw-20rem)] max-w-[50rem] z-50 bg-surface4',
            '3xl:max-w-[60rem]',
            '4xl:max-w-[50%]',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-1/4 ',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0',
          )}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>{dialogTitle}</Dialog.Title>
          </VisuallyHidden.Root>

          <div className="grid grid-rows-[auto_1fr_auto] h-full">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
