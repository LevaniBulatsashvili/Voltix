export interface IPromoCode {
  id: string;
  code: string;
  discount_percentage: number;
  expires_at: string | null;
  is_active: boolean;
  created_at: string;
}
