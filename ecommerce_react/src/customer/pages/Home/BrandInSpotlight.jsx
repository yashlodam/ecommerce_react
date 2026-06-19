import React from "react";

function BrandInSpotlight() {
  const brands = [
    {
      name: "Nike",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    },
    {
      name: "Adidas",
      image:
        "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800",
    },
    {
      name: "Puma",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800",
    },
    {
      name: "Levi's",
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
    },
  ];

  return (
    <section className="px-4 lg:px-8 py-10">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">

        {/* Header */}
        <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
               Brands in Spotlight ✨
            </h2>
        

          <p className="text-gray-500 mt-2">
            Discover top brands trending right now
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-[250px] object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">
                  {brand.name}
                </h3>

                <p className="text-sm text-white/80">
                  Explore Collection
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default BrandInSpotlight;