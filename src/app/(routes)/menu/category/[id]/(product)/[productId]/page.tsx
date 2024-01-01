"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProducts } from "@/lib/RTK/slices/menu-products-slice";
import Image from "next/image";

import formatPrice from "@/utils/format/format-price";
import { Button } from "@/components/ui/button";
import SelectorField from "./_combonents/selectorField";
import { ExtraPriceState } from "../../../../../../../../types";

export interface ExtraPricesFields {
  size: ExtraPriceState | null;
  extra_increases_price: ExtraPriceState[];
  quantity: string;
}

export default function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const [extraPricesFields, setExtraPricesFields] = useState<ExtraPricesFields>(
    { size: null, extra_increases_price: [], quantity: "" }
  );

  const { products, loading } = useAppSelector((state) => state.menuProducts);

  const dispatch = useAppDispatch();
  const product = products.find((el) => el._id === productId);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="border-b ">
      <div className="grid  grid-cols-1 gap-8 md:grid-cols-2 ">
        <div className="md:h-[574px] overflow-hidden">
          <Image
            src={product?.image || ""}
            alt="product image"
            width={1125}
            height={816}
            loading="lazy"
            className="w-full h-full object-cover"
            objectFit="cover"
          />
        </div>
        <div className="flex flex-col gap-3  m-[48px]">
          <h2 className="text-4xl">{product?.title}</h2>
          <p className="text-[18px] mb-[5px] text-slate-700">
            {formatPrice(product?.base_price || "")}
          </p>
          <p className="text-[18px] mb-[5px] max-w-[500px] text-slate-700">
            {product?.description +
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id ducimus suscipit tempore cumque minus iusto, odit eos sequi qui temporibus iure numquam error quas laboriosam vero, eligendi minima atque commodi."}
          </p>
          <div>
            <SelectorField
              extraPricesFields={extraPricesFields}
              setExtraPricesFields={setExtraPricesFields}
              data={product || undefined}
              loading={loading}
            />
          </div>
          <Button className="text-[18px] rounded-full w-fit" variant={"green"}>
            ADD TO ORDER
          </Button>
        </div>
      </div>
    </section>
  );
}
