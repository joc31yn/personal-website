"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/carousel/matcha.jpg", caption: "matchaaa", width: 448, height: 336 },
  {
    src: "/carousel/pingpong.jpg",
    caption: "ping pong :D",
    width: 512,
    height: 288,
  },
  { src: "/carousel/kayak.jpg", caption: "kayak", width: 448, height: 336 },
  {
    src: "/carousel/half_marathon.jpg",
    caption: "half marathon!",
    width: 448,
    height: 336,
  },
  { src: "/carousel/ice.jpg", caption: "yum", width: 448, height: 336 },
  {
    src: "/carousel/biking.jpg",
    caption: "bike rides",
    width: 448,
    height: 336,
  },
  { src: "/carousel/minion.jpg", caption: "minion", width: 448, height: 336 },
  { src: "/carousel/bear.jpg", caption: "ice bear", width: 448, height: 336 },
  { src: "/carousel/whale.jpg", caption: "wally", width: 448, height: 397 },
];

export default function Carousel() {
  const [centerIndex, setCenterIndex] = useState(0);

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const leftIndex = (centerIndex - 1 + images.length) % images.length;
  const rightIndex = (centerIndex + 1) % images.length;

  const visibleSlides = [
    { index: leftIndex, offset: -1 },
    { index: centerIndex, offset: 0 },
    { index: rightIndex, offset: 1 },
  ];

  // Generate fairy light positions
  const fairyLights = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${5.5 + i * 8}%`,
    delay: i * 0.3,
  }));

  return (
    <div
      className="relative w-full flex items-center justify-center pt-3"
      role="region"
      aria-label="Image carousel showing Jocelyn's interests"
    >
      {/* Photos */}
      <div className="w-full h-full overflow-hidden">
        {/* Fairy Lights String */}
        <div className="w-full h-6">
          <div className="relative">
            <div className="w-full absolute top-2 sm:top-1.5 h-px bg-gradient-to-r from-gray-100/10 via-gray-300/60 to-gray-100/10 transform -translate-y-1/2" />
            {/* light bulbs */}
            {fairyLights.map((light) => (
              <motion.div
                key={light.id}
                className="absolute top-2 sm:top-1.5 transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: light.left }}
                initial={{ opacity: 0.6 }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: light.delay,
                  ease: "easeInOut",
                }}
              >
                <div className="w-2 h-2 bg-yellow-300 rounded-full shadow-lg relative z-10">
                  <div className="absolute inset-0 bg-yellow-200 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-100 rounded-full blur-sm opacity-70" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative w-full min-h-52 flex items-center justify-center">
          {visibleSlides.map(({ index, offset }) => (
            <motion.div
              key={index}
              initial={false}
              animate={{
                x: offset * 220,
                scale: offset === 0 ? 1.1 : 0.85,
                opacity: 1,
                zIndex: offset === 0 ? 10 : 0,
                rotate: offset === -1 ? -2 : offset === 1 ? 2 : 0,
              }}
              className="absolute"
            >
              {/* Hanging clip */}
              <div className="absolute -top-7 sm:-top-5 left-1/2 transform -translate-x-1/2 z-20">
                <div className="relative h-8 w-2">
                  <Image
                    src="/pin.png"
                    alt="clothing pin"
                    fill
                    sizes="8px"
                    quality={75}
                    loading={offset === 0 ? "eager" : "lazy"}
                  />
                </div>
              </div>

              {/* Polaroid photos */}
              <div className="relative bg-white p-2 pb-3 shadow-lg transform">
                <div className="relative w-52 h-32 sm:w-56 sm:h-36 overflow-hidden">
                  <Image
                    src={images[index].src}
                    alt={images[index].caption}
                    fill
                    sizes="(max-width: 640px) 208px, 224px"
                    quality={offset === 0 ? 75 : 60}
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-cover"
                  />
                  {offset !== 0 && (
                    <div className="absolute inset-0 bg-black/25 pointer-events-none" />
                  )}
                </div>
                <div className="bg-white flex items-center justify-center mt-1">
                  <p className="text-black text-lg font-caveat text-center tracking-wide">
                    {images[index].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute -left-5 xl:-left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 font-caveat font-semibold duration-200 z-30"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-5 xl:-right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 font-caveat font-semibold duration-200 z-30"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
      </button>

      {/* Fairy light dot pagination */}
      <div className="absolute -bottom-5 md:-bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCenterIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === centerIndex
                ? "bg-yellow-300 shadow-lg shadow-yellow-300/50 scale-110 w-6"
                : "bg-yellow-200/50 hover:bg-yellow-200/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === centerIndex && (
              <motion.div
                className="w-full h-full bg-yellow-200 rounded-full blur-sm absolute inset-0"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
