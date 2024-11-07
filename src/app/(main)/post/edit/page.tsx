"use client";

import { buttonClasses, errorClasses } from "@/utils/classes";
import { editPost } from "@/actions/edit-post";
import { postSchema } from "@/actions/schemas";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function EditPage() {
  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onError: (error) => toast.error(error.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  });

  return (
    <main className="w-full px-2 flex flex-col my-4 flex-grow items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold p-2">
        edit post
      </h1>
      <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className="flex w-full flex-col gap-4 md:w-2/3"
      >
        <Input {...register("title")} label="Title" />
        {errors.title && (
          <span className={errorClasses}>{errors.title.message}</span>
        )}
        <Textarea {...register("content")} label="Your content here..." />
        {errors.content && (
          <span className={errorClasses}>{errors.content.message}</span>
        )}
        <Button className={`${buttonClasses} self-end`} type="submit">
          {isPending ? "Uploading post..." : "Post"}
        </Button>
      </form>
    </main>
  );
}
