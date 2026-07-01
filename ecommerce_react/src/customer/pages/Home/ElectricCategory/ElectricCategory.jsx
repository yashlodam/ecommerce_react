import React from "react";
import ElectricCategoryCard from "./ElectricCategoryCard";
import { store, useAppDispatch, useAppSelector } from "../../../../State/Store";

function ElectricCategory() {
  const categories = [
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/7b06eef569b627dd.png?q=80",
      title: "Laptop",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/10a9f5304d7fe524.png?q=80",
      title: "Mobile",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/3ee2e02eef5791bb.png?q=80",
      title: "Camera",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/d3f39bda1448b6be.png?q=80",
      title: "SmartWatch",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/e9e0189eb96a0a36.png?q=80",
      title: "Headphones",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/4e164595394e83b8.png?q=80",
      title: "Speakers",
    },
    {
      image:
        "https://rukminim2.flixcart.com/fk-p-flap/59/59/image/c42856f935d2eaf6.png?q=80",
      title: "TV",
    },
  ];

  const {customer} = useAppSelector(store=>store);
  console.log("Customer Data in ElectricCategory:", customer);

  return (
    <div className="mt-6 bg-white rounded-2xl ring-1 ring-slate-200/70 shadow-sm p-4 lg:p-6">
      <h2 className="text-xl font-bold mb-6">Electronics</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {customer.homeCategories?.electricCategories?.map((item, index) => (
  <ElectricCategoryCard
    key={index}
    item={item}
  />
))}
      </div>
    </div>
  );
}

export default ElectricCategory;