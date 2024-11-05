'use client'

import { Button } from '@nextui-org/react'
import { deletePost } from '@/actions/delete-post'
import { secondaryButtonClasses } from '@/utils/classes'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const DeletePostButton = ({ postId } : { postId:string }) => {
  const { mutate } = useMutation({
    mutationFn:() => deletePost(postId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Deleted post'),
    onMutate: () => toast.loading('Deleting post'),
    onSettled: () => toast.dismiss(),
  })

  return (
    <Button className={secondaryButtonClasses} onClick={() => mutate()}>Delete</Button>
  )
}
