import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "../../../../components/form/Input/FormInput";
import Avatar from "./avatar/Avatar";
import Orders from "./orders/Orders";
import PrimaryButton from "../../../../components/button/PrimaryBtn";
import { userSchema, type TUser } from "../../schemas/userSchema";
import { FormDropdown } from "../../../../components/form/FormDropdown";
import { useState } from "react";

const ProfilePage = () => {
  const [editting, setEditting] = useState(false);
  const currentUser: TUser = {
    id: "user_123",
    full_name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555 123 456",
    avatar_url: "https://i.pravatar.cc/150?img=12",
    created_at: new Date().toISOString(),
    address: {
      address_line: "123 Main St Apt 5B",
      city: "New York",
      postal_code: "10001",
      country: "US",
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUser>({
    resolver: zodResolver(userSchema),
    defaultValues: currentUser,
  });

  const onSubmit = (data: TUser) => {
    console.log("Updated user data:", data);
  };

  const onEdit = () => setEditting((prev) => !prev);

  return (
    <div className="w-full text-primary">
      <div className="h-25 bg-linear-to-r from-blue-200 to-white"></div>
      <div className="h-41 p-8 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          <Avatar src={currentUser.avatar_url} size={100} />

          <div>
            <h1 className="text-2xl font-semibold">{currentUser.full_name}</h1>
            <p className="opacity-70 mt-1">{currentUser.email}</p>
          </div>
        </div>
        <PrimaryButton onClick={onEdit}>
          {editting ? "Save" : "Edit"}
        </PrimaryButton>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8"
      >
        <FormInput<TUser>
          name="full_name"
          label="Full Name"
          register={register}
          errors={errors}
          disabled={!editting}
        />

        <FormInput<TUser>
          name="email"
          label="Email"
          register={register}
          errors={errors}
          disabled={!editting}
        />

        <FormInput<TUser>
          name="phone"
          label="Phone"
          register={register}
          errors={errors}
          disabled={!editting}
        />

        <FormDropdown
          text="address"
          components={[
            <FormInput<TUser>
              name="address.city"
              label="City"
              register={register}
              errors={errors}
              disabled={!editting}
            />,

            <FormInput<TUser>
              name="address.postal_code"
              label="Postal Code"
              register={register}
              errors={errors}
              disabled={!editting}
            />,

            <FormInput<TUser>
              name="address.country"
              label="Country"
              register={register}
              errors={errors}
              disabled={!editting}
            />,

            <FormInput<TUser>
              name="address.address_line"
              label="Full Address"
              register={register}
              errors={errors}
              disabled={!editting}
            />,
          ]}
        />
      </form>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <Orders userId={currentUser.id} />
      </div>
    </div>
  );
};

export default ProfilePage;
