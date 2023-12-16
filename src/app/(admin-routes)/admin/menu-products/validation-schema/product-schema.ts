import * as z from "zod";
export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, {
      message: "Product title must contain at least 5 characters.",
    })
    .max(
      100,
      `Product title is too long! It should contain maximum 100 characters`
    ),
    description: z
    .string()
    .trim()
    .min(20, "Description must contain at least 20 characters.")
    .max(
      300,
      "Description is too long! It should contain maximum 300 characters."
    ),
  category: z.string().min(1, "Category is required"),
  base_price: z
    .string()
    .trim()
    .min(0.99, "Price must contain at least one digit")
    .max(999999999999, "Maximum price allowed is $999999999999"),
});
