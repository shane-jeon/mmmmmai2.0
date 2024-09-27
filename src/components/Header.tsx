import { useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="p-8">
      <div className="flex items-center justify-between px-8">
        <Link href="/">
          <img src="/Logo.svg" alt="Logo" className="w-40 lg:w-80" />
        </Link>

        {/* Hamburger Menu Button for mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none"
            aria-label="Toggle menu">
            ☰
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden gap-8 lg:flex">
          <p className="text-2xl">
            <Link href="/about" className="hover:underline">
              About
            </Link>
          </p>
          <p className="text-2xl">
            <Link href="/contact" className="leading-3 hover:underline">
              Contact
            </Link>
          </p>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 lg:hidden">
          <p className="text-2xl">
            <Link
              href="/about"
              onClick={toggleMenu}
              className="mb-2 block hover:underline">
              About
            </Link>
          </p>
          <p className="text-2xl">
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="block hover:underline">
              Contact
            </Link>
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
