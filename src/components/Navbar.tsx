"use client";

import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  openNav: () => void;
}

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = ({ openNav }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // ✅ Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Active link highlight
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

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-sm" : "py-5"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <Link href="#hero" className="flex items-center space-x-1">
          <Image src="/Logo.png" alt="Abdul Tech" width={32} height={32} />
            {/* White Abdul Tech */}
            <span className="text-xl font-bold text-primary">Abdul Tech</span>

            {/* Gradient Portfolio */}
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-pink-500 to-orange-400 bg-clip-text text-transparent">
            Portfolio
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-300",
                  activeSection === item.href.replace("#", "")
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {item.name}
              </Link>
            </motion.li>
          ))}

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <ThemeToggle />
          </motion.div>
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          onClick={openNav}
          aria-label="Open Menu"
          className="md:hidden p-2"
        >
          <Menu className="w-7 h-7 cursor-pointer text-primary" />
        </motion.button>
      </div>
    </motion.nav>
  );
};
