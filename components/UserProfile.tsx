import { auth } from "@/auth";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import Image from "next/image";

export default async function UserProfile() {
    const session = await auth();

    if (!session?.user) {
        return (
            <div className="px-2">
                <SignInButton />
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center space-x-3 px-2">
                {session.user.image ? (
                    <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        width={36}
                        height={36}
                        className="rounded-full ring-2 ring-zinc-700"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                        {session.user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
                <div className="text-sm flex-1 min-w-0">
                    <p className="font-semibold text-zinc-200 truncate">
                        {session.user.name || "User"}
                    </p>
                    <p className="text-xs text-zinc-500 truncate">
                        {session.user.email || "Learner"}
                    </p>
                </div>
            </div>
            <SignOutButton />
        </div>
    );
}
