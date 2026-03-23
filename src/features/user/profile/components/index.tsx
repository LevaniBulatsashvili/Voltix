import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormInput } from "../../../../components/form/Input/FormInput";
import { FormDropdown } from "../../../../components/form/FormDropdown";
import PrimaryButton from "../../../../components/button/PrimaryBtn";
import Orders from "./orders/Orders";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";
import { userFormSchema, type TUserForm } from "../../schemas/userSchema";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useUpsertAddress } from "../hooks/useUpsertAddress";
import { mapUserToForm } from "../utils/mapUserToForm";
import type { IAddress } from "../../../../types/User";
import AvatarSelector from "./avatarSelector/AvatarSelector";
import userImg from "../../../../assets/images/User.png";
import { notifySuccess } from "../../../../lib/toast/notifySuccess";
import { useTranslation } from "react-i18next";
import { notifySupabaseError } from "../../../../lib/toast/notifySupabaseError";
import ProfileSkeleton from "./skeleton/ProfileSkeleton";

const ProfilePage = () => {
  const { t } = useTranslation();
  const [editting, setEditting] = useState(false);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const { data: user, isLoading } = useCurrentUser();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();

  const { mutateAsync: upsertAddress, isPending: isUpdatingAddress } =
    useUpsertAddress();

  const isSaving = isUpdatingUser || isUpdatingAddress;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserForm>({
    resolver: zodResolver(userFormSchema),
  });

  useEffect(() => {
    if (user) reset(mapUserToForm(user));
  }, [user, reset]);

  const onEdit = () => {
    if (editting && user) reset(mapUserToForm(user));

    setEditting((prev) => !prev);
  };

  const onSubmit = async (data: TUserForm) => {
    try {
      const { address, ...profileData } = data;

      if (profileData) await updateUser(profileData);
      if (address)
        await upsertAddress({
          id: user?.address?.id,
          data: address as Omit<IAddress, "id" | "user_id">,
        });

      setEditting(false);
      setIsAddressOpen(false);

      notifySuccess(t("profile.profile_successfully_updated"));
    } catch (err) {
      notifySupabaseError(err);
    }
  };

  if (isLoading || !user) return <ProfileSkeleton />;

  return (
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-linear-to-r from-primary to-background"></div>

        <div className="p-4 sm:p-10 text-black!">
          <div className="h-41 flex flex-col md:flex-row items-center gap-5 sm:gap-0 sm:justify-between">
            <div className="flex self-start md:self-auto items-center gap-4 md:gap-6">
              <AvatarSelector
                currentAvatar={user.avatar_url || userImg}
                userId={user.id}
                onUploadSuccess={() =>
                  notifySuccess(t("profile.image_successfully_updated"))
                }
              />

              <div className="max-w-[55dvw] px-4">
                <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
                  <h1 className="text-2xl font-semibold">{user.full_name}</h1>
                </div>
                <div className="overflow-x-auto mt-1 whitespace-nowrap scrollbar-none">
                  <p className="opacity-70">{user.email}</p>
                </div>
              </div>
            </div>

            {editting ? (
              <PrimaryButton
                className="self-end md:self-auto"
                text={isSaving ? "profile.saving" : "profile.save"}
                onClick={handleSubmit(onSubmit)}
                disabled={isSaving}
              />
            ) : (
              <PrimaryButton
                className="self-end md:self-auto"
                text="profile.edit"
                onClick={onEdit}
              />
            )}
          </div>

          <form
            id="profile-form"
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <FormInput<TUserForm>
              name="full_name"
              label="profile.full_name"
              register={register}
              errors={errors}
              disabled={!editting || isSaving}
              placeholder="profile.your_full_name"
            />

            <FormInput<TUserForm>
              name="phone"
              label="profile.phone"
              register={register}
              errors={errors}
              disabled={!editting || isSaving}
              placeholder="profile.your_phone"
            />

            <FormDropdown
              text="profile.address"
              open={isAddressOpen}
              setOpen={setIsAddressOpen}
              components={[
                <FormInput<TUserForm>
                  name="address.city"
                  label="profile.city"
                  register={register}
                  errors={errors}
                  disabled={!editting || isSaving}
                  placeholder="profile.your_city"
                />,

                <FormInput<TUserForm>
                  name="address.postal_code"
                  label="profile.postal_code"
                  register={register}
                  errors={errors}
                  disabled={!editting || isSaving}
                  placeholder="profile.your_postal_code"
                />,

                <FormInput<TUserForm>
                  name="address.country"
                  label="profile.country"
                  register={register}
                  errors={errors}
                  disabled={!editting || isSaving}
                  placeholder="profile.your_country"
                />,

                <FormInput<TUserForm>
                  name="address.address_line"
                  label="profile.full_address"
                  register={register}
                  errors={errors}
                  disabled={!editting || isSaving}
                  placeholder="profile.your_address_line"
                />,
              ]}
            />
          </form>

          <EmailSection user={user} />
          <PasswordSection />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <Orders userId={user.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
