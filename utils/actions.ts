"use server";

import db from "@/utils/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  imageSchema,
  productSchema,
  reviewSchema,
  validateWithZodSchema,
} from "./schemas";
import { deleteImage, uploadImage } from "./superbase";
import { revalidatePath } from "next/cache";
import { Cart } from "@prisma/client";

//check if there is a user singed in
const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  return user;
};

//render error
const renderError = (error: unknown): { message: string } => {
  console.log(error);

  return {
    message: error instanceof Error ? error.message : "there was an error",
  };
};
//check if the user is admin user
const getAdminUser = async () => {
  const user = await getAuthUser();
  if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
};

//fetch featured products to display on home/featured products
export const fetchFeaturedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      featured: true,
    },
    // select: { name: true },
  });
  return products;
};

//fetch all products and search result of products
export const fetchAllProducts = async ({ search = "" }: { search: string }) => {
  const products = await db.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: { createdAt: "desc" },
  });
  return products;
  //   return db.product.findMany({ orderBy: { createdAt: "desc" } });
};

// fetch single product detail
export const fetchSingleProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) {
    redirect("/products");
  }
  return product;
};

//admin user's features:create product action
export const createProductAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);
    const imageFile = formData.get("image") as File;

    const validatedFields = validateWithZodSchema(productSchema, rawData);
    const validatedImageFile = validateWithZodSchema(imageSchema, {
      image: imageFile,
    });

    const fullPath = await uploadImage(validatedImageFile.image);

    // console.log(validatedImageFile);

    await db.product.create({
      data: {
        ...validatedFields,
        image: fullPath,
        clerkId: user.id,
      },
    });

    // return { message: "product created" };
  } catch (error) {
    return renderError(error);
  }
  redirect("/admin/products");
};

//admin user's features: display all the products can be edit and delete
export const fetchAdminProducts = async () => {
  await getAdminUser();
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return products;
};

