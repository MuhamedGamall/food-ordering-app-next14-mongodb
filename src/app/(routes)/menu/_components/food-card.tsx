import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { InitProductState } from "../../../../../types";
import { usePathname, useRouter } from "next/navigation";
import formatPrice from "@/utils/format/format-price";
import { getCart } from "@/lib/RTK/slices/cart-slice";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import { useAppDispatch } from "@/hooks/redux";
import { useSession } from "next-auth/react";
interface FoodCardProps {
  item: any;
  setIsClicked: Dispatch<SetStateAction<{ check: boolean; id: string }>>;
}
export default function FoodCard({ item, setIsClicked }: FoodCardProps) {
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();
  const isLogin = session.status === "authenticated";
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div className="w-fit  min-h-[300px] bg-white border mx-auto   transition rounded-[3px] overflow-hidden ">
      <Link href={`/menu/category/${item?.category.title}/` + item._id}>
        <Image
          src={item.image}
          alt="product image"
          objectFit="cover"
          width={300}
          height={250}
          className="w-full rounded-[5px] transition min-w-[100px] aspect-[1.4/1] object-cover"
        />
      </Link>
      <div className=" flex flex-col  p-2">
        <div className="flex gap-2  justify-between">
          <div className=" text-[18px] max-w-[80%] break-all leading-[1] mb-1 min-h-[40px] font-[700]">
            {truncateText(item.title, 30)}
          </div>
          <Link
            href={`/menu/category/${item?.category.title}/` + item._id}
            className="hover:text-sky-950 underline transition text-sky-700 text-[14px]  w-fit"
          >
            Ditails
          </Link>
        </div>
        <div
          className="text-[15px] text-slate-800 max-w-[80%] break-all mb-2 
        "
        >
          {formatPrice(
            +item.base_price + (+item?.sizes?.[0]?.extra_price || 0) + "" || "0"
          )}
        </div>
        <div
          className="text-[15px] text-slate-600 max-w-[80%] break-all leading-[1] 
          h-[50px]"
        >
          {truncateText(item.description, 50)}
        </div>
        <Button
          onClick={() => {
            if (isLogin) {
              setIsClicked({ check: true, id: item._id });
            } else {
              router.push("/log-in");
            }
          }}
          className="bg-[#2d5d2a] mt-2 hover:bg-green-900 rounded-md text-white text-[18px] h-[30px] p-5"
        >
          ORDER NOW
        </Button>
      </div>
    </div>
  );
}
