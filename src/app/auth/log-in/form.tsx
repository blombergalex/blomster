"use client";

import { logIn } from "@/actions/log-in";
import { logInSchema } from "@/actions/schemas";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { errorClasses, buttonClasses, inputClasses } from "@/utils/classes";

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
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("email")}
            label="Email"
          />
          {errors.email && (
            <span className={errorClasses}>{errors.email.message}</span>
          )}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("password")}
            type="password"
            label="Password"
          />
          {errors.password && (
            <span className={errorClasses}>{errors.password.message}</span>
          )}
        </div>
        <Button className={buttonClasses} type="submit" size="sm">
          {isPending ? "Logging in..." : "Log in"}
        </Button>
        {error && <span className={errorClasses}>{error.message}</span>}
      </div>
    </form>
  );
};
