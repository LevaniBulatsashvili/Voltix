import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../../components/form/Input/FormInput";
import Avatar from "./avatar/Avatar";
import Orders from "./orders/Orders";
import PrimaryButton from "../../../../components/button/PrimaryBtn";
import { userSchema, type TUser } from "../../schemas/userSchema";
import { FormDropdown } from "../../../../components/form/FormDropdown";
import { useState } from "react";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";
import { useCurrentUser } from "../../../../hooks/useCurrentUser";

const ProfilePage = () => {
  const [editting, setEditting] = useState(false);
  const { data: user, isLoading } = useCurrentUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: user || undefined,
  });

  const onSubmit = (data: TUser) => {
    console.log("Updated user data:", data);
  };

  const onEdit = () => setEditting((prev) => !prev);

  if (isLoading || !user) return <p>Loading profile...</p>;
  return (
    <div className="w-full">
      <div className="bg-white my-12 w-[90%] mx-auto">
        <div className="h-25 bg-linear-to-r from-primary to-background"></div>
        <div className="p-10 text-black!">
          <div className="h-41 p flex items-center justify-between ">
            <div className="flex items-center gap-4 sm:gap-6">
              <Avatar
                src={user.avatar_url || "https://i.pravatar.cc/150?img=12"}
                size={100}
              />

              <div>
                <h1 className="text-2xl font-semibold">{user.full_name}</h1>
                <p className="opacity-70 mt-1">{user.email}</p>
              </div>
            </div>
            <PrimaryButton
              text={editting ? "profile.save" : "profile.edit"}
              onClick={onEdit}
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          >
            <FormInput<TUser>
              name="full_name"
              label="profile.full_name"
              register={register}
              errors={errors}
              disabled={!editting}
              placeholder="profile.your_full_name"
            />

            <FormInput<TUser>
              name="phone"
              label="profile.phone"
              register={register}
              errors={errors}
              disabled={!editting}
              placeholder="profile.your_phone"
            />

            <FormDropdown
              text="profile.address"
              components={[
                <FormInput<TUser>
                  name="address.city"
                  label="profile.city"
                  register={register}
                  errors={errors}
                  disabled={!editting}
                  placeholder="profile.your_city"
                />,

                <FormInput<TUser>
                  name="address.postal_code"
                  label="profile.postal_code"
                  register={register}
                  errors={errors}
                  disabled={!editting}
                  placeholder="profile.your_postal_code"
                />,

                <FormInput<TUser>
                  name="address.country"
                  label="profile.country"
                  register={register}
                  errors={errors}
                  disabled={!editting}
                  placeholder="profile.your_country"
                />,

                <FormInput<TUser>
                  name="address.address_line"
                  label="profile.full_address"
                  register={register}
                  errors={errors}
                  disabled={!editting}
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
