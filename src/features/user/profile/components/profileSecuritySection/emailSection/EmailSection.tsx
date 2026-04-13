import { Mail } from "lucide-react";
import { formatDateLong } from "@/utils/formatDateLong";
import type { IProfile } from "@/types/profile";
import { useState } from "react";
import ChangeEmailModal from "./ChangeEmailModal";
import { useTranslation } from "react-i18next";
import ProfileFormSection from "../shared/ProfileFormSection";
import ProfileInfoRow from "../shared/ProfileInfoRow";

interface IEmailSection {
  profile: IProfile;
}

const EmailSection = ({ profile }: IEmailSection) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ProfileFormSection
        title={t("profile.email_address")}
        buttonText={t("profile.change_email")}
        buttonClassName="md:w-60 md:justify-self-end"
        onButtonClick={() => setShowModal(true)}
      >
        <ProfileInfoRow
          icon={
            <Mail
              className="p-1.5 bg-blue-100 text-blue-800 rounded-full"
              size={40}
            />
          }
          title={profile.email}
          subtitle={formatDateLong(profile.created_at)}
        />
      </ProfileFormSection>

      {showModal && (
        <ChangeEmailModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default EmailSection;
