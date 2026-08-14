export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  colors: string[];
  sizes: string[];
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
}
