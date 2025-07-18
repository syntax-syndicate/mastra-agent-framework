import { cn } from '@/lib/utils';

export function ItemsListPageHeader({ title, description }: { title: string; description: string }) {
  return (
    <div
      className={cn(
        'grid z-[1] top-0 gap-y-[0.5rem] text-icon4 bg-surface2 py-[3rem]',
        '3xl:h-full 3xl:content-start 3xl:grid-rows-[auto_1fr] h-full 3xl:overflow-y-auto',
      )}
    >
      <div className="grid gap-[1rem] w">
        <h1 className="text-icon6 text-[1.25rem]">{title}</h1>
        <p className="m-0 text-[0.875rem]">{description}</p>
      </div>
    </div>
  );
}
