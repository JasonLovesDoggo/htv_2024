"use client";

import { useRouter } from "next/navigation";

import { TableHead, TableRow } from "./ui/table";

type Props = {};
const FileListHeader = ({}: Props) => {
  const router = useRouter();

  const handleClick = (filterBy: string) => () => {
    router.push(`/files?filterBy=${filterBy}`);
  };

  return (
    <TableRow
      className="grid grid-cols-4 gap-4 border-b border-gray-300 bg-gray-50 hover:bg-gray-200"
      style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
    >
      <TableHead className="px-3 text-left font-medium">
        <button onClick={handleClick("name")}>Name</button>
      </TableHead>
      <TableHead className="px-3 text-center font-medium">
        <button onClick={handleClick("type")}>File type</button>
      </TableHead>
      <TableHead className="px-3 text-center font-medium">
        <button onClick={handleClick("lastModified")}>Last modified</button>
      </TableHead>
      <TableHead className="px-3 text-left font-medium">
        <button onClick={handleClick("actions")}>Actions</button>
      </TableHead>
    </TableRow>
  );
};
export default FileListHeader;
