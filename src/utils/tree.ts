import type { TreeNode } from "./notes";

/**
 * Check if a tree node matches a search query
 */
export function matchesSearch(node: TreeNode, query: string): boolean {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  if (
    node.name.toLowerCase().includes(lowerQuery) ||
    node.note?.title.toLowerCase().includes(lowerQuery) ||
    node.note?.path.toLowerCase().includes(lowerQuery)
  ) {
    return true;
  }
  return Array.from(node.children.values()).some((child) =>
    matchesSearch(child, query)
  );
}
