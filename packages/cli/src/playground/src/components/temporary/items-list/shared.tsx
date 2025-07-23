export type Column = {
  name: string;
  label: string;
  size: string;
};

export function getColumnSizesStyle(columns?: Column[]): string {
  if (!columns || columns.length === 0) {
    return '';
  }

  const columnSizes = columns
    ?.map(column => {
      return column.size;
    })
    .join('_');

  return columnSizes ? 'grid-cols-[2fr_3fr_9rem]' : '';
}
