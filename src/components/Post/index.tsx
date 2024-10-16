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
      <div>
        <p>@{author}</p>
        <p className="font-semibold">{title}</p>
      </div>
    </Link>
  );
};
