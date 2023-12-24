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
  category: z.string().min(1, "Category is required"),
  sizes: z.array(
    z.object({
      name: z
        .string()
        .trim()
        .min(1, "Size filed is required")
        .max(30, "Size is too long! It should contain maximum 30 characters."),
      extra_price: z
        .string()
        .trim()
        .min(1, "Extra price must contain at least 1 characters.")
        .max(12, "Maximum extra price allowed is $999999999999."),
    })
  ),
  extra_increases_price: z.array(
    z.object({
      name: z
        .string()
        .trim()
        .min(1, "addition filed is required")
        .max(30, "Size is too long! It should contain maximum 30 characters."),
      extra_price: z
        .string()
        .trim()
        .min(1, "Extra price must contain at least 1 characters.")
        .max(12, "Maximum extra price allowed is $999999999999."),
    })
  ),
  base_price: z
    .string()
    .trim()
    .min(1, "Price must contain at least one digit")
    .max(12, "Maximum price allowed is $999999999999"),
});
