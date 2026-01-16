import { Link } from "react-router-dom";
import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    const isInternal = href.startsWith("/notes/");

    if (isInternal) {
      return (
        <Link to={href} className="text-gray-900 underline hover:text-gray-700">
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-900 underline hover:text-gray-700">
        {children}
      </a>
    );
  },

  p: ({ children }) => <p className="body-text mb-4">{children}</p>,

  h1: ({ children }) => (
    <h1 className="text-2xl font-bold text-black mt-6 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-bold text-black mt-5 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-bold text-black mt-4 mb-2">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-bold text-black mt-3 mb-2">{children}</h4>
  ),

  ul: ({ children }) => (
    <ul className="list-disc list-inside space-y-1 body-text ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside space-y-1 body-text ml-4">
      {children}
    </ol>
  ),

  code: ({ className, children, ...props }) => {
    const isInline = !className;
    return isInline ? (
      <code
        className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
        {...props}>
        {children}
      </code>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-gray-100 p-4 rounded overflow-x-auto my-4">
      {children}
    </pre>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic body-text my-4">
      {children}
    </blockquote>
  ),

  img: (props) => {
    const { src, alt, title, ...rest } = props;

    if (!src) {
      return null;
    }

    let imageSrc = src;
    if (imageSrc.startsWith("/images/")) {
      const filename = imageSrc.replace("/images/", "");
      imageSrc = `/images/${encodeURIComponent(filename)}`;
    } else if (!imageSrc.startsWith("http") && !imageSrc.startsWith("data:")) {
      imageSrc = encodeURI(src);
    }

    return (
      <img
        {...rest}
        src={imageSrc}
        alt={alt || ""}
        title={title}
        loading="lazy"
        decoding="async"
        className="max-w-full h-auto my-4 rounded"
        style={{
          maxWidth: "100%",
          height: "auto",
          imageRendering: "auto",
        }}
      />
    );
  },
};
