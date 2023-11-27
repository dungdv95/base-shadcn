"use client";
import { ReactNode, useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { Clickable } from "@/components/clickable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { useMouseHoverEvent } from "@/hooks/use-mouse-hover-event";

import { useElementSize } from "@/hooks/use-element-size";

import { create } from "zustand";
import { SidebarGroup, SidebarItem, groups } from "./menu";
import { ThemeSwitch } from "./theme-switch";
import { match } from "ts-pattern";
import { Icons } from "@/components/icons";
import { Permission, useLoginStore } from "@/app/sign-in/store";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const SMALL_WIDTH = 42;

const activeClassnames = `
  [&.active]:opacity-100
  [&.active]:bg-gray-100
  dark:[&.active]:bg-gray-800
  hover:opacity-100
  hover:bg-gray-100
  dark:hover:bg-gray-800
`;

const linkClasses = `
  opacity-80 
  flex items-center 
  gap-2 
  py-1 px-2 
  rounded-lg 
  !text-black dark:!text-white
`;

interface Store {
  isExpanded: boolean;
  isHovered: boolean;
  isSettingsExpanded: boolean;
  setIshovered: (isHovered: boolean) => void;
  setIsExpanded: (isExpanded: boolean) => void;
  setIsSettingsExpaned: (isSettingsExpanded: boolean) => void;
  toggleSettingsExpaned: () => void;
}

const useStore = create<Store>()((set) => ({
  isExpanded: false,
  isSettingsExpanded: false,
  isHovered: false,
  setIshovered(isHovered) {
    set({ isHovered });
  },
  setIsExpanded(isExpanded) {
    set({ isExpanded });
  },
  setIsSettingsExpaned(isSettingsExpanded) {
    set({ isSettingsExpanded });
  },
  toggleSettingsExpaned() {
    set((store) => ({ isSettingsExpanded: !store.isSettingsExpanded }));
  },
}));

const isExpandedSelector = (store: Store) => store.isExpanded;
const isOpenSelector = (store: Store) => store.isExpanded || store.isHovered;
const isSettingsExpandedSelector = (store: Store) => store.isSettingsExpanded;
const transitionClassesSelector = (store: Store) =>
  cn(
    `transition-all`,
    store.isHovered
      ? "duration-250 ease-out-expo"
      : "duration-350 ease-in-out-expo"
  );

export function Sidebar() {
  return (
    <Container>
      <Header />
      <MainMenu />
      <div className={cn("mt-auto", "transform")}>
        <Profile />
      </div>
    </Container>
  );
}

function Container({ children }: { children: ReactNode }) {
  const [innerRef, { width }] = useElementSize();

  const hoverRef = useMouseHoverEvent({
    delay: 200,
    onMouseEnter: () => {
      useStore.getState().setIshovered(true);
    },
    onMouseLeave: () => {
      useStore.getState().setIshovered(false);
      useStore.getState().setIsSettingsExpaned(false);
    },
  });

  const isExpanded = useStore(isExpandedSelector);
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);

  return (
    <div
      className={cn("relative z-[9999] ", transitionClasses)}
      style={{ width: isExpanded ? width : SMALL_WIDTH }}
      ref={hoverRef as any}
    >
      <div
        className={cn(
          "absolute inset-0 overflow-hidden",
          transitionClasses,
          "bg-white text-black shadow-xl dark:border-r dark:border-gray-800 dark:bg-gray-900 dark:text-white"
        )}
        style={{ width: isOpen ? width : SMALL_WIDTH }}
      >
        <div
          ref={innerRef as any}
          className="absolute inset-0 flex h-full min-w-fit flex-col"
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Header() {
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);
  const isExpanded = useStore(isExpandedSelector);

  return (
    <div className="flex flex-wrap items-center bg-gradient-to-r from-blue-550 to-blue-650 text-white">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className={cn(
              "flex items-center justify-center",
              transitionClasses
            )}
            style={{ padding: isOpen ? "10px" : "8px" }}
          >
            <Icons.logo />
          </Link>
        </div>
        <div className="flex items-center pr-2">
          <ThemeSwitch />
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="inline-block appearance-none border-0 cursor-pointer p-2 opacity-50 transition duration-100 hover:opacity-100"
                onClick={() => useStore.getState().setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Icons.collapse /> : <Icons.expand />}
              </button>
            </TooltipTrigger>
            <TooltipContent>Toggle sidebar</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

function MainMenu() {
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);

  return (
    <div
      className={cn(
        "overflow-y-auto overflow-x-hidden whitespace-nowrap",
        isOpen ? "space-y-2 py-2" : "space-y-0 py-2",
        transitionClasses
      )}
    >
      {groups.map((group) => (
        <MainMenuGroup key={group.label} group={group} />
      ))}
    </div>
  );
}

function MainMenuGroup({ group }: { group: SidebarGroup }) {
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);

  return (
    <div
      className={cn(
        "space-y-2",
        transitionClasses,
        isOpen ? "p-2 pt-0" : "p-2 pr-6 pl-[3px]"
      )}
    >
      <div
        className={cn(
          "text-xs font-bold uppercase opacity-50",
          isOpen ? "h-[14px] opacity-50" : "h-0 opacity-0",
          transitionClasses
        )}
      >
        {group.label}
      </div>
      <div className="space-y-1">
        {group.items.map((item) => (
          <MainMenuItem key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}
const useHasPermission = (
  functionCode: string | undefined,
  permissions: Permission[]
) => {
  const role = useLoginStore((a) => a.user.role);
  if (!functionCode) return true;
  if (role === "admin") return true;
  return permissions?.find((item) => item.code == functionCode);
};
function MainMenuItem({ item }: { item: SidebarItem }) {
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);
  const pathname = usePathname();
  const active = pathname === item.url;
  const isAdmin = useLoginStore((a) => a.user.role == "admin");
  const permissions = useLoginStore((a) => a.permissions);
  const hasPermission = useHasPermission(item.code, permissions);
  const [hidden, setHideen] = useState<boolean>(false);

  useEffect(() => {
    setHideen(
      ((!isAdmin && item.checkPermision) || !hasPermission) &&
        item.code !== "DASHBOARD"
    );
  }, [permissions, isAdmin]);
  return (
    <div
      key={item.label}
      className={cn("w-full", transitionClasses, hidden && "hidden")}
    >
      <Link
        href={item.url}
        className={cn(
          "flex items-center gap-2 rounded-lg px-2 py-1 !text-black opacity-80 dark:!text-white",
          activeClassnames,
          active && "active"
        )}
      >
        <div
          className={
            (cn("flex w-full items-center justify-between gap-4 mx-4"),
            isOpen ? "px-2" : "")
          }
        >
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "opacity-70 [.active_&]:text-blue-400 [.active_&]:opacity-100 dark:[.active_&]:text-[#00afeb]",
                active && !isOpen ? "text-blue-500" : ""
              )}
            >
              <item.icon />
            </div>
            <div
              className={cn(
                "text-sm",
                isOpen ? "opacity-100" : "opacity-0",
                transitionClasses
              )}
            >
              {item.label}
            </div>
          </div>
          {match(item.badge)
            .with("alpha", () => (
              <div className="rounded-md border border-purple-500 bg-white px-1.5 text-[.7rem] font-bold uppercase text-purple-500 dark:bg-gray-900">
                Alpha
              </div>
            ))
            .with("beta", () => (
              <div className="rounded-md border border-cyan-500 bg-white px-1.5 text-[.7rem] font-bold uppercase text-cyan-500 dark:bg-gray-900">
                Beta
              </div>
            ))
            .with("new", () => (
              <div className="rounded-md border border-green-500 bg-white px-1.5 text-[.7rem] font-bold uppercase text-green-500 dark:bg-gray-900">
                New
              </div>
            ))
            .with("comingSoon", () => (
              <div className="rounded-md border border-white bg-white px-1.5 text-[.7rem] uppercase text-white dark:bg-gray-900">
                Soon
              </div>
            ))
            .otherwise(() => null)}
        </div>
      </Link>
    </div>
  );
}

function Profile() {
  const isOpen = useStore(isOpenSelector);
  const transitionClasses = useStore(transitionClassesSelector);
  const user = useLoginStore((a) => a.user);
  const setUrlCurrent = useLoginStore((a) => a.setUrlCurrent);
  const logout = useLoginStore((a) => a.logout);
  const isExpanded = useStore(isExpandedSelector);
  const isSettingsExpanded = useStore(isSettingsExpandedSelector);
  const router = useRouter();

  const linkClassname = cn(
    " gap-2 ",
    transitionClasses,
    isOpen ? "p-2" : "p-2 pr-6 pl-[3px]"
  );

  return (
    <div className={linkClassname}>
      <div
        className={cn(
          "flex gap-2 justify-between	",
          transitionClasses,
          isOpen ? "p-2" : "p-2 pr-6 pl-[3px]"
        )}
      >
        <div className="flex">
          <div className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-800 shadow-md mr-2">
            <Icons.user />
          </div>
          <div>
            {isOpen && <div className="text-sm font-bold">{user.username}</div>}
            {isOpen && <div className="text-xs italic">{user.email}</div>}
          </div>
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            useStore.getState().setIsSettingsExpaned(!isSettingsExpanded)
          }
        >
          {!isSettingsExpanded ? <ChevronDown /> : <ChevronUp />}
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden flex flex-col",
          transitionClasses,
          isSettingsExpanded ? "h-[240px] py-4" : "m-0 h-0 py-0"
        )}
      >
        {isSettingsExpanded && (
          <div className={cn("space-y-1 px-4")}>
            <div className="text-sm font-bold">ID: {user.id}</div>
            <div className="text-sm font-bold">Địa chỉ: {user.address}</div>
            <div className="text-sm font-bold">
              Số điện thoại: {user.phoneNumber}
            </div>
            <div className="text-sm font-bold">Role: {user.role}</div>
            <div className="text-sm font-bold">Trạng thái: {user.status}</div>
            <div className="text-sm font-bold">
              Thông tin: {user.description}
            </div>
          </div>
        )}
        <Button
          className="rounded bg-indigo-600 my-4 mx-10 text-xs font-semibold
            text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => {
            logout();
            let localData = JSON.parse(
              localStorage.getItem("EID_CMS_AUTH") || "{}"
            );
            const { EID_CMS_AUTH, ...newLocalData } = localData;
            localStorage.setItem("EID_CMS_AUTH", JSON.stringify(newLocalData));
            setUrlCurrent(window.location.href);
            router.push("/sign-in");
          }}
        >
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
