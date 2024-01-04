import * as z from "zod";
export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Username is required.",
    })
    .max(30, { message: "Username should be on a lot of 30 characters." }),
  email: z
    .string()
    .email("Please enter a valid email address.")
    .trim()
    .optional(),
  phone: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+(\.\d{1,2})?$/.test(`${value}`) &&
        value.length <= 20 &&
        value.length >= 10,
      "Invalid field"
    )
    .optional(),

  street_address: z.string().trim().max(191, "Address is too long").optional(),

  city: z
    .string()
    .trim()
    .max(48, "City must be at most 30 characters long")
    .optional(),
  postal_code: z
    .string()
    .trim()
    .refine(
      (value) =>
        /^\d+(\.\d{1,2})?$/.test(`${value}`) &&
        value.length <= 6 &&
        value.length >= 1,
      "Invalid field"
    )
    .optional(),
  country: z
    .string()
    .trim()
    .max(30, "Country must be at most 30 characters long")
    .optional(),
});
