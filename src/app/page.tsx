import { HomePosts } from "@/components/HomePosts";
import { getHomePosts } from "./utils/supabase/queries";

export default async function Home() {
  const {data, error} = await getHomePosts()

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
