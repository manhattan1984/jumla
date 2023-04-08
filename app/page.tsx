import supabase from "@/utils/supabase";
import { commerce } from "@/utils/commerce";
import React from "react";
import HomePage from "./HomePage";

const page = async () => {
  const merchant = await commerce.merchants.about();

  const { data: products } = await commerce.products.list();
  const { data: categories } = await commerce.categories.list({ limit: 6 });

  return <HomePage categories={categories} products={products} />;
};

export default page;
