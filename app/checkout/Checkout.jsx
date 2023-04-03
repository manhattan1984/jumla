"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocalStorage } from "../(context)/CartContext";

const Checkout = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", null);

  const [email, setEmail] = useState(userInfo?.email);
  const [country, setCountry] = useState(userInfo?.country);
  const [firstName, setFirstName] = useState(userInfo?.firstName);
  const [lastName, setLastName] = useState(userInfo?.lastName);
  const [address, setAddress] = useState(userInfo?.address);
  const [city, setCity] = useState(userInfo?.city);
  const [apartment, setApartment] = useState(userInfo?.apartment);
  const [state, setState] = useState(userInfo?.state);
  const [zipcode, setZipcode] = useState(userInfo?.zipcode);
  const [phone, setPhone] = useState(userInfo?.phone);

  const info = {
    email,
    country,
    firstName,
    lastName,
    address,
    city,
    apartment,
    state,
    zipcode,
    phone,
  };

  return (
    <>
      <p className="mb-2 text-2xl">Contact Information</p>
      <input
        placeholder="Email"
        className="w-full border p-2"
        type="email"
        name=""
        id=""
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className="mb-2 mt-4">Shipping address</p>
      <input
        placeholder="Country"
        type="text"
        name=""
        id=""
        className="w-full border p-2 mt-2"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        placeholder="First name"
        type="text"
        name=""
        id=""
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="Last name"
        type="text"
        name=""
        id=""
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="w-full border p-2 mt-2"
      />

      <input
        placeholder="Address"
        type="text"
        name=""
        id=""
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="Apartment"
        type="text"
        name=""
        id=""
        value={apartment}
        onChange={(e) => setApartment(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="City"
        type="text"
        name=""
        id=""
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="State"
        type="text"
        name=""
        id=""
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="Zip Code"
        type="text"
        name=""
        id=""
        value={zipcode}
        onChange={(e) => setZipcode(e.target.value)}
        className="w-full border p-2 mt-2"
      />
      <input
        placeholder="Phone"
        type="text"
        name=""
        id=""
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-2 mt-2"
      />

      <button
        onClick={() => {
          if (Object.values(info).every((value) => value)) {
            setUserInfo(info);
            router.push("/checkout/shipping");

            return;
          }
          toast.error("Please Fill Form Completely");
        }}
        className="w-full p-2 bg-red-600 text-white mt-4"
      >
        Continue to shipping
      </button>

      <button
        onClick={() => router.push("/products")}
        className="w-full p-2 text-sm text-gray-600 mt-2"
      >
        {"<"} Return to shopping
      </button>
    </>
  );
};

export default Checkout;
