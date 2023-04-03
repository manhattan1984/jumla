"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const Footer = ({ links }) => {
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);

  const addToNewsLetter = async () => {
    setLoading(true);
    const email = emailRef.current.value;

    if (email) {
      try {
        const res = await fetch("/api/addtonewsletter", {
          method: "POST",
          body: JSON.stringify({ email }),
        });

        const { status } = res;
        if (status == 200) {
          toast(`You've been added to our newsletter`);
          emailRef.current.value = null;
        } else {
          toast("You're already signed up");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error");
      }
      setLoading(false);
      return;
    }
    toast("Please Enter Your Email");
    setLoading(false);
  };
  return (
    <>
      <Toaster />
      <div className="mt-2 uppercase text-xs py-2 lg:h-fit bg-neutral-800 text-white w-full p-2">
        <div className="lg:flex gap-[32px]">
          <div className="flex-1">
            <p className="pt-8 border-b border-white pb-4 text-xs font-bold">
              Main Menu
            </p>

            <div className=" mt-4">
              <ul className="flex flex-col gap-2">
                {links.map(({ link, name }) => (
                  <Link
                    className="uppercase hover:text-gray-300"
                    href={link}
                    key={name}
                  >
                    {name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          {/* <div className="flex-1">
          <p className="pt-8 border-b border-white pb-4 text-xs font-bold">
            More Info
          </p>

          <div className="flex flex-col gap-2 mt-4">
            <Link href="">Sizing Chart</Link>
            <Link href="">FAQ</Link>
            <Link href="">Return & Exchange</Link>
            <Link href="">Contact</Link>
            <Link href="">Search</Link>
            <Link href="">Privacy Policy</Link>
            <Link href="">Terms Of Service</Link>
          </div>
        </div> */}
          <div className="flex-1">
            <p className="pt-8 border-b border-white pb-4 text-xs font-bold">
              Newsletter
            </p>

            <div className="flex flex-col gap-2 mt-4">
              <p className="mb-1">
                Join to get special offers, free giveaway, and
                once-in-a-lifetime deals.
              </p>
              <div className="">
                <input
                  ref={emailRef}
                  placeholder="your-email@example.com"
                  className="w-full p-4 text-red-600"
                />
                <button
                  disabled={loading}
                  onClick={addToNewsLetter}
                  className="p-3 w-full border my-2 border-white text-xl uppercase text-center"
                >
                  {loading ? (
                    <span className="flex justify-center items-center">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-400"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span>Join</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:mt-8 pb-6 w-full text-center flex justify-center gap-2 items-center uppercase text-xs">
          <p>@ Jumla 2023</p>
          <p>powered by jacksonwebdev</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
