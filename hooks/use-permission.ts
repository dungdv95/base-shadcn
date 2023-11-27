"use client";
import { useLoginStore } from "@/app/sign-in/store";

export const useHasPermission = (functionCode: string) => {
  const permissions = useLoginStore((a) => a.permissions);
  const role = useLoginStore((a) => a.user.role);
  if (!functionCode) return true;
  if (role === "admin") return true;
  return permissions?.find((item) => item.code == functionCode);
};
