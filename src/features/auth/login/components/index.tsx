import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "./loginForm/LoginForm";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { useTranslation } from "react-i18next";
import { PAGE } from "../../../../pages/pageConfig";
import AuthSwitchLink from "../../components/AuthSwitchLink";
import FormHeader from "../../../../components/form/FormHeader";
import FormContainer from "../../../../components/form/FormContainer";

const LoginPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isPending, error } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => navigate(PAGE.BASE),
      onError: (err: Error) => console.error(err),
    });
  };

  return (
    <FormContainer>
      <FormHeader text={t("login-welcome back")} />

      <LoginForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isPending}
      />
      {error && (
        <p className="mt-2 text-center text-red-500">{error.message}</p>
      )}

      <AuthSwitchLink
        text={t("login-don't have an account?")}
        linkText={t("login-register")}
        to={PAGE.REGISTER}
      />
    </FormContainer>
  );
};

export default LoginPage;
