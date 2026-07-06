export interface Product {
  id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  file_url: string;
  category: string;
  created_at: string;
  seller?: {
    name: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: "buyer" | "seller" | "admin";
}
