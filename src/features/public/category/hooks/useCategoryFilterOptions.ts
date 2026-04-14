import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "@/pages/pageConfig";
import {
  getCategoryQueryOptions,
  type TMainCategory,
} from "../utils/categoryQueryMap";

export const useCategoryFilterOptions = (categoryName?: TMainCategory) => {
  const navigate = useNavigate();

  const options = useMemo(() => {
    return getCategoryQueryOptions(categoryName) ?? {};
  }, [categoryName]);

  useEffect(() => {
    if (categoryName && !getCategoryQueryOptions(categoryName))
      navigate(PAGE.NOT_FOUND);
  }, [categoryName, navigate]);

  return options;
};
