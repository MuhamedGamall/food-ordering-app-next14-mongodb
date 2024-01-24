import React from "react";
import { ExtraPriceState, InitProductState } from "../../types";
import { ExtraPricesFields } from "../app/(routes)/menu/category/[id]/(product)/[productId]/page";
import formatPrice from "@/utils/format/format-price";

interface BasePrice_ExtraPricesProps {
  extraPricesFields: ExtraPricesFields;
  base_price: string;
}
export default function BasePrice_ExtraPrices({
  extraPricesFields,
  base_price,
}: BasePrice_ExtraPricesProps) {
  // calc price for one products
  const basePrice_extraPrices =
    (extraPricesFields?.extra_increases_price?.reduce(
      (a, c) => +a + +c.extra_price,
      0
    ) +
      +(base_price || 0) +
      +(extraPricesFields.size?.extra_price || 0)) *
    (+extraPricesFields?.quantity || 0);

  return <span>{formatPrice(basePrice_extraPrices + "" || "0")}</span>;
}
