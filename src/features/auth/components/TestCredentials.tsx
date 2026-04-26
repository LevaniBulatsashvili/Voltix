import { useAppSelector } from "@/hooks/redux";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

const credentials = [
  { role: "user", email: "voltixuser@test.com", password: "user1234" },
  { role: "admin", email: "voltixadmin@test.com", password: "admin1234" },
  { role: "courier", email: "login.coming_soon", password: "..." },
];

const roleStyles: Record<string, string> = {
  user: "bg-blue-50 text-blue-700",
  admin: "bg-amber-50 text-amber-700",
  courier: "bg-green-50 text-green-700",
};

const TestCredentials = () => {
  const { t } = useTranslation();
  const { theme } = useAppSelector((state) => state.theme);
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const copy = (val: string) => {
    navigator.clipboard.writeText(val);
    setCopied(val);
    setTimeout(() => setCopied(null), 1200);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="absolute top-4 right-4 z-10">
      <button
        onClick={() => setOpen((p) => !p)}
        className="size-7 rounded-full border text-sm font-medium flex items-center justify-center hover:bg-gray-100 transition"
        title={t("login.test_credentials")}
      >
        i
      </button>

      {open && (
        <div className="absolute top-8 -right-4 w-[calc(100vw-2rem)] max-w-60 bg-background text-primary border rounded-xl shadow-sm p-3 flex flex-col gap-2">
          <p className="text-xs font-medium uppercase tracking-wide opacity-70 mb-1">
            {t("login.test_accounts")}
          </p>

          {credentials.map((cred) => (
            <div
              key={cred.role}
              className="border rounded-lg p-2.5 flex flex-col gap-1.5"
            >
              <span
                className={`text-sm font-semibold px-2 py-0.5 rounded-full w-fit ${roleStyles[cred.role]}`}
              >
                {t(`login.${cred.role}`)}
              </span>
              {[
                { label: "Email", val: cred.email },
                { label: "Password", val: cred.password },
              ].map(({ label, val }) => (
                <div key={label} className="flex justify-between items-center">
                  <span className="text-xs opacity-70">
                    {t(`common.${label.toLowerCase()}`)}
                  </span>
                  <button
                    onClick={() => copy(val)}
                    className={`text-xs font-mono border px-1.5 py-0.5 rounded ${theme === "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"} transition`}
                  >
                    {copied === val
                      ? t("login.copied")
                      : val.includes("@")
                        ? val
                        : t(val)}
                  </button>
                </div>
              ))}
            </div>
          ))}

          <p className="text-xs text-gray-400 text-center mt-1">
            {t("login.click_to_copy")}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestCredentials;
