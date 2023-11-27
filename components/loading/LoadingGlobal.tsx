"use client";
import LoadingPV from "./LoadingPV";
import { create } from "zustand";

interface State {
  open: boolean;
  setCollapse: (collapse: boolean) => void;
}

export const useStoreLoading = create<State>((set: any) => ({
  open: false,
  setCollapse(collapse: boolean) {
    set({ open: collapse });
  },
}));

export function LoadingGlobal() {
  const { open } = useStoreLoading();
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 z-[100] bg-background/80"></div>
      <div className="fixed w-full h-full z-[1000]">
        <LoadingPV />
      </div>
    </>
  );
}
