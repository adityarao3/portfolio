import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <div
      id={id}
      className={cn(
        "content-panel mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 ",
        className,
      )}
    >
      {children}
    </div>
  );
}
