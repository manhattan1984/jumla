import PageWrapper from "@/app/(components)/PageWrapper";
import ProductList from "@/app/(components)/ProductList";
import supabase from "@/utils/supabase";
import React from "react";

const page = async ({
  params: { category_name },
}: {
  params: { category_name: string };
}) => {
  const category = category_name.replaceAll('%20', ' ').replace('%26', '&')
  const { data, error } = await supabase
    .from("product")
    .select("*, product_category!inner(*), product_item (price)")
    .eq("product_category.category_name", category);

    console.log()

  return <ProductList title={category} products={data} />;
};

export default page;
