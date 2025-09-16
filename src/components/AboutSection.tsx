/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion, Variants } from "framer-motion";
import { Briefcase, Code, User, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "@/lib/client";

// Parent container with stagger effect
const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// Fade-up animation for text
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Card animation with spring effect
const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
    },
  },
};

export const AboutSection = () => {
  const [about, setAbout] = useState<any[]>([]);

  useEffect(() => {
    const fetchAbout = async () => {
      const data = await client.fetch(
        `*[_type == 'about']{
          title,
          description1,
          description2
        }`
      );
      setAbout(data);
    };
    fetchAbout();
  }, []);

  return (
    <section id="about" className="py-24 px-4 relative">
      <motion.div
        className="container mx-auto max-w-5xl"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Section Heading */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          About <span className="text-primary">Me</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={container}
            className="space-y-6 text-center md:text-left"
          >
            {about.length > 0 ? (
              <>
                <motion.h3 variants={fadeUp} className="text-2xl font-semibold">
                  {about[0].title}
                </motion.h3>

                <motion.p variants={fadeUp} className="text-muted-foreground">
                  {about[0].description1}
                </motion.p>

                <motion.p variants={fadeUp} className="text-muted-foreground">
                  {about[0].description2}
                </motion.p>
              </>
            ) : (
              <p className="text-muted-foreground">Loading...</p>
            )}

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start"
            >
              <a href="#contact" className="cosmic-button">
                Get In Touch
              </a>
              <a
                href="/cv.pdf"
                download
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Right Feature Cards */}
          <motion.div variants={container} className="grid grid-cols-1 gap-6">
            {[
              {
                Icon: Code,
                title: "Web Development",
                desc: "Building fast, scalable, and modern web applications tailored to client needs.",
              },
              {
                Icon: User,
                title: "UI/UX Design",
                desc: "Crafting clean, user-friendly interfaces that deliver seamless digital experiences.",
              },
              {
                Icon: Bot,
                title: "AI & Chatbot Solutions",
                desc: "Developing smart, conversational chatbots and AI-driven applications for businesses.",
              },
              {
                Icon: Briefcase,
                title: "Project Management",
                desc: "Managing projects with agile practices, ensuring timely delivery and quality results.",
              },
            ].map(({ Icon, title, desc }, idx) => (
              <motion.article
                key={idx}
                variants={cardVariant}
                className="gradient-border p-6 card-hover flex items-start gap-4 
                rounded-2xl bg-background/10 backdrop-blur-md shadow-lg"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{title}</h4>
                  <p className="text-muted-foreground">{desc}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
