import { about } from "@/config/About";
import Image from "next/image";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

export default function About() {
  return (
    <Container className="mt-16">
      <SectionHeading subHeading="About" heading="Me" />
      {/* About me */}
      <div className="mt-8 flex flex-col gap-4 md:flex-row">
        <Image
          src="/assets/AvatarImageBackground3.png"
          alt="About"
          width={100}
          height={100}
          className="border-secondary size-60 rounded-md border-2 bg-blue-300 object-cover dark:bg-yellow-300"
        />
        <div className="mt-4">
          <h3 className="text-2xl font-bold">{about.name}</h3>
          <p className="text-secondary mt-4">{about.description}</p>
        </div>
      </div>
    </Container>
  );
}
