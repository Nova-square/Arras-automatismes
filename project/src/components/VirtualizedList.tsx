import React from 'react';
import { useVirtualizedList } from '../utils/performance';

interface VirtualizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  height?: number;
  overscan?: number;
}

export default function VirtualizedList<T>({
  items,
  renderItem,
  itemHeight = 50,
  height = 400,
  overscan = 3
}: VirtualizedListProps<T>) {
  const {
    containerProps,
    contentProps,
    visibleItems
  } = useVirtualizedList(items, {
    itemHeight,
    viewportHeight: height,
    overscan
  });

  return (
    <div {...containerProps}>
      <div {...contentProps}>
        {visibleItems.map(({ item, index, style }) => (
          <div key={index} style={style}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}