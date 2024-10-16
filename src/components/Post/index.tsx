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
      className="flex w-full rounded-sm bg-background"
    >
      <p>{author}</p>
      <p>{title}</p>
    </Link>
  );
};
