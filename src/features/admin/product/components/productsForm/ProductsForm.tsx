import { FormInput } from "@/components/form/Input/FormInput";
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import type { ProductFormData } from "../../schemas/productSchema";
import { ImageSelector } from "@/features/shared/components/imageSelector/ImageSelector";
import { type RefObject } from "react";
import type { IProduct } from "@/types/public/product";
import FormSelect from "@/components/form/Input/FormSelect";
import { useTranslation } from "react-i18next";
import { useProductFormOptions } from "../../hooks/useProductFormOptions";

interface IProductFormFields {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  control: Control<ProductFormData>;
  mainCategoryId?: number;
  uploadRef: RefObject<(() => Promise<string[]>) | null>;
  formKey?: number;
  editingProduct: IProduct | null;
}

const ProductFormFields = ({
  register,
  errors,
  control,
  mainCategoryId,
  uploadRef,
  formKey = 0,
  editingProduct,
}: IProductFormFields) => {
  const { t } = useTranslation();
  const {
    brandOptions,
    mainCategoryOptions,
    categoryOptions,
    brandsFetching,
    mainCategoriesFetching,
    categoriesFetching,
  } = useProductFormOptions(mainCategoryId);

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <FormInput
          name="name"
          label="admin_products.name"
          register={register}
          errors={errors}
          placeholder="admin_products.name"
        />
      </div>

      <div className="col-span-2">
        <FormInput
          name="description"
          label="admin_products.description"
          register={register}
          errors={errors}
          placeholder="admin_products.description"
        />
      </div>

      <FormSelect
        name="brand_id"
        label={t("admin_products.brand")}
        baseLabel={t("common.select")}
        control={control}
        options={brandOptions}
        error={t(`errors.${errors.brand_id?.message}`)}
        isLoading={brandsFetching}
      />

      <FormSelect
        name="main_category_id"
        label={t("admin_products.main_category")}
        baseLabel={t("common.select")}
        control={control}
        options={mainCategoryOptions}
        error={t(`errors.${errors.main_category_id?.message}`)}
        isLoading={mainCategoriesFetching}
      />

      <FormSelect
        name="category_id"
        label={t("admin_products.category")}
        baseLabel={t("common.select")}
        control={control}
        options={categoryOptions}
        error={t(`errors.${errors.category_id?.message}`)}
        isLoading={categoriesFetching}
      />

      <FormInput
        name="price"
        label="admin_products.price"
        type="number"
        register={register}
        errors={errors}
        placeholder="admin_products.price"
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
        placeholder="admin_products.stock"
      />

      <div className="col-span-2 mt-4">
        <ImageSelector
          key={formKey}
          bucket="product-images"
          maxImages={3}
          uploadRef={uploadRef}
          initialImages={
            editingProduct?.product_images?.map((img) => img.image_url) ?? []
          }
        />
      </div>
    </div>
  );
};

export default ProductFormFields;
