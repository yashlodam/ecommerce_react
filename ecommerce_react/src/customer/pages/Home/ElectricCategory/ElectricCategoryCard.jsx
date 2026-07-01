import { useNavigate } from "react-router-dom";

function ElectricCategoryCard({ item }) {
  const navigate = useNavigate();
  const categoryId = `electronics_${item.categoryId}`;

  return (
    <button
      type="button"
      onClick={() => navigate(`/products/${categoryId}`)}
      className="group flex w-full cursor-pointer flex-col items-center gap-3 rounded-[22px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_42px_-24px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-[0_26px_56px_-24px_rgba(37,99,235,0.35)]"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.16),_transparent_60%),linear-gradient(135deg,_#f8fbff_0%,_#eef4ff_100%)] ring-1 ring-slate-100 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
        <img className="h-10 object-contain" src={item.image} alt={item.name} />
      </div>

      <h2 className="text-center text-sm font-semibold text-slate-700 transition-colors duration-300 group-hover:text-blue-700">
        {item.name}
      </h2>
    </button>
  );
}

export default ElectricCategoryCard;