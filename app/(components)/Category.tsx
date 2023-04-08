import { CategoryType } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Category = ({
  category: { assets, name, slug },
}: {
  category: CategoryType;
}) => {
  return (
    <Link href={`/category/${slug}`} className="">
      <Image
        src={assets[0].url}
        alt={name}
        height={0}
        width={0}
        sizes="100%"
        className="h-32 w-32 object-cover mx-auto"
      />
      <p className="text-center text-xs mt-2">{name}</p>
    </Link>
  );
};

export default Category;
