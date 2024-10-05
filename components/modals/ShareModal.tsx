import { Share2 } from "lucide-react"; // Icon for sharing

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import ShareForm from "../forms/ShareForm";

const ShareModal = () => {
  const modal = useModal();
  const isOpen = modal.isOpen && modal.modalType === "share";
  const file = modal.data;

  if (!file) return null;

  return (
    <Dialog open={isOpen} onOpenChange={modal.onClose}>
      <DialogContent className="rounded-lg bg-white shadow-2xl sm:max-w-md md:p-8">
        <DialogHeader className="flex flex-col items-center space-y-2 text-center">
          <Share2 className="h-10 w-10" />
          <DialogTitle className="text-2xl font-extrabold tracking-tight text-gray-900">
            Share File
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            Share the file <span className="font-semibold">"{file?.name}"</span>{" "}
            with others.
          </DialogDescription>
        </DialogHeader>

        {/* Share Form */}
        <ShareForm file={file} onClose={modal.onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
