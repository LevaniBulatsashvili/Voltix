import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { RefObject } from "react";
import { FormInput } from "@/components/form/Input/FormInput";
import { ImageSelector } from "@/features/shared/imageSelector/components/ImageSelector";
import type { BrandFormData } from "../../schemas/brandSchema";

interface IBrandFormFields {
  register: UseFormRegister<BrandFormData>;
  errors: FieldErrors<BrandFormData>;
  uploadRef: RefObject<(() => Promise<string[]>) | null>;
  formKey?: number;
  editingBrand: { logo_url?: string } | null;
}

const BrandFormFields = ({
  register,
  errors,
  uploadRef,
  formKey = 0,
  editingBrand,
}: IBrandFormFields) => {
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
        <FormInput
          name="website_url"
          label="admin_management.form.website_url"
          register={register}
          errors={errors}
          placeholder="admin_management.form.website_url"
        />
      </div>
      <div className="col-span-2 mt-4">
        <ImageSelector
          key={formKey}
          bucket="brands"
          maxImages={1}
          uploadRef={uploadRef}
          accept="image/svg+xml"
          initialImages={editingBrand?.logo_url ? [editingBrand.logo_url] : []}
        />
      </div>
    </div>
  );
};

export default BrandFormFields;
