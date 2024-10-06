import FileFilters from "@/components/FileFilter";
import FileList from "@/components/FileList";
import SearchBar from "@/components/SearchBar";
import UploadButton from "@/components/UploadButton";

interface PageProps {
  searchParams: {
    search?: string;
    filter?: string;
    filterBy?: string;
  };
}

export default function Files({
  searchParams: { search = "", filter = "", filterBy = "" },
}: PageProps) {
  return (
    <div className="">
      <div className="flex w-full justify-between gap-4 max-sm:flex-col sm:items-center">
        <div>
          <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Files</h1>
          <p className="text-gray-600 md:text-lg">
            View and manage all your files.
          </p>
        </div>
        <UploadButton />
      </div>
      <hr />
      <div className="mt-6 space-y-6">
        <SearchBar />
        <FileFilters />
        <FileList search={search} filter={filter} filterBy={filterBy} />
      </div>
    </div>
  );
}
