import Link from "next/link"
import Themeswitcher from "../ThemeSwitcher"

const Header = () => {
  return (
    <header className="flex py-6 sticky top-0">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
      <Themeswitcher />
    </header>
  )
}

export default Header