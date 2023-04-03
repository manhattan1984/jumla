import supabase from "@/utils/supabase";
import React from "react";
import HomePage from "./HomePage";

const page = async () => {
  // let { data: product, error } = await supabase.from("product").select("*") .neq("category_id", 2);

  let { data: product_categories, error: product_category_error } =
    await supabase.from("product_category").select("*");

  let { data: product, error } = await supabase
    .from("product")
    .select(`name, product_image, id, product_item (price)`)
    .eq("featured", true);

    console.log(product);
    

  return <HomePage product={product} categories={product_categories} />;
};

export default page;
