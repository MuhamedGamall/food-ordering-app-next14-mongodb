import FoodCard from "./food-card";
import { InitProductState } from "../../../../../types";
interface MenuItemsProps {
  products: InitProductState[];
  loading: boolean;
}
export default function MenuItems({ products, loading }: MenuItemsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6">
      {products.map((el) => 
      
        <FoodCard key={el._id}   item={el}/>
      )}
    </div>
  );
}
