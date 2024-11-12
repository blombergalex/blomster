"use client";

import { CardBody } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";
import { DeleteCommentButton } from "./delete-comment-button";

type commentType = Pick<Tables<"comments">, "content" | "user" | "post_id">;

export const Comment = ({ content, user, post_id }: commentType) => {
  return (
    <>
      <CardBody className="overflow-visible py-2 px-4">
        <p className="text-tiny uppercase font-bold">@{user}</p>
        <p>{content}</p>
      </CardBody>
      <DeleteCommentButton postId={post_id} />
    </>
  );
};
