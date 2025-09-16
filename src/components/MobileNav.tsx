"use client";

import { X, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  nav: boolean;
  closeNav: () => void;
}

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const MobileNav = ({ nav, closeNav }: Props) => {
  const navAnimation = nav ? "translate-x-0" : "-translate-x-full";
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Track active section on scroll
  useEffect(() => {
    const handleActiveLink = () => {
      const sections = navItems.map(
        (item) => document.querySelector(item.href) as HTMLElement
      );
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        if (section) {
          if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
          ) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleActiveLink);
    return () => window.removeEventListener("scroll", handleActiveLink);
  }, []);

  // Theme initialization
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      if (storedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const backgroundClass = isDarkMode
    ? "bg-black/95 text-white"
    : "bg-white/95 text-black";

  return (
    <div
      className={cn(
        "fixed md:hidden transform transition-transform duration-300 top-0 left-0 right-0 bottom-0 z-[10000] backdrop-blur-md",
        navAnimation,
        backgroundClass
      )}
    >
      {/* Close Button */}
      <button
        onClick={closeNav}
        aria-label="Close Menu"
        className={cn(
          "absolute top-6 left-6 z-20",
          isDarkMode ? "text-white" : "text-black"
        )}
      >
        <X size={32} />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        className="absolute top-6 right-6 z-20 p-2 rounded-full bg-transparent focus:outline-none"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDarkMode ? (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sun className="h-6 w-6 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Moon className="h-6 w-6 text-gray-800" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* Nav Links */}
      <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={closeNav}
            className={cn(
              "uppercase text-2xl tracking-wide transition-colors",
              activeSection === item.href.replace("#", "")
                ? "text-primary font-bold"
                : isDarkMode
                  ? "text-white hover:text-primary"
                  : "text-black hover:text-primary"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
