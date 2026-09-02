import React from "react";
import { menLevelTwo } from "../../../data/category/level two/menLevelTwo";
import { womenLevelTwo } from "../../../data/category/level two/womensLevelTwo";
import { electronicsLevelTwo } from "../../../data/category/level two/electronicsLevelTwo";
import { homeFurnitureLevelTwo } from "../../../data/category/level two/homeFurnitureLevelTwo";
import { beautyLevelTwo } from "../../../data/category/level two/beautyLevelTwo";

import { menLevelThree } from "../../../data/category/level three/menLevelThree";
import { womenLevelThree } from "../../../data/category/level three/womenLevelThree";
import { electronicsLevelThree } from "../../../data/category/level three/electronicsLevelThree";
import { homeFurnitureLevelThree } from "../../../data/category/level three/homeFurnitureLevelThree";
import { beautyLevelThree } from "../../../data/category/level three/beautyLevelThree";

import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const categoryTwo = {
  men: menLevelTwo,
  women: womenLevelTwo,
  electronics: electronicsLevelTwo,
  home_furniture: homeFurnitureLevelTwo,
  beauty: beautyLevelTwo,
};

const categoryThree = {
  men: menLevelThree,
  women: womenLevelThree,
  electronics: electronicsLevelThree,
  home_furniture: homeFurnitureLevelThree,
  beauty: beautyLevelThree,
};

function CategorySheet({ selectedCategory, setShowSheet }) {
  const navigate = useNavigate();

  const childCategory = (category, parentCategoryId) => {
    if (!Array.isArray(category)) return [];
    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId
    );
  };

  return (
    <Box
      className="shadow-2xl max-h-[480px] overflow-y-auto rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 transition-colors p-6"
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm">
        {categoryTwo[selectedCategory]?.map((item) => (
          <div
            key={item.categoryId}
            className="rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80"
          >
            <p className="text-teal-600 dark:text-teal-400 mb-3.5 font-bold text-xs uppercase tracking-wider">
              {item.name}
            </p>

            <ul className="space-y-2">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId
              ).map((child) => (
                <li
                  key={child.categoryId}
                  onClick={() => {
                    navigate(`/products/${child.categoryId}`);
                    setShowSheet(false);
                  }}
                  className="cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors py-1 block truncate"
                >
                  {child.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
}

export default CategorySheet;