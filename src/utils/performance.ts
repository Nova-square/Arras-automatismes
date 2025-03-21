import { lazy, ComponentType, useMemo, useCallback, useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

// Fonction utilitaire pour le lazy loading des composants
export function lazyLoad<T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  options = { threshold: 0.1 }
) {
  const LazyComponent = lazy(importFunc);
  
  return function LazyLoadWrapper(props: React.ComponentProps<T>) {
    const [ref, inView] = useInView(options);
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      if (inView && !shouldLoad) {
        setShouldLoad(true);
      }
    }, [inView, shouldLoad]);

    return (
      <div ref={ref}>
        {shouldLoad && <LazyComponent {...props} />}
        }
      </div>
    );
  };
}

// Hook pour la memoization des calculs coûteux
export function useMemoizedValue<T>(
  computeValue: () => T,
  dependencies: any[],
  options = { maxSize: 100 }
) {
  const cache = useMemo(() => new Map<string, T>(), []);
  
  return useMemo(() => {
    const key = JSON.stringify(dependencies);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const value = computeValue();
    
    if (cache.size >= options.maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    cache.set(key, value);
    return value;
  }, dependencies);
}

// Hook pour la gestion optimisée des listes
export function useVirtualizedList<T>(
  items: T[],
  options = {
    itemHeight: 50,
    overscan: 3,
    viewportHeight: 400
  }
) {
  const [scrollTop, setScrollTop] = useState(0);
  
  const visibleItems = useMemo(() => {
    const start = Math.floor(scrollTop / options.itemHeight);
    const visibleCount = Math.ceil(options.viewportHeight / options.itemHeight);
    const startIndex = Math.max(0, start - options.overscan);
    const endIndex = Math.min(
      items.length,
      start + visibleCount + options.overscan
    );
    
    return items
      .slice(startIndex, endIndex)
      .map((item, index) => ({
        item,
        index: startIndex + index,
        style: {
          position: 'absolute',
          top: (startIndex + index) * options.itemHeight,
          width: '100%',
          height: options.itemHeight
        }
      }));
  }, [items, scrollTop, options.itemHeight, options.overscan, options.viewportHeight]);

  const containerStyle = useMemo(
    () => ({
      height: options.viewportHeight,
      overflowY: 'auto',
      position: 'relative' as const
    }),
    [options.viewportHeight]
  );

  const contentStyle = useMemo(
    () => ({
      height: items.length * options.itemHeight,
      position: 'relative' as const
    }),
    [items.length, options.itemHeight]
  );

  const onScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(event.currentTarget.scrollTop);
    },
    []
  );

  return {
    containerProps: {
      style: containerStyle,
      onScroll
    },
    contentProps: {
      style: contentStyle
    },
    visibleItems
  };
}

// Hook pour la gestion du debounce
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook pour la gestion du throttle
export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useMemo(() => ({ current: Date.now() }), []);

  useEffect(() => {
    const now = Date.now();
    const timeElapsed = now - lastExecuted.current;

    if (timeElapsed >= delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timer = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay - timeElapsed);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [value, delay, lastExecuted]);

  return throttledValue;
}

// Hook pour la détection des changements de taille
export function useResizeObserver<T extends HTMLElement>() {
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [ref, setRef] = useState<T | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        const { width, height } = entry.contentRect;
        setSize({ width, height });
      }
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return [setRef, size] as const;
}

// Hook pour la gestion du cache des requêtes
export function useQueryCache<T>(
  key: string,
  queryFn: () => Promise<T>,
  options = { ttl: 5 * 60 * 1000 } // 5 minutes par défaut
) {
  const cache = useMemo(() => new Map<string, { data: T; timestamp: number }>(), []);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const cached = cache.get(key);
      const now = Date.now();

      if (cached && now - cached.timestamp < options.ttl) {
        setData(cached.data);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await queryFn();
        cache.set(key, { data: result, timestamp: now });
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, queryFn, options.ttl, cache]);

  return { data, loading, error };
}