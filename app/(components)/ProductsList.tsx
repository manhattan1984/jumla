import { ProductType } from "@/utils/type";
import Link from "next/link";
import React from "react";
import ProductItem from "./ProductItem";

const ProductsList = ({
  products,
  title,
}: {
  products: ProductType[];
  title: string;
}) => {
  return (
    <div className="">
      <p className="text-center text-xl mt-5">{title}</p>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {products?.map((product) => (
          <Link href={`/product/${product.permalink}`} key={product.id}>
            <ProductItem product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
