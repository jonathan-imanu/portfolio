import { useNotes } from "../hooks/useNotes";
import { useNotesSearch } from "../hooks/useNotesSearch";
import { useExpandedPaths } from "../hooks/useExpandedPaths";
import { useNotesTree } from "../hooks/useNotesTree";
import { useAutoExpand } from "../hooks/useAutoExpand";
import { FileTreeItem } from "./FileTree";
import { SearchInput } from "./SearchInput";
import { EmptyState } from "./EmptyState";

export function NotesList() {
  const { notes, loading } = useNotes();
  const {
    searchQuery,
    debouncedSearchQuery,
    folderFilter,
    filteredNotes,
    handleSearchChange,
    handleSearchClear,
  } = useNotesSearch(notes);
  const { expandedPaths, toggle, expandAll, reset } = useExpandedPaths();
  const { filteredTree, hasMatchingNodes, sortedChildren } = useNotesTree(
    notes,
    debouncedSearchQuery,
    folderFilter
  );

  useAutoExpand({
    tree: filteredTree,
    searchQuery: debouncedSearchQuery,
    folderFilter,
    expandAll,
    reset,
  });

  if (loading) {
    return <div className="mt-2 body-text text-gray-500">Loading notes...</div>;
  }

  return (
    <div className="space-y-4">
      <p className="experience-text">
        A selection of my notes on various topics and courses I took at UofT.{" "}
        <a
          href="https://github.com/jonathan-imanu/obsidian-vault"
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

      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        onClear={handleSearchClear}
      />

      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm">
        <div className="max-h-[600px] overflow-y-auto">
          {hasMatchingNodes ? (
            sortedChildren.map((child) => (
              <FileTreeItem
                key={child.fullPath}
                node={child}
                expandedPaths={expandedPaths}
                onToggle={toggle}
                searchQuery={debouncedSearchQuery}
              />
            ))
          ) : (
            <EmptyState hasSearchQuery={!!debouncedSearchQuery.trim()} />
          )}
        </div>
      </div>
    </div>
  );
}
