"use client";

import { CardBody } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";
import { DeleteCommentButton } from "./delete-comment-button";

type commentType = Pick<Tables<"comments">, "id" | "content" | "comment_user_id" | "post_id" | "created_at"> & {
  isPostAuthor: boolean;
  user: string | undefined;
  auth_user_id: string | undefined;
};

export const Comment = ({
  id,
  content,
  post_id,
  isPostAuthor,
  user,
  comment_user_id,
  auth_user_id,
  created_at,
}: commentType) => {

  const isCommentAuthor = user && auth_user_id === comment_user_id

  const date = new Date(created_at);

  const reformattedDate = new Intl.DateTimeFormat("sv-SE", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "shortGeneric",
  }).format(date);

  return (
    <>
      <div className="flex flex-col px-4 justify-items-center border-foreground border-b-1 items-end md:flex-row relative">
        <CardBody>
        {(isCommentAuthor || isPostAuthor) && (
          <DeleteCommentButton postId={post_id} commentId={id} />
        )}
          <p className="text-tiny uppercase font-bold">@{user}</p>
          <small className="text-default-500">{reformattedDate}</small>
          <p>{content}</p>
        </CardBody>
      </div>
    </>
  );
};
