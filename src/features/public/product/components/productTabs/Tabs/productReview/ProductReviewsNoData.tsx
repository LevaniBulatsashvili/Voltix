import { MessageSquare, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProductReviewsNoData = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-2xl border border-primary/50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        {[
          "top-4 left-8 opacity-[0.07] text-7xl",
          "top-8 right-16 opacity-[0.05] text-5xl",
          "bottom-6 left-24 opacity-[0.06] text-6xl",
          "bottom-4 right-8 opacity-[0.04] text-8xl",
          "top-1/2 left-4 opacity-[0.05] text-4xl",
        ].map((cls, i) => (
          <span key={i} className={`absolute ${cls}`}>
            ★
          </span>
        ))}
      </div>

      <div className="relative flex flex-col items-center justify-center py-14 px-6 gap-5">
        <div className="relative">
          <div className="size-30 rounded-2xl border shadow-sm flex items-center justify-center">
            <MessageSquare className="size-15" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 size-10 rounded-full bg-yellow-400 flex items-center justify-center shadow-sm">
            <Star className="size-6 text-black" />
          </div>
        </div>

        <div className="text-center flex flex-col gap-1.5">
          <p className="text-xl font-bold tracking-wide uppercase">
            {t("product.no_reviews_yet")}
          </p>
          <p className="text-md opacity-80 max-w-70 leading-relaxed">
            {t(
              "product.be_the_first_to_share_your_experience_with_this_product",
            )}
          </p>
        </div>

        <div className="flex items-center gap-1 text-3xl">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewsNoData;
