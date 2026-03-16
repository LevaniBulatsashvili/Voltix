import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import RegisterForm from "../components/registerForm/RegisterForm";
import {
  registerSchema,
  type RegisterFormData,
} from "../schemas/registerSchema";
import { PAGE } from "../../../../pages/pageConfig";
import AuthSwitchLink from "../../components/AuthSwitchLink";
import { useTranslation } from "react-i18next";
import FormHeader from "../../../../components/form/FormHeader";
import FormContainer from "../../../../components/form/FormContainer";

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { register: registerUser, isPending, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data, {
      onSuccess: () => navigate(PAGE.BASE),
    });
  };

  return (
    <FormContainer>
      <FormHeader text={t("register-create account")} />

      <RegisterForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isPending}
      />
      {error && (
        <p className="mt-2 text-red-500 text-center">{error.message}</p>
      )}

      <AuthSwitchLink
        text={t("register-already have an account?")}
        linkText={t("register-login")}
        to={PAGE.LOGIN}
      />
    </FormContainer>
  );
};

export default RegisterPage;
