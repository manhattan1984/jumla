"use client";
import { redirect, useRouter } from "next/navigation";
import { useLocalStorage } from "@/app/(context)/CartContext";
import React, { useState } from "react";
import { useCart } from "../../(context)/CartContext";
import { RadioGroup } from "@headlessui/react";

const Shipping = ({ shippingMethods }) => {
  const router = useRouter();

  const [userInfo] = useLocalStorage("userInfo", null);
  const { getTotalCost, shippingCost, setShippingCost } = useCart();

  if (!userInfo || !Object.values(userInfo).every((value) => value)) {
    redirect("/checkout");
  }

  const { email, address, state, city, country, zipcode, apartment } = userInfo;

  const fullAddress = `${apartment}, ${address}, ${city}, ${zipcode}, ${state}, ${country}`;

  const [shippingMethod, setShippingMethod] = useLocalStorage(
    "shippingMethod",
    null
  );

  return (
    <>
      <div className="border p-4">
        <div className="">
          <div className="flex justify-between">
            <p className="text-gray-500">Contact</p>
            <button
              className="text-gray-700"
              onClick={() => {
                router.back();
              }}
            >
              Change
            </button>
          </div>
          <p>{email}</p>
        </div>
        <div className="h-[1px] bg-gray-200 my-4"></div>
        <div className="">
          <div className="flex justify-between">
            <p className="text-gray-500">Ship to</p>
            <button className="text-gray-700" onClick={() => router.back()}>
              Change
            </button>
          </div>
          <p>{fullAddress}</p>
        </div>
      </div>

      <div className="">
        <p className="text-xl mt-8 mb-1">Shipping method</p>
        <p>
          The transit time estimates displayed below for USPS are for time
          in-transit with the carrier. This does not include the 48 hour
          processing time at our facility during regular business hours, nor
          does it account unforeseen issues with transit, such as severe
          weather, etc.
        </p>

        {shippingMethods.map(({ id, name, price }) => (
          <div key={id} className="border p-4 mt-4">
            <div className="flex gap-2">
              <input
                onChange={(e) => {
                  setShippingMethod(e.target.value);
                  setShippingCost(price);
                }}
                type="radio"
                name="shipping_method"
                value={id}
                id={id}
              />
              <div className="">
                <div className="flex items-center gap-2 justify-between">
                  <p className="text-sm">{name} - Duties and Taxes included</p>
                  <p>N{price + getTotalCost()}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Total includes taxes and duties
                </p>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={() => router.push("/checkout/payment")}
          className="w-full bg-red-600 text-white p-4 rounded mt-4"
          disabled={!shippingMethod}
        >
          Continue To Payment
        </button>
        <button
          onClick={() => router.push("/checkout")}
          className="w-full text-current p-4"
        >
          {" "}
          {"<"} Return to information
        </button>
      </div>
    </>
  );
};

export default Shipping;
