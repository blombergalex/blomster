import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { DeletePostButton } from "@/components/delete-post-button";

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
    data: {user},
  } = await supabase.auth.getUser()

  const isAuthor = user && user.id === post.user_id

  const date = new Date(post.created_at);

  // const options: Intl.DateTimeFormatOptions = {
  //   weekday: "short",
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  //   dateStyle: "medium",
  //   timeZoneName: "shortGeneric",
  // };

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
    <Card className="py-4 shadow-none rounded-none w-full ">
      <CardHeader className="pb-0 pt-2 px-4 justify-between">
        <div>
          <p className="text-tiny uppercase font-bold">{post.users?.username}</p>
          <h4 className="font-bold text-large">{post.title}</h4>
          <small className="text-default-500">{otherDate}</small>
        </div>
      {isAuthor && (
        <DeletePostButton postId={post.id}/>
      )}
      </CardHeader>
      <CardBody className="overflow-visible py-4">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg" // fix actual imagesrc
          width={270}
        />
        <p className="text-md py-1">{post.content}</p>
      </CardBody>
    </Card>
  );
}
