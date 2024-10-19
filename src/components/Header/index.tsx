import Link from "next/link"
import Themeswitcher from "../ThemeSwitcher"
import Navigation from "../Navigation"

const Header = () => {
  return (
    <header className="flex p-6 sticky top-0">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
          <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
      <Themeswitcher />
      <Navigation/>
    </header>
  )
}

export default Header