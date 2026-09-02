import React from "react";
import { Skeleton, Box } from "@mui/material";

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col gap-3">
      <Skeleton
        variant="rounded"
        width="100%"
        height={220}
        className="rounded-xl bg-slate-200 dark:bg-slate-800"
      />
      <Box className="space-y-2 px-1">
        <Skeleton
          variant="text"
          width="40%"
          height={16}
          className="bg-slate-200 dark:bg-slate-800"
        />
        <Skeleton
          variant="text"
          width="90%"
          height={20}
          className="bg-slate-200 dark:bg-slate-800"
        />
        <div className="flex justify-between items-center pt-2">
          <Skeleton
            variant="text"
            width="50%"
            height={24}
            className="bg-slate-200 dark:bg-slate-800"
          />
          <Skeleton
            variant="rounded"
            width={32}
            height={32}
            className="rounded-lg bg-slate-200 dark:bg-slate-800"
          />
        </div>
      </Box>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <SkeletonCard key={idx} />
      ))}
    </div>
  );
}
