import React from "react";
import { ExtraPriceState, InitProductState } from "../../../../../types";
import { ExtraPricesFields } from "../category/[id]/(product)/[productId]/page";
import formatPrice from "@/utils/format/format-price";


interface BasePrice_ExtraPricesProps {
  extraPricesFields: ExtraPricesFields;
  product: InitProductState;
}
export default function BasePrice_ExtraPrices({
  extraPricesFields,
  product,
}: BasePrice_ExtraPricesProps) {
  const basePrice_extraPrices =
    (extraPricesFields.extra_increases_price.reduce(
      (a, c) => +a + +c.extra_price,
      0
    ) +
      +(product?.base_price || 0) +
      +(extraPricesFields.size?.extra_price || 0)) *
    +extraPricesFields?.quantity;

  return <div>{formatPrice(basePrice_extraPrices + "" || "0")}</div>;
}
