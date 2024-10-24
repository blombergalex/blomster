import { logIn } from "@/actions/log-in";
import { Button, Input } from "@nextui-org/react";

export const LogInForm = () => {
  return (
    <form action={logIn} className="flex w-full max-w-md flex-col gap-4">
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input type="email" label="Email" required /> {/* or use username? */}
        <Input type="password" label="Password" required />
        <Button type="submit" size="sm">
          Log in
        </Button>
      </div>
    </form>
  );
};
