"use client";

import { CardBody } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";
import { DeleteCommentButton } from "./delete-comment-button";

type commentType = Pick<Tables<"comments">, "content" | "user" | "post_id"> & {
  isPostAuthor: boolean;
};

// const isCommentAuthor = user && user.user.id === comment.user.id

export const Comment = ({
  content,
  user,
  post_id,
  isPostAuthor,
}: commentType) => {
  return (
    <>
      <div className="flex px-4 justify-items-center border-foreground border-b-1 items-center">
        <CardBody>
          <p className="text-tiny uppercase font-bold">@{user}</p>
          <p>{content}</p>
        </CardBody>
        {/* fix to include author of comment  */}
        {isPostAuthor && <DeleteCommentButton postId={post_id} />} 
        
      </div>
    </>
  );
};
