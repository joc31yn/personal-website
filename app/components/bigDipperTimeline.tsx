import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ExperienceModal from "./experienceModal";

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
  [0, 3],
  // might delete as makes timeline confusing but essential for big dipper constellation
];

const validate = (n: number) => Math.max(0, Math.min(100, n));

export default function BigDipperTimeline({
  items,
  title = "Experience Constellation",
  subtitle = "The Big Dipper as a timeline",
  direction = "ltr",
}: BigDipperTimelineProps) {
  const [active, setActive] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [starHover, setStarHover] = useState(false);

  const points = useMemo(() => {
    if (direction === "rtl") {
      return DIPPER_POINTS.map((p) => ({ x: 100 - p.x, y: p.y }));
    }
    return DIPPER_POINTS;
  }, [direction]);

  if (!items || items.length < 1) {
    return null;
  }

  const main = items.slice(0, 7);

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
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(20,28,48,1),#05070f)] shadow-[0_0_60px_rgba(60,120,255,0.15)_inset]">
        <TwinkleField count={200} />

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {SEGMENTS.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={`${validate(points[a].x)}%`}
              y1={`${validate(points[a].y)}%`}
              x2={`${validate(points[b].x)}%`}
              y2={`${validate(points[b].y)}%`}
              stroke="white"
              strokeWidth={1}
              initial={{ opacity: 0.2 }}
              animate={{ opacity: active === a || active === b ? 0.85 : 0.2 }}
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
            onHover={(v) => {
              setActive(v ? idx : null);
              setStarHover(v ? true : false);
            }}
            isActive={active === idx}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 opacity-80 w-full">
        {main.toReversed().map((item, i) => {
          const reversedIndex = main.length - i - 1;
          return (
            <motion.div
              key={item.id ?? reversedIndex}
              className={`flex flex-col gap-2 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-colors ${
                active === reversedIndex && !starHover
                  ? "border-white/30 bg-white/15"
                  : ""
              }`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reversedIndex * 0.04 }}
              onMouseEnter={() => setActive(reversedIndex)}
              onMouseLeave={() => setActive(null)}
            >
              <div className="text-sm text-white/70">{item.date}</div>
              <div className="font-medium">{item.title}</div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {openId && (
          <ExperienceModal onClose={() => setOpenId(null)}>
            {(() => {
              const found =
                main.find((x) => (x.id ?? "") === openId) ||
                main.find((_, i) => String(i) === openId) ||
                main[0];
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
          </ExperienceModal>
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
  isActive: boolean;
}

function StarButton({
  x,
  y,
  item,
  label,
  onOpen,
  onHover,
  small = false,
  isActive = false,
}: StarButtonProps) {
  const size = small ? "text-xl md:text-2xl" : "text-2xl md:text-3xl";

  return (
    <>
      <motion.button
        aria-label={label}
        className={`group absolute select-none ${size} leading-none text-white -translate-x-1/2 -translate-y-1/2`}
        style={{
          left: `${validate(x) - 1.5}%`,
          top: `${validate(y) - 2.7}%`,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: isActive ? 1.2 : 1, opacity: 1 }}
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
            filter: isActive
              ? [
                  "drop-shadow(0 0 6px rgba(255,255,255,1))",
                  "drop-shadow(0 0 12px rgba(255,255,255,1))",
                  "drop-shadow(0 0 6px rgba(255,255,255,1))",
                ]
              : [
                  "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
                  "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                  "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
                ],
          }}
          transition={{ duration: 1.75, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-6 h-6 md:w-9 md:h-9">
            <Image src="/star.png" alt="star" fill className="object-contain" />
          </div>
        </motion.span>

        <span
          className={`absolute inset-0 -z-10 scale-110 rounded-full blur-lg transition-all duration-300 ${
            isActive
              ? "opacity-75"
              : "opacity-0 group-hover:opacity-75 group-focus:opacity-75"
          }`}
          style={{ boxShadow: "0 0 15px 8px rgba(255,255,255,1)" }}
        />
      </motion.button>
      <span
        className={`absolute select-none leading-none text-white font-cinzel font-bold -translate-x-1/2 -translate-y-1/2 text-xs md:text-base text-center`}
        style={{
          left: `${validate(x) + (item.display_x ?? 0)}%`,
          top: `${validate(y) + (item.display_y ?? -5)}%`,
        }}
      >
        {item.displayTitle}
      </span>
    </>
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
        duration: Math.random() * 1.5 + 0.8,
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
          animate={{ scale: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
