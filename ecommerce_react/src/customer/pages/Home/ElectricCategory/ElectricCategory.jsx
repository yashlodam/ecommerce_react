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
    <section className="mt-8 rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50 shadow-lg overflow-hidden">

  {/* Header */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 py-5 border-b border-slate-200">

    <div className="flex items-center gap-4">

      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
        📱
      </div>

      <div>
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-semibold">
          Electronics
        </span>

        <h2 className="text-2xl font-bold text-slate-900 mt-1">
          Shop Top Electronics
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Discover the latest gadgets from trusted brands.
        </p>
      </div>

    </div>

    

  </div>

  {/* Categories */}

  {customer?.homeCategories?.electricCategories?.length > 0 ? (

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5 p-6">

      {customer.homeCategories.electricCategories.map((item) => (
        <ElectricCategoryCard
          key={item.id}
          item={item}
        />
      ))}

    </div>

  ) : (

    <div className="py-20 flex flex-col items-center">

      <img
        src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
        alt="No Categories"
        className="w-24 h-24 opacity-70"
      />

      <h3 className="mt-5 text-lg font-semibold text-gray-700">
        No Categories Found
      </h3>

      <p className="text-gray-500 mt-2">
        Electronics categories will appear here soon.
      </p>

    </div>

  )}

</section>
  );
}

export default ElectricCategory;