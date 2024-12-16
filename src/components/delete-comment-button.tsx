"use client";

import { deleteComment } from "@/actions/delete-comment";

import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { XMarkIcon } from "@heroicons/react/24/solid";

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
    <div className="absolute right-1 top-1">
      <Button className="hidden m-3 sm:flex p-1" onClick={() => mutate()}>
        Delete
      </Button>
      <div className="font-semibold m-2 ">
        <XMarkIcon
          className="h-6 w-6 text-primary-500 sm:hidden"
          onClick={() => mutate()}
        />
      </div>
    </div>
  );
};
