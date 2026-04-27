import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../hooks/useForgotPassword";
import FormContainer from "@/components/form/FormContainer";
import FormHeader from "@/components/form/FormHeader";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { PAGE } from "@/pages/pageConfig";
import { useTranslation } from "react-i18next";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "../schemas/forgotPasswordSchema";
import { FormInput } from "@/components/form/Input/FormInput";
import ErrorMessage from "@/features/auth/components/ErrorMessage";
import AuthSwitchLink from "@/features/auth/components/AuthSwitchLink";
import { CheckCircle } from "lucide-react";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const { sendResetEmail, isPending, error, isSuccess } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: ForgotPasswordFormData) => sendResetEmail(data.email);

  return (
    <FormContainer>
      <FormHeader text="forgot_password.forgot_password" />

      {isSuccess ? (
        <div className="flex items-center justify-center gap-3 py-4 text-green-600">
          <p className="text-center text-xl font-semibold">
            {t("forgot_password.email_sent")}
          </p>
          <CheckCircle size={26} strokeWidth={2} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            name="email"
            label="forgot_password.email"
            register={register}
            errors={errors}
            placeholder="forgot_password.email"
          />
          <PrimaryButton
            text="forgot_password.send_reset_link"
            disabled={isPending}
          />
          {error && <ErrorMessage message={error.message} />}
        </form>
      )}

      <AuthSwitchLink
        text="forgot_password.remembered_password"
        linkText="forgot_password.login"
        to={PAGE.AUTH.LOGIN}
      />
    </FormContainer>
  );
};

export default ForgotPassword;
