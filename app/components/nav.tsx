"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ContactLogos from "./contactLogos";

export default function Nav() {
  const navItems = ["About", "Experience", "Projects", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev: boolean) => !prev);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  return (
    <>
      <div className="block md:hidden bg-white flex-row px-3 py-2 items-center justify-between relative z-10">
        <div className="md:hidden fixed top-0 left-0 w-full bg-white flex flex-row px-3 py-2 items-center justify-between z-20">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, "", "/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <Image
              src="logo.svg"
              className="w-10 h-10"
              alt="website logo"
              width={48}
              height={48}
            />
          </a>
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
              className="fixed inset-0 bg-white flex flex-col overflow-hidden"
              initial={{ clipPath: "circle(0% at 100% 0%)" }}
              animate={{ clipPath: "circle(150% at 100% 0%)" }}
              exit={{ clipPath: "circle(0% at 100% 0%)" }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1], // easeOutCubic
              }}
            >
              <div className="flex flex-col items-center justify-center gap-5 my-5 h-full">
                {navItems.map((e) => (
                  <div key={e} className="text-center p-3">
                    <a
                      className="text-2xl sm:text-3xl font-semibold font-caveat hover:text-waterlooYellow"
                      onClick={toggleMenu}
                      href={`#${e}`}
                    >
                      {e}
                    </a>
                  </div>
                ))}
              </div>
              <div className="flex flex-row gap-10 items-center justify-center mb-20">
                <ContactLogos
                  svgUrl="/linkedin.svg"
                  link="https://www.linkedin.com/in/jocelyn-xu-741106289/"
                  alt="linkedin"
                  usedInNav={true}
                />
                <ContactLogos
                  svgUrl="/github.svg"
                  link="https://github.com/joc31yn"
                  alt="github"
                  usedInNav={true}
                />
                <ContactLogos
                  svgUrl="/gmail.svg"
                  link="mailto:joce.xxt22@gmail.com"
                  alt="gmail"
                  usedInNav={true}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Desktop View */}
      <div className="hidden bg-white md:flex flex-row px-5 py-2 items-center justify-between fixed top-0 left-0 w-full z-20">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, "", "/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <Image
            src="logo.svg"
            className="w-12 lg:w-14 cursor-pointer"
            alt="website logo"
            width={48}
            height={48}
          />
        </a>
        <div className="flex flex-row gap-24 lg:gap-28">
          {navItems.map((e) => (
            <a
              key={e}
              className="md:text-xl lg:text-2xl hover:text-waterlooYellow font-medium duration-150 font-caveat"
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
