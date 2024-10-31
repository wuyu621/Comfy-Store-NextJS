import { ZodSchema, z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(4, { message: "name must be at least 2 characters." })
    .max(100, { message: "name must be less than 100 characters." }),
  company: z.string(),
  price: z.coerce.number().int().min(0),
  featured: z.coerce.boolean(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split("").length;
      return wordCount >= 10 && wordCount <= 1000;
    },
    { message: "description must be between 10 and 1000 words." }
  ),
});

export const imageSchema = z.object({ image: validateImageFile() });

function validateImageFile() {
  const maxUploadSize = 1024 * 1024;
  const acceptedFileTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];
  return z
    .instanceof(File)
    .refine((file) => {
      return file?.size <= maxUploadSize;
    }, `File size must be less than 1 MB`)
    .refine((file) => {
      return acceptedFileTypes.includes(file?.type);
    }, "Only .jpg, .jpeg, .png and .webp formats are supported");
}

export function validateWithZodSchema<T>(
  schema: ZodSchema<T>,
  data: unknown
): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
}

export const reviewSchema = z.object({
  productId: z.string().refine((value) => value !== "", {
    message: "Product ID can not be empty",
  }),
  authorName: z.string().refine((value) => value !== "", {
    message: "Author name can not be empty",
  }),
  authorImageUrl: z.string().refine((value) => value !== "", {
    message: "Author image URL can not be empty",
  }),
  comment: z
    .string()
    .min(10, { message: "Comment must be at least 10 characters long" })
    .max(1000, { message: "Comment must be at most 1000 characters long" }),
  rating: z.coerce
    .number()
    .int()
    .min(1, { message: "Rating must be at least 1" })
    .max(5, { message: "Rating must be at most 5" }),
});
