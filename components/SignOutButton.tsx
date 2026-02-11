import { handleSignOut } from "@/app/actions/auth";
import { LogOut } from 'lucide-react';

export default function SignOutButton() {
    return (
        <form action={handleSignOut}>
            <button
                type="submit"
                className="flex items-center space-x-2 px-3 py-2 text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
                title="Sign out"
            >
                <LogOut size={16} />
                <span>Sign out</span>
            </button>
        </form>
    );
}

