"use client";

import { CardBody } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";
import { DeleteCommentButton } from "./delete-comment-button";

type commentType = Pick<Tables<"comments">, "id" | "content" | "comment_user_id" | "post_id"> & {
  isPostAuthor: boolean;
  user: string | undefined;
  auth_user_id: string;
};

export const Comment = ({
  id,
  content,
  post_id,
  isPostAuthor,
  user,
  comment_user_id,
  auth_user_id
}: commentType) => {

  const isCommentAuthor = user && auth_user_id === comment_user_id

  return (
    <>
      <div className="flex flex-col px-4 justify-items-center border-foreground border-b-1 items-end md:flex-row">
        <CardBody>
          <p className="text-tiny uppercase font-bold">@{user}</p>
          <p>{content}</p>
        </CardBody>
        {/* fix to include author of comment  */}
        {(isCommentAuthor || isPostAuthor) && (
          <DeleteCommentButton postId={post_id} commentId={id} commentUserId={comment_user_id} />
        )}
      </div>
    </>
  );
};
