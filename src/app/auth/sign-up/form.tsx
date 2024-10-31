"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { signUpSchema } from "@/actions/schemas";
import { signUp } from "@/actions/sign-up";
import { buttonClasses, inputClasses } from "@/utils/classes";

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form
      // onSubmit={handleSubmit((values) => mutate(values))}
      action={signUp}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("email")}
            label="Email"
            name="email"
            required
          />
          {/* {errror && } */}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("username")}
            label="Username"
            required
          />
          {/* {errror && } */}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("password")}
            type="password"
            label="Password"
            required
          />
          {/* {errror && } */}
        </div>
        <Button className={buttonClasses} type="submit" size="sm">
          Sign up
        </Button>
      </div>
    </form>
  );
};
