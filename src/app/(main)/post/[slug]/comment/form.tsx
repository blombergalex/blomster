"use client";


import { Button, Input } from "@nextui-org/react";
import { revalidatePath } from "next/cache";


export const CommentForm = ({currentPath}:{currentPath:string}) => {
  // const {mutate, isPending} = useMutation({
  //   mutationFn: 
  // })

  const refresh = () => {
    revalidatePath(currentPath)
  }


  return (
    <main className="p-2">
      <form 
      // onSubmit={}
      className="flex w-full gap-4 bg-transparent items-center">
        <Input label="Comment..." />
        {/* {error && (
          <span className={errorClasses}>{errors.comment.message}</span>
        )} */}
        <Button type="submit" onSubmit={refresh}>
          Add comment
          {/* {isPending ? "Adding comment..." : "Add comment"} */}
        </Button>
      </form>
    </main>
  );
};
