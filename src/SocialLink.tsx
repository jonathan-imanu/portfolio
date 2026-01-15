import type { ReactNode } from "react";

function SocialLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-md shadow-sm bg-white hover:shadow-md transition-shadow text-gray-600 hover:text-gray-900">
      {children}
    </a>
  );
}

export default SocialLink;
