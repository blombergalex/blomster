"use client";

import { buttonClasses } from "@/utils/classes";

import { Button, Input } from "@nextui-org/react";

export const CommentForm = () => {
  return (
    <main>
      <form className="flex w-full flex-col gap-4 md:w-2/3">
        <Input label="Comment..." />
        {/* {error && (
          <span className={errorClasses}>{errors.comment.message}</span>
        )} */}
        <Button type="submit" className={buttonClasses}>
          Add comment
          {/* {isPending ? "Adding comment..." : "Add comment"} */}
        </Button>
      </form>
    </main>
  );
};
