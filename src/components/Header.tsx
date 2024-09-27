// import Image from "next/image";
import Link from "next/link";
// import logo from "../public/Logo.svg";

const Header = () => {
  return (
    <header className="p-8">
      <div className="flex-center flex items-center justify-between px-8">
        <img src="/Logo.svg" alt="Logo" className="w-80" />
        <div className="flex gap-8">
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
    </header>
  );
};

export default Header;
