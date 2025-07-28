import React, { useRef, useEffect, useState, useCallback } from 'react';

export interface VirtualListProps {
  itemCount: number;
  itemHeight: number;
  height: number;
  visibleCount: number;
  getData: (offset: number) => React.ReactNode;
  onVisibleRangeChange?: (start: number) => void;
}

export const VirtualList: React.FC<VirtualListProps> = ({ itemCount, itemHeight, height, visibleCount, getData, onVisibleRangeChange }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 0 });

  // Helper to update visible range and notify parent
  const updateVisibleRange = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const start = Math.floor(scrollTop / itemHeight);
    const end = Math.min(itemCount, start + visibleCount);
    setVisibleRange({ start, end });
    if (onVisibleRangeChange) onVisibleRangeChange(start);
  }, [itemCount, itemHeight, visibleCount, onVisibleRangeChange]);

  useEffect(() => {
    updateVisibleRange();
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => updateVisibleRange();
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateVisibleRange]);

  const items = [];
  for (let i = visibleRange.start; i < visibleRange.end; i++) {
    items.push(
      <div key={i} style={{ position: 'absolute', top: i * itemHeight, left: 0, right: 0, height: itemHeight }}>
        {getData(i)}
      </div>
    );
  }
  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height, overflowY: 'auto', border: '1px solid #eee', background: '#fafbfc' }}
    >
      <div style={{ height: itemCount * itemHeight, position: 'relative' }}>{items}</div>
    </div>
  );
};
