import React from "react";
import { Skeleton, Box } from "@mui/material";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col gap-3">
      <Skeleton variant="rounded" width="100%" height={240} className="rounded-xl" />
      <Box className="space-y-1.5 px-1">
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="90%" height={16} />
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="rounded" width={32} height={32} className="rounded-lg" />
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
