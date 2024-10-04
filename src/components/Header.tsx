import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    // <header className="border-4 border-black p-8">
    <header className="py-6 lg:py-8">
      <div className="mx-3 flex items-center justify-between lg:px-8">
        <Link href="/">
          {/* <img src="/Logo.svg" alt="Logo" className="w-40 lg:w-80" /> */}
          <Image
            src="/Logo.svg"
            alt="Logo"
            className="w-40 sm:w-40 md:w-80 lg:w-80"
            width={160} // Corresponds to `w-40` for mobile
            height={40}
          />
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
        <div className="mt-4 text-center lg:hidden">
          <p className="text-2xl">
            <Link
              href="/about"
              onClick={toggleMenu}
              className="mb-4 mt-6 block hover:underline">
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
