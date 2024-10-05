"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { File } from "@/lib/data/file";
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

const shareFileSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email")
    .nonempty("Email is required"),
});

type ShareFormProps = {
  file: File;
};

const ShareForm = ({ file }: ShareFormProps) => {
  const form = useForm({
    resolver: zodResolver(shareFileSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: { email: string }) => {
    console.log(`Sharing file "${file.name}" with ${values.email}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Email Input */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter email address"
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-2 focus:ring-green-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* List of Users with Access */}
        <div className="mt-4">
          <p className="font-semibold text-gray-900">People with access:</p>
          <ul className="mt-2 list-disc pl-5 text-gray-600">
            {/* TODO: Display the list of people who have access to the file */}
            {/* {file.sharedWith?.length > 0 ? (
              file.sharedWith.map((user, index) => (
                <li key={index}>
                  {user.email} ({user.role})
                </li>
              ))
            ) : (
              <p className="text-gray-500">No one has access yet.</p>
            )} */}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="rounded-md bg-green-600 px-4 py-2 text-white shadow-lg transition duration-150 hover:bg-green-700"
          >
            Share
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ShareForm;
