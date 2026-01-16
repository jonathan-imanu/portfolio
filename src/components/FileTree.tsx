import React from "react";
import { Link } from "react-router-dom";
import type { TreeNode } from "../utils/notes";
import { naturalCompare } from "../utils/notes";

interface FileTreeProps {
  node: TreeNode;
  level?: number;
  expandedPaths?: Set<string>;
  onToggle?: (path: string) => void;
  searchQuery?: string;
}

export function FileTreeItem({
  node,
  level = 0,
  expandedPaths = new Set(),
  onToggle,
  searchQuery = "",
}: FileTreeProps) {
  const isExpanded = expandedPaths.has(node.fullPath);
  const hasChildren = node.children.size > 0;
  const indent = level * 20;

  const filteredChildren = searchQuery
    ? Array.from(node.children.values()).filter((child) =>
        matchesSearch(child, searchQuery)
      )
    : Array.from(node.children.values());

  // Sort: folders first, then using natural sort
  const sortedChildren = filteredChildren.sort((a, b) => {
    if (a.isLeaf !== b.isLeaf) {
      return a.isLeaf ? 1 : -1;
    }
    return naturalCompare(a.name, b.name);
  });

  const shouldShow = !searchQuery || matchesSearch(node, searchQuery);

  if (!shouldShow && level === 0) {
    return null;
  }

  const handleRowClick = (e: React.MouseEvent) => {
    if (hasChildren && !(e.target as HTMLElement).closest("a")) {
      onToggle?.(node.fullPath);
    }
  };

  return (
    <div>
      <div
        onClick={hasChildren ? handleRowClick : undefined}
        data-folder-path={node.fullPath}
        className={`flex items-center py-1.5 px-2 hover:bg-gray-50 rounded transition-colors group ${
          hasChildren ? "cursor-pointer" : ""
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}>
        {hasChildren ? (
          <div className="mr-2 text-gray-400 flex-shrink-0">
            <svg
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ) : (
          <span className="w-6 mr-2 flex-shrink-0" />
        )}

        <span className="mr-2 text-gray-400 flex-shrink-0">
          {node.isLeaf ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          )}
        </span>

        {node.note ? (
          <Link
            to={`/notes/${node.note.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 text-sm text-gray-700 hover:text-black transition-colors truncate"
            title={node.note.title}>
            {node.note.title}
          </Link>
        ) : (
          <span className="flex-1 text-sm font-medium text-gray-600 truncate">
            {node.name}
          </span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div>
          {sortedChildren.map((child) => (
            <FileTreeItem
              key={child.fullPath}
              node={child}
              level={level + 1}
              expandedPaths={expandedPaths}
              onToggle={onToggle}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Helper function to check if node matches search (moved outside component)
function matchesSearch(n: TreeNode, query: string): boolean {
  if (!query) return true;
  const lowerQuery = query.toLowerCase();
  if (
    n.name.toLowerCase().includes(lowerQuery) ||
    n.note?.title.toLowerCase().includes(lowerQuery) ||
    n.note?.path.toLowerCase().includes(lowerQuery)
  ) {
    return true;
  }
  return Array.from(n.children.values()).some((child) =>
    matchesSearch(child, query)
  );
}
