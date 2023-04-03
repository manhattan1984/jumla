"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion as m } from "framer-motion";

const ProductItem = ({
  name,
  product_image,
  id,
  key,
  product_item,
}: {
  name: string;
  product_image: string;
  id: number;
  key: number;
  product_item: {
    price: number;
  }[];
}) => {
  const prices = product_item.map(({ price }) => price).sort();
  const maxPrice = Math.max(...prices);
  const minPrice = Math.min(...prices);

  return (
    <m.div
      className="text-center basis-1/2 md:basis-1/3"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0, transition: { delay: 1 * +key } }}
    >
      <Link href={`/products/${id}`}>
        <Image
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          className="h-32 w-32 mx-auto object-cover"
          src={product_image}
          priority={true}
        />

        <p className="font-light tracking-widest text-sm">
          {name}
        </p>
        <p className="text-gray-700">
          ₦{minPrice} - {maxPrice}
        </p>
      </Link>
    </m.div>
  );
};

export default ProductItem;
