import FoodCard from "./food-card";
import { InitProductState } from "../../../../../types";

interface MenuItemsProps {
  products: InitProductState[];
  loading: boolean;
  cartArr: any;
}
export default function MenuItems({
  products,
  loading,
  cartArr,
}: MenuItemsProps) {
  return (
    <div className=" max-w-[80rem] ">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:max-w-[90%] mx-auto  gap-5">
        {products.map((el) => (
          <FoodCard key={el._id} item={el} isAdded={cartArr.includes(el._id)} />
        ))}
      </div>
    </div>
  );
}
