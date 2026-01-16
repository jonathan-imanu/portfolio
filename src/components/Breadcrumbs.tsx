import { Link } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

interface BreadcrumbLink {
  name: string;
  path: string;
  noteId?: string;
}

interface BreadcrumbsProps {
  links: BreadcrumbLink[];
}

function truncateCrumb(name: string): string {
  if (name.length > 12) {
    return name.slice(0, 12) + "...";
  }
  return name;
}

export function Breadcrumbs({ links }: BreadcrumbsProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
      <MobileBreadcrumbs links={links} />
      <DesktopBreadcrumbs links={links} />
    </nav>
  );
}

function MobileBreadcrumbs({ links }: BreadcrumbsProps) {
  const lastItem = links[links.length - 1];
  const secondLastItem = links.length > 1 ? links[links.length - 2] : null;
  const hasMoreItems = links.length > 2;

  return (
    <div className="flex items-center gap-2 md:hidden">
      {hasMoreItems && (
        <>
          <Link
            to="/"
            className="hover:text-gray-900 transition-colors flex items-center">
            <FaHome className="w-4 h-4" />
          </Link>
          <FaChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">...</span>
          <FaChevronRight className="w-4 h-4 text-gray-400" />
        </>
      )}
      {secondLastItem && (
        <>
          {secondLastItem.noteId ? (
            <Link
              to={`/notes/${secondLastItem.noteId}`}
              className="hover:text-gray-900 transition-colors truncate max-w-[120px]">
              {truncateCrumb(secondLastItem.name)}
            </Link>
          ) : (
            <Link
              to={`/?folder=${encodeURIComponent(secondLastItem.path)}`}
              className="hover:text-gray-900 transition-colors truncate max-w-[120px]">
              {truncateCrumb(secondLastItem.name)}
            </Link>
          )}
          <FaChevronRight className="w-4 h-4 text-gray-400" />
        </>
      )}
      <span className="text-gray-900 font-medium truncate max-w-[150px]">
        {truncateCrumb(lastItem.name)}
      </span>
    </div>
  );
}

function DesktopBreadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <div className="hidden md:flex items-center gap-2">
      {links.map((crumb, index) => (
        <span key={crumb.path} className="flex items-center gap-2">
          {index > 0 && <FaChevronRight className="w-4 h-4 text-gray-400" />}
          {index < links.length - 1 ? (
            crumb.noteId ? (
              <Link
                to={`/notes/${crumb.noteId}`}
                className="hover:text-gray-900 transition-colors">
                {truncateCrumb(crumb.name)}
              </Link>
            ) : (
              <Link
                to={`/?folder=${encodeURIComponent(crumb.path)}`}
                className="hover:text-gray-900 transition-colors">
                {truncateCrumb(crumb.name)}
              </Link>
            )
          ) : (
            <span className="text-gray-900 font-medium">
              {truncateCrumb(crumb.name)}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
