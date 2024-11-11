"use client";

import { CardBody } from "@nextui-org/react";
import { Tables } from "@/utils/supabase/database.types";

type commentType = Pick<Tables<"comments">, "content" | "user"> 
// & 
//   Pick<Tables<"users">, "username">;

export const Comment = ({ content, user }: commentType) => {
  return (
    <CardBody className="overflow-visible py-2 px-4">
      <p className="text-tiny uppercase font-bold">@{user}</p>
      <p>{content}</p>
    </CardBody>
  );
};
