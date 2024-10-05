"use client";

import { useEffect, useState } from "react";

import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
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
    </>
  );
};
export default ModalProvider;
