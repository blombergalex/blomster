"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import { getHomePosts, HomePostsType } from "@/utils/supabase/queries";
import { Post } from "@/components/post";

export const HomePosts = ({
  initialPosts,
}: {
  initialPosts: HomePostsType;
}) => {
  const { data: posts } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const supabase = createClient();
      const { data, error } = await getHomePosts(supabase);

      if (error) throw error;
      return data;
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return (
    <section className="flex flex-col gap-2 w-full px-2 items-center">
      <p className="text-tiny text-foreground uppercase font-bold px-2">hot topics</p>
      {posts.map(({ id, title, slug, users, content }) => (
        <Post
          key={id}
          username={users?.username || "anonymous"}
          title={title}
          slug={slug}
          content={content}
        />
      ))}
    </section>
  );
};
