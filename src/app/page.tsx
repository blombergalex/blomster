import { HomePosts } from "@/components/HomePosts";
import { getHomePosts } from "./utils/supabase/queries";

export default async function Home() {
  const {data, error} = await getHomePosts()

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8">
      <main className="flex flex-col items-center">
        {error || data.length === 0 ? (
        <div>no posts found!</div>
      ) : (
      <HomePosts initialPosts={data} />
      )}
      </main>
    </div>
  );
}
