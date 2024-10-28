import { useMutation } from "@tanstack/react-query";
import { logInSchema } from "@/actions/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers";
import { z } from "zod";

import { logIn } from "@/actions/log-in";
import { Button, Input } from "@nextui-org/react";

export const LogInForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: logIn,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(
        (values) => mutate(values),
        (error) => console.log({ error })
      )}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4 items-center">
        <Input type="email" label="Email" />
        <Input type="password" label="Password" />
        <Button type="submit" size="sm">
          Log in
        </Button>
      </div>
    </form>
  );
};
