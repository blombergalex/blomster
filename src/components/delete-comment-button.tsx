"use client";

import { deleteComment } from "@/actions/delete-comment";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteCommentButton = ({
  commentId,
  postId,
  // commentUserId,
}: {
  commentId: string;
  postId: string;
  // commentUserId: string;
}) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(commentId, postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Deleted comment"),
    onMutate: () => toast.loading("Deleting comment"),
    onSettled: () => toast.dismiss(),
  });

  return (
    <Button
      className="w-fit m-1 md:m-4"
      onClick={() => mutate()} // fix mutate and zod :)
    >
      Delete
    </Button>
  );
};
