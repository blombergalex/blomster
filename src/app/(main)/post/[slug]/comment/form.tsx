"use client";

import { buttonClasses } from "@/utils/classes";

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
    <main>
      <form 
      // onSubmit={}
      className="flex w-full gap-4 md:w-2/3">
        <Input label="Comment..." />
        {/* {error && (
          <span className={errorClasses}>{errors.comment.message}</span>
        )} */}
        <Button type="submit" className={buttonClasses} onSubmit={refresh}>
          Add comment
          {/* {isPending ? "Adding comment..." : "Add comment"} */}
        </Button>
      </form>
    </main>
  );
};
