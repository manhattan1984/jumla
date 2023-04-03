"use client";
import supabase from "@/utils/supabase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { useCart } from "../(context)/CartContext";

const CartRecommendation = ({ name, price, product_image, id }) => {
  const { addOneToCart } = useCart();

  return (
    <div className="flex justify-between w-full items-center p-4 border-b gap-4">
      <Image
        alt={name}
        src={product_image}
        height={90}
        width={90}
        // sizes={"50%"}
        // className="h-20 w-32"
      />
      <div className="w-full">
        <p className="mb-2 text-sm font-medium">{name}</p>
        <p className="text-sm text-gray-500">${price}</p>
      </div>
      <button
        className="text-gray-700"
        onClick={() => {
          addOneToCart(id);
        }}
      >
        Add
      </button>
    </div>
  );
};

const CartItem = ({ id, quantity }) => {
  const { addOneToCart, removeOneFromCart, deleteFromCart } = useCart();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProduct() {
      let { data, error } = await supabase
        .from("product_item")
        .select(
          "*, product (name, id, product_image), variation_option_id (value)"
        )
        .eq("id", id)
        .single();

      setProduct(data);
    }

    getProduct();
  }, []);

  if (product) {
    const {
      product: { name, id: product_id, product_image },
      price,
      variation_option_id: { value: size },
    } = product;

    return (
      <div className="flex gap-2 justify-between p-8 border-b items-center">
        <Image height={60} width={60} src={product_image} alt={name} />
        <div className="w-full">
          <div className="">
            <Link href={`/products/${product_id}`} className="underline">
              {name}
            </Link>
            <p className="text-xs">
              size: <span className="uppercase">{size}</span>
            </p>
          </div>
          <div className="flex mt-2 text-center font-medium w-1/2">
            <button
              onClick={() => removeOneFromCart(id)}
              className="border w-full"
            >
              -
            </button>
            <p className="border w-full">{quantity}</p>
            <button onClick={() => addOneToCart(id)} className="border w-full">
              +
            </button>
          </div>
        </div>
        <div className="">
          <AiOutlineDelete
            onClick={() => deleteFromCart(id)}
            className="cursor-pointer text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-4">₦{price}</p>
        </div>
      </div>
    );
  }
};
const Cart = () => {
  const { open, setOpen, cartProducts, total, getTotalCost } = useCart();

  const router = useRouter();

  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      let { data, error } = await supabase.rpc("get_random_products");

      if (error) console.error(error);
      else console.log(data);

      setRecommendedProducts(data);
    }

    getProducts();
  }, [cartProducts]);

  useEffect(() => {
    getTotalCost();
  }, [cartProducts]);

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
            {cartProducts.length === 0 ? (
              <div className="text-center p-8 border-b">
                <p className="uppercase font-light tracking-wider text-gray-500">
                  Your cart is empty
                </p>
                <p className="text-xs text-gray-500 mt-2 mb-4">
                  Add your favorite items to your cart.
                </p>

                <button
                  onClick={() => {
                    router.push("/products");
                    setOpen(false);
                  }}
                  className="w-full bg-orange-600 text-white p-2"
                >
                  Shop Now
                </button>
              </div>
            ) : (
              cartProducts.map((item, index) => (
                <CartItem {...item} key={index} />
              ))
            )}
          </div>

          <div className="w-full p-4">
            <div className="flex justify-between font-medium">
              <p>Subtotal ({cartProducts.length} item(s))</p>
              <p>₦{cartProducts.length !== 0 ? total : 0}</p>
            </div>

            <button
              onClick={() => {
                if (cartProducts.length !== 0) {
                  setOpen(false);
                  router.push("/checkout");
                  return;
                }
                toast("Your Cart Is Empty, Add Items To Check Out");
              }}
              className="w-full bg-orange-600 text-white p-2"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
