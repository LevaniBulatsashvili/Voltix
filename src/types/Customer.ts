export interface ICustomer {
  id: string;
  name: string;
  location?: string;
  avatar?: string;
  comment: string;
  rating: number;
  verified?: boolean;
  createdAt: string;
}
