function ElectricCategoryCard({ item }) {
  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer w-full">
      <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full ">
        <img className="object-contain h-10" src={item.image} alt={item.name} />
      </div>

      <h2 className="text-sm font-semibold text-gray-800 text-center">
        {item.name}
      </h2>
    </div>
  );
}
export default ElectricCategoryCard;