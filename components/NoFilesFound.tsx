const NoFilesFound = () => {
  return (
    <div className="w-fit rounded-lg border bg-gray-100 p-8">
      <p className="mb-2 text-lg font-medium text-gray-700">No files found</p>
      <p className="text-sm text-gray-500">
        Try adjusting your search criteria or filters to find what you&apos;re
        looking for.
      </p>
    </div>
  );
};
export default NoFilesFound;
