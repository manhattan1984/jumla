import { commerce } from "@/utils/commerce";
import { ProductType, VariantType } from "@/utils/type";
import React from "react";
import ProductDetail from "./ProductDetail";

const page = async ({
  params: { permalink },
}: {
  params: { permalink: string };
}) => {
  const product: ProductType = await commerce.products.retrieve(permalink, {
    type: "permalink",
  });

  const variants: VariantType[] = await commerce.products.getVariants(
    product.id
  );

  if (product) {
    // @ts-ignore
    return <ProductDetail variants={variants} product={product} />;
  }
  return <p>Loading...</p>;
};

export default page;
