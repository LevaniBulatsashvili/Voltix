// import { useState, useEffect } from "react";
// import { useForm, useFieldArray, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { supabase } from "../lib/supabase";
// import { productSchema, ProductFormValues } from "../schemas/productSchema";
// import { uploadImage } from "../utils/uploadImage";
// import { fetchCategories } from "../utils/fetchCategories";
// import SelectInput from "../components/inputs/SelectInput";

// const AdminPage = () => {
//   const [mainCategories, setMainCategories] = useState<
//     { id: number; name: string }[]
//   >([]);
//   const [subCategories, setSubCategories] = useState<
//     { id: number; name: string }[]
//   >([]);
//   const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
//   const [imagesPreview, setImagesPreview] = useState<string[]>([]);

//   useEffect(() => {
//     fetchCategories().then(({ mainCategories, subCategories }) => {
//       setMainCategories(mainCategories);
//       setSubCategories(subCategories);
//     });
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<ProductFormValues>({
//     resolver: zodResolver(productSchema),
//     defaultValues: { specs: [], currency: "USD" },
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: "specs" });

//   const mutation = useMutation({
//     mutationFn: async (data: ProductFormValues) => {
//       const thumbnailUrl = await uploadImage(data.thumbnail[0], "products");
//       const imageUrls = data.images
//         ? await Promise.all(
//             Array.from(data.images).map((img) => uploadImage(img, "products")),
//           )
//         : [];

//       const { data: productData, error: productError } = await supabase
//         .from("products")
//         .insert({
//           name: data.name,
//           description: data.description,
//           brand: data.brand,
//           price: data.price,
//           stock: data.stock,
//           currency: data.currency,
//           discount_percentage: data.discount,
//           rating: data.rating,
//           total_sold: data.totalSold,
//           thumbnail: thumbnailUrl,
//           main_category_id: data.mainCategoryId,
//           category_id: data.categoryId,
//         })
//         .select()
//         .single();
//       if (productError) throw productError;
//       const productId = productData.id;

//       if (data.specs.length)
//         await supabase
//           .from("product_specs")
//           .insert(
//             data.specs.map((s) => ({
//               product_id: productId,
//               key: s.key,
//               value: s.value,
//             })),
//           );
//       if (imageUrls.length)
//         await supabase
//           .from("product_images")
//           .insert(
//             imageUrls.map((url) => ({ product_id: productId, image_url: url })),
//           );

//       return productData;
//     },
//   });

//   // Preview
//   const thumbnailFile = watch("thumbnail");
//   const imagesFiles = watch("images");
//   if (thumbnailFile && thumbnailFile.length > 0 && !thumbnailPreview)
//     setThumbnailPreview(URL.createObjectURL(thumbnailFile[0]));
//   if (imagesFiles && imagesFiles.length > 0 && imagesPreview.length === 0)
//     setImagesPreview(
//       Array.from(imagesFiles).map((f) => URL.createObjectURL(f)),
//     );

//   const onSubmit = (data: ProductFormValues) => mutation.mutate(data);

//   return (
//     <div className="max-w-5xl mx-auto p-6 space-y-6">
//       <h2 className="text-3xl font-bold">Create New Product</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Product Info */}
//         <div className="bg-white p-6 rounded-lg shadow space-y-2">
//           <h3 className="text-xl font-semibold">Product Info</h3>
//           <input
//             {...register("name")}
//             placeholder="Product Name"
//             className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.name && <p className="text-red-500">{errors.name.message}</p>}
//           <textarea
//             {...register("description")}
//             placeholder="Description"
//             className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.description && (
//             <p className="text-red-500">{errors.description.message}</p>
//           )}
//           <input
//             {...register("brand")}
//             placeholder="Brand"
//             className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-400"
//           />
//           {errors.brand && (
//             <p className="text-red-500">{errors.brand.message}</p>
//           )}
//         </div>

//         {/* Categories */}
//         <div className="bg-white p-6 rounded-lg shadow space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <SelectInput
//             control={control}
//             name="mainCategoryId"
//             options={mainCategories}
//           />
//           {errors.mainCategoryId && (
//             <p className="text-red-500">{errors.mainCategoryId.message}</p>
//           )}
//           <input
//             {...register("mainCategoryName")}
//             placeholder="Main Category Name"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <SelectInput
//             control={control}
//             name="categoryId"
//             options={subCategories}
//           />
//           {errors.categoryId && (
//             <p className="text-red-500">{errors.categoryId.message}</p>
//           )}
//           <input
//             {...register("categoryName")}
//             placeholder="Sub Category Name"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Pricing & Stock */}
//         <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-4 gap-4">
//           <input
//             type="number"
//             {...register("price")}
//             placeholder="Price"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <select
//             {...register("currency")}
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="USD">USD</option>
//             <option value="GEL">GEL</option>
//             <option value="EUR">EUR</option>
//           </select>
//           <input
//             type="number"
//             {...register("discount")}
//             placeholder="Discount %"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="number"
//             {...register("stock")}
//             placeholder="Stock"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Rating & Sold */}
//         <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="number"
//             {...register("rating")}
//             placeholder="Rating"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//           <input
//             type="number"
//             {...register("totalSold")}
//             placeholder="Total Sold"
//             className="border p-2 rounded focus:ring-2 focus:ring-blue-400"
//           />
//         </div>

//         {/* Specs */}
//         <div className="bg-white p-6 rounded-lg shadow space-y-2">
//           <h3 className="text-xl font-semibold">Specifications</h3>
//           {fields.map((field, i) => (
//             <div key={field.id} className="flex gap-2 items-center mb-2">
//               <input
//                 {...register(`specs.${i}.key` as const)}
//                 placeholder="Key"
//                 className="border p-2 flex-1 rounded focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 {...register(`specs.${i}.value` as const)}
//                 placeholder="Value"
//                 className="border p-2 flex-1 rounded focus:ring-2 focus:ring-blue-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => remove(i)}
//                 className="bg-red-500 text-white px-2 py-1 rounded"
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={() => append({ key: "", value: "" })}
//             className="bg-gray-200 px-4 py-2 rounded"
//           >
//             Add Spec
//           </button>
//         </div>

//         {/* Media Upload */}
//         <div className="bg-white p-6 rounded-lg shadow space-y-2">
//           <h3 className="text-xl font-semibold">Media</h3>
//           <Controller
//             control={control}
//             name="thumbnail"
//             render={({ field }) => (
//               <input
//                 type="file"
//                 onChange={(e) => field.onChange(e.target.files)}
//               />
//             )}
//           />
//           {thumbnailPreview && (
//             <img
//               src={thumbnailPreview}
//               className="w-24 h-24 rounded mt-2 object-cover"
//             />
//           )}
//           <Controller
//             control={control}
//             name="images"
//             render={({ field }) => (
//               <input
//                 type="file"
//                 multiple
//                 onChange={(e) => field.onChange(e.target.files)}
//               />
//             )}
//           />
//           {imagesPreview.length > 0 && (
//             <div className="flex gap-2 mt-2 overflow-x-auto">
//               {imagesPreview.map((img, i) => (
//                 <img
//                   key={i}
//                   src={img}
//                   className="w-20 h-20 rounded object-cover"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition"
//         >
//           Create Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminPage;
