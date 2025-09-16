"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-card/70 backdrop-blur-xs border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm text-muted-foreground text-center md:text-left"
        >
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-foreground">Abdul Tech.co</span>. All
          rights reserved.
        </motion.p>

        {/* Back to top button */}
        <motion.a
          href="#hero"
          aria-label="Back to top"
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-3 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors shadow-sm"
        >
          <ArrowUp size={20} />
        </motion.a>
      </div>
    </footer>
  );
};
