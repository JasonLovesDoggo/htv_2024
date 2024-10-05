import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FileList = () => {
  const files = [
    {
      name: "Presentation 1",
      type: "Google Slides",
      owner: "You",
      lastModified: "5/24/22, 12:30 PM",
    },
    {
      name: "Vacation photos",
      type: "JPG",
      owner: "You",
      lastModified: "5/23/22, 9:45 AM",
    },
    {
      name: "Budget 2022",
      type: "XLS",
      owner: "You",
      lastModified: "5/21/22, 4:15 PM",
    },
    {
      name: "Project plan",
      type: "PDF",
      owner: "You",
      lastModified: "5/20/22, 2:00 PM",
    },
    {
      name: "Meeting notes",
      type: "DOCX",
      owner: "You",
      lastModified: "5/19/22, 11:00 AM",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader className="">
          <TableRow className="border-b border-gray-300">
            <TableHead className="px-3 py-5 text-left font-medium">
              Name
            </TableHead>
            <TableHead className="px-3 py-5 text-left font-medium">
              File type
            </TableHead>
            <TableHead className="px-3 py-5 text-left font-medium">
              Owner
            </TableHead>
            <TableHead className="px-3 py-5 text-left font-medium">
              Last modified
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow
              key={file.name}
              className="border-b border-gray-200 transition-colors duration-150 hover:bg-gray-50"
            >
              <TableCell className="px-3 py-5 text-gray-800">
                {file.name}
              </TableCell>
              <TableCell className="px-6 py-4">
                <span className="rounded-full bg-gray-200 px-4 py-2 text-center text-sm font-semibold text-gray-700">
                  {file.type}
                </span>
              </TableCell>
              <TableCell className="px-3 py-5 text-gray-600">
                {file.owner}
              </TableCell>
              <TableCell className="px-3 py-5 text-gray-600">
                {file.lastModified}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FileList;
