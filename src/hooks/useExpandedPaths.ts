import { useState, useCallback } from "react";

export function useExpandedPaths(initialPaths: Set<string> = new Set()) {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(initialPaths);

  const toggle = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  }, []);

  const expand = useCallback((path: string) => {
    setExpandedPaths((prev) => new Set(prev).add(path));
  }, []);

  const expandAll = useCallback((paths: string[]) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      paths.forEach((path) => next.add(path));
      return next;
    });
  }, []);

  const collapse = useCallback((path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      next.delete(path);
      return next;
    });
  }, []);

  const reset = useCallback((paths: Set<string> = new Set()) => {
    setExpandedPaths(paths);
  }, []);

  return { expandedPaths, toggle, expand, expandAll, collapse, reset };
}
