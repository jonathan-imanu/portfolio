import { useMemo } from "react";
import { buildNotesTree, naturalCompare } from "../utils/notes";
import { matchesSearch } from "../utils/tree";
import type { NoteMetadata } from "../types/notes";
import type { TreeNode } from "../utils/notes";

export function useNotesTree(
  notes: NoteMetadata[],
  searchQuery: string,
  folderFilter: string
) {
  const tree = useMemo(() => buildNotesTree(notes), [notes]);

  const filteredTree = useMemo(() => {
    if (!folderFilter) return tree;

    const findFolderNode = (node: TreeNode, path: string): TreeNode | null => {
      if (node.fullPath === path) return node;
      for (const child of node.children.values()) {
        const found = findFolderNode(child, path);
        if (found) return found;
      }
      return null;
    };

    const folderNode = findFolderNode(tree, folderFilter);
    if (!folderNode) return tree;

    return {
      ...tree,
      children: new Map([[folderNode.name, folderNode]]),
    };
  }, [tree, folderFilter]);

  const hasMatchingNodes = useMemo(() => {
    if (!searchQuery.trim()) {
      return filteredTree.children.size > 0;
    }
    return Array.from(filteredTree.children.values()).some((child) =>
      matchesSearch(child, searchQuery)
    );
  }, [filteredTree, searchQuery]);

  const sortedChildren = useMemo(() => {
    return Array.from(filteredTree.children.values()).sort((a, b) => {
      if (a.isLeaf !== b.isLeaf) {
        return a.isLeaf ? 1 : -1;
      }
      return naturalCompare(a.name, b.name);
    });
  }, [filteredTree]);

  return { tree, filteredTree, hasMatchingNodes, sortedChildren };
}
