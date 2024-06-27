import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-3xl lg:text-3xl">
            {session ? "Latest Posts" : "Welcome. Please sign in."}
          </h1>
        </div>
      </div>
    </div>
  );
}

async function CrudShowcase() {
async function ShowRecentPosts() {
  const session = await getServerAuthSession();
  if (!session?.user) {
    return (
      <h1>Welcome. Please sign in.</h1>
    );
  }

  const recentPosts = await api.post.getRecent();

  return (
    <div>
      {recentPosts?.map((post, i) => (
          <div key={i}>{post.title}</div>
        ))
      }
    </div>
  );
}
