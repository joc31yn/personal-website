"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/carousel/matcha.jpg",
  "/carousel/pingpong.jpg",
  "/carousel/kayak.jpg",
  "/carousel/half_marathon.jpg",
  "/carousel/ice.jpg",
  "/carousel/biking.jpg",
  "/carousel/minion.jpg",
  "/carousel/bear.jpg",
  "/carousel/whale.jpg",
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

  return (
    <div
      className="relative w-full flex items-center justify-center"
      role="region"
      aria-label="Image carousel showing Jocelyn's interests"
    >
      <div className="relative w-full h-44 flex items-center justify-center overflow-hidden">
        {visibleSlides.map(({ index, offset }) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              x: offset * 220,
              scale: offset === 0 ? 1.15 : 0.9,
              opacity: 1,
              zIndex: offset === 0 ? 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute"
          >
            <div
              className={`relative w-56 h-32 sm:w-60 sm:h-36 rounded-lg overflow-hidden`}
            >
              <Image
                src={images[index]}
                alt={`carousel-${index}`}
                fill
                className="object-cover"
                priority
              />
              {offset !== 0 && (
                <div className="absolute inset-0 bg-black/35 pointer-events-none" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute -left-5 xl:-left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 font-caveat font-semibold duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-5 xl:-right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 font-caveat font-semibold duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={2.5} />
      </button>
    </div>
  );
}
