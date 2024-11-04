import { Post } from "@/components/post";
import { createClient } from "@/utils/supabase/client";
import { getHomePosts } from "@/utils/supabase/queries";

export const revalidate = 60 * 15

export default async function Home() {
  const supabase = createClient();
  const { data: posts, error } = await getHomePosts(supabase);

  return (
      <main className="w-full my-4 px-2 flex flex-col flex-grow items-center">
        {error || posts.length === 0 ? (
          <div>no posts found!</div>
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
