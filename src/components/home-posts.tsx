"use client";

import { useQuery } from "@tanstack/react-query";

import { getHomePosts, HomePostsType } from "@/app/utils/supabase/queries";
import { Post } from "@/components/Post";

export const HomePosts = ({
  initialPosts,
}: {
  initialPosts: HomePostsType;
}) => {
  const { data: posts } = useQuery({
    queryKey: ["home-posts"],
    queryFn: async () => {
      const { data, error } = await getHomePosts();

      if (error) throw error;
      return data;
    },
    initialData: initialPosts,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return (
    <section className="flex flex-col gap-2 w-full px-2">
      <p className="text-tiny uppercase font-bold">hot</p>
      {posts.map(({ id, title, slug, users, content, image }) => (
        <Post
          key={id}
          username={users?.username || 'anonymous'}
          title={title}
          slug={slug}
          content={content}
          image={image}
        />
      ))}
    </section>
  );
};
