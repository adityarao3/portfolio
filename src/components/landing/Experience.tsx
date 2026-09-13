import { type Experience, experiences } from "@/config/Experience";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { ExperienceCard } from "../experience/ExperienceCard";

export default function Experience() {
  return (
    <Container id="experience" className="row-rule row-rule-wide mt-10 scroll-mt-8 pb-10">
      <SectionHeading subHeading="Featured" heading="Experience" />
      <div className="mt-4 flex flex-col">
        {experiences.slice(0, 2).map((experience: Experience) => (
          <ExperienceCard key={experience.company} experience={experience} />
        ))}
      </div>
    </Container>
  );
}
