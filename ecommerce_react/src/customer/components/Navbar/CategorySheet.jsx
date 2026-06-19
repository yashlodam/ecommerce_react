import React, { useEffect } from "react";
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


  const childCategory = (category, parentCategoryId) => {
    if (!Array.isArray(category)) return [];
    

    return category.filter(
      (child) => child.parentCategoryId === parentCategoryId
      
    );
    
  };

  return (
    <Box
      sx={{
        zIndex: 2,
      }}
      className="shadow-lg lg:h-[500px] overflow-y-auto bg-white"
    >
      <div className="flex gap-8 text-sm flex-wrap">
        {categoryTwo[selectedCategory]?.map((item, index) => (
          <div
            key={item.categoryId}
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
          >
            <p className="text-primary mb-5 font-semibold">
              {item.name}
            </p>

            <ul className="space-y-3">
              {childCategory(
                categoryThree[selectedCategory],
                item.categoryId
              ).map((child) => (
                <li
                  key={child.categoryId}
                  className="font-semibold text-sm hover:text-primary cursor-pointer"
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