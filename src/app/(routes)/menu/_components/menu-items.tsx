import FoodCard from "./food-card";
import { InitProductState } from '../../../../../types';
interface MenuItemsProps {
  products:InitProductState[]
  loading:boolean
}
export default function MenuItems({products,loading}:MenuItemsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
      <FoodCard />
    </div>
  );
}
