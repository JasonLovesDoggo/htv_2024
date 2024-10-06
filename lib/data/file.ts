export interface File {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "document" | "other" | "folder";
  owner: string;
  lastModified: string;
  url: string;
  size: number;
}

export const getFiles = async (
  search: string,
  filter: string,
  filterBy: string,
) => {
  try {
    const response = await fetch("http://localhost:3000/api/file");
    const { contents } = await response.json();

    const files = contents.map((file: any) => ({
      id: file.Key[0],
      name: file.Key[0],
      type: getFileType(file.Key[0]),
      owner: file.Owner[0].DisplayName[0],
      lastModified: file.LastModified[0],
      size: file.Size[0],
      url: `http://127.0.0.1:9000/first-bucket/${encodeURIComponent(file.Key[0])}`,
    }));

    // Filter files based on search and filter conditions
    const filteredFiles = files.filter((file: File) => {
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

function getFileType(filePath: string): File["type"] {
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
