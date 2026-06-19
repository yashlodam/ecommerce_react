import React from "react";
import { ArrowRight } from "lucide-react";

function FeaturedCollections() {
  const collections = [
    {
      title: "Fashion Collection",
      subtitle: "Styles for every season",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
    },
    {
      title: "Electronics",
      subtitle: "Latest gadgets & tech",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
    },
    {
      title: "Home Decor",
      subtitle: "Make your space yours",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
      span: "md:col-span-3 lg:col-span-2",
    },
    {
      title: "Gaming Zone",
      subtitle: "Gear up and level up",
      image:
        "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80",
      span: "sm:col-span-2 md:col-span-3 lg:col-span-2",
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-6 sm:mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Featured Collections
          </h2>
          <p className="text-gray-500 mt-1.5 text-sm sm:text-base md:text-base">
            Curated collections for every lifestyle
          </p>
        </div>

        <button className="hidden sm:flex items-center gap-1 text-sm md:text-base font-semibold text-[#2874f0] hover:underline whitespace-nowrap">
          View All <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {collections.map((item, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/10] lg:aspect-[4/3] ${item.span}`}
          >
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Gradient for text legibility, slightly stronger on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/85" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 md:p-7 lg:p-7 text-white">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold leading-tight">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-sm text-white/80 mt-1 mb-4">
                {item.subtitle}
              </p>

              <button className="self-start flex items-center gap-1.5 bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300 group-hover:gap-2.5 group-hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Explore Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </button>
            </div>

            {/* Focus ring for keyboard users on the whole card */}
            <span className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-colors duration-300" />
          </div>
        ))}
      </div>

      {/* Mobile-only view all link, shown below grid since header link is hidden on small screens */}
      <button className="sm:hidden flex items-center gap-1 text-sm font-semibold text-[#2874f0] mt-6">
        View All Collections <ArrowRight size={16} />
      </button>
    </section>
  );
}

export default FeaturedCollections;