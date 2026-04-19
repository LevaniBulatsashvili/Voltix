interface ILabel {
  htmlFor: string;
  text: string;
}

export const Label = ({ htmlFor, text }: ILabel) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-3 text-lg opacity-90 capitalize"
    >
      {text}
    </label>
  );
};
