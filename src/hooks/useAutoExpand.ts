import { useEffect } from "react";
import { matchesSearch } from "../utils/tree";
import type { TreeNode } from "../utils/notes";

interface UseAutoExpandProps {
  tree: TreeNode;
  searchQuery: string;
  folderFilter: string;
  expandAll: (paths: string[]) => void;
  reset: (paths: Set<string>) => void;
}

export function useAutoExpand({
  tree,
  searchQuery,
  folderFilter,
  expandAll,
  reset,
}: UseAutoExpandProps) {
  // Handle folder filter expansion
  useEffect(() => {
    if (folderFilter) {
      const parts = folderFilter.split("/");
      const pathsToExpand: string[] = [];
      for (let i = 1; i <= parts.length; i++) {
        pathsToExpand.push(parts.slice(0, i).join("/"));
      }
      expandAll(pathsToExpand);

      setTimeout(() => {
        const element = document.querySelector(
          `[data-folder-path="${folderFilter}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else if (!searchQuery) {
      const rootExpanded = new Set<string>();
      tree.children.forEach((child) => {
        if (!child.isLeaf) {
          rootExpanded.add(child.fullPath);
        }
      });
      reset(rootExpanded);
    }
  }, [folderFilter, tree, searchQuery, expandAll, reset]);

  // Auto-expand/collapse paths based on search
  useEffect(() => {
    if (folderFilter && searchQuery === folderFilter) {
      return;
    }

    if (searchQuery.trim()) {
      const newExpanded = new Set<string>();
      const expandMatchingPaths = (node: TreeNode, query: string) => {
        if (matchesSearch(node, query)) {
          if (node.fullPath) {
            newExpanded.add(node.fullPath);
          }
          node.children.forEach((child) => {
            expandMatchingPaths(child, query);
          });
        }
      };
      expandMatchingPaths(tree, searchQuery);
      reset(newExpanded);
    } else {
      const rootExpanded = new Set<string>();
      tree.children.forEach((child) => {
        if (!child.isLeaf) {
          rootExpanded.add(child.fullPath);
        }
      });
      reset(rootExpanded);
    }
  }, [searchQuery, tree, folderFilter, reset]);
}
