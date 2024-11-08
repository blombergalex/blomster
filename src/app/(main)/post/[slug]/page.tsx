import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { DeletePostButton } from "@/components/delete-post-button";
import { EditPostButton } from "@/components/edit-post-button";
import { CommentForm } from "./comment/form";
import { getPostComments } from "@/utils/supabase/queries";

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user && user.id === post.user_id;
  
  const { data: comments, error: commentsError}  = await getPostComments(supabase)
  console.log(comments)
  console.log("commentserror:", commentsError)

  if (commentsError || !comments) {
    throw new Error("No comments found")
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

  const currentPath = `/post/${params.slug}`

  return (
    <main className="flex flex-col justify-between gap-10 md:min-h-svh">
    <Card className="py-4 shadow-none rounded-none w-full z-0">
      <CardHeader className="pb-0 pt-2 px-4 justify-between">
        <div>
          <p className="text-tiny uppercase font-bold">
            {post.users?.username}
          </p>
          <h4 className="font-bold text-large">{post.title}</h4>
          <small className="text-default-500">{otherDate}</small>
        </div>
        {isAuthor && (
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
      <Card>
      {/* render existing comments  */}
      </Card>
      {user && (
        <CommentForm currentPath={currentPath}/>
      )}
    </Card>
    </main>
  );
}
