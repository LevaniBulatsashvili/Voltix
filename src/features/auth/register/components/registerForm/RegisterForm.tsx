import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormData } from "../../schemas/registerSchema";
import { FormInput } from "../../../../../components/form/FormInput";
import FormBtn from "../../../../../components/form/FormBtn";
import Form from "../../../../../components/form/Form";

interface RegisterFormProps {
  register: UseFormRegister<RegisterFormData>;
  errors: FieldErrors<RegisterFormData>;
  onSubmit: () => void;
  isPending: boolean;
}

const RegisterForm = ({
  register,
  errors,
  onSubmit,
  isPending,
}: RegisterFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <FormInput
        name="email"
        register={register}
        errors={errors}
        placeholder="register.email"
        type="email"
      />

      <FormInput
        name="password"
        register={register}
        errors={errors}
        placeholder="register.password"
        type="password"
      />

      <FormBtn
        isPending={isPending}
        text={isPending ? "register.register_loading" : "register.register"}
      />
    </Form>
  );
};

export default RegisterForm;
