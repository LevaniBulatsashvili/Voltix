import { PAGE } from "@/pages/pageConfig";
import Container from "./ui/Container";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import LinkBtn from "./ui/LinkBtn";
import { useTranslation } from "react-i18next";
import { useSyncSession } from "../hooks/useSyncVerifiedUser";

const VerificationSuccess = () => {
  const { t } = useTranslation();
  useSyncSession();

  return (
    <Container>
      <Heading>{t("verificationSuccess.email_verified_successfully")}</Heading>
      <Text>
        {t(
          "verificationSuccess.your_email_has_been_successfully_verified_You_can_now_log_in_to_your_account_and_start_shopping",
        )}
      </Text>
      <div className="flex justify-center gap-4">
        <LinkBtn className="capitalize" to={PAGE.PUBLIC.BASE}>
          {t("verificationSuccess.home")}
        </LinkBtn>
      </div>
    </Container>
  );
};

export default VerificationSuccess;
