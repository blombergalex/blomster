'use client'

import { Button } from '@nextui-org/react'
import { deletePost } from '@/actions/delete-post'
import { secondaryButtonClasses } from '@/utils/classes'
import { useMutation } from '@tanstack/react-query'

export const DeletePostButton = ({ postId } : { postId:string }) => {
  const { mutate } = useMutation({mutationFn:() => deletePost(postId)})

  return (
    <Button className={secondaryButtonClasses} onClick={() => mutate()}>Delete</Button>
  )
}
