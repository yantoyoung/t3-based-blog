import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { PostItem } from "~/components/post-item";
import { CreatePostDialog } from "~/components/create-post-dialog";

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
      {session?.user && <ShowRecentPosts />}
    </div>
  );
}

async function ShowRecentPosts() {
  const recentPosts = await api.post.getRecent();

  return (
    <div className="grid grid-cols-12 gap-3 mt-8">
      <div className="col-span-12 col-start-1 sm:col-span-8">
        <hr />
        {recentPosts?.length > 0 ? (
          <ul className="flex flex-col">
            {recentPosts.map((post) => {
              const { id, title, content, createdAt } = post;
              return (
                <li key={id}>
                  <PostItem
                    id={id}
                    title={title}
                    content={content}
                    date={createdAt}
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No posts.</p>
        )}
      </div>
      <div className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1 border-none">
        <div className="flex flex-col gap-2 py-2">
          <CreatePostDialog />
        </div>
      </div>
    </div>
  );
}
