// "use client";

// import axios from "axios";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";

// import useProfile from "@/hooks/user-profile";

// import { useRouter } from "next/navigation";
// import HandleLoader from "@/components/loader";
// import AddProductForm from "./add-product-form";
// import { useAppDispatch, useAppSelector } from "@/hooks/redux";
// import {
//   editProduct,
//   getProducts,
//   postProduct,
// } from "@/lib/RTK/slices/menu-products-slice";
// import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
// import ImageForm from "@/components/image-form";
// import AllProducts from "./all-products-form";
// import formatPrice from "@/utils/format/format-price";
// import EditProductForm from "./edit-product-form";
// import { useSession } from "next-auth/react";

// export default function ProductForm() {
//   const session = useSession();
//   const dispatch = useAppDispatch();
//   const { loading, data } = useProfile();
//   const { products } = useAppSelector((state) => state.menuProducts);

//   const [addImage64, setAddImage64] = useState("");
//   const [editImage64, setEditImage64] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [editMood, setEditMood] = useState<{ id: string; check: boolean }>({
//     id: "",
//     check: false,
//   });

//   const email = data?.email;
//   const product = products.find((el) => el._id === editMood.id);

//   const AddCurrentImage = addImage64 || "/product-placeholder/th.jpeg";
//   const EditCurrentImage = editImage64 || "/product-placeholder/th.jpeg";
//   async function onSubmitAdd(value: any) {
//     if (Object.values({ value, addImage64 }).every((el) => !!el)) {
//       setIsSubmitting(true);
//       const data = await dispatch(
//         uploadImage({
//           image64: addImage64,
//           publicId: email,
//           folderName: "food-ordering-products",
//         })
//       );
//       const imageURL = await data?.payload;
//       const values = {
//         ...value,
//         ...(imageURL && { image: imageURL }),
//       };

//       await dispatch(postProduct(values));
//       setIsSubmitting(false);
//     } else {
//       toast.error("Please fill all fields");
//     }
//   }

//   async function onSubmitEdit(value: any) {
//     if (Object.values({ value, editImage64 }).some((el) => !!el)) {
//       setIsSubmitting(true);
//       const filteredData = Object.fromEntries(
//         Object.entries(value).filter(([key, value]) => value !== "")
//       );

//       const data =
//         editImage64 &&
//         (await dispatch(
//           uploadImage({
//             image64: editImage64,
//             publicId: email,
//             folderName: "food-ordering-products",
//           })
//         ));
//       const imageURL = (await data?.payload) || product?.image;
//       const values = {
//         ...filteredData,
//         ...(imageURL && { image: imageURL }),
//         _id: product?._id,
//       };
//       await dispatch(editProduct(values));
//       setIsSubmitting(false);
//     } else {
//       toast.error("Please fill all fields");
//     }
//   }

//   useEffect(() => {
//     async function getData() {
//       if (session.status === "authenticated") {
//         await dispatch(getProducts());
//       }
//     }
//     getData();
//   }, [dispatch, session.status]);

//   return (
//     <>
//       <div className="">
//         <div className=" relative mx-auto  max-w-full md:max-w-[80%] ">
//           {(loading || isSubmitting) && <HandleLoader />}
//           <div className="space-y-2 ">
//             <h1 className="text-[50px]">Menu products</h1>
//           </div>
//           <div>
//             <div className="flex gap-5 sm:flex-nowrap flex-wrap">
//               {!!products && !!product && editMood.check ? (
//                 <>
//                   <ImageForm
//                     image64={editImage64}
//                     setImage64={setEditImage64}
//                     currentImage={EditCurrentImage}
//                     isSubmitting={isSubmitting}
//                   />
//                   <EditProductForm
//                     onSubmit={onSubmitEdit}
//                     product={product}
//                     setEditMood={setEditMood}
//                     editMood={editMood}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <ImageForm
//                     image64={addImage64}
//                     setImage64={setAddImage64}
//                     currentImage={AddCurrentImage}
//                     isSubmitting={isSubmitting}
//                   />
//                   <AddProductForm onSubmit={onSubmitAdd} />
//                 </>
//               )}
//             </div>
//             <AllProducts setEditMood={setEditMood} editMood={editMood} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

import useProfile from "@/hooks/user-profile";

import { useRouter } from "next/navigation";
import HandleLoader from "@/components/loader";
import AddProductForm from "./add-product-form";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  editProduct,
  getProducts,
  postProduct,
} from "@/lib/RTK/slices/menu-products-slice";
import { uploadImage } from "@/lib/RTK/slices/upload-image-slice";
import ImageForm from "@/components/image-form";
import AllProducts from "./all-products-form";
import formatPrice from "@/utils/format/format-price";
import EditProductForm from "./edit-product-form";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";

export default function ProductForm() {
  const session = useSession();
  const dispatch = useAppDispatch();
  const { loading, data } = useProfile();

  const [image64, setImage64] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddMood, setIsAddMood] = useState(false);

  const email = data?.email;

  const AddCurrentImage = image64 || "/product-placeholder/th.jpeg";

  async function onSubmit(value: any) {
    if (Object.values({ value, image64 }).every((el) => !!el)) {
      setIsSubmitting(true);
      const data = await dispatch(
        uploadImage({
          image64,
          publicId: email,
          folderName: "food-ordering-products",
        })
      );
      const imageURL = await data?.payload;
      const values = {
        ...value,
        ...(imageURL && { image: imageURL }),
      };
      await dispatch(postProduct(values));
      setIsSubmitting(false);
    } else {
      toast.error("Please fill all fields");
    }
  }
  return (
    <>
      <div className="">
        <div className=" relative mx-auto  max-w-full md:max-w-[80%] ">
          {(loading || isSubmitting) && <HandleLoader />}
          <div className="space-y-2 ">
            <h1 className="text-[50px]">Menu products</h1>
          </div>
          <div className="w-full">
            <Button
              onClick={() => setIsAddMood((cur) => !cur)}
              className="flex items-center gap-2 ml-auto text-[18px]"
            >
              {!isAddMood ? (
                <>
                  <ArrowDownNarrowWide /> Open add product mood
                </>
              ) : (
                <>
                  <ArrowUpNarrowWide /> Close add product mood
                </>
              )}
            </Button>
            {isAddMood && (
              <div className="flex justify-center gap-5 sm:flex-nowrap flex-wrap">
                <ImageForm
                  image64={image64}
                  setImage64={setImage64}
                  currentImage={AddCurrentImage}
                  isSubmitting={isSubmitting}
                />
                <AddProductForm onSubmit={onSubmit} imageURL64={image64} />
              </div>
            )}
            <AllProducts />
          </div>
        </div>
      </div>
    </>
  );
}
