import supabase from "@/utils/supabase";
import React from "react";

export const revalidate = 0;

const page = async () => {
  return (
    <div className="text-center min-h-screen pt-5">
      <div className="mt-5">
        <p className="text-2xl font-medium mb-14">How can we help?</p>

        <div className="flex flex-col md:flex-row flex-wrap gap-10 text-left w-4/5 mx-auto [&>div]:basis-1/3 [&>div]:flex-1">
          <div className="">
            <p className="mb-1">
              First Name<sup>*</sup>
            </p>
            <input
              type="text"
              className="border-b border-gray-400 w-full pt-2 bg-transparent"
            />
          </div>
          <div className="basis-1/3">
            <p className="mb-1">
              Last Name<sup>*</sup>
            </p>
            <input
              type="text"
              className="border-b border-gray-400 w-full pt-2 bg-transparent"
            />
          </div>
          <div className="">
            <p className="mb-1">
              Email<sup>*</sup>
            </p>
            <input
              type="email"
              className="border-b border-gray-400 w-full pt-2 bg-transparent"
            />
          </div>
          <div className="">
            <p className="mb-1">
              Phone<sup></sup>
            </p>
            <input
              type="text"
              className="border-b border-gray-400 w-full pt-2 bg-transparent"
            />
          </div>

          <div className="">
            <p className="mb-1">
              Tell us more<sup></sup>
            </p>
            <textarea
              //   type="text"
              className="border border-gray-400 w-full h-48 pt-2 bg-transparent"
            />
          </div>
        </div>
        <div className="w-4/5 mx-auto">
          <div className="flex items-start gap-2">
            <input type="checkbox" className="mt-1" name="" id="" />
            <p>I would like to receive email communications from Jumla</p>
          </div>

          <button className="py-3 text-white bg-orange-400 uppercase mt-8 mb-14 w-full">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
