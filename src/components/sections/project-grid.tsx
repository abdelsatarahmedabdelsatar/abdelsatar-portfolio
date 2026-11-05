"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FilterGroup } from "@/components/shared/filter-group";
import { ProjectCard } from "@/components/sections/project-card";
import type { Project, ProjectType } from "@/types/content";

type ProjectFilter = "all" | ProjectType;

const filterOptions: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "professional", label: "Professional" },
  { value: "personal", label: "Personal" },
];

export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const visible = projects.filter((project) => filter === "all" || project.type === filter);

  return (
    <>
      <FilterGroup
        label="Filter projects"
        options={filterOptions}
        selected={filter}
        onSelect={setFilter}
      />
      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="min-w-0 md:last:odd:col-span-2"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
