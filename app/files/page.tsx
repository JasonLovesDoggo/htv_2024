import FileFilters from "@/components/FileFilter";
import FileList from "@/components/FileList";
import SearchBar from "@/components/SearchBar";
import UploadButton from "@/components/UploadButton";

export default function Files() {
  return (
    <div className="">
      <div className="flex w-full items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Files</h1>
          <p className="text-lg text-gray-600">
            View and manage all your files from one central location.
          </p>
        </div>
        <UploadButton />
      </div>
      <hr />
      <div className="mt-6 space-y-6">
        <SearchBar />
        <FileFilters />
        <FileList />
      </div>
    </div>
  );
}
