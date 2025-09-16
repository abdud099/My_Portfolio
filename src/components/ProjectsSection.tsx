"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";
import { client } from "@/lib/client";

const categories = [
  "all",
  "fullstack",
  "backend",
  "chatbot",
  "graphic",
];

type ProjectDoc = {
  _id: string;
  id?: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  category?: string; // 👈 added
};

type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  category: string; // 👈 added
};

const getProjects = async (): Promise<Project[]> => {
  const data: ProjectDoc[] = await client.fetch(`
    *[_type == "project"]{
      _id,
      id,
      title,
      category,
      description,
      "image": image.asset->url,
      tags,
      liveUrl,
      githubUrl
    } | order(_createdAt desc)
  `);

  return data.map((p, i) => ({
    id: (p.id && String(p.id)) || p._id || String(i),
    title: p.title,
    description: p.description || "",
    image: p.image || "/projects/project1.png",
    tags: p.tags || [],
    demoUrl: p.liveUrl || "#",
    githubUrl: p.githubUrl || "#",
    category: p.category || "other", // 👈 fallback
  }));
};

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch from Sanity
  useEffect(() => {
    (async () => {
      try {
        const docs = await getProjects();
        setProjects(docs);
      } catch (e) {
        console.error("Failed to load projects:", e);
        setProjects([]);
      }
    })();
  }, []);

  // Featured projects
  const featured = useMemo(() => projects.slice(0, 3), [projects]);

  // Keen slider
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: featured.length > 1,
    renderMode: "performance",
    drag: true,
    slides: { perView: 1, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 16 } },
      "(min-width: 1024px)": { slides: { perView: 3, spacing: 20 } },
    },
    created(s) {
      const autoplay = () => {
        if (!document.hidden) s.next();
      };
      const id = setInterval(autoplay, 3000);
      // @ts-expect-error custom field
      s._auto = id;
    },
    destroyed(s) {
      // @ts-expect-error custom field
      if (s._auto) clearInterval(s._auto);
    },
  });

  // Update slider when featured changes
  useEffect(() => {
    instanceRef.current?.update?.();
  }, [featured.length, instanceRef]);

  // Prevent body scroll on modal
  useEffect(() => {
    document.body.style.overflow = showAll ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAll]);

  // 🔍 + 🏷️ + 📂 Combined filter (search + tags + category)
  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return projects.filter(
      (p) =>
        (p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))) &&
        (selectedCategory === "all" ||
          p.category?.toLowerCase() === selectedCategory.toLowerCase())
    );
  }, [projects, searchQuery, selectedCategory]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          These are some of my recent projects, including front-end, back-end,
          AI, chatbot, and graphic design projects.
        </p>

        {/* Slider */}
        {featured.length > 0 ? (
          <div
            ref={sliderRef}
            className="keen-slider"
            key={`slider-${featured.length}`}
          >
            {featured.map((project) => (
              <article
                key={project.id}
                className="keen-slider__slide group relative rounded-2xl overflow-hidden 
                  bg-background/20 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    width={600}
                    height={400}
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={`${project.id}-${tag}`}
                        className="px-2 py-1 text-xs font-medium border border-primary/30 
                          rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {project.description}
                  </p>
                  <div className="flex items-center space-x-4">
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      className="text-foreground/70 hover:text-primary"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/70 hover:text-primary"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-muted/30 animate-pulse border border-border/50"
              />
            ))}
          </div>
        )}

        {/* See More Button */}
        <div className="text-end mt-8">
          <button
            onClick={() => setShowAll(true)}
            className="relative font-semibold text-foreground hover:text-primary after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            See More ...
          </button>
        </div>

        {/* Modal */}
        {showAll && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-background rounded-2xl p-6 max-w-7xl w-full h-full overflow-y-auto shadow-xl relative"
            >
              {/* Close */}
              <button
                onClick={() => setShowAll(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
              >
                <X size={32} />
              </button>

              <h3 className="text-3xl font-bold mb-6 text-center">
                All Projects
              </h3>

              {/* Search */}
              <div className="mb-6 flex justify-center">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full max-w-md px-4 py-2 rounded-lg border border-border bg-background/80 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* 🔥 Categories */}
              <div className="mb-6 flex flex-wrap justify-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all border 
                      ${
                        selectedCategory === cat
                          ? "bg-primary text-white border-primary shadow-md"
                          : "bg-background/60 text-muted-foreground border-border hover:bg-primary/10"
                      }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filtered.length > 0 ? (
                  filtered.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="rounded-xl border border-white/10 shadow-md bg-background/60 p-6 hover:shadow-lg transition"
                    >
                      <div className="group relative overflow-hidden rounded-lg">
                        <Image
                          width={600}
                          height={400}
                          src={project.image}
                          alt={project.title}
                          className="w-full h-56 rounded-lg transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <h4 className="text-xl font-semibold mt-3">
                        {project.title}
                      </h4>
                      <div className="flex flex-wrap gap-2 my-3">
                        {project.tags.map((tag) => (
                          <span
                            key={`${project.id}-${tag}`}
                            className="px-2 py-1 text-xs font-medium border border-primary/30 rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-base text-muted-foreground mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center space-x-4">
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          className="text-foreground/70 hover:text-primary"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          className="text-foreground/70 hover:text-primary"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground col-span-full">
                    No projects match “{searchQuery}”.
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};
