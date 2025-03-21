import React, { memo, useCallback } from 'react';

interface MemoizedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getItemKey: (item: T) => string | number;
  onItemClick?: (item: T) => void;
}

function MemoizedListComponent<T>({
  items,
  renderItem,
  getItemKey,
  onItemClick
}: MemoizedListProps<T>) {
  const handleClick = useCallback((item: T) => {
    onItemClick?.(item);
  }, [onItemClick]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={getItemKey(item)}
          onClick={() => handleClick(item)}
          className="cursor-pointer"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default memo(MemoizedListComponent) as typeof MemoizedListComponent;