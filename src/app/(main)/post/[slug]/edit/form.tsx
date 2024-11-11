'use client'

import { Tables } from "@/utils/supabase/database.types";
import { buttonClasses, errorClasses } from "@/utils/classes";
import { editPost } from "@/actions/edit-post";

import { Button, Input, Textarea } from "@nextui-org/react";
import { postSchema } from "@/actions/schemas";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const EditPostForm = ({
  defaultValues,
  postId,
}: {
  defaultValues: Pick<Tables<"posts">, "title" | "content">;
  postId: string;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success("Your post was updated!"),
    onMutate: () => toast.loading("Updating post..."),
    onSettled: () => toast.dismiss(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content || undefined,
    },
  });

  return (
    <main className="w-full px-2 flex flex-col my-4 items-center">
      <form
        onSubmit={handleSubmit((values) => mutate({ data: values, postId }))}
        className="flex w-full flex-col gap-4 md:w-2/3"
      >
        <Input {...register("title")} label="Title">
          {defaultValues.title}
        </Input>
        {errors.title && (
          <span className={errorClasses}>{errors.title.message}</span>
        )}
        <Textarea {...register("content")} label="Your content here...">
          {defaultValues.content}
        </Textarea>
        {errors.content && (
          <span className={errorClasses}>{errors.content.message}</span>
        )}
        <Button className={`${buttonClasses} self-end`} type="submit">
          {isPending ? "Updating post..." : "Update post"}
        </Button>
      </form>
    </main>
  );
};
