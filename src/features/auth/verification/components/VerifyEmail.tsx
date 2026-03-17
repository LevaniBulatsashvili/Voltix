import { useTranslation } from "react-i18next";
import { PAGE } from "../../../../pages/pageConfig";
import Container from "./ui/Container";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import LinkBtn from "./ui/LinkBtn";

const VerifyEmail = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading>{t("verify-email-verify your email")}</Heading>
      <Text>
        {t(
          "verify-email-thank you for registering! a verification link has been sent to your email. please check your inbox and click the link to activate your account.",
        )}
      </Text>

      <LinkBtn to={PAGE.LOGIN}>{t("verify-email-back to login")}</LinkBtn>
    </Container>
  );
};

export default VerifyEmail;
