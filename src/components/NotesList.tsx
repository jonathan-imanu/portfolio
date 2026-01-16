import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllNotesMetadata,
  buildNotesTree,
  naturalCompare,
} from "../utils/notes";
import { FileTreeItem } from "./FileTree";
import type { NoteMetadata } from "../types/notes";

export function NotesList() {
  const [notes, setNotes] = useState<NoteMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [searchParams, setSearchParams] = useSearchParams();
  const folderFilter = searchParams.get("folder") || "";
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    getAllNotesMetadata().then((loadedNotes) => {
      setNotes(loadedNotes);
      setLoading(false);
    });
  }, []);

  // Debounce search query
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const tree = useMemo(() => buildNotesTree(notes), [notes]);

  // Handle folder filter from URL - set it in search bar and expand
  useEffect(() => {
    if (folderFilter) {
      // Set the folder path in the search bar (only if search is empty or different)
      if (searchQuery !== folderFilter) {
        setSearchQuery(folderFilter);
      }

      // Expand the folder path and all its parents
      const parts = folderFilter.split("/");
      const pathsToExpand = new Set<string>();
      for (let i = 1; i <= parts.length; i++) {
        pathsToExpand.add(parts.slice(0, i).join("/"));
      }
      setExpandedPaths(pathsToExpand);

      // Scroll to the folder after a brief delay (to allow render)
      setTimeout(() => {
        const element = document.querySelector(
          `[data-folder-path="${folderFilter}"]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    } else if (!searchQuery) {
      // If folderFilter is cleared and search is empty, expand root level folders
      const rootExpanded = new Set<string>();
      tree.children.forEach((child) => {
        if (!child.isLeaf) {
          rootExpanded.add(child.fullPath);
        }
      });
      setExpandedPaths(rootExpanded);
    }
  }, [folderFilter, tree, searchQuery]);

  const handleToggle = (path: string) => {
    setExpandedPaths((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  // Auto-expand/collapse paths based on search
  useEffect(() => {
    // Don't override folder filter expansion if folderFilter is set and matches search
    if (folderFilter && debouncedSearchQuery === folderFilter) {
      return; // Let the folder filter effect handle expansion
    }

    if (debouncedSearchQuery.trim()) {
      const newExpanded = new Set<string>();
      const expandMatchingPaths = (node: typeof tree, query: string) => {
        const matches = matchesSearch(node, query);
        if (matches) {
          if (node.fullPath) {
            newExpanded.add(node.fullPath);
          }
          // Only expand children if this node matches
          node.children.forEach((child) => {
            expandMatchingPaths(child, query);
          });
        }
        // If node doesn't match, don't expand it (implicitly collapsed)
      };
      expandMatchingPaths(tree, debouncedSearchQuery);
      setExpandedPaths(newExpanded);
    } else {
      // When search is cleared, expand root level folders by default
      const rootExpanded = new Set<string>();
      tree.children.forEach((child) => {
        if (!child.isLeaf) {
          rootExpanded.add(child.fullPath);
        }
      });
      setExpandedPaths(rootExpanded);
    }
  }, [debouncedSearchQuery, tree, folderFilter]);

  const filteredNotes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return notes;
    const lowerQuery = debouncedSearchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.path.toLowerCase().includes(lowerQuery)
    );
  }, [notes, debouncedSearchQuery]);

  // Filter tree by folder if folderFilter is set
  const filteredTree = useMemo(() => {
    if (!folderFilter) return tree;

    // Find the folder node
    const findFolderNode = (
      node: typeof tree,
      path: string
    ): typeof tree | null => {
      if (node.fullPath === path) return node;
      for (const child of node.children.values()) {
        const found = findFolderNode(child, path);
        if (found) return found;
      }
      return null;
    };

    const folderNode = findFolderNode(tree, folderFilter);
    if (!folderNode) return tree;

    // Return a new tree with only this folder as root
    return {
      ...tree,
      children: new Map([[folderNode.name, folderNode]]),
    };
  }, [tree, folderFilter]);

  // Check if tree has any matching nodes for search query
  const hasMatchingNodes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      // No search query, check if tree has any children
      return filteredTree.children.size > 0;
    }

    // Check if any root children match the search
    return Array.from(filteredTree.children.values()).some((child) =>
      matchesSearch(child, debouncedSearchQuery)
    );
  }, [filteredTree, debouncedSearchQuery]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Loading notes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="experience-text">
        A selection of my notes on various topics and courses I took at UofT.{" "}
        <a
          href="https://github.com/jonathan-imanu/portfolio"
          className="text-gray-900 underline hover:text-gray-700">
          These notes are synced with my Obsidian vault.
        </a>{" "}
        I hope you find something useful here.
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {filteredNotes.length} {filteredNotes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search notes by title or path"
          value={searchQuery}
          onChange={(e) => {
            const newValue = e.target.value;
            setSearchQuery(newValue);
            // If user clears the search completely, clear the folder filter
            // But if they're typing something new, keep the tab on notes by preserving a param
            if (folderFilter && newValue === "") {
              // Only clear when search is completely empty
              setSearchParams({});
            } else if (folderFilter && newValue !== folderFilter) {
              // When typing something different, keep tab=notes to preserve the notes tab
              setSearchParams({ tab: "notes" });
            }
          }}
          className="w-full px-4 py-2.5 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent text-sm bg-white shadow-sm transition-shadow"
        />
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery("");
              // Keep tab=notes when clearing to stay on notes tab
              setSearchParams({ tab: "notes" });
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="max-h-[600px] overflow-y-auto">
          {hasMatchingNodes ? (
            Array.from(filteredTree.children.values())
              .sort((a, b) => {
                if (a.isLeaf !== b.isLeaf) {
                  return a.isLeaf ? 1 : -1;
                }
                return naturalCompare(a.name, b.name);
              })
              .map((child) => (
                <FileTreeItem
                  key={child.fullPath}
                  node={child}
                  expandedPaths={expandedPaths}
                  onToggle={handleToggle}
                  searchQuery={debouncedSearchQuery}
                />
              ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-8">
              <div className="mb-4 text-gray-300">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  {debouncedSearchQuery ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  )}
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {debouncedSearchQuery
                  ? "No notes match your search"
                  : "No notes found"}
              </h3>
              <p className="text-sm text-gray-500 max-w-sm text-center">
                {debouncedSearchQuery
                  ? `Try adjusting your search terms or browse all notes.`
                  : "There are no notes available at the moment."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper function to check if node matches search
function matchesSearch(
  node: ReturnType<typeof buildNotesTree>,
  query: string
): boolean {
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
