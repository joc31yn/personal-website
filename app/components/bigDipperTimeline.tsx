import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface TimelineItem {
  id?: string;
  title: string;
  displayTitle: string;
  display_x?: number;
  display_y?: number;
  date: string;
  summary: string;
}

interface BigDipperTimelineProps {
  items?: TimelineItem[];
  title?: string;
  subtitle?: string;
  direction?: "ltr" | "rtl";
}

const DEFAULT_ITEMS: TimelineItem[] = [
  {
    id: "1",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
  {
    id: "2",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
  {
    id: "3",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
  {
    id: "4",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
  {
    id: "5",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
  {
    id: "6",
    title: "",
    displayTitle: "",
    date: "",
    summary: "",
  },
];

interface Point {
  x: number;
  y: number;
}

const DIPPER_POINTS: Point[] = [
  { x: 88, y: 40 },
  { x: 87, y: 70 },
  { x: 63, y: 75 },
  { x: 58, y: 50 },
  { x: 40, y: 40 },
  { x: 26, y: 31 },
  { x: 5, y: 45 },
];

const SEGMENTS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 3], // might delete as makes timeline confusing
];

const pct = (n: number) => Math.max(0, Math.min(100, n));

export default function BigDipperTimeline({
  items = DEFAULT_ITEMS,
  title = "Experience Constellation",
  subtitle = "The Big Dipper as a timeline",
  direction = "ltr",
}: BigDipperTimelineProps) {
  const [active, setActive] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const points = useMemo(() => {
    if (direction === "rtl") {
      return DIPPER_POINTS.map((p) => ({ x: 100 - p.x, y: p.y }));
    }
    return DIPPER_POINTS;
  }, [direction]);

  const main = items.slice(0, 7);
  //   const extras = items.slice(7);

  //   const satellites = useMemo(() => {
  //     if (extras.length === 0) return [] as (TimelineItem & { pos: Point })[];
  //     const pts = points.map((p) => [p.x, p.y] as [number, number]);
  //     const segs = SEGMENTS.map(
  //       ([a, b]) => [pts[a], pts[b]] as [[number, number], [number, number]]
  //     );
  //     const lengths = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]));
  //     const total = lengths.reduce((s, n) => s + n, 0);

  //     const atT = (t: number): Point => {
  //       let d = t * total;
  //       for (let i = 0; i < segs.length; i++) {
  //         const L = lengths[i];
  //         if (d <= L) {
  //           const [a, b] = segs[i];
  //           const r = d / L;
  //           return { x: a[0] + (b[0] - a[0]) * r, y: a[1] + (b[1] - a[1]) * r };
  //         }
  //         d -= L;
  //       }
  //       const [ax, ay] = segs[segs.length - 1][1];
  //       return { x: ax, y: ay };
  //     };

  //     return extras.map((item, i) => {
  //       const t = (i + 1) / (extras.length + 1);
  //       const p = atT(t);
  //       return { ...item, pos: p };
  //     });
  //   }, [extras, points]);

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <header className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground/80">
          {subtitle}
        </p>
      </header>
      {/* bg-[radial-gradient(ellipse_at_top,rgba(20,28,48,1),#05070f)] shadow-[0_0_60px_rgba(60,120,255,0.15)_inset] */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(20,28,48,1),#05070f)] shadow-[0_0_60px_rgba(60,120,255,0.15)_inset]">
        <TwinkleField count={90} />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {SEGMENTS.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={`${pct(points[a].x)}%`}
              y1={`${pct(points[a].y)}%`}
              x2={`${pct(points[b].x)}%`}
              y2={`${pct(points[b].y)}%`}
              stroke="white"
              strokeWidth={1}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: active === a || active === b ? 0.85 : 0.25 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.45))" }}
            />
          ))}
        </svg>

        {main.map((item, idx) => (
          <StarButton
            key={item.id ?? idx}
            item={item}
            x={points[idx].x}
            y={points[idx].y}
            label={`${item.title} · ${item.date}`}
            onOpen={() => setOpenId(item.id ?? String(idx))}
            onHover={(v) => setActive(v ? idx : null)}
          />
        ))}
        {/* {satellites.map((item, i) => (
          <StarButton
            key={`sat-${i}`}
            index={i + 100}
            x={item.pos.x}
            y={item.pos.y}
            small
            label={`${item.title} · ${item.date}`}
            onOpen={() => setOpenId(item.id ?? `sat-${i}`)}
            onHover={(v) => setActive(v ? i + 100 : null)}
          />
        ))} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 opacity-80 w-full">
        {items.map((it, i) => (
          <motion.div
            key={it.id ?? i}
            className="rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <div className="text-sm text-white/70">{it.date}</div>
            <div className="font-medium">{it.title}</div>
            <div className="text-white/60 text-sm mt-1">{it.summary}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {openId && (
          <Modal onClose={() => setOpenId(null)}>
            {(() => {
              const found =
                items.find((x) => (x.id ?? "") === openId) ||
                items.find((_, i) => String(i) === openId) ||
                items[0];
              return (
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{found.title}</h3>
                  <p className="text-white/70 text-sm">{found.date}</p>
                  <p className="leading-relaxed text-sm">
                    {found.summary ?? ""}
                  </p>
                </div>
              );
            })()}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

interface StarButtonProps {
  x: number;
  y: number;
  item: TimelineItem;
  label: string;
  onOpen: () => void;
  onHover: (v: boolean) => void;
  small?: boolean;
}

function StarButton({
  x,
  y,
  item,
  label,
  onOpen,
  onHover,
  small = false,
}: StarButtonProps) {
  const size = small ? "text-xl md:text-2xl" : "text-2xl md:text-3xl";

  return (
    <>
      <motion.button
        aria-label={label}
        className={`group absolute select-none ${size} leading-none text-white -translate-x-1/2 -translate-y-1/2`}
        style={{
          left: `${pct(x) - 1.4}%`,
          top: `${pct(y) - 2.5}%`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
        onClick={onOpen}
        onFocus={() => onHover(true)}
        onBlur={() => onHover(false)}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
      >
        <motion.span
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
          animate={{
            filter: [
              "drop-shadow(0 0 4px rgba(255,255,255,0.7))",
              "drop-shadow(0 0 8px rgba(255,255,255,0.9))",
              "drop-shadow(0 0 4px rgba(255,255,255,0.7))",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/star.png" className="w-6 h-6 md:w-9 md:h-9" alt="star" />
        </motion.span>

        <span
          className="absolute inset-0 -z-10 scale-110 rounded-full opacity-0 blur-lg transition-all duration-300 group-hover:opacity-70 group-focus:opacity-70"
          style={{ boxShadow: "0 0 40px 8px rgba(255,255,255,0.6)" }}
        />
      </motion.button>
      <span
        className={`absolute select-none leading-none text-white font-cinzel font-bold -translate-x-1/2 -translate-y-1/2 text-xs md:text-base text-center`}
        style={{
          left: `${pct(x) + (item.display_x ?? 0)}%`,
          top: `${pct(y) + (item.display_y ?? -5)}%`,
        }}
      >
        {item.displayTitle}
      </span>
    </>
  );
}

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(23,28,45,0.95),rgba(12,15,25,0.95))] p-5 shadow-2xl text-white"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/80 hover:text-white hover:bg-white/10"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
}

interface TwinkleFieldProps {
  count?: number;
}

interface StarProps {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
}

function TwinkleField({ count = 80 }: TwinkleFieldProps) {
  const [stars, setStars] = useState<StarProps[]>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 0.2 + 0.05,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
      }))
    );
  }, [count]);

  if (stars.length === 0) return null;

  return (
    <div aria-hidden>
      {stars.map((s) => (
        <motion.span
          key={s.id}
          className="absolute bg-white/70 rounded-full select-none"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}rem`,
            height: `${s.size}rem`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.3] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  );
}
