import React from "react";
import Slider from "../../components/Slider";

function Home() {
  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="max-w-[1800px] mx-auto px-3 md:px-5 lg:px-8 py-6">
        <div className="bg-white rounded-2xl shadow-sm p-2 lg:p-4">
          <Slider />
        </div>
      </div>
    </div>
  );
}

export default Home;