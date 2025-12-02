import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ExperienceModal from "./experienceModal";
import { useIsMobile } from "@/hooks/mobile";
import { IoPlanetOutline } from "react-icons/io5";

export interface TimelineItem {
  id?: string;
  title: string;
  displayTitle: string;
  display_x?: number;
  display_y?: number;
  date: string;
  summary: string[];
}

interface BigDipperTimelineProps {
  items?: TimelineItem[];
}

interface Point {
  x: number;
  y: number;
}

const DIPPER_POINTS: Point[] = [
  { x: 88, y: 45 },
  { x: 87, y: 75 },
  { x: 63, y: 80 },
  { x: 58, y: 55 },
  { x: 40, y: 45 },
  { x: 26, y: 36 },
  { x: 5, y: 50 },
];

const DIPPER_MOBILE_POINTS: Point[] = [
  { x: 45, y: 8 },
  { x: 80, y: 18 },
  { x: 70, y: 45 },
  { x: 50, y: 50 },
  { x: 33, y: 52 },
  { x: 95, y: 85 },
  { x: 10, y: 92 },
];

const SEGMENTS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
];

const MOBILE_SEGMENTS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [4, 6],
];

const validate = (n: number) => Math.max(0, Math.min(100, n));

export default function BigDipperTimeline({ items }: BigDipperTimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [starHover, setStarHover] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile("(max-width: 767px)");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsInView(true);
            const timer = setTimeout(() => setHasAnimated(true), 200);
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.2 },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [mounted, hasAnimated]);

  useEffect(() => {
    if (openId) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [openId]);

  const points = isMobile ? DIPPER_MOBILE_POINTS : DIPPER_POINTS;
  const segments = isMobile ? MOBILE_SEGMENTS : SEGMENTS;

  if (!items || items.length < 1 || !mounted) {
    return null;
  }

  const main = items.slice(0, 7);

  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center">
      <div
        ref={containerRef}
        className={`${
          isMobile ? "min-h-screen max-w-md" : "aspect-[16/9]"
        } relative w-full rounded-xl bg-[radial-gradient(ellipse_at_top,rgba(20,28,48,1),#05070f)] shadow-[0_0_60px_rgba(60,120,255,0.15)_inset] overflow-hidden`}
      >
        <TwinkleField count={isMobile ? 125 : 200} />
        <a
          href="/Jocelyn_Xu_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center group"
          aria-label="resume"
        >
          <div className="absolute top-[17%] left-[5%] md:left-auto md:top-[5%] md:right-[7%] flex flex-col items-center justify-center group-hover:scale-110 duration-200">
            {/* Mobile */}
            <p
              className="text-amber-100 font-light tracking-wider text-xs py-2 block sm:hidden"
              style={{
                filter: "drop-shadow(0 0 4px rgba(251,191,36,0.5))",
              }}
            >
              My red giant :)
            </p>

            {/* Desktop */}
            <p
              className="text-amber-100 font-light tracking-wider text-xs py-2 hidden sm:block"
              style={{
                filter: "drop-shadow(0 0 4px rgba(251,191,36,0.5))",
              }}
            >
              My north star :)
            </p>
            <div className="relative">
              <div
                className="absolute inset-0 bg-amber-400 rounded-full blur-2xl opacity-25 animate-pulse"
                style={{ animationDuration: "4s" }}
              ></div>
              <div className="absolute inset-0 bg-yellow-200 rounded-full blur-lg opacity-30"></div>
              <IoPlanetOutline
                className="relative w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 text-amber-100"
                style={{
                  filter:
                    "drop-shadow(0 0 6px rgba(251,191,36,0.6)) drop-shadow(0 0 12px rgba(245,158,11,0.4))",
                }}
              />
              <div
                className="absolute top-2 right-1 w-[1.5px] h-[1.5px] bg-yellow-200 rounded-full opacity-80 animate-ping"
                style={{ animationDuration: "2s", animationDelay: "0s" }}
              ></div>
              <div
                className="absolute bottom-3 left-0 w-1 h-1 bg-amber-300 rounded-full opacity-70 animate-ping"
                style={{ animationDuration: "2s", animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 right-0 w-[2.5px] h-[2.5px] bg-yellow-100 rounded-full opacity-60 animate-ping"
                style={{ animationDuration: "2s", animationDelay: "1.5s" }}
              ></div>
              <div
                className="absolute top-0 left-1/3 w-[1.5px] h-[1.5px] bg-yellow-100 rounded-full opacity-60 animate-ping"
                style={{ animationDuration: "2s", animationDelay: "2.5s" }}
              ></div>

              <div
                className="absolute inset-0 w-16 h-16 md:w-20 md:h-20 xl:w-10 xl:h-10 rounded-full opacity-0 animate-pulse"
                style={{
                  background:
                    "linear-gradient(45deg, transparent 30%, rgba(251,191,36,0.15) 50%, transparent 70%)",
                  animationDuration: "6s",
                }}
              ></div>
            </div>
            <p
              className="text-amber-100 font-light tracking-wider"
              style={{
                filter: "drop-shadow(0 0 4px rgba(251,191,36,0.5))",
              }}
            >
              RESUME
            </p>
          </div>
        </a>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {segments.map(([a, b], i) => (
            <motion.line
              key={i}
              x1={`${validate(points[a].x)}%`}
              y1={`${validate(points[a].y)}%`}
              x2={`${validate(points[b].x)}%`}
              y2={`${validate(points[b].y)}%`}
              stroke="white"
              strokeWidth={1}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{
                opacity: active === a || active === b ? 0.7 : 0.2,
                pathLength: isInView && hasAnimated ? 1 : 0,
              }}
              transition={{
                opacity: {
                  duration: 0.25,
                  ease: "easeInOut",
                },
                pathLength: {
                  duration: 0.3,
                  delay: i * 0.3,
                  ease: "linear",
                },
              }}
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
            animationDelay={idx * 0.26}
            hasAnimated={hasAnimated}
            isInView={isInView}
          />
        ))}
      </div>

      {!isMobile && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 opacity-80 w-full">
          {main.toReversed().map((item, i) => {
            const reversedIndex = main.length - i - 1;
            return (
              <div
                key={item.id ?? reversedIndex}
                className={`flex flex-col gap-2 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-colors ${
                  active === reversedIndex && !starHover
                    ? "border-white/30 bg-white/15"
                    : ""
                }`}
                onMouseEnter={() => setActive(reversedIndex)}
                onMouseLeave={() => setActive(null)}
              >
                <div className="text-sm text-white/70">{item.date}</div>
                <div className="font-medium">{item.title}</div>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {openId && (
          <ExperienceModal
            item={
              main.find((x) => (x.id ?? "") === openId) ||
              main.find((_, i) => String(i) === openId) ||
              main[0]
            }
            onClose={() => setOpenId(null)}
          />
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
  animationDelay?: number;
  hasAnimated?: boolean;
  isInView?: boolean;
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
  animationDelay = 0,
  hasAnimated = false,
  isInView = false,
}: StarButtonProps) {
  const size = small ? "text-xl md:text-2xl" : "text-2xl md:text-3xl";
  const [showInitialGlow, setShowInitialGlow] = useState(false);

  useEffect(() => {
    if (hasAnimated && isInView) {
      const timer = setTimeout(() => {
        setShowInitialGlow(true);
        const glowTimer = setTimeout(() => setShowInitialGlow(false), 500);
        return () => clearTimeout(glowTimer);
      }, animationDelay * 1000);
      return () => clearTimeout(timer);
    }
  }, [hasAnimated, animationDelay, isInView]);

  return (
    <>
      <motion.button
        aria-label={label}
        className={`z-10 group absolute select-none ${size} leading-none text-white !-translate-x-1/2 !-translate-y-1/2`}
        style={{
          left: `${validate(x)}%`,
          top: `${validate(y)}%`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isActive || showInitialGlow ? 1.2 : 1,
          opacity: isInView ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.6, delay: animationDelay, ease: "easeOut" },
        }}
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
            filter:
              isActive || showInitialGlow
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
          <div className="relative w-9 h-9">
            <Image
              src="/star.png"
              alt="star"
              fill
              className="object-contain"
              sizes="36px"
            />
          </div>
        </motion.span>

        <span
          className={`absolute inset-0 -z-10 scale-110 rounded-full blur-lg transition-all duration-300 ${
            isActive || showInitialGlow
              ? "opacity-75"
              : "opacity-0 group-hover:opacity-75 group-focus:opacity-75"
          }`}
          style={{ boxShadow: "0 0 15px 8px rgba(255,255,255,1)" }}
        />
      </motion.button>
      <span
        className={`absolute select-none !leading-tight text-white font-cinzel font-bold -translate-x-1/2 -translate-y-1/2 text-sm lg:text-base text-center max-w-16 md:max-w-24 xl:max-w-none`}
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
  const isMobile = useIsMobile("(max-width: 767px)");
  useEffect(() => {
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * (isMobile ? 0.12 : 0.18) + 0.05,
        delay: Math.random() * 2,
        duration: Math.random() * 1.5 + 0.8,
      })),
    );
  }, [count, isMobile]);

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
