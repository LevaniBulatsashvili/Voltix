import { useTranslation } from "react-i18next";
import { PAGE } from "@/pages/pageConfig";
import Container from "./ui/Container";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import LinkBtn from "./ui/LinkBtn";

const VerifyEmail = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading>{t("verifyEmail.verify_your_email")}</Heading>
      <Text>
        {t(
          "verifyEmail.thank_you_for_registering_a_verification_link_has_been_sent_to_your_email_please_check_your_inbox_and_click_the_link_to_activate_your_account",
        )}
      </Text>

      <LinkBtn to={PAGE.AUTH.LOGIN}>{t("verifyEmail.back_to_login")}</LinkBtn>
    </Container>
  );
};

export default VerifyEmail;
