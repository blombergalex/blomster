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


export const CommentForm = ({post_id} : Pick<Tables<"comments">, "post_id">) => {
  const {mutate, isPending} = useMutation({
    mutationFn: createComment,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Comment added!");
      reset();
    },
    onMutate: () => toast.loading("Creating comment..."),
    onSettled: () => toast.dismiss(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      post_id
    }
  })


  return (
    <main className="p-4 ">
      <form 
        onSubmit={handleSubmit((values) => mutate(values))}
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
