import { PAGE } from "../../../../pages/pageConfig";
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
      <Heading>
        {t("verification-success-email verified successfully!")}
      </Heading>
      <Text>
        {t(
          "verification-success-Your email has been successfully verified. You can now log in to your account and start shopping.",
        )}
      </Text>
      <div className="flex justify-center gap-4">
        <LinkBtn className="capitalize" to={PAGE.BASE}>
          {t("verification-success-home")}
        </LinkBtn>
      </div>
    </Container>
  );
};

export default VerificationSuccess;
