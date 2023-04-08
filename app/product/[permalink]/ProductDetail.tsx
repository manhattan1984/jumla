"use client";
import PageWrapper from "@/app/(components)/PageWrapper";
import { useCart, useCartDispatch } from "@/app/(context)/CartContext";
import { commerce } from "@/utils/commerce";
import responsive from "@/utils/responsive";
import { ProductType, VariantType } from "@/utils/type";
import { Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const VariantPicker = ({
  variantGroups = [],
  // @ts-ignore
  defaultValues = {},
  ...props
}: {
  variantGroups: {
    id: string;
    name: string;
    options: {
      id: string;
      price: { formatted_with_symbol: string };
      name: string;
    }[];
  }[];
}) => {
  if (!variantGroups || variantGroups.length === 0) return null;

  return (
    <div className="">
      <p className="mb-1">Select Variant</p>

      <div className="w-full flex flex-col gap-2">
        {variantGroups.map(({ options, ...group }) => (
          <div
            key={group.id}
            className="rounded border border-black relative w-1/3 mx-auto overflow-hidden"
          >
            <label htmlFor={group.id} className="sr-only">
              {group.name}:
            </label>

            <select
              id={group.id}
              defaultValue={defaultValues[group.id]}
              className="appearance-none text-center leading-none block w-full py-1 pr-6 pl-2"
              {...props}
            >
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
              <FiChevronDown />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail = ({
  product: {
    id,
    image: { url },
    name,
    description,
    price: { formatted_with_symbol },
    variant_groups: variantGroups,
    permalink,
    assets,
  },
  variants: { data: variantsData },
}: {
  product: ProductType;
  variants: { data: VariantType[] };
}) => {
  const { setCart } = useCartDispatch();
  const { setOpen, open } = useCart();
  const [loading, setLoading] = useState(false);
  const [isShowing, setIsShowing] = useState(true);
  const addToCart = () => {
    setLoading(true);
    commerce.cart.add(id, 1, selectedVariants).then((cart: any) => {
      setCart(cart);
      setLoading(false);
      setOpen(!open);
      return cart;
    });
  };

  const [price, setPrice] = useState(formatted_with_symbol);
  const [images, setImages] = useState(assets);

  const initialVariants = useMemo(
    () =>
      variantGroups.reduce((all, { id, options }) => {
        const [firstOption] = options;

        return { ...all, [id]: firstOption.id };
      }, {}),
    [permalink]
  );

  const [selectedVariants, setSelectedVariants] = useState(initialVariants);

  useEffect(() => {
    setSelectedVariants(initialVariants);
  }, [permalink]);

  const handleVariantChange = ({
    target: { id, value },
  }: {
    target: { id: string; value: string };
  }) => {
    setSelectedVariants({
      ...selectedVariants,
      [id]: value,
    });
  };

  useEffect(() => {
    // @ts-ignore
    const selectedVariant = variantsData?.find(({ options }) => {
      return JSON.stringify(options) === JSON.stringify(selectedVariants);
    });

    setPrice(
      selectedVariant?.price?.formatted_with_symbol || formatted_with_symbol
    );
    setImages(selectedVariant?.assets || assets);

    // setIsShowing(false)
  }, [selectedVariants]);

  return (
    <PageWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <div className="m-auto w-full md:h-4/5 md:w-4/5">
          <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <Carousel responsive={responsive}>
              {images.map(
                ({ url, filename }: { url: string; filename: string }) => (
                  <Image
                    key={filename}
                    src={url}
                    alt={filename}
                    sizes="100%"
                    height={0}
                    width={0}
                    className="h-[80vh] w-full object-cover"
                  />
                )
              )}
            </Carousel>
          </Transition>
        </div>

        <div className="text-center">
          <p className="text-sm mt-3">{name}</p>
          <p className="font-medium my-4">{price}</p>

          <VariantPicker
            variantGroups={variantGroups}
            // @ts-ignore
            defaultValues={initialVariants}
            onChange={handleVariantChange}
          />

          <div
            className="text-center text-gray-700 text-sm mt-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <button
            className="bg-orange-400 uppercase text-sm text-white w-4/5 mx-auto p-2 my-4"
            onClick={addToCart}
            disabled={loading}
          >
            {" "}
            {loading ? (
              <span className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-7 h-7 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-400"
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
              <span className="py-1 inline-block">Add To Cart</span>
            )}
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetail;
