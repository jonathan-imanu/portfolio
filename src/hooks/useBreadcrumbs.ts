import { useState, useEffect } from "react";
import { getBreadcrumbs, getNotesIndex } from "../utils/notes";

interface BreadcrumbLink {
  name: string;
  path: string;
  noteId?: string;
}

export function useBreadcrumbs(notePath: string | undefined) {
  const [breadcrumbLinks, setBreadcrumbLinks] = useState<BreadcrumbLink[]>([]);

  useEffect(() => {
    if (!notePath) {
      setBreadcrumbLinks([]);
      return;
    }

    const breadcrumbs = getBreadcrumbs(notePath);
    setBreadcrumbLinks(breadcrumbs.map((crumb) => ({ ...crumb })));

    getNotesIndex().then((notesIndex) => {
      const links = breadcrumbs.map((crumb) => {
        const noteEntry = Object.values(notesIndex.notes).find(
          (n) => n.path === crumb.path
        );
        return {
          ...crumb,
          noteId: noteEntry?.id,
        };
      });
      setBreadcrumbLinks(links);
    });
  }, [notePath]);

  return breadcrumbLinks;
}
