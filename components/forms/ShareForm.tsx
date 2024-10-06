"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import copy from "clipboard-copy";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { File } from "@/lib/data/file";
import { getFileUrl } from "@/lib/s3";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const shareFileSchema = z.object({});

type ShareFormProps = {
  file: File;
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
