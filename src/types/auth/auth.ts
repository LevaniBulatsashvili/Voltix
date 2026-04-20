import type { Session } from "@supabase/supabase-js";

export interface IAuthService {
  loginWithEmail(email: string, password: string): Promise<IAuthResponse>;
  registerWithEmail(email: string, password: string): Promise<IAuthResponse>;
  loginWithGoogle(): Promise<IOAuthResponse>;
  loginWithOtp(email: string): Promise<IOtpResponse>;
  logout(): Promise<void>;
  updateEmail(
    newEmail: string,
    currentPassword: string,
  ): Promise<IAuthUser | null>;
  updatePassword(currentPassword: string, newPassword: string): Promise<void>;
  sendPasswordResetEmail(email: string): Promise<void>;
}

export interface IAuthUser {
  id: string;
  email: string | null;
  email_verified: boolean;
  created_at: string;
}

export interface IAuthResponse {
  authUser: IAuthUser | null;
  session: Session | null;
}

export interface IOAuthResponse {
  url: string;
  provider: string;
}

export interface IOtpResponse {
  user: null;
  session: null;
  messageId?: string | null;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  email: string;
  password: string;
}
