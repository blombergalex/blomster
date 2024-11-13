import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { DeletePostButton } from "@/components/delete-post-button";
import { EditPostButton } from "@/components/edit-post-button";
import { CommentForm } from "./comment/form";
import { Comment } from "@/components/comment";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select('id, title, content, user_id, users("username"), created_at')
    .eq("slug", params.slug)
    .single();

  if (postError || !post) notFound();

  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("User not found");
  }

  const auth_user_id = user.user.id;
  console.log("auth_user_id:", auth_user_id)
  const isPostAuthor = user && auth_user_id === post.user_id; 

  const { data: comments, error: commentsError } = await supabase
    .from("comments")
    .select('id, content, users("username"), comment_user_id')
    .order("created_at", { ascending: true })
    .eq("post_id", post.id);

  if (commentsError || !comments) {
    throw new Error("No comments found");
  }

  const date = new Date(post.created_at);

  const otherDate = new Intl.DateTimeFormat("sv-SE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "shortGeneric",
  }).format(date);


  return (
    <main className="flex flex-col justify-between gap-10 md:min-h-svh">
      <Card className="py-4 shadow-none rounded-none w-full z-0">
        <CardHeader className="pb-0 pt-2 px-4 justify-between flex-wrap">
          <div className="w-full md:w-fit">
            <p className="text-tiny uppercase font-bold">
              {post.users?.username}
            </p>
            <h4 className="font-bold text-large">{post.title}</h4>
            <small className="text-default-500">{otherDate}</small>
          </div>
          {isPostAuthor && (
            <div className="flex gap-1">
              <Link href={`/post/${params.slug}/edit`}>
                <EditPostButton />
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-4">
          <p className="text-md py-1">{post.content}</p>
        </CardBody>
      </Card>
      <Card className="my-4 bg-background rounded-none shadow-none">
        <p className="text-tiny uppercase font-semibold m-4">Comments</p>
        {comments &&
          comments.map(({ id, content, users, comment_user_id}) => (
            <Comment
              key={id}
              content={content}
              user={users?.username}
              post_id={post.id}
              isPostAuthor={isPostAuthor}
              comment_user_id={comment_user_id}
              auth_user_id={auth_user_id}
            />
          ))}
        {user && <CommentForm post_id={post.id} />}
      </Card>
    </main>
  );
}
