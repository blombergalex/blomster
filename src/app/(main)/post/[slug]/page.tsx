import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { notFound } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("posts")
    .select('title, content, users("username"), created_at')
    .eq("slug", params.slug)
    .single();

  if (!data || error) notFound();

  const date = new Date(data.created_at);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    dateStyle: "medium",
    timeZoneName: "shortGeneric",
  };

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
    <Card className="py-4 border-b-1 border-foreground shadow-none rounded-none w-full ">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{data.users?.username}</p>
        <h4 className="font-bold text-large">{data.title}</h4>
        <small className="text-default-500">{otherDate}</small>
      </CardHeader>
      <CardBody className="overflow-visible py-4 items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg" // fix actual imagesrc
          width={270}
        />
        <p className="text-md py-1">{data.content}</p>
      </CardBody>
    </Card>
  );
}
