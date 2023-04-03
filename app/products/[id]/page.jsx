import supabase from "@/utils/supabase";
import React from "react";
import ProductDetail from "./ProductDetail";

const page = async ({ params: { id } }) => {
  let { data: product, error } = await supabase
    .from("product")
    .select(
      "*, product_item (*)"
    )
    .eq("id", +id)
    .single();

  console.log("product", product);

  if (product) {
    return <ProductDetail product={product} />;
  }

  return <p>Loading... </p>;
};

export default page;
