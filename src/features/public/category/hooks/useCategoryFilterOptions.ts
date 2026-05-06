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

  const options = useMemo(
    () => getCategoryQueryOptions(categoryName),
    [categoryName],
  );

  useEffect(() => {
    if (shouldNavigate && categoryName && options === null)
      navigate(PAGE.NOT_FOUND);
  }, [categoryName, options, navigate, shouldNavigate]);

  return options ?? {};
};
