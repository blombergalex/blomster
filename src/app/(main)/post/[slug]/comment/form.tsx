"use client";

import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas";
import { errorClasses } from "@/utils/classes";
import { Tables } from "@/utils/supabase/database.types";

import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export const CommentForm = ({postId}:{postId: Pick<Tables<"comments">, "post_id">}) => {
  const {mutate, isPending} = useMutation({
    mutationFn: createComment,
    onError: (error) => {
      console.log("comment failed", error)
      toast.error(error.message)
    },
    onSuccess: (data) => {
      console.log("Comment created:", data);
      toast.success("Comment added!");
    },
    onMutate: () => toast.loading("Creating comment..."),
    onSettled: () => toast.dismiss(),
  })

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      postId,
    }
  })

  console.log(defaultValues)

  return (
    <main className="p-2 ">
      <form 
        onSubmit={handleSubmit((values) => mutate(values, postId))}
        className="flex w-full gap-4 bg-transparent items-center">
          <Input
          {...register("content")}
          label="Comment..."
          name="content"
          required/>
          <Button type="submit">
            {isPending ? "Adding comment..." : "Add comment"}
          </Button>
      </form>
      {errors && (  
        <div className={`${errorClasses} w-full`}>{errors.content?.message}</div>
      )}
    </main>
  );
};
