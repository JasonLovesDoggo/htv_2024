"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Zod schema for validation
const editFileSchema = z.object({
  name: z
    .string()
    .min(1, "File name is required")
    .max(100, "File name cannot exceed 100 characters"),
});

type EditFileFormProps = {
  defaultFileName: string;
  onClose: () => void;
};

const EditFileForm: React.FC<EditFileFormProps> = ({
  defaultFileName,
  onClose,
}) => {
  const form = useForm({
    resolver: zodResolver(editFileSchema),
    defaultValues: {
      name: defaultFileName,
    },
  });

  const handleSubmit = (values: { name: string }) => {
    console.log("Updated file name:", values.name);

    onClose();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* File Name Input Field */}
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

        {/* Form Buttons */}
        <div className="flex justify-end space-x-4">
          {/* Cancel Button */}
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>

          {/* Save Changes Button */}
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
};

export default EditFileForm;
