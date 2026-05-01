import { FormInput } from "@/components/form/Input/FormInput";
import FormSelect from "@/components/form/Input/FormSelect";
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import type { ProductSpecFormData } from "../../schemas/productSpecSchema";
import { useTranslation } from "react-i18next";
import { useFetchProducts } from "@/features/public/product/hooks/productCRUD";

interface IProductSpecFormFields {
  register: UseFormRegister<ProductSpecFormData>;
  errors: FieldErrors<ProductSpecFormData>;
  control: Control<ProductSpecFormData>;
}

const ProductSpecFormFields = ({
  register,
  errors,
  control,
}: IProductSpecFormFields) => {
  const { t } = useTranslation();
  const { data: productsData, isFetching: productsFetching } = useFetchProducts(
    { limit: 1000, selectField: "id, name" },
  );

  const productOptions = (productsData?.data ?? []).map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  return (
    <div className="flex flex-col gap-3">
      <FormSelect
        name="product_id"
        label={t("admin_management.form.product")}
        baseLabel={t("common.select")}
        control={control}
        options={productOptions}
        error={t(`errors.${errors.product_id?.message}`)}
        isLoading={productsFetching}
      />
      <FormInput
        name="spec"
        label="admin_management.form.product_spec"
        register={register}
        errors={errors}
        placeholder="admin_management.form.product_spec"
      />
      <FormInput
        name="value"
        label="admin_management.form.spec_value"
        register={register}
        errors={errors}
        placeholder="admin_management.form.spec_value"
      />
    </div>
  );
};

export default ProductSpecFormFields;
