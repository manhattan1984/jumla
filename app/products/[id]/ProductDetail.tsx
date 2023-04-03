"use client";
import ProductList from "@/app/(components)/ProductList";
import PageWrapper from "@/app/(components)/PageWrapper";
import { useCart } from "@/app/(context)/CartContext";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { motion as m, AnimatePresence } from "framer-motion";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductDetail = ({
  product: {
    name,
    description,
    product_image,
    product_item,
    product_other_images: product_images,
  },
}: {
  product: {
    name: string;
    description: string;
    product_image: string;
    product_item: {
      id: number;
      price: number;
      variation_option: {
        value: string;
        id: number;
      };
      variation_option_id: number;
    }[];
    product_other_images: {
      product_image: string;
    }[];
  };
}) => {
  const { serverProducts } = useCart();
  let related = serverProducts?.slice(0, 4);
  const { addOneToCart, removeOneFromCart, setOpen } = useCart();

  const [price, setPrice] = useState();
  const [productItemId, setProductItemId] = useState();

  const [selectedImage, setSelectedImage] = useState(null);

  const variantRef = useRef<HTMLInputElement>();

  const handleVariantChange = (e: { target: { value: string | number } }) => {
    const variantOption: number = +e.target.value;

    // @ts-ignore
    const { price, id } = product_item.find(
      ({ variation_option: { id } }) => id === variantOption
    );

    setPrice(price);
    setProductItemId(id);
  };

  // const productImages = product_images.map(
  //   ({ product_image }) => product_image
  // );

  return (
    <PageWrapper>
      <Toaster />
      <div className="bg-white text-black text-center py-4">
        <div className="md:flex py-4 items-center">
          <Image
            alt={name}
            src={product_image}
            height={0}
            width={0}
            sizes="100%"
            className="h-auto w-full md:w-2/3 "
          />

          <AnimatePresence>
            <div className="flex gap-2 justify-center mb-4">
              {/* {productImages.map((image) => (
                // @ts-ignore
                <m.div layoutId={image} onClick={() => setSelectedImage(image)}>
                  <Image
                    src={image}
                    alt={name}
                    key={image}
                    height={60}
                    width={60}
                    className="border border-black m-2"
                  />
                </m.div>
              ))} */}
            </div>
          </AnimatePresence>

          <AnimatePresence>
            {selectedImage && (
              <m.div
                layoutId={selectedImage}
                className="fixed h-screen w-screen top-0 flex justify-center items-center backdrop-brightness-50"
                onClick={() => {
                  setSelectedImage(null);
                }}
              >
                <Image
                  src={selectedImage}
                  alt={name}
                  sizes="100%"
                  className={`w-1/2 h-1/2 object-cover `}
                  height={0}
                  width={0}
                />
              </m.div>
            )}
          </AnimatePresence>
          <div className="">
            {/* <p className="text-xs">Please Select A Size To Get The Price</p> */}
            <p className="font-light text-gray-600">₦{price}</p>
            <p className="my-4 font-light text-3xl">{name}</p>

            <div className="flex flex-col items-center justify-center">
              <p className="text-md uppercase">Variations</p>

              <div className="flex gap-4 py-4">
                {product_item.map(({ variation_option: { value, id } }) => (
                  <div
                    key={id}
                    className="flex gap-1 items-center justify-center"
                  >
                    <p className="uppercase p-[4px]">{value}</p>
                    <input
                      type="radio"
                      name="size"
                      className="m-2"
                      value={id}
                      onChange={handleVariantChange}
                      key={id}
                      // @ts-ignore
                      ref={variantRef}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                if (productItemId) {
                  addOneToCart(productItemId);
                  setOpen(true);
                  return;
                }
                toast("Select a size");
              }}
              className="text-xs border bg-orange-500 text-white p-2 w-4/5 mt-4 rounded"
            >
              <div className="flex justify-center items-center">
                <span className="">
                  <AiOutlineShoppingCart className="h-5 w-5" />
                </span>
                <span className="mx-auto text-center text-lg">Add To Cart • ₦{price}</span>
              </div>
            </button>

            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        </div>

        <div className="">
          {/* <p className="text-gray-500 uppercase text-sm font-gajraj">
            related products
          </p> */}
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
