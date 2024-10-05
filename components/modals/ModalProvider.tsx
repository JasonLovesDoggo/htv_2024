"use client";

import { useEffect, useState } from "react";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ShareModal from "./ShareModal";
import UploadModal from "./UploadModal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <UploadModal />
      <EditModal />
      <DeleteModal />
      <ShareModal />
    </>
  );
};
export default ModalProvider;
