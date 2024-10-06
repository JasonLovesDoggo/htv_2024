export interface File {
  id: string;
  name: string;
  type: "image" | "video" | "audio" | "document" | "other";
  owner: string;
  lastModified: string;
  url: string;
  size: number;
}

// const files: File[] = [
//   {
//     id: "1",
//     name: "Presentation 1",
//     type: "document",
//     owner: "You",
//     lastModified: "5/24/22, 12:30 PM",
//   },
//   {
//     id: "2",
//     name: "Vacation photos",
//     type: "image",
//     owner: "You",
//     lastModified: "5/23/22, 9:45 AM",
//   },
//   {
//     id: "3",
//     name: "Budget 2022",
//     type: "document",
//     owner: "You",
//     lastModified: "5/21/22, 4:15 PM",
//   },
//   {
//     id: "4",
//     name: "Project plan",
//     type: "document",
//     owner: "You",
//     lastModified: "5/20/22, 2:00 PM",
//   },
//   {
//     id: "5",
//     name: "Meeting notes",
//     type: "document",
//     owner: "You",
//     lastModified: "5/19/22, 11:00 AM",
//   },
//   {
//     id: "6",
//     name: "Podcast episode",
//     type: "audio",
//     owner: "You",
//     lastModified: "5/18/22, 3:00 PM",
//   },
//   {
//     id: "7",
//     name: "Tutorial video",
//     type: "video",
//     owner: "You",
//     lastModified: "5/17/22, 10:00 AM",
//   },
//   {
//     id: "8",
//     name: "Archive",
//     type: "other",
//     owner: "You",
//     lastModified: "5/16/22, 2:30 PM",
//   },
// ];

// Mock data
// export const getFiles = async (search: string, filter: string) => {
//   const filteredFiles = files.filter((file) => {
//     const matchesSearch = file.name
//       .toLowerCase()
//       .includes(search.toLowerCase());
//     const matchesFilter = filter === "" || file.type === filter;
//     return matchesSearch && matchesFilter;
//   });

//   return filteredFiles;
// };

export const getFiles = async (search: string, filter: string) => {
  try {
    const response = await fetch("http://localhost:3000/api/file");
    const { contents } = await response.json();

    const files = contents.map((file: any) => ({
      name: file.Key[0],
      type: file.Key[0].split(".").pop(),
      owner: file.Owner[0].DisplayName[0],
      lastModified: file.LastModified[0],
      size: file.Size[0],
      url: `http://127.0.0.1:9000/first-bucket/${encodeURIComponent(file.Key[0])}`, // Direct download URL
    }));

    // Filter files based on search and filter conditions
    const filteredFiles = files.filter((file: any) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter = filter === "" || file.type === filter;
      return matchesSearch && matchesFilter;
    });

    return filteredFiles;
  } catch (error) {
    console.error("Error fetching files:", error);
    return [];
  }
};
