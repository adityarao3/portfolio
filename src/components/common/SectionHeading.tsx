import React from "react";

interface SectionHeadingProps {
  subHeading: string;
  heading: string;
}

export default function SectionHeading({
  subHeading,
  heading,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-secondary text-sm font-bold uppercase tracking-wider">
        {subHeading}
      </p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">{heading}</h2>
    </div>
  );
}
