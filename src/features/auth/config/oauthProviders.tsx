import { useLoginWithGoogle } from "../login/hooks/useLoginWithGoogle";

interface IOAuthProvider {
  id: string;
  labelKey: string;
  icon: string;
  useHook: () => { trigger: () => void; isPending: boolean };
}

export const oauthProviders: IOAuthProvider[] = [
  {
    id: "google",
    labelKey: "login.continue_with_google",
    icon: "/icons/google.svg",
    useHook: () => {
      const { loginWithGoogle, isPending } = useLoginWithGoogle();
      return { trigger: loginWithGoogle, isPending };
    },
  },
  // Future providers:
];
