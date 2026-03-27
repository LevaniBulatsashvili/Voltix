import { Mail } from "lucide-react";
import { formatDateLong } from "../../../../../utils/formatDateLong";
import type { IProfile } from "../../../../../types/profile";
import { useState } from "react";
import ChangeEmailModal from "./ChangeEmailModal";
import { useTranslation } from "react-i18next";
import FormSection from "../ui/FormSection";
import InfoRow from "../ui/InfoRow";

interface IEmailSection {
  user: IProfile;
}

const EmailSection = ({ user }: IEmailSection) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FormSection
        title={t("profile.email_address")}
        buttonText={t("profile.change_email")}
        buttonClassName="md:w-60 md:justify-self-end"
        onButtonClick={() => setShowModal(true)}
      >
        <InfoRow
          icon={
            <Mail
              className="p-1.5 bg-blue-100 text-blue-800 rounded-full"
              size={40}
            />
          }
          title={user.email}
          subtitle={formatDateLong(user.created_at)}
        />
      </FormSection>

      {showModal && (
        <ChangeEmailModal
          user={user}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EmailSection;
