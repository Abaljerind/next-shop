"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { TbLogin2, TbLogout2 } from "react-icons/tb";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleNavMobile = () => {
    setIsOpen((prevState) => !prevState);
  };

  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
    router.push("/login");
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
  ];

  // TODO: ganti isi cartCount dengan value dari cart context yang isinya untuk menghitung jumlah data di cart

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
                {item.label}
              </Link>
            );
          })}

          {!isLoggedIn ? (
            <Link
              href={"/login"}
              onClick={() => setIsOpen(false)}
              className={`${pathname === "/login" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
            >
              <TbLogin2 className="size-7" />
              Login
            </Link>
          ) : (
            <>
              <Link
                href={"/cart"}
                className={`${pathname === "/cart" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
              >
                <BsCartCheck className="size-7" />
                <span className="text-purple-400">2</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 text-xl font-medium"
              >
                Logout <TbLogout2 className="size-7" />
              </button>
            </>
          )}
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
                {item.label}
              </Link>
            );
          })}

          {!isLoggedIn ? (
            <Link
              href={"/login"}
              onClick={() => setIsOpen(false)}
              className={`${pathname === "/login" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium hover:text-purple-400`}
            >
              <TbLogin2 className="size-7" />
              Login
            </Link>
          ) : (
            <>
              <Link
                href={"/cart"}
                className={`${pathname === "/cart" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium hover:text-purple-400`}
              >
                <BsCartCheck className="size-7" />
                <span className="text-purple-400">2</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-2 text-xl font-medium hover:text-red-500"
              >
                Logout <TbLogout2 className="size-7" />
              </button>
            </>
          )}
        </div>
        {/* ./ nav item */}
      </div>
      {/* ./ desktop nav */}
    </nav>
  );
}
