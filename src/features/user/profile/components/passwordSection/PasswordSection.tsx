import PrimaryButton from "../../../../../components/button/PrimaryBtn";
import { useState } from "react";
import ChangePasswordModal from "./ChangePassword.modal";
import { useTranslation } from "react-i18next";

const PasswordSection = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-8 space-y-5">
        <p className="text-xl font-semibold">{t("profile.password")}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <input
            type="password"
            value="dummyPassword"
            disabled
            className=" h-14 p-5 text-black text-lg rounded-lg focus:outline-gray-400 bg-gray-200 disabled:opacity-90 disabled:cursor-not-allowed"
          />
          <PrimaryButton
            text="profile.change_password"
            className="md:w-60 md:justify-self-end"
            onClick={() => setShowModal((prev) => !prev)}
          />
        </div>
      </div>

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
