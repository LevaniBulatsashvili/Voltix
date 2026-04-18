import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { FormInput } from "@/components/form/Input/FormInput";
import Modal from "@/components/ui/modal/Modal";
import {
  changeEmailSchema,
  type TChangeEmail,
} from "../../../schemas/changeEmailSchema";
import { authService } from "../../../../../auth/services/authService";
import { notifySupabaseError } from "@/lib/toast/notifySupabaseError";
import { notifySuccess } from "@/lib/toast/notifySuccess";

interface IChangeEmailModal {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeEmailModal = ({ isOpen, onClose }: IChangeEmailModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TChangeEmail>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "", password: "" },
  });

  const onSubmit = async (data: TChangeEmail) => {
    try {
      await authService.updateEmail(data.newEmail, data.password);
      onClose();
      notifySuccess("profile.please_check_both_emails_to_verify");
    } catch (error) {
      notifySupabaseError(error);
    }
  };

  return (
    <Modal isOpen={isOpen} title={"profile.change_email"} onClose={onClose}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput<TChangeEmail>
          name="newEmail"
          label={"profile.new_email"}
          register={register}
          errors={errors}
          placeholder={"profile.enter_new_email"}
        />

        <FormInput<TChangeEmail>
          name="password"
          type="password"
          label={"profile.current_password"}
          register={register}
          errors={errors}
          placeholder={"profile.enter_your_current_password"}
        />

        <div className="flex justify-end gap-4 mt-6">
          <PrimaryButton
            text="profile.cancel"
            className="bg-background! text-primary border border-gray-300 hover:border-gray-400"
            type="button"
            onClick={onClose}
          />

          <PrimaryButton
            text={isSubmitting ? "profile.updating" : "profile.update_email"}
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Modal>
  );
};

export default ChangeEmailModal;
