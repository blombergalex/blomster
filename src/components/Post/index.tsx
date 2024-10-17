import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";

export const Post = ({
  author,
  title,
  slug,
}: {
  author: string;
  title: string;
  slug: string;
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex flex-col w-full rounded-sm bg-primary text-background p-2"
    >
      <Card className="py-4 border-2 border-white">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">@{author}</p>
          {/* <small className="text-default-500">{data.timestampz}</small> // fix timestamp */}
          <h4 className="font-bold text-large">{title}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src="https://nextui.org/images/hero-card-complete.jpeg" // fix actual imagesrc
            width={270}
          />
        </CardBody>
      </Card>
    </Link>
  );
};
