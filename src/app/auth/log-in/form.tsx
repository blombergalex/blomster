"use client";

import { logIn } from "@/actions/log-in";
import { logInSchema } from "@/actions/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const LogInForm = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: logIn,
    onError: (error) => console.log(error.message),
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
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <Input {...register("email")} label="Email" />
        {errors.email && (
          <span className="text-sm text-primary-300">{errors.email.message}</span>
        )}
        <Input {...register("password")} type="password" label="Password" />
        {errors.password && (
          <span className="text-sm text-primary-300">{errors.password.message}</span>
        )}
        <Button type="submit" size="sm">
          {isPending ? 'Logging in...' : 'Log in'}
        </Button>
        {error && <span className='text-sm text-primary-300'>{error.message}</span>}
      </div>
    </form>
  );
};
