import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search in Files"
        className="w-full rounded-xl bg-zinc-100 px-2 py-3 pl-10"
      />
      <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
    </div>
  );
};

export default SearchBar;
