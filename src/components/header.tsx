import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

import LogOutButton from "./logout-button";
import Navigation from "./navigation";
import { Button } from "@nextui-org/react";

const Header = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="flex text-foreground p-6 sticky top-0 border-b-2 border-t-gray-300 gap-1">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>
      </nav>
      {/* <Navigation/> */}
      {user ? (
        <>
          <LogOutButton />
          <Link href={"/create"}>
            <Button>Create post</Button>
          </Link>
        </>
      ) : (
        <Link href={"/auth/log-in"}>
          <Button>Log in</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
