import { create } from "zustand";

import { File } from "@/lib/data/file";

type ModalType = "upload" | "delete" | "edit" | "share";
type ModalData = File;

interface UploadModalProps {
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  modalType: ModalType | null;
  data: ModalData | null;
}

const useModal = create<UploadModalProps>((set) => ({
  data: null,
  modalType: null,
  isOpen: false,
  onOpen: (modalType, data) => {
    set({ isOpen: true, modalType, data });
  },
  onClose: () => set({ isOpen: false, modalType: null }),
}));

export { useModal };
