"use client";

import { useUser } from "@clerk/nextjs";
import type { UserRole } from "@/app/lib/role-config";

export function useCurrentRole(): {
  currentRole: UserRole;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
} {
  const { user, isLoaded, isSignedIn } = useUser();

  const roleFromMetadata = user?.publicMetadata?.role;

  const currentRole: UserRole =
    roleFromMetadata === "admin" ||
    roleFromMetadata === "teacher" ||
    roleFromMetadata === "clerk"
      ? roleFromMetadata
      : "admin";

  return {
    currentRole,
    isLoaded,
    isSignedIn,
  };
}