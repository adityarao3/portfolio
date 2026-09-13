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
      <p className="text-secondary text-[10px] font-bold tracking-[0.2em] uppercase">
        {subHeading}
      </p>
      <h2 className="mt-1 text-lg font-bold">{heading}</h2>
    </div>
  );
}
