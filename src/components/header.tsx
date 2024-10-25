import Link from "next/link"

import Navigation from "./navigation"
import ThemeSwitcher from "./theme-switcher"

const Header = () => {
  return (
    <header className="flex text-foreground p-6 sticky top-0">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
          <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
      {/* <ThemeSwitcher /> */}
      {/* <Navigation/> */}
    </header>
  )
}

export default Header