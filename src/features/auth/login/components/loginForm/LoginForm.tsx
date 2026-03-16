import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "../../../../../components/form/FormInput";
import type { LoginFormData } from "../../schemas/loginSchema";
import { useTranslation } from "react-i18next";
import FormBtn from "../../../../../components/form/FormBtn";
import Form from "../../../../../components/form/Form";

interface LoginFormProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  onSubmit: () => void;
  isPending: boolean;
}

const LoginForm = ({
  register,
  errors,
  onSubmit,
  isPending,
}: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <Form onSubmit={onSubmit}>
      <FormInput<LoginFormData>
        name="email"
        register={register}
        errors={errors}
        placeholder="login-email"
      />
      <FormInput<LoginFormData>
        name="password"
        register={register}
        errors={errors}
        placeholder="login-password"
        type="password"
      />
      <FormBtn
        isPending={isPending}
        text={isPending ? t("login-logging in...") : t("login-login")}
      />
    </Form>
  );
};

export default LoginForm;
