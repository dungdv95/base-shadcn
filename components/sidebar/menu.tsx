import { FunctionComponent } from "react";

import { Icons } from "@/components/icons";
import {
  BlindsIcon,
  BookIcon,
  Contact2Icon,
  CreditCardIcon,
  FilterXIcon,
  HardDriveIcon,
  Home,
  LockIcon,
  StickyNoteIcon,
  StoreIcon,
  User2Icon,
} from "lucide-react";
export type SidebarItem = {
  label: string;
  icon: FunctionComponent;
  url: string;
  badge?: "comingSoon" | "alpha" | "beta" | "new";
  checkPermision: boolean;
  code?: string;
};

export type SidebarGroup = {
  label: string;
  items: SidebarItem[];
};

export const groups: SidebarGroup[] = [
  {
    label: "Trang Chủ",
    items: [
      {
        label: "Demo",
        icon: Home,
        url: "/demo",
        checkPermision: false,
        code: "demo",
      },
    ],
  },
];
