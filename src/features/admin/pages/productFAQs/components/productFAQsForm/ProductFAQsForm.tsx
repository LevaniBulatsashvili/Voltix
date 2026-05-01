import { FormInput } from "@/components/form/Input/FormInput";
import FormSelect from "@/components/form/Input/FormSelect";
import type { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import type { ProductFAQFormData } from "../../schemas/productFAQSchema";
import { useTranslation } from "react-i18next";
import { useFetchProducts } from "@/features/public/product/hooks/productCRUD";

interface IProductFAQFormFields {
  register: UseFormRegister<ProductFAQFormData>;
  errors: FieldErrors<ProductFAQFormData>;
  control: Control<ProductFAQFormData>;
}

const ProductFAQFormFields = ({
  register,
  errors,
  control,
}: IProductFAQFormFields) => {
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
        name="question"
        label="admin_management.form.question"
        register={register}
        errors={errors}
        placeholder="admin_management.form.question"
      />
      <FormInput
        name="answer"
        label="admin_management.form.answer"
        register={register}
        errors={errors}
        placeholder="admin_management.form.answer"
      />
    </div>
  );
};

export default ProductFAQFormFields;
