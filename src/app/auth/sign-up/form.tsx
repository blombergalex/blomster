'use client'

import { signUp } from "@/actions/sign-up";
import { Button, Input } from "@nextui-org/react";

export const SignUpForm = () => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      (e.key === 'Enter' || e.key === 'NumpadEnter')
    ) {
      e.preventDefault()
      e.currentTarget.form?.requestSubmit()
    }
  }

  return (
    <form action={signUp} onKeyDown={handleKeyDown} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-4 items-center mx-4">
        <Input type="email" label="Email" name="email" required /> 
        <Input label="Username" required/>
        <Input type="password" label="Password" name="password" required />
        <Button type="submit" size="sm">
          Sign up
        </Button>
      </div>
    </form>
  );
};
