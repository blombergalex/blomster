"use client";

import { deleteComment } from "@/actions/delete-comment";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteCommentButton = ({
  commentId,
  postId,
}: {
  commentId: string;
  postId: string;
}) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(commentId, postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Deleted comment"),
    onMutate: () => toast.loading("Deleting comment"),
    onSettled: () => toast.dismiss(),
  });

  return (
    <>
    <Button
      className="hidden w-fit m-3 sm:flex"
      onClick={() => mutate()}
      >
      Delete
    </Button>
    <div className="font-semibold m-2 sm:hidden">

    </div>
    </>
  );
};
