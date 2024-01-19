import ProductsChoiced from "@/app/(routes)/_comonents/products-choiced";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  deleteAllProductsFromFavorites,
  deleteFavorite,
  getFavorites,
} from "@/lib/RTK/slices/favorite-slice";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NotificationBanner from "@/app/(routes)/_comonents/notification-banner";

export default function FavoriteSheet() {
  const { favorites, loading } = useAppSelector((state) => state.favoritesData);
  const { products } = useAppSelector((state) => state.menuProducts);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getFavorites());
  }, [dispatch]);
  const removeAllItems = () => {
    dispatch(deleteAllProductsFromFavorites());
    toast.success("All products is removed");
    setOpen(false);
  };

  const removeItem = (id: string) => {
    if (favorites?.length) {
      id && dispatch(deleteFavorite(id));
    }
  };
  const filterFav = favorites.filter(
    (el: any) => !products.some((xl) => el?.product_id === xl?._id)
  );

  function onSave() {
    setClose(true);
    if (filterFav.length > 0) {
      filterFav.forEach(
        async (el: any) => await dispatch(deleteFavorite(el?._id))
      );
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="text-[15px]  cursor-pointer w-full  rounded-sm px-2 py-1.5  text-left   hover:bg-accent hover:text-accent-foreground leading-[1]">
        Favorites ({favorites?.length})
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className={cn("min-w-[450px] overflow-y-auto pt-12 pb-3 px-3 ")}
      >
        {favorites?.length ? (
          <>
            <h2 className="text-[30px] mb-4">FAVORITES</h2>
            <NotificationBanner
              close={close}
              onSave={onSave}
              dataLength={filterFav?.length}
            />
            <ProductsChoiced data={favorites} onDelete={removeItem} />
            <Button
              disabled={!favorites?.length}
              onClick={removeAllItems}
              className="w-full sticky bottom-4 rounded-full"
            >
              Remove all items
            </Button>
          </>
        ) : (
          <div className=" flex flex-col items-center gap-2 justify-center text-[25px] h-full">
            No favorite yet
            <Link href={"/menu/category/_"}>
              <Button
                onClick={() => {
                  setOpen(false);
                }}
                className="w-fit rounded-full flex items-center gap-2 "
              >
                View the menu <MoveRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
