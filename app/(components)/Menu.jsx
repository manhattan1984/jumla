"use client";
import Link from "next/link";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useMenu } from "../(context)/MenuContext";

const Menu = ({ links }) => {
  const { menuOpen, setMenuOpen } = useMenu();

  return (
    <>
      <div
        className={`ease-in-out duration-300 ${
          menuOpen ? "" : "-translate-x-full"
        }  z-20 h-screen w-screen flex fixed top-0 items-center justify-start`}
      >
        <div
          onClick={() => {
            setMenuOpen(false);
          }}
          className="absolute right-0 h-screen w-screen backdrop-brightness-50 z-20"
        />
        <div className="absolute h-full w-4/5  p-2 max-w- bg-gray-100 z-30">
          <div className="flex items-center uppercase border-b p-2 border-gray-300">
            <div className="flex justify-between items-center w-full">
              <p className="">Jumla</p>
              <AiOutlineClose
                className="cursor-pointer  text-lg ml-auto"
                onClick={() => {
                  setMenuOpen(false);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center my-auto h-1/2">
            {links.map(({ name, link }) => (
              <Link
                onClick={() => {
                  setMenuOpen(false);
                }}
                className="text-xl"
                href={link}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
