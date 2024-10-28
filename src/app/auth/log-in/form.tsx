'use client'

import { logIn } from "@/actions/log-in";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export const LogInForm = () => {

  return (
    <form
      action={logIn}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <Input type="email" name="email" label="Email" /> {/* or use username? */}
        <Input type="password" name="password" label="Password" />
        <Button type="submit" size="sm">
          Log in
        </Button>
      </div>
    </form>
  );
};
