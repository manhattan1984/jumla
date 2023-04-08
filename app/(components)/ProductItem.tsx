import { ProductType } from "@/utils/type";
import Image from "next/image";
import React from "react";

const ProductItem = ({
  product: {
    id,
    name,
    price: { formatted_with_symbol },
    image: { url },
  },
}: {
  product: ProductType;
}) => {
  return (
    <div className="mt-4">
      <Image
        alt={name}
        src={url}
        sizes="100%"
        height={0}
        width={0}
        className="h-36 w-36 object-cover mx-auto"
      />
      <div className="text-center mt-2">
        <p>{name}</p>
        <p className="text-xs text-gray-600">{formatted_with_symbol}</p>
      </div>
    </div>
  );
};

export default ProductItem;
