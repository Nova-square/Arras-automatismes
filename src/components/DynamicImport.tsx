import React, { Suspense } from 'react';
import { lazyLoad } from '../utils/performance';

interface DynamicImportProps {
  importPath: string;
  fallback?: React.ReactNode;
  props?: Record<string, any>;
}

export default function DynamicImport({
  importPath,
  fallback = <div className="animate-pulse bg-gray-200 h-32 rounded-lg" />,
  props = {}
}: DynamicImportProps) {
  const LazyComponent = lazyLoad(() => import(importPath));

  return (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
}