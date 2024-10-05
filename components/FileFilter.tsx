"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const filters = ["All files", "Image", "Video", "Audio", "Document", "Other"];

const FileFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentAppliedFilter = searchParams.get("filter") || "All files";
  const [selectedFilter, setSelectedFilter] = useState(currentAppliedFilter);
  const [showApplyButton, setShowApplyButton] = useState(false);

  useEffect(() => {
    setSelectedFilter(currentAppliedFilter);
  }, [currentAppliedFilter]);

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
    setShowApplyButton(filter !== currentAppliedFilter);
  };

  const applyFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (selectedFilter === "All files") {
      params.delete("filter");
    } else {
      params.set("filter", selectedFilter.toLowerCase());
    }
    router.push(`/files?${params.toString()}`);
    setShowApplyButton(false);
  };

  return (
    <div className="flex items-center space-x-2.5">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilterClick(filter)}
          className={cn(
            "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
            selectedFilter === filter
              ? "bg-zinc-800 text-white"
              : "bg-gray-200 text-zinc-700 hover:bg-gray-300",
          )}
        >
          {filter}
        </button>
      ))}
      {showApplyButton && (
        <button
          onClick={applyFilter}
          className="text-sm font-medium text-gray-500 transition-colors hover:text-black"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};

export default FileFilters;
