import React from "react";
import Category from "./Category";
import { CategoriesParam } from "@/models/params";

const Categories = ({ categories, currentSlug }: CategoriesParam) => {
  return (
    <div className="px-0 md:px-10 sxl:px-20 mt-10 border-t-2 text-dark dark:text-light border-b-2 border-solid border-dark dark:border-light py-4 flex items-start flex-wrap font-medium mx-5 md:mx-10">
      {categories.map((cat) => (
        <Category
          key={cat.slug}
          link={`/categories/${cat.slug}`}
          name={cat.name}
          active={currentSlug === cat.slug}
        />
      ))}
    </div>
  );
};

export default Categories;
