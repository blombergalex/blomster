'use client'

import { Button } from '@nextui-org/react'
import { deletePost } from '@/actions/delete-post'
import { secondaryButtonClasses } from '@/utils/classes'

export const DeletePostButton = ({ postId } : { postId:string }) => {
  return (
    <Button className={secondaryButtonClasses} onClick={() => deletePost(postId)}>Delete</Button>
  )
}
