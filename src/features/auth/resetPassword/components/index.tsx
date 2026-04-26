import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useResetPassword } from "../hooks/useResetPassword";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "../schemas/resetPasswordSchema";
import FormContainer from "@/components/form/FormContainer";
import FormHeader from "@/components/form/FormHeader";
import PrimaryButton from "@/components/button/PrimaryBtn";
import { PAGE } from "@/pages/pageConfig";
import ErrorMessage from "../../components/ErrorMessage";
import { FormInput } from "@/components/form/Input/FormInput";
import Spinner from "@/components/feedback/Spinner";
import { useEffect } from "react";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, isPending, error, isReady, isInvalid } =
    useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if (isInvalid) navigate(PAGE.AUTH.FORGOT_PASSWORD, { replace: true });
  }, [isInvalid, navigate]);

  const onSubmit = (data: ResetPasswordFormData) => {
    resetPassword(data.password, {
      onSuccess: () => navigate(PAGE.AUTH.LOGIN),
    });
  };

  if (!isReady) return <Spinner />;

  return (
    <FormContainer>
      <FormHeader text="reset_password.reset_password" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormInput
          name="password"
          label="reset_password.new_password"
          type="password"
          register={register}
          errors={errors}
          placeholder="reset_password.new_password"
        />
        <FormInput
          name="confirmPassword"
          label="reset_password.confirm_password"
          type="password"
          register={register}
          errors={errors}
          placeholder="reset_password.confirm_password"
        />

        <PrimaryButton text="reset_password.submit" disabled={isPending} />
        {error && <ErrorMessage message={error.message} />}
      </form>
    </FormContainer>
  );
};

export default ResetPassword;
