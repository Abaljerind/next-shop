"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsCartCheck } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { TbLogin2, TbLogout2 } from "react-icons/tb";
import { FaMinus, FaPlus } from "react-icons/fa6";

import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice } =
    useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const handleCart = () => {
    setIsCartOpen((prevState) => !prevState);
    setIsOpen(false);
  };

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
          <MdClose onClick={handleNavMobile} className="fixed z-30 size-6" />
        ) : (
          <RxHamburgerMenu onClick={handleNavMobile} className="size-6" />
        )}

        {/* ./ icon nav */}

        {/* nav item list */}

        <div
          className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-20 flex h-screen w-screen flex-col items-center justify-center gap-12 bg-black`}
        >
          <Link
            href={"/"}
            onClick={() => setIsOpen(false)}
            className={`${pathname === "/" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
          >
            Home
          </Link>

          <Link
            href={"/checkout"}
            onClick={() => setIsOpen(false)}
            className={`${pathname === "/checkout" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
          >
            Checkout
          </Link>

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
              <button
                onClick={handleCart}
                className="flex cursor-pointer items-center gap-2 text-xl font-medium"
              >
                <BsCartCheck className="size-7" />
                <span className="text-purple-400">
                  {cart.length > 0 ? cart.length : "Cart"}
                </span>
              </button>
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

      {/* cart items */}
      {isCartOpen && (
        <div className="fixed inset-0 left-1/2 mt-4 flex w-80 -translate-x-1/2 flex-col justify-between rounded-lg bg-[#1a1a1a] py-4 lg:top-6 lg:right-6 lg:bottom-6 lg:left-auto lg:translate-x-0">
          <div className="space-y-4 overflow-y-scroll">
            {/* header */}
            <div className="flex items-center justify-between px-4">
              <h3 className="text-lg font-semibold">My Order</h3>
              <MdClose
                onClick={() => setIsCartOpen(false)}
                className="size-6 cursor-pointer"
              />
            </div>
            {/* ./ header */}

            {/* item list */}
            <div className="grid">
              {/* item cart */}
              {cart.length === 0 && <p className="p-4">Cart Empty</p>}

              {cart.map((item) => {
                return (
                  <div
                    className="flex items-center justify-between border-t border-b border-white/15 p-4"
                    key={item.id}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="mx-auto aspect-square w-16 rounded-lg bg-gray-500 object-cover object-top"
                      />
                      <div className="space-y-2">
                        <div className="space-y-0.5">
                          <p className="line-clamp-1 text-sm">{item.title}</p>
                          <p className="text-sm font-semibold">${item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaMinus
                            onClick={() => decreaseQty(item.id)}
                            className="size-5 cursor-pointer rounded-full bg-red-500 p-1"
                          />
                          <p className="">{item.quantity}</p>
                          <FaPlus
                            onClick={() => increaseQty(item.id)}
                            className="size-5 cursor-pointer rounded-full bg-green-500 p-1"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=""
                    >
                      <MdClose className="size-5 cursor-pointer" />
                    </button>
                  </div>
                );
              })}
              {/* ./ item cart */}
            </div>
            {/* ./ item list */}
          </div>

          {/* total price item */}
          <div className="space-y-4 border-t-2 border-white/15 p-4">
            <div className="flex items-center justify-between">
              <p className="">Total</p>
              <p className="">${totalPrice.toFixed(2)}</p>
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg bg-[#0a0a0a] py-2"
            >
              Checkout
            </button>
          </div>
          {/* ./ total price item */}
        </div>
      )}
      {/* ./ cart items */}

      {/* desktop nav */}
      <div className="hidden lg:block">
        {/* nav item */}
        <div className="flex items-center lg:gap-12 xl:gap-20">
          <Link
            href={"/"}
            className={`${pathname === "/" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium duration-200 hover:text-purple-400`}
          >
            Home
          </Link>

          <Link
            href={"/checkout"}
            onClick={() => setIsOpen(false)}
            className={`${pathname === "/checkout" ? "text-purple-400" : ""} flex items-center gap-2 text-xl font-medium`}
          >
            Checkout
          </Link>

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
              <button
                onClick={handleCart}
                className="flex cursor-pointer items-center gap-2 text-xl font-medium"
              >
                <BsCartCheck className="size-7" />
                <span className="text-purple-400">
                  {cart.length > 0 ? cart.length : "Cart"}
                </span>
              </button>
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
