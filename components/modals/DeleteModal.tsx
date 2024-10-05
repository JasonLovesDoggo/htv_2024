import { Trash2 } from "lucide-react"; // Icon for deletion

import { useModal } from "@/hooks/use-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DeleteModal = () => {
  const modal = useModal();

  const isOpen = modal.isOpen && modal.modalType === "delete";
  const file = modal.data;

  const handleDelete = () => {
    console.log(`File ${file?.name} deleted.`);

    modal.onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="rounded-lg bg-white p-6 shadow-2xl sm:max-w-lg md:p-10">
        {/* Modal Header */}
        <DialogHeader className="flex flex-col items-center space-y-4 text-center">
          <Trash2 className="size-10 text-red-600" />
          <DialogTitle className="text-2xl font-bold tracking-tight text-gray-900">
            Delete File
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-gray-500">
            Are you sure you want to delete the file{" "}
            <span className="font-semibold">&apos;{file?.name}&apos;</span>?
            <br />
            <p className="mt-6 text-sm">This action cannot be undone.</p>
          </DialogDescription>
        </DialogHeader>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={modal.onClose}
            className="w-full rounded-lg border-gray-300 px-4 py-3 text-gray-700 transition duration-150 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="w-full rounded-lg bg-red-600 px-4 py-3 text-white shadow-md transition duration-150 hover:bg-red-700"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
