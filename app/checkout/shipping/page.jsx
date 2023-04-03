import React from "react";
import Shipping from "./Shipping";
import supabase from "@/utils/supabase";

const page = async () => {
  let { data: shipping_methods, error } = await supabase
    .from("shipping_method")
    .select("*");



  return <Shipping shippingMethods={shipping_methods} />;
};

export default page;
