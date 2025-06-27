// 'use client';

// import { useEffect, useRef } from 'react';

// type Point = { x: number; y: number };

// function lerp(a: number, b: number, t: number) {
//   return a + (b - a) * t;
// }

// function lerpPoint(p1: Point, p2: Point, t: number): Point {
//   return {
//     x: lerp(p1.x, p2.x, t),
//     y: lerp(p1.y, p2.y, t),
//   };
// }

// export default function Starfield() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     canvas.width = width;
//     canvas.height = height;

//     // ✨ Custom path (adjust these coordinates)
//     const guidePath: Point[] = [
//       { x: 100, y: 500 },
//       { x: 300, y: 400 },
//       { x: 500, y: 300 },
//       { x: 700, y: 600 },
//       { x: 1000, y: 350 },
//     ];

//     const drawGuideStar = (scrollY: number) => {
//       const totalScroll = document.body.scrollHeight - window.innerHeight;
//       const progress = scrollY / totalScroll;

//       // Which segment are we in?
//       const totalSegments = guidePath.length - 1;
//       const segment = Math.floor(progress * totalSegments);
//       const t = (progress * totalSegments) % 1;

//       const p1 = guidePath[segment];
//       const p2 = guidePath[segment + 1] || p1;

//       const pos = lerpPoint(p1, p2, t);

//       // Draw the glowing guide star
//       ctx.shadowBlur = 12;
//       ctx.shadowColor = 'white';
//       ctx.fillStyle = 'white';
//       ctx.beginPath();
//       ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2);
//       ctx.fill();
//       ctx.shadowBlur = 0;
//     };

//     const draw = (scrollY: number) => {
//       ctx.clearRect(0, 0, width, height);
//       drawGuideStar(scrollY);
//     };

//     const onScroll = () => {
//       draw(window.scrollY);
//     };

//     const onResize = () => {
//       width = window.innerWidth;
//       height = window.innerHeight;
//       canvas.width = width;
//       canvas.height = height;
//     };

//     window.addEventListener('scroll', onScroll);
//     window.addEventListener('resize', onResize);
//     draw(window.scrollY);

//     return () => {
//       window.removeEventListener('scroll', onScroll);
//       window.removeEventListener('resize', onResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

export default function Star() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const starCount = 225;
    const stars: {
      x: number;
      y: number;
      z: number;
      size: number;
    }[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.25,
      });
    }

    const draw = (scrollY: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";

      for (const star of stars) {
        let z = star.z + scrollY * 0.5;
        if (z > width) z -= width;

        const sx = ((star.x / z) * width) / 2 + width / 2;
        const sy = ((star.y / z) * height) / 2 + height / 2;

        if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
          const starSize = Math.max(0.5, (1 - z / width) * star.size * 2);

          // Randomly decide if the star glows
          const shouldGlow = star.size > 0;

          if (shouldGlow) {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "white";
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.beginPath();
          ctx.shadowColor = "white";
          ctx.fillStyle = "white";
          ctx.arc(sx, sy, starSize, 0, 2 * Math.PI);
          ctx.fill();
        }
      }

      // Reset shadow after drawing
      ctx.shadowBlur = 0;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      draw(scrollY);
    };

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      draw(window.scrollY || 0);
    };

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    draw(0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
}
