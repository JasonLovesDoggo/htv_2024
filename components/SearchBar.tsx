"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

// Debounce function outside the component to avoid recreation on every render
const debounce = (func: (value: string) => void, waitFor: number) => {
  let timeout: NodeJS.Timeout | null = null;

  return (value: string): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(value), waitFor);
  };
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value.length >= 3) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`?${params.toString()}`);
    }, 300),
    [router, searchParams],
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search in Files"
        className="w-full rounded-xl bg-zinc-100 px-2 py-3 pl-10"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBar;
