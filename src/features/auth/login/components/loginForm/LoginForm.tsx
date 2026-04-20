import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInput } from "@/components/form/Input/FormInput";
import type { LoginFormData } from "../../schemas/loginSchema";
import FormBtn from "@/components/form/FormBtn";
import Form from "@/components/form/Form";

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
  return (
    <Form onSubmit={onSubmit}>
      <FormInput<LoginFormData>
        name="email"
        register={register}
        errors={errors}
      />
      <FormInput<LoginFormData>
        name="password"
        register={register}
        errors={errors}
        type="password"
      />
      <FormBtn
        isPending={isPending}
        text={isPending ? "login.logging_in" : "login.login"}
      />
    </Form>
  );
};

export default LoginForm;
