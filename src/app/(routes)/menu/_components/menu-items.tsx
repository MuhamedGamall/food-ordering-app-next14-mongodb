import FoodCard from "./food-card";

export default function MenuItems() {
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
