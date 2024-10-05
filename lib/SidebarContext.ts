import { createContext } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export default SidebarContext;
