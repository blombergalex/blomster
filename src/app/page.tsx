import { HomePosts } from "@/components/home-posts";
import { createClient } from "@/utils/supabase/client";
import { getHomePosts } from "@/utils/supabase/queries";


export default async function Home() {
  const supabase = createClient()

  const { data, error } = await getHomePosts(supabase);

  return (
    <div className="flex flex-grow items-center">
      <main className="w-full">
        {error || data.length === 0 ? (
          <div>no posts found!</div>
        ) : (
          <HomePosts initialPosts={data} />
        )}
      </main>
    </div>
  );
}
