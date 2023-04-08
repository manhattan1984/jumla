import { CategoryType } from "@/utils/type";
import React from "react";
import Category from "./Category";

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <div className="grid grid-cols-3 bg-white gap-4 pb-2">
      {categories.map((category, index) => (
        <Category category={category} key={index} />
      ))}
    </div>
  );
};

export default CategoryList;
