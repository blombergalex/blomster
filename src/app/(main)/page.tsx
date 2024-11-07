import { Post } from "@/components/post";
import { createClient } from "@/utils/supabase/client";
import { getHomePosts } from "@/utils/supabase/queries";

export const revalidate = 60 * 15

export default async function Home() {
  const supabase = createClient();
  const { data: posts, error } = await getHomePosts(supabase);

  return (
      <main className="w-full my-4 px-2 flex flex-col min-h-screen items-center">
        {error || posts.length === 0 ? (
          <div className="text-primary-500 text-center">
            <p>No posts yet </p>
            <a className='underline underline-offset-2' href="/create">Create one</a>
          </div>
        ) : (
          <section className="flex flex-col gap-2 w-full px-2 items-center">
            <h1 className="text-tiny text-foreground uppercase font-bold px-2">
              hot topics
            </h1>
            {posts.map(({ id, title, slug, users, content, image }) => (
              <Post
                key={id}
                username={users?.username || "anonymous"}
                title={title}
                slug={slug}
                content={content}
                image={image}
              />
            ))}
          </section>
        )}
      </main>
  );
}
