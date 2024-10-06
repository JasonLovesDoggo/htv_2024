import { Folder, Home, LucideIcon, Users } from "lucide-react";

export const siteConfig = {
  title: "WGFSS",
  description: "DescWorld's Greatest File Storage System",
  author: "HTV 2024",
  //   url: "https://htv2024.com",
  github: "https://github.com/Jeff15321/htv_2024",
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navLinks: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/files", label: "Files", icon: Folder },
  { href: "/shared", label: "Shared", icon: Users },
];

export const serverUrl = "http://127.0.0.1:9000/first-bucket";
