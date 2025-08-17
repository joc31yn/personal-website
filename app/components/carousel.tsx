"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  "/carousel/temp.jpg",
  "/carousel/temp.jpg",
  "/carousel/temp.jpg",
  "/carousel/temp.jpg",
  "/carousel/temp.jpg",
];

export default function Carousel() {
  const [centerIndex, setCenterIndex] = useState(0);

  const nextSlide = () => {
    setCenterIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCenterIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Calculate indices for left, center, right
  const leftIndex = (centerIndex - 1 + images.length) % images.length;
  const rightIndex = (centerIndex + 1) % images.length;

  // Only render the 3 images
  const visibleSlides = [
    { index: leftIndex, offset: -1 },
    { index: centerIndex, offset: 0 },
    { index: rightIndex, offset: 1 },
  ];

  return (
    <div className="relative w-full flex items-center justify-center">
      <div className="relative w-full h-44 flex items-center justify-center">
        {visibleSlides.map(({ index, offset }) => (
          <motion.div
            key={index}
            initial={{ scale: 0.7, x: offset * 220, opacity: 0 }}
            animate={{
              scale: offset === 0 ? 1.2 : 0.9,
              x: offset * 220,
              opacity: 1,
              zIndex: offset === 0 ? 10 : 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="absolute"
          >
            <div className="relative w-60 h-36 rounded-lg overflow-hidden">
              <Image
                src={images[index]}
                alt={`carousel-${index}`}
                fill
                className="object-cover"
              />
              {/* Overlay for non-center slides */}
              {offset !== 0 && (
                <div className="absolute inset-0 bg-black/35 pointer-events-none"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute -left-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 text-4xl font-caveat font-semibold duration-200"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute -right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white hover:scale-125 text-4xl font-caveat font-semibold duration-200"
      >
        ›
      </button>
    </div>
  );
}
