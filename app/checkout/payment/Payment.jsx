"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

import { useCart, useLocalStorage } from "../../(context)/CartContext";
import { toast, Toaster } from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";

const Payment = ({ paymentTypes }) => {
  const router = useRouter();

  const [userInfo] = useLocalStorage("userInfo", null);
  const [shippingMethod] = useLocalStorage("shippingMethod", null);

  const [handlingPayment, setHandlingPayment] = useState(false);

  if (!userInfo || !Object.values(userInfo).every((value) => value)) {
    redirect("/checkout");
  }

  const [cartProducts, setCartProducts] = useLocalStorage("cartProducts", []);

  const {
    email,
    address,
    state,
    city,
    country,
    zipcode,
    apartment,
    firstName,
    lastName,
    phone,
  } = userInfo;

  const name = `${firstName} ${lastName}`;
  const fullAddress = `${apartment}, ${address}, ${city}, ${zipcode}, ${state}, ${country}`;

  const [paymentType, setPaymentType] = useState();

  const total = getTotalCost() + shippingCost;
  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: total * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    // insertOrderToDatabase().then(() => router.push("/checkout/success"));
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
    setHandlingPayment(false);
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Toaster />
      <div className="border p-4">
        <div className="">
          <div className="flex justify-between">
            <p className="text-gray-500">Contact</p>
            <button
              className="text-gray-700"
              onClick={() => router.push("/checkout")}
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
            <button
              className="text-gray-700"
              onClick={() => router.push("/checkout")}
            >
              Change
            </button>
          </div>
          <p>{fullAddress}</p>
        </div>
        <div className="h-[1px] bg-gray-200 my-4"></div>
        <div className="">
          <div className="flex justify-between">
            <p className="text-gray-500">Method</p>
          </div>
          <p>Courier - Duties and Taxes included · ${total}</p>
        </div>
      </div>

      {/* {paymentTypes.map(({ id, value }) => (
        <div key={id} className="border p-4 mt-4">
          <div className="flex gap-2">
            <input
              onChange={(e) => {
                setPaymentType(+e.target.value);
              }}
              type="radio"
              name="paymentType"
              value={id}
              id={id}
            />
            <div className="">{value}</div>
          </div>
        </div>
      ))} */}

      <button
        onClick={async () => {
          setHandlingPayment(true);
          initializePayment(onSuccess, onClose);
        }}
        disabled={handlingPayment}
        className="bg-red-600 text-white p-4 w-full mt-2"
      >
        {handlingPayment ? (
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
          <span>Pay Now</span>
        )}
      </button>
      <button
        onClick={() => router.push("/checkout/shipping")}
        className="p-4 w-full"
      >
        {"< Return to shipping"}
      </button>
    </>
  );
};

export default Payment;
