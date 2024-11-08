import { Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { DeletePostButton } from "@/components/delete-post-button";
import { EditPostButton } from "@/components/edit-post-button";
import { CommentForm } from "./comment/form";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data: post, error } = await supabase
    .from("posts")
    .select('id, title, content, user_id, users("username"), created_at')
    .eq("slug", params.slug)
    .single();

  if (error || !post) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthor = user && user.id === post.user_id;

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
    <main>
    <Card className="py-4 shadow-none rounded-none w-full ">
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
    <Card>
      {/* render existing comments  */}
      <CommentForm />
    </Card>
    </main>
  );
}
