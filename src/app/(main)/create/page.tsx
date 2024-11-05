'use client'

import { postSchema } from "@/actions/schemas"
import { createPost } from "@/actions/create-post"

import { Button, Input } from "@nextui-org/react"
import { Textarea } from "@nextui-org/input";
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { buttonClasses, errorClasses } from "@/utils/classes";

export default function CreatePage() {
  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onError: (error) => toast.error(error.message)
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
  })

  return (
    <main className="w-full px-2 flex flex-col my-4 flex-grow items-center">
      <h1 className="text-tiny text-foreground uppercase font-bold p-2">
        create post
      </h1>
        <form
        onSubmit={handleSubmit((values) => mutate(values))}
        className='flex w-full flex-col gap-4 md:w-2/3'
      >
        <Input {...register('title')} label='Title' />
        {errors.title && <span className={errorClasses}>{errors.title.message}</span>}
        <Textarea {...register('content')} label='Your content here...' />
        {errors.content && <span className={errorClasses}>{errors.content.message}</span>}
        <Button className={`${buttonClasses} self-end`} type="submit">
          {isPending ? 'Uploading post...' : 'Post'}
        </Button>
      </form>
    </main>
  )
}
