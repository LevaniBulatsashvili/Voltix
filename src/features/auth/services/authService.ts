import { supabase } from "../../../lib/supabase";
import type {
  IAuthResponse,
  IAuthService,
  IAuthUser,
  IOAuthResponse,
  IOtpResponse,
} from "../../../types/Auth";
import { mapUser } from "../../../utils/mapUser";

export const authService: IAuthService = {
  loginWithEmail: async (
    email: string,
    password: string,
  ): Promise<IAuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const user: IAuthUser | null = data.user ? mapUser(data.user) : null;
    return { user, session: data.session };
  },

  registerWithEmail: async (
    email: string,
    password: string,
  ): Promise<IAuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-success`,
      },
    });
    if (error) throw error;

    const user: IAuthUser | null = data.user ? mapUser(data.user) : null;
    return { user, session: data.session };
  },

  loginWithGoogle: async (): Promise<IOAuthResponse> => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;
    return data as IOAuthResponse;
  },

  loginWithOtp: async (email: string): Promise<IOtpResponse> => {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    return data as IOtpResponse;
  },

  logout: async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
};
