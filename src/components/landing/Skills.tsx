import { mySkills } from "@/config/About";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

export default function Skills() {
  return (
    <Container className="mt-16">
      <SectionHeading subHeading="My" heading="Skills" />
      <div className="mt-8 grid grid-cols-4 gap-6 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
        {mySkills.map((skill) => (
          <div
            key={skill.key}
            className="group flex flex-col items-center gap-2"
          >
            <div className="flex size-12 items-center justify-center rounded-xl border border-dashed border-gray-300 p-2.5 transition-all duration-300 group-hover:scale-110 group-hover:border-gray-500 dark:border-gray-700 dark:group-hover:border-gray-400">
              {skill}
            </div>
            <span className="text-muted-foreground text-xs font-semibold tracking-wide">
              {skill.key}
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
}
