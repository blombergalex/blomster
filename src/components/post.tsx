import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";

import Link from "next/link";
import { useMemo } from "react";

type postType = Pick<Tables<"posts">, "title" | "slug" | "image" | "content"> &
  Pick<Tables<"users">, "username">;

export const Post = ({ username, title, slug, content, image }: postType) => {
  const trimmedContent = useMemo(() => {
    if (!content) return "";

    const words = content.split(/\s+/).slice(0, 10);
    return words.join(" ") + "...";
  }, [content]);

  return (
    <Link
      href={`/post/${slug}`}
      className="w-full rounded-sm text-background p-2 md:w-2/3"
    >
      <Card className="flex w-full py-4 border-2 border-white bg-primary text-primary-foreground">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start z-0">
          <p className="text-tiny uppercase font-bold">@{username}</p>
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 px-4">
          {image ? (
            // <Image
            //   alt="Card background"
            //   className="object-cover rounded-xl"
            //   src={image}
            //   width={270}
            //   height={"auto"} //correct syntax?
            // />
            <p>Image here</p>
          ) : (
            <p>{trimmedContent}</p>
          )}
        </CardBody>
      </Card>
    </Link>
  );
};
