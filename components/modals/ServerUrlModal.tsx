"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { ServerUrlFormValues, serverUrlSchema } from "@/lib/validators/file";
import { useModal } from "@/hooks/use-modal";
import { useServerUrl } from "@/hooks/use-server-url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const ServerUrlModal = () => {
  const [isPending, startTransition] = useTransition();
  const modal = useModal();
  const { setServerUrl } = useServerUrl();

  const form = useForm<ServerUrlFormValues>({
    resolver: zodResolver(serverUrlSchema),
    defaultValues: {
      url: "",
    },
  });

  const handleSave = (data: ServerUrlFormValues) => {
    startTransition(async () => {
      const { url } = data;
      localStorage.setItem("serverUrl", url);
      setServerUrl(url);
      modal.onClose();
      toast.success("Server URL saved successfully!");
    });
  };

  return (
    <Dialog
      open={modal.isOpen && modal.modalType === "serverUrl"}
      onOpenChange={modal.onClose}
    >
      <DialogContent className="sm:max-w-md md:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Set Your Server URL
          </DialogTitle>
        </DialogHeader>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6">
            {/* URL Input */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter your server URL"
                      className="w-full rounded-md border px-4 py-2 text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <Button
                disabled={isPending}
                variant="outline"
                onClick={modal.onClose}
              >
                Cancel
              </Button>
              <Button disabled={isPending} type="submit">
                Save URL
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServerUrlModal;
