import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PAGE } from "@/pages/pageConfig";
import {
  getCategoryQueryOptions,
  type TCategoryQueries,
} from "../utils/categoryQueryMap";

export const useCategoryFilterOptions = (
  categoryName: TCategoryQueries,
  shouldNavigate = true,
) => {
  const navigate = useNavigate();

  const options = useMemo(() => {
    return getCategoryQueryOptions(categoryName) ?? {};
  }, [categoryName]);

  useEffect(() => {
    if (
      shouldNavigate &&
      categoryName &&
      !getCategoryQueryOptions(categoryName)
    )
      navigate(PAGE.NOT_FOUND);
  }, [categoryName, navigate, shouldNavigate]);

  return options;
};
