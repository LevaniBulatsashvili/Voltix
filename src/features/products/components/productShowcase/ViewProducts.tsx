import AppLink from "../../../../components/button/AppLink";

interface IViewProducts {
  to: string;
  text: string;
  className?: string;
}

const ViewProducts = ({ to, text, className = "" }: IViewProducts) => {
  return (
    <AppLink
      to={to}
      className={`px-16 py-3 rounded-full bg-accent text-white font-semibold ${className}`}
    >
      {text}
    </AppLink>
  );
};

export default ViewProducts;
