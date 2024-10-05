export interface File {
  name: string;
  type: "image" | "video" | "audio" | "document" | "other";
  owner: string;
  lastModified: string;
}

const files: File[] = [
  {
    name: "Presentation 1",
    type: "document",
    owner: "You",
    lastModified: "5/24/22, 12:30 PM",
  },
  {
    name: "Vacation photos",
    type: "image",
    owner: "You",
    lastModified: "5/23/22, 9:45 AM",
  },
  {
    name: "Budget 2022",
    type: "document",
    owner: "You",
    lastModified: "5/21/22, 4:15 PM",
  },
  {
    name: "Project plan",
    type: "document",
    owner: "You",
    lastModified: "5/20/22, 2:00 PM",
  },
  {
    name: "Meeting notes",
    type: "document",
    owner: "You",
    lastModified: "5/19/22, 11:00 AM",
  },
  {
    name: "Podcast episode",
    type: "audio",
    owner: "You",
    lastModified: "5/18/22, 3:00 PM",
  },
  {
    name: "Tutorial video",
    type: "video",
    owner: "You",
    lastModified: "5/17/22, 10:00 AM",
  },
  {
    name: "Archive",
    type: "other",
    owner: "You",
    lastModified: "5/16/22, 2:30 PM",
  },
  {
    name: "Presentation 1",
    type: "document",
    owner: "You",
    lastModified: "5/24/22, 12:30 PM",
  },
  {
    name: "Vacation photos",
    type: "image",
    owner: "You",
    lastModified: "5/23/22, 9:45 AM",
  },
  {
    name: "Budget 2022",
    type: "document",
    owner: "You",
    lastModified: "5/21/22, 4:15 PM",
  },
  {
    name: "Project plan",
    type: "document",
    owner: "You",
    lastModified: "5/20/22, 2:00 PM",
  },
  {
    name: "Meeting notes",
    type: "document",
    owner: "You",
    lastModified: "5/19/22, 11:00 AM",
  },
  {
    name: "Podcast episode",
    type: "audio",
    owner: "You",
    lastModified: "5/18/22, 3:00 PM",
  },
  {
    name: "Tutorial video",
    type: "video",
    owner: "You",
    lastModified: "5/17/22, 10:00 AM",
  },
  {
    name: "Archive",
    type: "other",
    owner: "You",
    lastModified: "5/16/22, 2:30 PM",
  },
  {
    name: "Presentation 1",
    type: "document",
    owner: "You",
    lastModified: "5/24/22, 12:30 PM",
  },
  {
    name: "Vacation photos",
    type: "image",
    owner: "You",
    lastModified: "5/23/22, 9:45 AM",
  },
  {
    name: "Budget 2022",
    type: "document",
    owner: "You",
    lastModified: "5/21/22, 4:15 PM",
  },
  {
    name: "Project plan",
    type: "document",
    owner: "You",
    lastModified: "5/20/22, 2:00 PM",
  },
  {
    name: "Meeting notes",
    type: "document",
    owner: "You",
    lastModified: "5/19/22, 11:00 AM",
  },
  {
    name: "Podcast episode",
    type: "audio",
    owner: "You",
    lastModified: "5/18/22, 3:00 PM",
  },
  {
    name: "Tutorial video",
    type: "video",
    owner: "You",
    lastModified: "5/17/22, 10:00 AM",
  },
  {
    name: "Archive",
    type: "other",
    owner: "You",
    lastModified: "5/16/22, 2:30 PM",
  },
];

export const getFiles = async (search: string, filter: string) => {
  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter = filter === "" || file.type === filter;
    return matchesSearch && matchesFilter;
  });

  return filteredFiles;
};
