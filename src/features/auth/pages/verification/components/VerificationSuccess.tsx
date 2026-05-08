import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { PAGE } from "@/pages/pageConfig";
import Container from "./ui/Container";
import Heading from "./ui/Heading";
import Text from "./ui/Text";
import LinkBtn from "./ui/LinkBtn";
import { useTranslation } from "react-i18next";

const VerificationSuccess = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    if (code) supabase.auth.exchangeCodeForSession(code);
  }, []);

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
