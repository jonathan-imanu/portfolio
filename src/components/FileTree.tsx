import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight, FaFile, FaFolder } from "react-icons/fa";
import type { TreeNode } from "../utils/notes";
import { naturalCompare } from "../utils/notes";
import { matchesSearch } from "../utils/tree";

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
    if (hasChildren && !(e.target as HTMLElement).closest("a") && onToggle) {
      onToggle(node.fullPath);
    }
  };

  return (
    <div>
      <div
        onClick={hasChildren ? handleRowClick : undefined}
        data-folder-path={node.fullPath}
        className={`flex items-center py-1.5 hover:bg-gray-50 rounded transition-colors ${
          hasChildren ? "cursor-pointer" : ""
        }`}
        style={{ paddingLeft: `${indent + 8}px` }}>
        {hasChildren ? (
          <div className="mr-2 text-gray-400 flex-shrink-0">
            <FaChevronRight
              className={`w-4 h-4 transition-transform ${
                isExpanded ? "rotate-90" : ""
              }`}
            />
          </div>
        ) : (
          <span className="w-6 mr-2 flex-shrink-0" />
        )}

        <span className="mr-2 text-gray-400 flex-shrink-0">
          {node.isLeaf ? (
            <FaFile className="w-4 h-4" />
          ) : (
            <FaFolder className="w-4 h-4" />
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
