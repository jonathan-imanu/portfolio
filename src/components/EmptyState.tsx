import { FaSearch, FaFile } from "react-icons/fa";

interface EmptyStateProps {
  hasSearchQuery: boolean;
}

export function EmptyState({ hasSearchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="mb-4 text-gray-300">
        {hasSearchQuery ? (
          <FaSearch className="w-16 h-16" />
        ) : (
          <FaFile className="w-16 h-16" />
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {hasSearchQuery ? "No notes match your search" : "No notes found"}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm text-center">
        {hasSearchQuery
          ? "Try adjusting your search terms or browse all notes."
          : "There are no notes available at the moment."}
      </p>
    </div>
  );
}
