"use client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";
import { useLocalStorage } from "../(context)/CartContext";

const Layout = ({ children }) => {
  const [cartProducts] = useLocalStorage("cartProducts", []);

  if (cartProducts === null && cartProducts.length === 0) {
    redirect("/products");
  }

  return (
    <>
      <Toaster />
      <div className="h-full mt-8 bg-white text-black py-8 flex items-center">
        <div className="w-4/5 mx-auto max-w-md">
          <nav className="mt-12 text-black mb-4">
            <ul className="flex gap-2 ">
              <li>
                <Link href="/checkout">Information</Link>
              </li>
              <p>{">"}</p>
              <li>
                <Link href="/checkout/shipping">Shipping</Link>
              </li>
              <p>{">"}</p>
              <li>
                <Link href="/checkout/payment">Payment</Link>
              </li>
            </ul>
          </nav>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
