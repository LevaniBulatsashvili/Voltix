import { Mail } from "lucide-react";
import { formatDateLong } from "../../../../../utils/formatDateLong";
import PrimaryButton from "../../../../../components/button/PrimaryBtn";
import type { IUser } from "../../../../../types/User";
import { useState } from "react";
import ChangeEmailModal from "./ChangeEmailModal";
import { useTranslation } from "react-i18next";

interface IEmailSection {
  user: IUser;
}

const EmailSection = ({ user }: IEmailSection) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mt-8 space-y-5">
        <p className="text-xl font-semibold">{t("profile.email_address")}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center gap-5">
            <Mail
              className="p-2 bg-blue-100 text-blue-800 rounded-full"
              size={40}
            />
            <div>
              <p className="text-lg font-medium">{user.email}</p>
              <p className="opacity-80">{formatDateLong(user.created_at)}</p>
            </div>
          </div>
          <PrimaryButton
            text="profile.change_email"
            className="md:w-60 md:justify-self-end"
            onClick={() => setShowModal((prev) => !prev)}
          />
        </div>
      </div>

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
