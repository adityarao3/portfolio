import { Link } from "next-view-transitions";
import React from "react";

interface SkillProps {
  name: string;
  href?: string;
  children: React.ReactNode;
}

const skillClassName =
  "skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white";

export default function Skill({ name, href, children }: SkillProps) {
  const content = (
    <>
      <div className="size-4 flex-shrink-0">{children}</div>
      <p className="ml-1 text-sm font-bold">{name}</p>
    </>
  );

  if (!href) {
    return <span className={skillClassName}>{content}</span>;
  }

  return (
    <Link href={href} target="_blank" className={skillClassName}>
      {content}
    </Link>
  );
}
