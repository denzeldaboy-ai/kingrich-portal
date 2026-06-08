"use client";

import { useUser } from "@clerk/nextjs";
import type { UserRole } from "@/app/lib/role-config";

export function useCurrentRole(): {
  currentRole: UserRole;
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
} {
  const { user, isLoaded, isSignedIn } = useUser();

  const email = user?.primaryEmailAddress?.emailAddress?.toLowerCase();
  const roleFromMetadata = user?.publicMetadata?.role;

  // Put YOUR Clerk login email here
  const ownerEmail = "kingrichacademy@gmail.com".toLowerCase();

  let currentRole: UserRole = "clerk";

  if (
    roleFromMetadata === "admin" ||
    roleFromMetadata === "teacher" ||
    roleFromMetadata === "clerk"
  ) {
    currentRole = roleFromMetadata;
  } else if (email === ownerEmail) {
    currentRole = "admin";
  }

  return {
    currentRole,
    isLoaded,
    isSignedIn,
  };
}