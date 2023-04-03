import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, title }) => {
  return (
    <>
      <p className="uppercase text-3xl pt-4 mb-2 text-center  text-black">
        {title}
      </p>
      <div className="py-4 bg-white grid grid-cols-2 justify-center px-4">
        {products?.map((item, index) => (
          <ProductItem {...item} key={index} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