export const deleteProductAction = async (prevState: { productId: string }) => {
  const { productId } = prevState;
  await getAdminUser();
  try {
    const product = await db.product.delete({
      where: {
        id: productId,
      },
    });

    await deleteImage(product.image);
    revalidatePath("/admin/products");
    return { message: "product removed" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchAdminProductDetail = async (productId: string) => {
  await getAdminUser();
  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
  });
  if (!product) redirect("/admin/products");
  return product;
};

export const updateProductAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const productId = formData.get("id") as string;
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(productSchema, rawData);

    await db.product.update({
      where: {
        id: productId,
      },
      data: {
        ...validatedFields,
      },
    });
    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateProductImageAction = async (
  prevState: any,
  formData: FormData
) => {
  await getAdminUser();
  try {
    const image = formData.get("image") as File;
    const productId = formData.get("id") as string;
    const oldImageUrl = formData.get("url") as string;

    const validatedFile = validateWithZodSchema(imageSchema, { image });
    const fullPath = await uploadImage(validatedFile.image);

    //update image url
    await db.product.update({
      where: { id: productId },
      data: {
        image: fullPath,
      },
    });

    await deleteImage(oldImageUrl);

    revalidatePath(`/admin/products/${productId}/edit`);
    return { message: "Product image updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

//favorite features
export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
  const user = await getAuthUser();
  const favorite = await db.favorite.findFirst({
    where: { productId: productId, clerkId: user.id },
    select: { id: true },
  });

  return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
  productId: string;
  favoriteId: string | null;
  pathname: string;
}) => {
  const user = await getAuthUser();
  const { productId, favoriteId, pathname } = prevState;

  try {
    if (favoriteId) {
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    } else {
      await db.favorite.create({
        data: { productId: productId, clerkId: user.id },
      });
    }

    revalidatePath(pathname);
    return { message: favoriteId ? "Removed from Faves" : "Added to Faves" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchUserFavorites = async () => {
  const user = await getAuthUser();

  const favorites = await db.favorite.findMany({
    where: {
      clerkId: user.id,
    },
    include: {
      product: true,
    },
  });
  return favorites;
};

//review features

export const createReviewAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const rawData = Object.fromEntries(formData);

    const validatedFields = validateWithZodSchema(reviewSchema, rawData);

    await db.review.create({
      data: {
        ...validatedFields,
        clerkId: user.id,
      },
    });

    revalidatePath(`/products/${validatedFields.productId}`);
    return { message: "Review submitted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductReviews = async (productId: string) => {
  const reviews = await db.review.findMany({
    where: { productId },
    orderBy: {
      createAt: "desc",
    },
  });
  return reviews;
};

export const fetchProductReviewsByUser = async () => {
  const user = await getAuthUser();
  const reviews = await db.review.findMany({
    where: { clerkId: user.id },
    select: {
      id: true,
      rating: true,
      comment: true,
      product: {
        select: { image: true, name: true },
      },
    },
  });

  return reviews;
};
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
  const { reviewId } = prevState;
  const user = await getAuthUser();
  try {
    await db.review.delete({
      where: {
        id: reviewId,
        clerkId: user.id,
      },
    });
    revalidatePath("/reviews");
    return { message: "review deleted successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const fetchProductRating = async (productId: string) => {
  const result = await db.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: { productId },
  });
  // console.log(result);

  //empty array if no reviews
  return {
    rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
    count: result[0]?._count.rating ?? 0,
  };
};

export const findExistingReview = async (userId: string, productId: string) => {
  const review = await db.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });

  return review;
};

//cart features
export const fetchCartItems = async () => {
  const { userId } = auth();
  const cart = await db.cart.findFirst({
    where: { clerkId: userId ?? "" },
    select: { numItemsInCart: true },
  });
  return cart?.numItemsInCart ?? 0;
};

const fetchProduct = async (productId: string) => {
  const product = await db.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    throw new Error("Product no found");
  }
  return product;
};

const includeProductClause = {
  cartItems: { include: { product: true } },
};

export const fetchOrCreateCart = async ({
  userId,
  errorOnFailure = false,
}: {
  userId: string;
  errorOnFailure?: boolean;
}) => {
  let cart = await db.cart.findFirst({
    where: { clerkId: userId },
    include: includeProductClause,
  });

  //used for delete and edit cart function
  if (!cart && errorOnFailure) {
    throw new Error("Cart not found");
  }

  if (!cart) {
    cart = await db.cart.create({
      data: { clerkId: userId },
      include: includeProductClause,
    });
  }
  return cart;
};

const updateOrCreateCartItem = async ({
  productId,
  amount,
  cartId,
}: {
  productId: string;
  amount: number;
  cartId: string;
}) => {
  let cartItem = await db.cartItem.findFirst({
    where: { productId, cartId },
  });

  if (cartItem) {
    cartItem = await db.cartItem.update({
      where: { id: cartItem.id },
      data: {
        amount: amount + cartItem.amount,
      },
    });
  } else {
    cartItem = await db.cartItem.create({
      data: { productId, amount, cartId },
    });
  }
};

export const updateCart = async (cart: Cart) => {
  const cartItems = await db.cartItem.findMany({
    where: {
      cartId: cart.id,
    },
    include: {
      product: true, //Include the related product
    },
    orderBy: {
      createdAt: "asc", //default orderby updated which will cause product shift in cart page
    },
  });

  let numItemsInCart = 0;
  let cartTotal = 0;

  for (const item of cartItems) {
    numItemsInCart += item.amount;
    cartTotal += item.amount * item.product.price;
  }
  const tax = cartTotal * cart.taxRate;
  const shipping = cartTotal ? cart.shipping : 0;
  const orderTotal = cartTotal + shipping + tax;

  const currentCart = await db.cart.update({
    where: { id: cart.id },
    data: { numItemsInCart, cartTotal, tax, orderTotal },
    include: includeProductClause,
  });
  return { currentCart, cartItems };
};

export const addToCartAction = async (prevState: any, formData: FormData) => {
  const productId = formData.get("productId") as string;
  const amount = Number(formData.get("amount") as string);
  const user = await getAuthUser();
  try {
    //check if there is the product exist in database because will get all the product data from database
    await fetchProduct(productId);

    //fetch user's cart or create cart
    const cart = await fetchOrCreateCart({ userId: user.id });

    await updateOrCreateCartItem({ productId, amount, cartId: cart.id });

    await updateCart(cart);
    revalidatePath(`/products/${productId}`);
  } catch (error) {
    return renderError(error);
  }
  // redirect("/cart");
  return { message: "product added to the cart" };
};

export const removeCartItemAction = async (
  prevState: any,
  formData: FormData
) => {
  const user = await getAuthUser();
  try {
    const cartItemId = formData.get("id") as string;
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.delete({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "Item was removed successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const updateCartItemAction = async ({
  amount,
  cartItemId,
}: {
  amount: number;
  cartItemId: string;
}) => {
  const user = await getAuthUser();
  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    await db.cartItem.update({
      where: {
        id: cartItemId,
        cartId: cart.id,
      },
      data: {
        amount: amount,
      },
    });
    await updateCart(cart);
    revalidatePath("/cart");
    return { message: "cart updated successfully" };
  } catch (error) {
    return renderError(error);
  }
};

export const createOrderAction = async (prevState: any, formData: FormData) => {
  const user = await getAuthUser();

  let orderId: null | string = null;
  let cartId: null | string = null;

  try {
    const cart = await fetchOrCreateCart({
      userId: user.id,
      errorOnFailure: true,
    });
    cartId = cart.id;

    //delete all the orders did not pay which isPaid is false
    await db.order.deleteMany({
      where: {
        clerkId: user.id,
        isPaid: false,
      },
    });

    const order = await db.order.create({
      data: {
        clerkId: user.id,
        products: cart.numItemsInCart,
        orderTotal: cart.orderTotal,
        tax: cart.tax,
        shipping: cart.shipping,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    orderId = order.id;

  } catch (error) {
    return renderError(error);
  }

  redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
};

export const fetchUsersOrders = async () => {
  const user = await getAuthUser();
  const orders = await db.order.findMany({
    where: { clerkId: user.id, isPaid: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};

export const fetchAdminOrders = async () => {
  const user = await getAdminUser();
  const orders = await db.order.findMany({
    where: { isPaid: true },
    orderBy: {
      createdAt: "desc",
    },
  });
  return orders;
};
