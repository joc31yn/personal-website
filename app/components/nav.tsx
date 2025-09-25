"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import ContactLogos from "./contactLogos";
import { SiGithub } from "react-icons/si";
import { SlSocialLinkedin } from "react-icons/sl";
import { BiLogoGmail } from "react-icons/bi";
import Link from "next/link";

export default function Nav() {
  const navItems = ["About", "Experience", "Projects", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  // Hide nav on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 15) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Mobile Navbar */}
      <motion.div
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.35 }}
        className="block md:hidden bg-white flex-row px-3 py-2 items-center justify-between fixed top-0 left-0 w-full z-20"
      >
        <div className="flex flex-row items-center justify-between">
          <Link
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
          </Link>
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X className="w-6 h-6 sm:w-8 sm:h-8" />
            ) : (
              <Menu className="w-6 h-6 sm:w-8 sm:h-8" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-white flex flex-col overflow-hidden z-10"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1], // easeOutCubic
            }}
          >
            <div className="flex flex-col items-center justify-center gap-5 my-5 h-full overflow-y-auto">
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
            <div className="flex flex-row gap-10 items-center justify-center mb-10">
              <ContactLogos link="https://www.linkedin.com/in/jocelyn-xu-741106289/">
                <SlSocialLinkedin className="text-black w-8 h-8" />
              </ContactLogos>
              <ContactLogos link="https://github.com/joc31yn">
                <SiGithub className="text-black w-8 h-8" />
              </ContactLogos>
              <ContactLogos link="mailto:joce.xxt22@gmail.com">
                <BiLogoGmail className="text-black w-8 h-8" />
              </ContactLogos>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navbar */}
      <motion.div
        animate={{ y: showNav ? 0 : -100 }}
        transition={{ duration: 0.35 }}
        className="hidden bg-white md:flex flex-row px-5 py-2 items-center justify-between fixed top-0 left-0 w-full z-20"
      >
        <Link
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
        </Link>
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
      </motion.div>
    </>
  );
}
