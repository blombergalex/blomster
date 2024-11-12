"use client";

import { deleteComment } from "@/actions/delete-comment";
import { secondaryButtonClasses } from "@/utils/classes";

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
    <Button className={secondaryButtonClasses} onClick={() => mutate()}>
      Delete
    </Button>
  );
};
