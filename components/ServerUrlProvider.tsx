"use client";

import { useEffect } from "react";

import { useModal } from "@/hooks/use-modal";
import { useServerUrl } from "@/hooks/use-server-url";

const ServerUrlProvider = () => {
  const { serverUrl, setServerUrl } = useServerUrl(); // Zustand server URL
  const modal = useModal();

  useEffect(() => {
    const storedServerUrl = localStorage.getItem("serverUrl");

    // if (!serverUrl && !storedServerUrl) {
    //   modal.onOpen("serverUrl");
    // } else if (storedServerUrl && !serverUrl) {
    //   setServerUrl(storedServerUrl);
    // }
  }, [modal.isOpen]);

  return null;
};

export default ServerUrlProvider;
