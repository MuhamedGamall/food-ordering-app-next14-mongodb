import { MenuProduct } from "@/models/MenuProducts";
// category schema
export interface initCategoryState {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AppCategoryState {
  categories: Product[];
  loading: boolean;
  error: string | null;
}

export interface FormCategoryValues {
  _id: string;
  title: string;
}

// product schema
export interface initProductState {
  _id: string;
  title: string;
  image: string;
  base_price: string;
  description: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductProps extends MenuProduct {}

export interface AppProductState {
  products: Product[];
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
