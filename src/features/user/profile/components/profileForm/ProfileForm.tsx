import { type UseFormReturn } from "react-hook-form";
import { type TProfileForm } from "../../../schemas/profileSchema";
import { FormInput } from "../../../../../components/form/Input/FormInput";
import { FormDropdown } from "../../../../../components/form/FormDropdown";

interface IProfileForm {
  isEditing: boolean;
  isSaving: boolean;
  isAddressOpen: boolean;
  toggleIsAddressOpen: () => void;
  onSubmit: (data: TProfileForm) => void;
  formMethods: UseFormReturn<TProfileForm>;
}

const ProfileForm = ({
  isEditing,
  isSaving,
  isAddressOpen,
  toggleIsAddressOpen,
  onSubmit,
  formMethods,
}: IProfileForm) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = formMethods;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-8"
    >
      <FormInput
        name="full_name"
        label="profile.full_name"
        register={register}
        errors={errors}
        disabled={!isEditing || isSaving}
        placeholder="profile.your_full_name"
      />

      <FormInput
        name="phone"
        label="profile.phone"
        register={register}
        errors={errors}
        disabled={!isEditing || isSaving}
        placeholder="profile.your_phone"
      />

      <FormDropdown
        open={isAddressOpen}
        setOpen={toggleIsAddressOpen}
        text="profile.address"
        components={[
          <FormInput
            name="address.city"
            label="profile.city"
            register={register}
            errors={errors}
            disabled={!isEditing || isSaving}
            placeholder="profile.your_city"
          />,
          <FormInput
            name="address.postal_code"
            label="profile.postal_code"
            register={register}
            errors={errors}
            disabled={!isEditing || isSaving}
            placeholder="profile.your_postal_code"
          />,
          <FormInput
            name="address.country"
            label="profile.country"
            register={register}
            errors={errors}
            disabled={!isEditing || isSaving}
            placeholder="profile.your_country"
          />,
          <FormInput
            name="address.address_line"
            label="profile.full_address"
            register={register}
            errors={errors}
            disabled={!isEditing || isSaving}
            placeholder="profile.your_address_line"
          />,
        ]}
      />
    </form>
  );
};

export default ProfileForm;
