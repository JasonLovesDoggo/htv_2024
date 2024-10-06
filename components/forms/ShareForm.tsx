"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import copy from "clipboard-copy";
import { toast } from "sonner";
import { z } from "zod";

import { FileType } from "@/lib/data/file";
import { Button } from "@/components/ui/button";

type ShareFormProps = {
  file: FileType;
  onClose: () => void;
};

const ShareForm = ({ file, onClose }: ShareFormProps) => {
  const [link, setLink] = useState("");
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await copy(`http://localhost:3000/api/file/download?name=${file.name}`);
    toast.success("Copied!");
    onClose();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
      {/* Email Input */}
      <div>{link}</div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            onClose();
          }}
          className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Button>
        <Button type="submit" className="w-full">
          Copy to clipboard
        </Button>
      </div>
    </form>
  );
};

export default ShareForm;
