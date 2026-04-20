import { createEntityHooks } from "@/lib/react-query/createEntityHooks";
import { Query_Keys } from "@/lib/react-query/configs";
import { productImagesService } from "../services/productImagesService";
import type { IImage } from "@/types/public/product";

export const {
  useInfiniteFetchMany: useInfiniteFetchProductsImages,
  useFetchMany: useFetchProductsImages,
  useFetch: useFetchProductImages,
  useCreateMany: useCreateManyProductImages,
  useCreate: useCreateProductImages,
  useUpdate: useUpdateProductImages,
  useDeleteMany: useDeleteManyProductImages,
  useDelete: useDeleteProductImages,
} = createEntityHooks<IImage, number, Pick<IImage, "product_id" | "image_url">>(
  productImagesService,
  Query_Keys.product_images,
);
