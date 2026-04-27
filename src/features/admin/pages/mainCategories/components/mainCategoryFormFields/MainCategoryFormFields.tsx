import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type RefObject } from "react";
import { FormInput } from "@/components/form/Input/FormInput";
import { ImageSelector } from "@/features/shared/imageSelector/components/ImageSelector";
import type { MainCategoryFormData } from "../../schemas/mainCategorySchema";

interface IMainCategoryFormFields {
  register: UseFormRegister<MainCategoryFormData>;
  errors: FieldErrors<MainCategoryFormData>;
  uploadRef: RefObject<(() => Promise<string[]>) | null>;
  formKey?: number;
  editingMainCategory: { thumbnail?: string } | null;
}

const MainCategoryFormFields = ({
  register,
  errors,
  uploadRef,
  formKey = 0,
  editingMainCategory,
}: IMainCategoryFormFields) => {
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
      <div className="col-span-2 mt-4">
        <ImageSelector
          key={formKey}
          bucket="main-categories"
          maxImages={1}
          uploadRef={uploadRef}
          initialImages={
            editingMainCategory?.thumbnail
              ? [editingMainCategory.thumbnail]
              : []
          }
        />
      </div>
    </div>
  );
};

export default MainCategoryFormFields;
