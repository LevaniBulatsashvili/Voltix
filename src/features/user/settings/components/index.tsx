import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import ToggleBtn from "../../../../components/button/ToggleBtn";

import { type ISettings, toggleSetting } from "../store/settings.slice";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const settingsItems: { label: string; key: keyof ISettings }[] = [
    { label: t("settings.permanent_no_data_state"), key: "permaNoDataState" },
    { label: t("settings.flicker_no_data_state"), key: "flickerNoDataState" },
    { label: t("settings.permanent_loading_state"), key: "permaLoadingState" },
    { label: t("settings.flicker_loading_state"), key: "flickerLoadingState" },
    { label: t("settings.permanent_srror_state"), key: "permaErrorState" },
    { label: t("settings.flicker_error_state"), key: "flickerErrorState" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">{t("settings.app_settings")}</h1>
      <p>
        {t(
          "settings.toggle_different_states_to_simulate_behaviors_in_the_app_for_testing_purposes",
        )}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settingsItems.map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center justify-between p-4 gap-4 border rounded-md shadow-sm hover:shadow-md transition"
          >
            <span className="font-medium flex items-center justify-center text-center md:min-w-62 md:min-h-12">
              {label}
            </span>

            <ToggleBtn
              isActive={settings[key]}
              onToggle={() => dispatch(toggleSetting(key))}
              className="min-w-12.5 border border-primary"
              activeToggleClassName="bg-background"
              inactiveToggleClassName="bg-primary"
              activeThumbClassName="bg-primary"
              inactiveThumbClassName="bg-background"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
