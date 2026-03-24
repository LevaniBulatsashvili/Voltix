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
import FormHeader from "../../../../components/form/FormHeader";
import FormContainer from "../../../../components/form/FormContainer";
import ErrorMessage from "../../components/ErrorMessage";

const RegisterPage = () => {
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
      onSuccess: () => navigate(PAGE.VERIFY_EMAIL),
    });
  };

  return (
    <FormContainer>
      <FormHeader text="register.create_account" />

      <RegisterForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isPending={isPending}
      />
      {error && <ErrorMessage message={error.message} />}

      <AuthSwitchLink
        text="register.already_have_an_account?"
        linkText="register.login"
        to={PAGE.LOGIN}
      />
    </FormContainer>
  );
};

export default RegisterPage;
