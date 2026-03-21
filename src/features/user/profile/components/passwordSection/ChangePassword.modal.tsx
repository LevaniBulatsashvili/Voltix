import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "../../../../../components/button/PrimaryBtn";
import Modal from "../../../../../components/ui/Modal";
import {
  changePasswordSchema,
  type TChangePassword,
} from "../../../schemas/changePasswordSchema";
import { authService } from "../../../../auth/services/authService";
import PasswordInput from "../../../../../components/form/Input/PasswordInput";

interface IChangePasswordModal {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: IChangePasswordModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TChangePassword) => {
    try {
      await authService.updatePassword(data.currentPassword, data.newPassword);
      onClose();
      // alert("Password updated successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        alert((error as { message: string }).message);
      } else {
        alert("Failed to update password");
      }
    }
  };

  return (
    <Modal isOpen={isOpen} title={"profile.change_password"} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordInput
          name="currentPassword"
          label="profile.current_password"
          placeholder="profile.enter_current_password"
          register={register}
          errors={errors}
        />

        <PasswordInput
          name="newPassword"
          label="profile.new_password"
          placeholder="profile.enter_new_password"
          register={register}
          errors={errors}
        />

        <PasswordInput
          name="confirmPassword"
          label="profile.confirm_new_password"
          placeholder="profile.confirm_new_password"
          register={register}
          errors={errors}
        />

        <div className="flex justify-end gap-4 mt-6">
          <PrimaryButton
            text="profile.cancel"
            type="button"
            onClick={onClose}
          />
          <PrimaryButton
            text={isSubmitting ? "profile.updating" : "profile.update_password"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
