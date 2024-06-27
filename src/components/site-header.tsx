import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export async function SiteHeader() {
  const session = await getServerAuthSession();

  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">My Blog</span>
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            {session && <span className="text-blue-700">Logged in as {session.user?.name} &nbsp;</span>}
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="font-semibold underline"
            >
              {session ? "(Sign out)" : "Sign in"}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
