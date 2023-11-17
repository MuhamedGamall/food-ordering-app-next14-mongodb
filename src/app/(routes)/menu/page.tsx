import Categorys from "./_components/categorys";
import MenuItems from "./_components/menu-items";

export default function Menu() {
  return (
    <div className="mx-auto px-4 max-w-[85rem]">
      <Categorys />
      <MenuItems />
    </div>
  );
}
