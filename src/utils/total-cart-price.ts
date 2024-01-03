export default function totalCartPrice(cart: any) {
  const extraPrice = cart
    ?.map((el: any) =>
      el?.extra_increases_price?.map(
        (xl: any) =>
          ({
            name: xl?.name,
            extra_price: xl?.extra_price * el?.quantity,
          } || 0)
      )
    )
    .flat()
    ?.reduce((a: any, c: any) => a + +c?.extra_price, 0);
  const quantity = cart?.reduce((a: any, c: any) => a + +c?.quantity, 0);
  const sizePrice = cart?.reduce(
    (a: any, c: any) => a + +c?.size?.extra_price * +c?.quantity,
    0
  );
  const basePrice = cart?.reduce(
    (a: any, c: any) => a + +c?.base_price * +c?.quantity,
    0
  );
  const totalPrice = extraPrice + sizePrice + basePrice;

  return { totalPrice, sizePrice, basePrice, extraPrice, quantity };
}
