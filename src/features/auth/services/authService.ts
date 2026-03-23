import { supabase } from "../../../lib/supabase";
import { PAGE } from "../../../pages/pageConfig";
import type {
  IAuthResponse,
  IAuthService,
  IOAuthResponse,
  IOtpResponse,
} from "../../../types/Auth";
import { userService } from "../../user/api/userService";
import { profileService } from "./profileService";
import {
  getCurrentAuthUser,
  reauthenticate,
  mapAuthUser,
} from "./auth.helpers";

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

    const authUser = mapAuthUser(data.user);
    const user = authUser?.id ? await userService.getUser() : null;

    return {
      authUser,
      user,
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
        emailRedirectTo: `${window.location.origin}${PAGE.VERIFY_SUCCESS}`,
      },
    });
    if (error) throw error;

    const authUser = mapAuthUser(data.user!);

    if (!authUser?.id) {
      return { authUser, user: null, session: data.session };
    }

    await profileService.createEmptyProfile(authUser.id);
    const user = await userService.getUser();

    return {
      authUser,
      user,
      session: data.session,
    };
  },

  // =========================
  // 🌐 OAUTH
  // =========================
  async loginWithGoogle(): Promise<IOAuthResponse> {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) throw error;

    return data as IOAuthResponse;
  },

  // =========================
  // 🔑 OTP LOGIN
  // =========================
  async loginWithOtp(email): Promise<IOtpResponse> {
    const { data, error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;

    return data as IOtpResponse;
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

    return mapAuthUser(data.user);
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
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};
