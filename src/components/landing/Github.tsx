"use client";

import { githubConfig } from "@/config/Github";
import Link from "next/link";
import { useEffect, useState } from "react";

import Container from "../common/Container";
import GithubIcon from "../svgs/Github";
import { Button } from "../ui/button";

type ContributionItem = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type GitHubContributionResponse = {
  total?: Record<string, number>;
  contributions?: unknown[];
};

/** Tailwind classes per contribution level, GitHub's green ramp. */
const levelColors = [
  "bg-zinc-100 dark:bg-zinc-800",
  "bg-emerald-200 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-700 dark:bg-emerald-400",
];

/** Group days into calendar weeks, starting each week on Sunday. */
function groupIntoWeeks(days: ContributionItem[]): ContributionItem[][] {
  const weeks: ContributionItem[][] = [];
  let current: ContributionItem[] = [];

  for (const day of days) {
    current.push(day);
    if (new Date(day.date).getDay() === 6) {
      weeks.push(current);
      current = [];
    }
  }
  if (current.length) weeks.push(current);

  return weeks;
}

/** Evenly spaced month labels across the grid. */
function buildMonthLabels(days: ContributionItem[]): string[] {
  if (!days.length) return [];
  const seen: string[] = [];
  for (const day of days) {
    const label = githubConfig.months[new Date(day.date).getMonth()];
    if (seen[seen.length - 1] !== label) seen.push(label);
  }
  return seen;
}

function filterLastYear(contributions: ContributionItem[]): ContributionItem[] {
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  return contributions.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= oneYearAgo;
  });
}

export default function Github() {
  const [contributions, setContributions] = useState<ContributionItem[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const weeks = groupIntoWeeks(contributions);
  const monthLabels = buildMonthLabels(contributions);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${githubConfig.apiUrl}/${githubConfig.username}?y=last`
        );

        if (!response.ok) {
          throw new Error(`Contributions API responded ${response.status}`);
        }

        const data: GitHubContributionResponse = await response.json();

        if (data?.contributions && Array.isArray(data.contributions)) {
          const validContributions = data.contributions
            .filter(
              (item): item is ContributionItem =>
                typeof item === "object" &&
                item !== null &&
                "date" in item &&
                "count" in item &&
                "level" in item
            )
            .map((item) => ({
              date: String(item.date),
              count: Number(item.count || 0),
              level: (item.level || 0) as ContributionItem["level"],
            }));

          if (validContributions.length > 0) {
            setTotalContributions(
              data.total?.lastYear ??
                validContributions.reduce((sum, item) => sum + item.count, 0)
            );
            setContributions(filterLastYear(validContributions));
          } else {
            setHasError(true);
          }
        } else {
          setHasError(true);
        }
      } catch (err) {
        console.error("Failed to fetch GitHub contributions:", err);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Container id="github" className="row-rule row-rule-wide mt-10 scroll-mt-8 pb-10">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-lg font-bold">
              {githubConfig.title}
            </h2>
            <p className="text-muted-foreground text-[13px]">
              <b>{githubConfig.username}</b>&apos;s {githubConfig.subtitle}
            </p>
            {!isLoading && !hasError && totalContributions > 0 && (
              <p className="text-primary mt-1 text-sm font-medium">
                Total:{" "}
                <span className="font-black">
                  {totalContributions.toLocaleString()}
                </span>{" "}
                contributions
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="border-primary mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-t-transparent"></div>
              <p className="text-muted-foreground text-sm">
                {githubConfig.loadingState.description}
              </p>
            </div>
          </div>
        ) : hasError || contributions.length === 0 ? (
          <div className="text-muted-foreground border-border rounded-xl border-2 border-dashed p-8 text-center">
            <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <GithubIcon className="h-8 w-8" />
            </div>
            <p className="mb-2 font-medium">{githubConfig.errorState.title}</p>
            <p className="mb-4 text-sm">
              {githubConfig.errorState.description}
            </p>
            <Button variant="outline" asChild>
              <Link
                href={`https://github.com/${githubConfig.username}`}
                className="inline-flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                {githubConfig.errorState.buttonText}
              </Link>
            </Button>
          </div>
        ) : (
          <div className="relative py-2">
            {/* Month labels */}
            <div className="mb-2 flex w-full justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
              {monthLabels.map((month, i) => (
                <span key={`${month}-${i}`}>{month}</span>
              ))}
            </div>

            {/* 53 fluid columns, so the grid always fills the content width. */}
            <div
              className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px]"
              role="img"
              aria-label={`${totalContributions} contributions in the last year`}
            >
              {weeks.map((week, colIndex) => (
                <div key={colIndex} className="flex flex-col gap-[2px]">
                  {colIndex === 0 &&
                    Array.from({ length: 7 - week.length }).map((_, i) => (
                      <div
                        key={`pad-${i}`}
                        className="aspect-square w-full rounded-[2px] bg-transparent"
                      />
                    ))}

                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.count} contributions on ${day.date}`}
                      className={`aspect-square w-full rounded-[2px] opacity-80 transition-transform hover:scale-125 hover:opacity-100 dark:opacity-70 dark:hover:opacity-100 ${levelColors[day.level]}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Less active
              </span>
              <div className="flex shrink-0 items-center gap-1.5">
                {levelColors.map((cell, i) => (
                  <div
                    key={i}
                    className={`size-2 rounded-[2px] opacity-80 dark:opacity-70 ${cell}`}
                  />
                ))}
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  More active
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
