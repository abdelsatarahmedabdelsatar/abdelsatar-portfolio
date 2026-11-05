"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FilterGroup } from "@/components/shared/filter-group";
import { SpotlightCard } from "@/components/shared/spotlight-card";
import { Badge } from "@/components/ui/badge";
import type { SkillGroup } from "@/types/content";

type SkillFilter = "core" | "all";

const filterOptions: { value: SkillFilter; label: string }[] = [
  { value: "all", label: "All skills" },
  { value: "core", label: "Core focus" },
];

export function SkillGrid({ groups }: { groups: SkillGroup[] }) {
  const [filter, setFilter] = useState<SkillFilter>("all");
  const visible = groups.filter((group) => filter === "all" || group.featured);

  return (
    <>
      <FilterGroup
        label="Filter skills"
        options={filterOptions}
        selected={filter}
        onSelect={setFilter}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((group) => (
            <motion.div
              key={group.id}
              layout
              className="min-w-0"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <SpotlightCard className="p-6">
                <h3 className="relative font-semibold">{group.title}</h3>
                <ul className="relative mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Badge className="hover:border-accent hover:text-accent">{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
