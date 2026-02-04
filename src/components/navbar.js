"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { TbLogin2 } from "react-icons/tb";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavMobile = () => {
    setIsOpen((prevState) => !prevState);
  };

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Checkout",
      href: "/checkout",
    },
    {
      label: "Login",
      href: "/login",
      icon: <TbLogin2 className="size-6 lg:size-7" />,
    },
    {
      label: "Cart",
      href: "/cart",
      icon: <BsCartCheck className="size-6 lg:size-7" />,
      cartCount: 4, // nanti ganti dari cart context
    },
  ];

  // TODO: ganti isi cartCount dengan value dari cart context yang isinya untuk menghitung jumlah data di cart

  const pathname = usePathname();

  return (
    <nav className="flex flex-row-reverse items-center justify-between border-b-2 border-white/15 pb-4 lg:flex-row">
      {/* nama toko */}
      <h1 className="cursor-pointer text-lg font-bold duration-200 hover:text-purple-400 md:text-2xl xl:text-4xl">
        Next Shop
      </h1>
      {/* ./ nama toko */}

      {/* mobile nav */}
      <div className="relative place-self-start lg:hidden">
        {/* icon nav */}
        {isOpen ? (
          <MdClose onClick={handleNavMobile} className="fixed z-20 size-6" />
        ) : (
          <RxHamburgerMenu onClick={handleNavMobile} className="size-6" />
        )}

        {/* ./ icon nav */}

        {/* nav item list */}

        <div
          className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-10 flex h-screen w-screen flex-col items-center justify-center gap-12 bg-black`}
        >
          {navItems.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                onClick={() => setIsOpen(false)}
                className={`${pathname === item.href ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
              >
                {item.label === "Login" ? (
                  <div className="flex items-center gap-2">
                    {item.icon} <span className="">Login</span>
                  </div>
                ) : item.icon ? (
                  item.icon
                ) : (
                  item.label
                )}

                {item.cartCount > 0 && (
                  <span className="text-xl font-semibold text-purple-400">
                    2
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* ./ nav item list */}
      </div>
      {/* ./ mobile nav */}

      {/* desktop nav */}
      <div className="hidden lg:block">
        {/* nav item */}
        <div className="flex items-center lg:gap-12 xl:gap-20">
          {navItems.map((item) => {
            return (
              <Link
                href={item.href}
                key={item.label}
                className={`${pathname === item.href ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium duration-200 hover:text-purple-400`}
              >
                {item.label === "Login" ? (
                  <div className="flex items-center gap-2">
                    {item.icon} <span className="">Login</span>
                  </div>
                ) : item.icon ? (
                  item.icon
                ) : (
                  item.label
                )}

                {item.cartCount > 0 && (
                  <span className="text-xl font-semibold text-purple-400">
                    2
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        {/* ./ nav item */}
      </div>
      {/* ./ desktop nav */}
    </nav>
  );
}
