import Link from "next/link"

const Header = () => {
  return (
    <header className="py-6 sticky top-0">
      <nav className="container flex items-center justify-between">
        <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header