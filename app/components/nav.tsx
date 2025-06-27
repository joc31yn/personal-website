"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from 'next/image';

export default function Nav() {
  const navItems = ["About", "Experience", "Projects", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev: boolean) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0); // smooth behaviour defined in globals.css
  };
  return (
    <>
      <div className="block md:hidden bg-white flex-row px-3 py-2 items-center justify-between relative z-10">
        <div className="flex justify-between items-center">
          <Image
            src="logo.svg"
            className="w-10 h-10"
            alt="website logo"
            width={48}
            height={48}
            onClick={scrollToTop}
          />
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        </div>
        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="absolute top-full left-0 w-full bg-white flex flex-col z-10 overflow-hidden"
              custom={menuOpen}
              variants={{
                open: {
                  height: "auto",
                  transition: {
                    type: "spring",
                    stiffness: 115,
                    damping: 12,
                  },
                },
                closed: {
                  height: 0,
                  transition: {
                    ease: "easeInOut",
                    duration: 0.3,
                  },
                },
              }}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col items-center justify-center gap-3 my-5">
                {navItems.map((e) => (
                  <div key={e} className="text-center p-3">
                    <a
                      className="sm:text-lg font-semibold"
                      onClick={toggleMenu}
                      href={`#${e}`}
                    >
                      {e}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop View */}
      <div className="hidden bg-white md:flex flex-row px-5 py-2 items-center justify-between z-10">
        <Image
          src="logo.svg"
          className="w-12 lg:w-14 cursor-pointer"
          alt="website logo"
          width={48}
          height={48}
          onClick={scrollToTop}
        />
        <div className="flex flex-row gap-24 lg:gap-28">
          {navItems.map((e) => (
            <a
              key={e}
              className="font-semibold md:text-base lg:text-lg hover:text-[#fcba03] duration-150"
              href={`#${e}`}
            >
              {e}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
