import ProductsList from "@/app/(components)/ProductsList";
import { commerce } from "@/utils/commerce";
import React from "react";

const page = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { data: products } = await commerce.products.list({
    category_slug: slug,
  });

  const { name } = await commerce.categories.retrieve(slug, {type: 'slug'});

  return (
    <div className="pt-2 pb-4">
      <ProductsList title={name} products={products} />
    </div>
  );
};

export default page;
