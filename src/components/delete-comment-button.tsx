"use client";

import { deleteComment } from "@/actions/delete-comment";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteCommentButton = ({ postId }: { postId: string }) => {
  const { mutate } = useMutation({
    mutationFn: () => deleteComment(postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Deleted comment"),
    onMutate: () => toast.loading("Deleting comment"),
    onSettled: () => toast.dismiss(),
  });

  return (
    <Button className="w-fit" onClick={() => mutate()}>
      Delete
    </Button>
  );
};
