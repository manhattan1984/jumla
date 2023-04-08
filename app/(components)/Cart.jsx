"use client";
import { commerce } from "@/utils/commerce";
import supabase from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useCart, useCartDispatch } from "../(context)/CartContext";
import Spinner from "./Spinner";

const CartItem = ({
  item: {
    name,
    image: { url },
    permalink,
    variant,
    quantity,
    line_total: { formatted_with_symbol },
    product_id,
    selected_options,
    id,
  },
}) => {
  const { setCart } = useCartDispatch();
  const hasVariants = selected_options.length >= 1;

  const [loading, setLoading] = useState(false);

  const handleUpdateCart = (cart) => {
    setCart(cart);

    return cart;
  };

  const handleRemoveItem = () => {
    setLoading(true);
    commerce.cart
      .remove(id)
      .then(handleUpdateCart)
      .then(({ subtotal }) => {
        setLoading(false);
      });
  };

  const decrementQuantity = () => {
    setLoading(true);
    quantity > 1
      ? commerce.cart
          .update(id, { quantity: quantity - 1 })
          .then(handleUpdateCart)
          .then(({ subtotal }) => {
            setLoading(false);
          })
      : handleRemoveItem();
  };

  const incrementQuantity = () => {
    setLoading(true);
    commerce.cart
      .update(id, { quantity: quantity + 1 })
      .then(handleUpdateCart)
      .then(({ subtotal }) => {
        setLoading(false);
      });
  };
  return (
    <div className="relative">
      <div
        className={`relative flex gap-2 justify-between p-8 border-b items-center ${
          loading ? "opacity-50" : ""
        }`}
      >
        <Image height={60} width={60} src={url} alt={name} />
        <div className="w-full">
          <div className="">
            <Link href={`/products/${permalink}`} className="underline">
              {name}
            </Link>
            {hasVariants && (
              <p>
                {selected_options.map(({ option_name }, index) => (
                  <React.Fragment key={index}>
                    {index ? `, ${option_name}` : option_name}
                  </React.Fragment>
                ))}
              </p>
            )}
          </div>
          <div className="flex mt-2 text-center font-medium w-full md:w-1/2">
            <button onClick={decrementQuantity} className="border w-full">
              -
            </button>
            <p className="border w-full">{quantity}</p>
            <button onClick={incrementQuantity} className="border w-full">
              +
            </button>
          </div>
        </div>
        <div className="">
          <AiOutlineDelete
            onClick={handleRemoveItem}
            className="cursor-pointer text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-4">{formatted_with_symbol}</p>
        </div>
      </div>
      <div
        className={`absolute top-1/2 text-center w-full ${
          loading ? "block" : "hidden"
        }`}
      >
        <Spinner />
      </div>
    </div>
  );
};

const Cart = () => {
  const { open, setOpen, line_items, subtotal, hosted_checkout_url } =
    useCart();

  const router = useRouter();

  return (
    <>
      <Toaster />
      <div
        className={`ease-in-out duration-300 ${
          open ? "" : "translate-x-full"
        }  z-20 h-screen w-screen flex fixed top-0 items-center justify-end`}
      >
        <div
          onClick={() => {
            setOpen(false);
          }}
          className="absolute left-0 h-screen w-screen backdrop-brightness-50 z-20"
        />
        <div className="absolute h-[99%] w-4/5 bg-white rounded-md m-2 p-2 max-w-md text-black z-30">
          <div className="flex items-center uppercase border-b p-2 border-gray-300">
            <p className="flex-1 text-center text-sm">Your Cart</p>
            <AiOutlineClose
              className="cursor-pointer text-black text-lg"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>

          <div className="h-4/5 overflow-y-auto">
            {line_items.length === 0 ? (
              <div className="text-center p-8 border-b">
                <p className="uppercase font-light tracking-wider text-gray-500">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-500 mt-2 mb-4">
                  Add your favorite items to your cart.
                </p>

                <button
                  onClick={() => {
                    router.push("/");
                    setOpen(false);
                  }}
                  className="w-full bg-orange-400 text-white p-2"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              line_items.map((item, index) => (
                <CartItem item={item} key={index} />
              ))
            )}
          </div>

          <div className="w-full p-4 mb-2">
            <div className="flex justify-between font-medium text-sm">
              <p>Subtotal ({line_items.length} item(s))</p>
              <p>{subtotal.formatted_with_symbol}</p>
            </div>

            {/* <button
              onClick={() => {
                if (line_items.length !== 0) {
                  setOpen(false);
                  router.push("/checkout");
                  return;
                }
                toast("Your Cart Is Empty, Add Items To Check Out");
              }}
              className="w-full bg-orange-600 text-white p-2"
            >
              Checkout
            </button> */}

            <a
              href={hosted_checkout_url}
              className="w-full block text-center bg-orange-400 text-white p-2 mt-1"
            >
              Checkout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
