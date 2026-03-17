import type { Session } from "@supabase/supabase-js";

export interface IAuthService {
  loginWithEmail(email: string, password: string): Promise<IAuthResponse>;
  registerWithEmail(email: string, password: string): Promise<IAuthResponse>;
  loginWithGoogle(): Promise<IOAuthResponse>;
  loginWithOtp(email: string): Promise<IOtpResponse>;
  logout(): Promise<void>;
}

export interface IAuthUser {
  id: string;
  email: string;
  role: "user" | "admin";
  email_verified: boolean;
}

export interface IAuthResponse {
  user: IAuthUser | null;
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
