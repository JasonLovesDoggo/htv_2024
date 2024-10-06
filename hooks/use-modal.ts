import { create } from "zustand";

import { FileType } from "@/lib/data/file";

type ModalType = "upload" | "delete" | "edit" | "share" | "serverUrl";
type ModalData = FileType;

interface UploadModalProps {
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  onUpdateData: (newData: Partial<ModalData>) => void;
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
  onUpdateData: (newData) =>
    set((state) => ({
      data: state.data ? { ...state.data, ...newData } : null,
    })),
}));

export { useModal };
