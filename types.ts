export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  coverUrl: string;
  description: string;
  publishedDate: string;
  pages: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export type ViewState = 'store' | 'library';

export interface AIInsights {
  summary: string;
  keyTakeaways: string[];
  loading: boolean;
  error?: string;
}
