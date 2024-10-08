"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { editFileSchema } from "@/lib/validators/file";
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

type EditFileFormProps = {
  fileName: string;
  onClose: () => void;
  onSuccess: (updatedFile: { id: string; name: string }) => void;
};

const EditFileForm: React.FC<EditFileFormProps> = ({
  onClose,
  onSuccess,
  fileName,
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(editFileSchema),
    defaultValues: {
      name: fileName,
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    startTransition(async () => {
      try {
        // Make the PUT request to rename the file
        const response = await fetch(
          `/api/file?oldName=${encodeURIComponent(fileName)}&newName=${encodeURIComponent(values.name)}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log("Response:", response);

        if (!response.ok) {
          throw new Error("Failed to rename file");
        }

        const updatedFile = await response.json();

        onSuccess({ id: updatedFile.id, name: updatedFile.name });
        onClose();
        router.refresh();
      } catch (err) {
        console.log("Error renaming file:", err);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Update file name"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button className="w-full" type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditFileForm;
