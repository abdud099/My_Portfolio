/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { client } from "@/lib/client";
import { motion } from "framer-motion";


const categories = [
  "all",
  "frontend",
  "backend",
  "chatbot",
  "graphic",
  "tools",
];

const getSkills = async () => {
  return await client.fetch(
    `*[_type == 'skill']{name, level, category, "icon": icon.asset->url}`
  );
};

export const SkillsSection = () => {
  const [skills, setSkills] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // ✅ Fetch skills from Sanity
  useEffect(() => {
    const fetchSkills = async () => {
      const data = await getSkills();
      setSkills(data);
    };
    fetchSkills();
  }, []);

  // ✅ Filtering
  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  const totalPages = Math.ceil(filteredSkills.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSkills = filteredSkills.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My <span className="text-primary"> Skills</span>
        </motion.h2>

        {/* Category Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {categories.map((category, key) => (
            <motion.button
              key={key}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-foreground hover:bg-secondary"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {currentSkills.map((skill, key) => (
            <motion.div
              key={key}
              className="bg-card/30 backdrop-blur-sm border border-border/20 p-6 rounded-xl shadow-md card-hover flex flex-col"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="flex items-center mb-4 justify-between">
                <h3 className="font-semibold text-lg">{skill.name}</h3>
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={100}
                  height={100}
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>

              {/* Progress Bar */}
              <motion.div
                className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="bg-primary h-2 rounded-full origin-left"
                  initial={{ width: 0 }}
                  animate={{ width: skill.level + "%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>

              <div className="text-right mt-2">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-3 mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded bg-secondary/70 hover:bg-secondary disabled:opacity-40"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "px-3 py-1 rounded",
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 hover:bg-secondary"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {i + 1}
              </motion.button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded bg-secondary/70 hover:bg-secondary disabled:opacity-40"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
