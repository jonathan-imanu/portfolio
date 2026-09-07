import * as HoverCard from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";

type LinkPreviewProps = {
  children: ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

const VIEWPORT_PAD = 12;
const ARROW_INSET = 18;
const GAP = 10;
const CARD_PAD = 4;

function getPreviewSrc(
  url: string,
  width: number,
  height: number,
  isStatic?: boolean,
  imageSrc?: string
) {
  if (isStatic && imageSrc) {
    return imageSrc;
  }

  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "light",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": String(width * 3),
    "viewport.height": String(height * 3),
  });

  return `https://api.microlink.io/?${params.toString()}`;
}

function getHoveredLineRect(event: PointerEvent<HTMLAnchorElement>): DOMRect {
  const rects = Array.from(event.currentTarget.getClientRects());
  const { clientX, clientY } = event;
  const hit = rects.find(
    (rect) =>
      clientX >= rect.left - 1 &&
      clientX <= rect.right + 1 &&
      clientY >= rect.top - 1 &&
      clientY <= rect.bottom + 1
  );

  return hit ?? rects[0] ?? event.currentTarget.getBoundingClientRect();
}

export function LinkPreview(props: LinkPreviewProps) {
  const {
    children,
    url,
    className = "",
    width = 220,
    height = 138,
  } = props;
  const src = getPreviewSrc(
    url,
    width,
    height,
    props.isStatic,
    props.isStatic ? props.imageSrc : undefined
  );

  const cardWidth = width + CARD_PAD * 2;
  const cardHeight = height + CARD_PAD * 2;

  const [isOpen, setOpen] = useState(false);
  const [overContent, setOverContent] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("top");
  const [bubbleTop, setBubbleTop] = useState(0);
  const contentLeaveTimer = useRef<number>(0);

  const visible = isOpen || overContent;

  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 280, damping: 32 });
  const trackingX = reduceMotion ? mouseX : smoothX;

  const bubbleLeft = useTransform(trackingX, (x) => {
    const raw = x - cardWidth / 2;
    const max = window.innerWidth - cardWidth - VIEWPORT_PAD;
    return Math.max(VIEWPORT_PAD, Math.min(raw, Math.max(VIEWPORT_PAD, max)));
  });

  const arrowLeft = useTransform([mouseX, bubbleLeft], ([x, left]) => {
    const offset = Number(x) - Number(left);
    return Math.max(ARROW_INSET, Math.min(offset, cardWidth - ARROW_INSET));
  });

  useEffect(() => {
    if (!shouldLoad) {
      return;
    }
    const img = new Image();
    img.src = src;
    img.onerror = () => setHasError(true);
  }, [shouldLoad, src]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(contentLeaveTimer.current);
  }, []);

  const updateAnchor = (event: PointerEvent<HTMLAnchorElement>) => {
    const line = getHoveredLineRect(event);
    mouseX.set(event.clientX);

    const above = line.top - GAP - cardHeight;
    if (above >= VIEWPORT_PAD) {
      setPlacement("top");
      setBubbleTop(above);
      return;
    }

    setPlacement("bottom");
    setBubbleTop(line.bottom + GAP);
  };

  const handleContentEnter = () => {
    window.clearTimeout(contentLeaveTimer.current);
    setOverContent(true);
  };

  const handleContentLeave = () => {
    window.clearTimeout(contentLeaveTimer.current);
    contentLeaveTimer.current = window.setTimeout(() => {
      setOverContent(false);
    }, 80);
  };

  const hostname = (() => {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  })();

  return (
    <HoverCard.Root
      open={visible}
      openDelay={100}
      closeDelay={160}
      onOpenChange={setOpen}>
      <HoverCard.Trigger asChild>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onPointerEnter={(event) => {
            setShouldLoad(true);
            updateAnchor(event);
          }}
          onPointerMove={updateAnchor}
          className={`inline [box-decoration-break:clone] ${className}`}>
          {children}
        </a>
      </HoverCard.Trigger>

      <HoverCard.Portal forceMount>
        <AnimatePresence>
          {visible && (
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: placement === "top" ? 10 : -10, scale: 0.92 }
              }
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 280,
                        damping: 24,
                      },
                    }
              }
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: placement === "top" ? 8 : -8, scale: 0.96 }
              }
              onPointerEnter={handleContentEnter}
              onPointerLeave={handleContentLeave}
              className="pointer-events-auto fixed z-50"
              style={{
                left: bubbleLeft,
                top: bubbleTop,
                width: cardWidth,
              }}>
              <div className="relative rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  style={{ fontSize: 0 }}>
                  {hasError ? (
                    <span className="block px-3 py-2 text-xs text-gray-600">
                      {hostname}
                    </span>
                  ) : (
                    <span
                      className="block overflow-hidden rounded-md bg-gray-100"
                      style={{ width, height }}>
                      {shouldLoad && (
                        <img
                          src={src}
                          width={width}
                          height={height}
                          alt={`Preview of ${hostname}`}
                          className="block h-full w-full object-cover"
                          onError={() => setHasError(true)}
                        />
                      )}
                    </span>
                  )}
                </a>
                <motion.span
                  aria-hidden
                  className={`absolute h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-gray-200 bg-white ${
                    placement === "top"
                      ? "top-full -translate-y-1/2 border-r border-b"
                      : "top-0 -translate-y-1/2 border-l border-t"
                  }`}
                  style={{ left: arrowLeft }}
                />
              </div>
              <div
                aria-hidden
                className={`absolute right-0 left-0 h-3 ${
                  placement === "top" ? "top-full" : "bottom-full"
                }`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
