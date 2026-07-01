import { useNavigate } from "react-router-dom";

function ElectricCategoryCard({ item }) {

  const navigate = useNavigate();

  console.log("item", item);

  const categoryId = `electronics_${item.categoryId}`;

  return (
    <div
      onClick={() => navigate("/products/" + categoryId)}
      className="group flex w-full cursor-pointer flex-col items-center gap-3 rounded-[18px] border border-slate-200/80 bg-white p-4 shadow-[0_10px_28px_-18px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-linear-to-b hover:from-white hover:to-blue-50 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.35)]"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-slate-50 via-white to-blue-50 ring-1 ring-slate-100 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
        <img className="h-10 object-contain" src={item.image} alt={item.name} />
      </div>

      <h2 className="text-center text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-blue-700">
        {item.name}
      </h2>
    </div>
  );
}
export default ElectricCategoryCard;