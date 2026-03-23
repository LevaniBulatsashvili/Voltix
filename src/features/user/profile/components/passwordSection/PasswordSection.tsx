import { useState } from "react";
import ChangePasswordModal from "./ChangePassword.modal";
import { useTranslation } from "react-i18next";
import FormSection from "../ui/FormSection";

const PasswordSection = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <FormSection
        title={t("profile.password")}
        buttonText={t("profile.change_password")}
        buttonClassName="md:w-60 md:justify-self-end"
        onButtonClick={() => setShowModal(true)}
      >
        <input
          type="password"
          value="dummyPassword"
          disabled
          className="h-14 p-5 text-black text-lg rounded-lg focus:outline-gray-400 bg-gray-200 disabled:opacity-90 disabled:cursor-not-allowed"
        />
      </FormSection>

      {showModal && (
        <ChangePasswordModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default PasswordSection;
