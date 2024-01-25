import { MenuProduct } from "@/models/MenuProducts";
import { Category } from "@/models/Categories";
// category schema
export interface InitCategoryState {
  _id: string;
  title: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppCategoryState {
  categories: InitCategoryState[];
  loading: boolean;
  error: string | null;
}

export interface FormCategoryValues {
  _id: string;
  title: string;
}

// product schema
export interface InitProductState {
  _id: string;
  title: string;
  image: string;
  base_price: string;
  description: string;
  category: { category_id: string; title: string };
  sizes: [];
  extra_increases_price: [];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// export interface ProductProps extends MenuProduct {}

export interface AppProductState {
  products: InitProductState[];
  loading: boolean;
  error: string | null;
}

// upload image schema
export interface UplaodImageProps {
  image64: string;
  publicId: string;
  folderName: string;
}

// export interface AppUploadImageState {
//   imageURL: string;
// }

export interface AppUploadImageState {
  imageURL: string;
  loading: boolean;
  error: string | null;
}

export interface ExtraPriceState {
  name: string;
  extra_price: string;
}
