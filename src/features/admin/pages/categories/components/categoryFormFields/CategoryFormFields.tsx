import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormInput } from "@/components/form/Input/FormInput";
import FormSelect from "@/components/form/Input/FormSelect";
import type { CategoryFormData } from "../../schemas/categorySchema";
import { useFetchMainCategories } from "@/features/public/category/hooks/mainCategoryCRUD";

interface ICategoryFormFields {
  register: UseFormRegister<CategoryFormData>;
  errors: FieldErrors<CategoryFormData>;
  control: Control<CategoryFormData>;
}

const CategoryFormFields = ({
  register,
  errors,
  control,
}: ICategoryFormFields) => {
  const { t } = useTranslation();

  const { data: mainCategoriesData, isFetching: mainCategoriesFetching } =
    useFetchMainCategories({ limit: 1000, selectField: "id, name" });

  const mainCategoryOptions =
    mainCategoriesData?.data?.map((mc) => ({
      value: mc.id,
      label: mc.name,
    })) ?? [];

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <FormInput
          name="name"
          label="admin_management.form.name"
          register={register}
          errors={errors}
          placeholder="admin_management.form.name"
        />
      </div>

      <div className="col-span-2">
        <FormSelect
          name="main_category_id"
          label={t("admin_management.categories.main_category")}
          baseLabel={t("common.select")}
          control={control}
          options={mainCategoryOptions}
          error={t(`errors.${errors.main_category_id?.message}`)}
          isLoading={mainCategoriesFetching}
        />
      </div>
    </div>
  );
};

export default CategoryFormFields;
