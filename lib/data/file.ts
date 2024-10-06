import { listObjects, Object } from "../s3";

export interface FileType {
  name: string;
  lastModified: Date;
  size: number;
  url: string;
  type: "image" | "video" | "audio" | "document" | "other" | "folder";
}

export const getFiles = async (
  search: string,
  filter: string,
  filterBy: string,
) => {
  try {
    const contents = await listObjects();

    const files: FileType[] = contents.map((content: Object) => ({
      name: content.Key,
      lastModified: new Date(content.LastModified),
      size: content.Size,
      url: `http://127.0.0.1:9000/first-bucket/${encodeURIComponent(content.Key)}`,
      type: getFileType(content.Key),
    }));

    // Filter files based on search and filter conditions
    const filteredFiles = files.filter((file: FileType) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "" || file.type === filter;
      return matchesSearch && matchesFilter;
    });

    let sortedFiles;
    if (filterBy === "name") {
      sortedFiles = filteredFiles.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filterBy === "type") {
      sortedFiles = filteredFiles.sort((a, b) => a.type.localeCompare(b.type));
    } else {
      sortedFiles = filteredFiles.sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime(),
      );
    }

    return sortedFiles;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};

function getFileType(filePath: string): FileType["type"] {
  const parts = filePath.split("/");
  const fileName = parts[parts.length - 1];

  if (fileName === "") return "folder";

  const extension = fileName.split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return "image";
    case "mp4":
    case "avi":
    case "mov":
      return "video";
    case "mp3":
    case "wav":
      return "audio";
    case "pdf":
    case "doc":
    case "docx":
    case "txt":
      return "document";
    default:
      return "other";
  }
}
