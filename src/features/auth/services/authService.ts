import { supabase } from "@/lib/supabase";
import { PAGE } from "@/pages/pageConfig";
import type {
  IAuthResponse,
  IAuthService,
  IOAuthResponse,
} from "@/types/auth/auth";
import { getCurrentAuthUser, reauthenticate } from "./auth.helpers";
import { mapUser } from "../utils/mapUser";

export const authService: IAuthService = {
  // =========================
  // 🔐 LOGIN
  // =========================
  async loginWithEmail(email, password): Promise<IAuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    const authUser = mapUser(data.user);

    return {
      authUser,
      session: data.session,
    };
  },

  // =========================
  // 📝 REGISTER
  // =========================
  async registerWithEmail(email, password): Promise<IAuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${PAGE.AUTH.VERIFY_SUCCESS}`,
      },
    });
    if (error) throw error;

    const authUser = mapUser(data.user);
    if (!authUser?.id) return { authUser, session: data.session };

    return {
      authUser,
      session: data.session,
    };
  },

  // =========================
  // 🌐 OAUTH
  // =========================
  async loginWithGoogle(): Promise<IOAuthResponse> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${PAGE.PUBLIC.SHOP}`,
      },
    });
    if (error) throw error;
    return data as IOAuthResponse;
  },

  // =========================
  // 🚪 LOGOUT
  // =========================
  async logout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // =========================
  // 📧 UPDATE EMAIL
  // =========================
  async updateEmail(newEmail, currentPassword) {
    const authUser = await getCurrentAuthUser();
    if (!authUser?.email) throw new Error("No authenticated user found.");

    await reauthenticate(authUser.email, currentPassword);

    const { data, error } = await supabase.auth.updateUser({
      email: newEmail,
    });
    if (error) throw error;

    return mapUser(data.user);
  },

  // =========================
  // 🔒 UPDATE PASSWORD
  // =========================
  async updatePassword(currentPassword, newPassword): Promise<void> {
    const authUser = await getCurrentAuthUser();
    if (!authUser?.email) throw new Error("No authenticated user found.");

    await reauthenticate(authUser.email, currentPassword);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  },

  // =========================
  // 📩 RESET PASSWORD
  // =========================
  async sendPasswordResetEmail(email): Promise<void> {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}${PAGE.AUTH.RESET_PASSWORD}`,
    });
    if (error) throw error;
  },
};
