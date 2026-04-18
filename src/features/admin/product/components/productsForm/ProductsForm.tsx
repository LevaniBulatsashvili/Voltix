import { FormInput } from "@/components/form/Input/FormInput";
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import type { ProductFormData } from "../../schemas/schema";
import { useTranslation } from "react-i18next";
import { Label } from "@/components/form/Input/Label";
import { useFetchBrands } from "@/features/public/search/hooks/brandCRUD";
import { useFetchMainCategories } from "@/features/public/category/hooks/mainCategoryCRUD";
import { useFetchCategories } from "@/features/public/category/hooks/categoryCRUD";
import { Select } from "@/components/ui/Select";
import { useController } from "react-hook-form";

interface IProductFormFields {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  control: Control<ProductFormData>;
  mainCategoryId?: number;
}

interface IFormSelectProps {
  name: keyof ProductFormData;
  label: string;
  control: Control<ProductFormData>;
  options: { value: string; label: string }[];
  error?: string;
  baseLabel?: string;
}

const FormSelect = ({
  name,
  label,
  control,
  options,
  error,
  baseLabel,
}: IFormSelectProps) => {
  const { t } = useTranslation();
  const { field } = useController({ name, control });

  return (
    <div>
      <Label htmlFor={name} text={label} />
      <Select
        value={String(field.value ?? "")}
        onChange={(val) => field.onChange(val === "" ? "" : Number(val))}
        options={options}
        baseLabel={baseLabel ?? "common.select"}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{t(`errors.${error}`)}</p>
      )}
    </div>
  );
};

const ProductFormFields = ({
  register,
  errors,
  control,
  mainCategoryId,
}: IProductFormFields) => {
  const { data: brandsData } = useFetchBrands({});
  const { data: mainCategoriesData } = useFetchMainCategories({});
  const { data: categoriesData } = useFetchCategories({
    filters: mainCategoryId
      ? { eq: { main_category_id: mainCategoryId } }
      : undefined,
  });

  const brandOptions = (brandsData?.data ?? []).map((b) => ({
    value: String(b.id),
    label: b.name,
  }));

  const mainCategoryOptions = (mainCategoriesData?.data ?? []).map((mc) => ({
    value: String(mc.id),
    label: mc.name,
  }));

  const categoryOptions = (categoriesData?.data ?? []).map((c) => ({
    value: String(c.id),
    label: c.name,
  }));

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <FormInput
          name="name"
          label="admin_products.name"
          register={register}
          errors={errors}
        />
      </div>
      <div className="col-span-2">
        <FormInput
          name="description"
          label="admin_products.description"
          register={register}
          errors={errors}
        />
      </div>

      <FormSelect
        name="brand_id"
        label="admin_products.brand"
        control={control}
        options={brandOptions}
        error={errors.brand_id?.message}
      />

      <FormSelect
        name="main_category_id"
        label="admin_products.main_category"
        control={control}
        options={mainCategoryOptions}
        error={errors.main_category_id?.message}
      />

      <FormSelect
        name="category_id"
        label="admin_products.category"
        control={control}
        options={categoryOptions}
        error={errors.category_id?.message}
      />

      <FormInput
        name="price"
        label="admin_products.price"
        type="number"
        register={register}
        errors={errors}
      />
      <FormInput
        name="discount_percentage"
        label="admin_products.discount"
        type="number"
        register={register}
        errors={errors}
        placeholder="admin_products.discount"
      />
      <FormInput
        name="stock"
        label="admin_products.stock"
        type="number"
        register={register}
        errors={errors}
      />
      <FormInput
        name="thumbnail"
        label="admin_products.thumbnail"
        register={register}
        errors={errors}
      />
    </div>
  );
};

export default ProductFormFields;
