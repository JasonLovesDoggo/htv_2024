import { Clock, User, Users } from "lucide-react"; // Icons for visual enhancement

import { useModal } from "@/hooks/use-modal";

import EditFileForm from "../forms/EditFileForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const EditModal = () => {
  const modal = useModal();

  const isOpen = modal.isOpen && modal.modalType === "edit";
  const file = modal.data;

  return (
    <Dialog open={isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="rounded-lg bg-white shadow-2xl sm:max-w-md md:p-8">
        {/* Modal Header */}
        <DialogHeader className="flex flex-col items-center space-y-2 text-center">
          <DialogTitle className="text-2xl font-extrabold tracking-tight text-gray-900">
            Edit File
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Update file details and manage permissions
          </DialogDescription>
        </DialogHeader>
        {/* File Details */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-900">
              Name: {file?.name}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-900">
              Owner: {file?.owner}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Clock className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-900">
              Last modified: {file?.lastModified}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-500" />
            <p className="text-sm font-medium text-gray-900">
              Shared with: [to be implemented]
            </p>
          </div>
        </div>
        {/* Edit Input */}
        <EditFileForm
          defaultFileName={file?.name || "My File Name"}
          onClose={modal.onClose} // Pass modal close function
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
