interface IFormBtn {
  isPending: boolean;
  text: string;
  className?: string;
}

const FormBtn = ({ isPending, text, className }: IFormBtn) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`w-full bg-primary text-background py-2 rounded hover:opacity-80 transition disabled:opacity-50 capitalize ${className ?? ""}`}
    >
      {text}
    </button>
  );
};

export default FormBtn;
