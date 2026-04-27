import { useDeleteAccount } from "@/features/auth/hooks/useDeleteAccount";
import { useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const DeleteAccountSection = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector((state) => state.theme);
  const { mutate: deleteAccount, isPending } = useDeleteAccount();
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="border border-red-200 rounded-lg p-4 flex flex-col gap-3 mt-8">
      <h3 className="text-red-600 font-medium">{t("profile.danger_zone")}</h3>
      <p className="text-sm text-gray-500">
        {t("profile.delete_account_warning")}
      </p>

      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="self-start text-sm text-red-500 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition"
        >
          {t("profile.delete_account")}
        </button>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => deleteAccount()}
            disabled={isPending}
            className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
          >
            {t("profile.confirm_delete")}
          </button>
          <button
            onClick={() => setConfirm(false)}
            className={`text-sm border px-4 py-2 rounded-lg ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"} transition`}
          >
            {t("common.cancel")}
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteAccountSection;
