// src/features/auth/services/authService.ts
import { supabase } from "../../../lib/supabase";
import { PAGE } from "../../../pages/pageConfig";
import type {
  IAuthResponse,
  IAuthService,
  IAuthUser,
  IOAuthResponse,
  IOtpResponse,
} from "../../../types/Auth";
import { mapUser } from "../../../utils/mapUser";
import { userService } from "../../user/api/userService";
import { profileService } from "./profileService";

export const authService: IAuthService = {
  /**
   * Login with email + password
   * Returns both Supabase auth user (IAuthUser) and full profile (IUser)
   */
  loginWithEmail: async (
    email: string,
    password: string,
  ): Promise<IAuthResponse> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // Supabase auth user
    const authUser: IAuthUser | null = data.user ? mapUser(data.user) : null;

    // Full profile (IUser) including addresses
    let fullUser = null;
    if (authUser?.id) {
      fullUser = await userService.getUser();
    }

    return {
      authUser, // IAuthUser (role, email_verified)
      user: fullUser, // IUser (profile + addresses)
      session: data.session,
    };
  },

  /**
   * Register with email + password
   */
  registerWithEmail: async (
    email: string,
    password: string,
  ): Promise<IAuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${PAGE.VERIFY_SUCCESS}`,
      },
    });
    if (error) throw error;

    // Map auth user
    const authUser: IAuthUser | null = data.user ? mapUser(data.user) : null;

    // Create empty profile if user exists
    if (authUser?.id) {
      await profileService.createEmptyProfile(authUser.id);

      // Fetch full profile immediately
      const fullUser = await userService.getUser();
      return {
        authUser,
        user: fullUser,
        session: data.session,
      };
    }

    return {
      authUser,
      user: null,
      session: data.session,
    };
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

  updateEmail: async (
    newEmail: string,
    currentPassword: string,
  ): Promise<IAuthUser | null> => {
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();
    if (getUserError) throw getUserError;
    if (!user?.email) throw new Error("No authenticated user found.");

    // Re-authenticate
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (signInError) throw signInError;

    const { data: updatedData, error: updateError } =
      await supabase.auth.updateUser({ email: newEmail });
    if (updateError) throw updateError;

    return updatedData.user ? mapUser(updatedData.user) : null;
  },

  updatePassword: async (
    currentPassword: string,
    newPassword: string,
  ): Promise<void> => {
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();
    if (getUserError) throw getUserError;
    if (!user?.email) throw new Error("No authenticated user found.");

    // Re-authenticate
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });
    if (signInError) throw signInError;

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (updateError) throw updateError;

    console.log("Password updated successfully");
  },

  sendPasswordResetEmail: async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};
