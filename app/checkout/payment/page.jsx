import React from "react";
import Payment from "./Payment";
import supabase from "@/utils/supabase";

const page = async () => {
  let { data: payment_types, error } = await supabase
    .from("payment_type")
    .select("*");



  return <Payment paymentTypes={payment_types} />;
};

export default page;
