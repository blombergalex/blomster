"use client";

import { deleteComment } from "@/actions/delete-comment";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteCommentButton = ({
  // postId,
  // commentUserId,
  commentId,
}: {
  // postId: string;
  // commentUserId: string;
  commentId: string;
}) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(commentId),
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
