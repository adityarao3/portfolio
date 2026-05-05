import { achievements } from "@/config/Achievements";
import { Link } from "next-view-transitions";
import React from "react";

import Container from "../common/Container";
import SectionHeading from "../common/SectionHeading";

export default function Achievements() {
  return (
    <Container className="mt-16">
      <SectionHeading subHeading="Highlights" heading="Achievements" />
      <div className="mt-6 flex flex-col gap-3">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <div className="mt-1 size-2 shrink-0 rounded-full bg-green-500" />
            <p className="text-secondary text-sm">
              {achievement.link ? (
                <Link
                  href={achievement.link}
                  target="_blank"
                  className="hover:text-primary transition-colors hover:underline"
                >
                  {achievement.text}
                </Link>
              ) : (
                achievement.text
              )}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
