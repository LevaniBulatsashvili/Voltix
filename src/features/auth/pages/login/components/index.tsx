import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "./loginForm/LoginForm";
import { loginSchema, type LoginFormData } from "../schemas/loginSchema";
import { PAGE } from "@/pages/pageConfig";
import TestCredentials from "@/features/auth/components/TestCredentials";
import ErrorMessage from "@/features/auth/components/ErrorMessage";
import OAuthProviders from "@/features/auth/components/OauthProviders";
import AuthSwitchLink from "@/features/auth/components/AuthSwitchLink";
import FormHeader from "@/components/form/FormHeader";
import FormContainer from "@/components/form/FormContainer";

const LoginPage = () => {
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
      onSuccess: () => navigate(PAGE.PUBLIC.BASE),
    });
  };

  return (
    <FormContainer className="relative">
      <TestCredentials />

      <FormHeader text="login.welcome_back" />

      <LoginForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isPending}
      />
      {error && <ErrorMessage message={error.message} />}
      <OAuthProviders />
      <AuthSwitchLink
        text="login.don't_have_an_account"
        linkText="login.register"
        to={PAGE.AUTH.REGISTER}
      />
      <AuthSwitchLink
        text="login.forgot_password"
        linkText="login.reset_it"
        to={PAGE.AUTH.FORGOT_PASSWORD}
        className="mt-2!"
      />
    </FormContainer>
  );
};

export default LoginPage;
