"use client";

import { projects } from "@/config/Projects";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";
import { ProjectList } from "../projects/ProjectList";

export default function Projects() {
  return (
    <Container id="projects" className="row-rule row-rule-wide mt-16 scroll-mt-8 pb-16">
      <SectionHeading subHeading="Featured" heading="Projects" />
      <ProjectList className="mt-8" projects={projects.slice(0, 4)} />
    </Container>
  );
}
