import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { UserCircleIcon as SolidUserCircleIcon} from "@heroicons/react/16/solid";

import LogOutButton from "./logout-button";
import Navigation from "./navigation";
import { Button } from "@nextui-org/react";
import { buttonClasses } from "@/utils/classes";

const Header = async () => {
  const supabase = createClient();
  
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let username = null;
  
  if (user) {
    const {data, error} = await supabase.from('users').select('id, username').eq('id', user.id)
    
    if (error) {
      console.log('Error getting user info', error)
    }
    
    if (data && data.length > 0) {
      const [{ username: fetchedUsername }] = data;
      username = fetchedUsername; 
    }
  }

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
          <Link href={"/create"} className="self-center">
            <Button className={buttonClasses}>Create post</Button>
          </Link>
          <div className="mx-2">
            <h3 className="text-medium uppercase font-semibold text-primary">{username}</h3>
            <SolidUserCircleIcon className="text-primary" />
          </div>
        </>
      ) : (
        <Link href={"/auth/log-in"}>
          <Button className={buttonClasses}>Log in</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
