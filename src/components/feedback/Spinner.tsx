interface ISpinner {
  containerClass?: string;
  spinnerclass?: string;
}

export default function Spinner({ containerClass, spinnerclass }: ISpinner) {
  return (
    <div className={`mt-[4dvh] w-full flex justify-center ${containerClass}`}>
      <div
        className={`border-8 border-solid border-[#f3f3f3] border-t-[#4f4f4f] rounded-full animate-spin ${spinnerclass}`}
      />
    </div>
  );
}
