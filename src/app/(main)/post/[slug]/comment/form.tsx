"use client";

import { createComment } from "@/actions/create-comment";
import { commentSchema } from "@/actions/schemas";
import { errorClasses } from "@/utils/classes";

import { Button, Input } from "@nextui-org/react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


export const CommentForm = () => {
  const {mutate, isPending} = useMutation({
    mutationFn: createComment,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Comment added!"),
    onMutate: () => toast.loading("Creating comment..."),
    onSettled: () => toast.dismiss(),
  })

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
  })

  console.log('commentform rendered')

  return (
    <main className="p-2">
      <form 

        onSubmit={handleSubmit((values) => console.log("form submitted", values))}
        className="flex w-full gap-4 bg-transparent items-center">
        <Input 
        {...register("content")}
        label="Comment..." 
        name="content"
        required/>
        {errors && (
          <span className={errorClasses}>{errors.content?.message}</span>
        )}
        <Button type="submit">
          {isPending ? "Adding comment..." : "Add comment"}
        </Button>
      </form>
    </main>
  );
};
