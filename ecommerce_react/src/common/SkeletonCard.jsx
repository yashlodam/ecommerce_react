import React from "react";
import { Skeleton, Box } from "@mui/material";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-2.5 sm:p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-2.5">
      <Skeleton
        variant="rounded"
        width="100%"
        className="rounded-xl bg-slate-200 dark:bg-slate-800 h-40 sm:h-52 !transform-none"
      />
      <Box className="space-y-1.5 px-0.5">
        <Skeleton
          variant="text"
          width="40%"
          height={14}
          className="bg-slate-200 dark:bg-slate-800"
        />
        <Skeleton
          variant="text"
          width="90%"
          height={18}
          className="bg-slate-200 dark:bg-slate-800"
        />
        <div className="flex justify-between items-center pt-1">
          <Skeleton
            variant="text"
            width="50%"
            height={20}
            className="bg-slate-200 dark:bg-slate-800"
          />
          <Skeleton
            variant="rounded"
            width={28}
            height={28}
            className="rounded-lg bg-slate-200 dark:bg-slate-800"
          />
        </div>
      </Box>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}
