import AppLink from "../../../components/button/AppLink";

interface IAuthFooter {
  to: string;
  text: string;
  linkText: string;
}

const AuthSwitchLink = ({ to, text, linkText }: IAuthFooter) => {
  return (
    <p className="mt-10 text-center text-sm">
      {text}
      <AppLink
        className="ml-1.5 font-semibold underline hover:opacity-80"
        to={to}
      >
        {linkText}
      </AppLink>
    </p>
  );
};

export default AuthSwitchLink;
