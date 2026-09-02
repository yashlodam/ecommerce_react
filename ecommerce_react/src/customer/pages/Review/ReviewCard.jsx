import React from "react";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

function ReviewCard({ review }) {
  const userName = review?.user?.fullName || "Verified Buyer";
  const userInitial = userName.charAt(0).toUpperCase();
  const ratingValue = review?.rating || 4.5;
  const reviewText =
    review?.reviewText ||
    "Excellent build quality and fits true to size. Delivered 2 days earlier than expected. Would definitely purchase again from this marketplace seller.";
  const dateStr = review?.createdAt
    ? new Date(review.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Verified Purchase";

  return (
    <div className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm transition-all duration-300">
      <Avatar
        sx={{
          width: 44,
          height: 44,
          bgcolor: "#009688",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        {userInitial}
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                {userName}
              </h3>
              <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                <VerifiedUserIcon sx={{ fontSize: 12 }} />
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
              {dateStr}
            </p>
          </div>

          <div className="flex items-center gap-1">
            <Rating
              value={ratingValue}
              precision={0.5}
              readOnly
              size="small"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {ratingValue}★
            </span>
          </div>
        </div>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {reviewText}
        </p>

        {review?.productImages?.length > 0 && (
          <div className="flex gap-2.5 mt-3 flex-wrap">
            {review.productImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Product review"
                className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 dark:border-slate-800 hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewCard;