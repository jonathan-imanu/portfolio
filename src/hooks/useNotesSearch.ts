import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import type { NoteMetadata } from "../types/notes";

export function useNotesSearch(notes: NoteMetadata[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const folderFilter = searchParams.get("folder") || "";
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const filteredNotes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return notes;
    const lowerQuery = debouncedSearchQuery.toLowerCase();
    return notes.filter(
      (note) =>
        note.title.toLowerCase().includes(lowerQuery) ||
        note.path.toLowerCase().includes(lowerQuery)
    );
  }, [notes, debouncedSearchQuery]);

  // Handle folder filter from URL
  useEffect(() => {
    if (folderFilter && searchQuery !== folderFilter) {
      setSearchQuery(folderFilter);
    }
  }, [folderFilter]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (folderFilter && value === "") {
      setSearchParams({});
    } else if (folderFilter && value !== folderFilter) {
      setSearchParams({ tab: "notes" });
    }
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    setSearchParams({ tab: "notes" });
  };

  return {
    searchQuery,
    debouncedSearchQuery,
    folderFilter,
    filteredNotes,
    handleSearchChange,
    handleSearchClear,
  };
}
