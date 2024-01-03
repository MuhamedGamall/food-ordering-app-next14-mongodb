import FoodCard from "./food-card";
import { InitProductState } from "../../../../../types";
import { useState } from "react";
import ProductDialog from "./product-dialog";

interface MenuItemsProps {
  products: InitProductState[];
  loading: boolean;
}
export default function MenuItems({ products, loading }: MenuItemsProps) {
  const [isClicked, setIsClicked] = useState({ check: false, id: "" });
  const dialogProduct = products.filter((el) => el._id === isClicked.id)[0];
  return (
    <>
      {isClicked.check && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center ">
          <div
            className="flex items-center justify-center flex-col px-1 bg-white rounded-md"
            style={{ maxHeight: "calc(100vh - 100px)" }}
          >
            <ProductDialog item={dialogProduct} setIsClicked={setIsClicked} />
          </div>
        </div>
      )}
      <div className=" max-w-[80rem] ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-[90%] mx-auto  gap-5">
          {products.map((el) => (
            <FoodCard key={el._id} item={el} setIsClicked={setIsClicked} />
          ))}
        </div>
      </div>
    </>
  );
}
