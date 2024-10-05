const filters = [
  "All files",
  "Images",
  "Videos",
  "Audio",
  "Documents",
  "Other",
];

const FileFilters = () => {
  return (
    <div className="flex space-x-2.5">
      {filters.map((filter) => (
        <button
          key={filter}
          className="rounded-full bg-gray-200 px-3 py-1.5 text-sm font-medium text-zinc-700"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FileFilters;
