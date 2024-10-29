'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";

import { signUpSchema } from "@/actions/schemas";
import { signUp } from "@/actions/sign-up";

export const SignUpForm = () => {

  const {register, handleSubmit} = useForm({
    resolver: zodResolver(signUpSchema)
  })

  return (
    <form onSubmit={handleSubmit((values) => console.log(values))} className="flex w-full flex-col max-w-md gap-4">
      <div className="flex flex-col gap-4 items-center mx-4">
        <Input {...register('email')} label="Email" name="email" required /> 
        <Input {...register('username')} label="Username" required/>
        <Input {...register('password')} type="password" label="Password" required />
        <Button type="submit" size="sm">
          Sign up
        </Button>
      </div>
    </form>
  );
};
