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
      200,
      "Description is too long! It should contain maximum 200 characters."
    ),

  category: z.object({
    title: z.string().min(1, "Category is required"),
    category_id: z.string(),
  }),
  base_price: z
    .string()
    .trim()
    .min(1, "Must contain at least  0.09")
    .max(12, "Maximum price allowed is $999999999999"),
});
