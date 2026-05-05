import { type Experience, experiences } from "@/config/Experience";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { ExperienceCard } from "../experience/ExperienceCard";

export default function Experience() {
  return (
    <Container className="mt-16">
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-6 flex flex-col gap-8">
        {experiences.slice(0, 2).map((experience: Experience) => (
          <ExperienceCard key={experience.company} experience={experience} />
        ))}
      </div>
    </Container>
  );
}
