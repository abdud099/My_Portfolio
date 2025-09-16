"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8"
    >
      {/* Hero Content */}
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-8">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight"
          >
            <span className="block">Hi, I&apos;m</span>
            <span className="text-primary inline-block">Abdul</span>
            <span className="ml-2 inline-block bg-gradient-to-r from-primary via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Basit
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            I create outstanding web experiences using modern technologies.
            Along with front-end development, I also work on chatbot solutions
            and AI-based applications, ensuring that interfaces are not only
            visually appealing but also intelligent and highly functional.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="pt-6"
          >
            <a
              href="#projects"
              className="cosmic-button px-6 py-3 text-xs md:text-sm rounded-full shadow-lg hover:scale-105 transition-transform"
            >
              🚀 View My Work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-sm text-muted-foreground mb-1">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown className="h-6 w-6 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};
