interface IFormHeader {
  text: string;
  className?: string;
}
const FormHeader = ({ text, className }: IFormHeader) => {
  return (
    <h1
      className={`text-3xl mb-10 font-bold text-center capitalize ${className ?? ""}`}
    >
      {text}
    </h1>
  );
};

export default FormHeader;
