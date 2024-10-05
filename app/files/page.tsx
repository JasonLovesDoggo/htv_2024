import FileFilters from "@/components/FileFilter";
import FileList from "@/components/FileList";
import SearchBar from "@/components/SearchBar";
import UploadButton from "@/components/UploadButton";

interface PageProps {
  searchParams: {
    search?: string;
    filter?: string;
  };
}

export default function Files({
  searchParams: { search = "", filter = "" },
}: PageProps) {
  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Files</h1>
          <p className="text-lg text-gray-600">
            View and manage all your files.
          </p>
        </div>
        <UploadButton />
      </div>
      <hr />
      <div className="mt-6 space-y-6">
        <SearchBar />
        <FileFilters />
        <FileList search={search} filter={filter} />
      </div>
    </div>
  );
}
