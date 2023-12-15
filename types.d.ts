export interface Category {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppState {
  categories: Product[];
  loading: boolean;
  error: string | null;
}

export interface FormValues {
  _id: string;
  title: string;
}
