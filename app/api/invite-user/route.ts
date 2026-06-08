import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

type UserRole = "admin" | "teacher" | "clerk";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "You must be signed in." },
        { status: 401 }
      );
    }

    const client = await clerkClient();

    const currentUser = await client.users.getUser(userId);
    const currentUserRole = currentUser.publicMetadata?.role;

    if (currentUserRole !== "admin") {
      return NextResponse.json(
        { error: "Only admins can invite users." },
        { status: 403 }
      );
    }

    const body = await request.json();

    const email = String(body.email || "").trim().toLowerCase();
    const role = String(body.role || "").trim() as UserRole;
    const fullName = String(body.fullName || "").trim();

    const allowedRoles: UserRole[] = ["admin", "teacher", "clerk"];

    if (!email) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role selected." },
        { status: 400 }
      );
    }

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ||
      "http://localhost:3000";

    const invitation = await client.invitations.createInvitation({
      emailAddress: email,
      redirectUrl: `${appUrl}/sign-up`,
      publicMetadata: {
        role,
        fullName,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully.",
      invitationId: invitation.id,
    });
  } catch (error) {
    console.error("Invite user error:", error);

    return NextResponse.json(
      { error: "Something went wrong while sending the invitation." },
      { status: 500 }
    );
  }
}