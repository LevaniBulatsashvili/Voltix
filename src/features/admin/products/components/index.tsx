import { useTranslation } from "react-i18next";
import { CATEGORIES } from "@/utils/consts";
import { capitalize } from "@/utils/capitalize";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import AdminHeader from "../../components/AdminHeader";
import AdminStats from "../../components/AdminStats";
import AdminToolbar from "../../components/AdminToolbar";
import AdminProductsTable from "./adminProductsTable/AdminProductsTable";
import ProductFormFields from "./productsForm/ProductsForm";
import { useProductForm } from "../hooks/useProductForm";
import { useProductQuery } from "../hooks/useProductQuery";
import { useProductStats } from "../hooks/useProductStats";
import { useDeleteProduct } from "@/features/public/product/hooks/productCRUD";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import type { IProduct } from "@/types/public/product";
import { deleteStorageImage } from "@/features/shared/imageSelector/utils/deleteStorageImage";

const AdminProducts = () => {
  const { t } = useTranslation();

  const {
    productsQuery,
    productList,
    currentPage,
    total,
    totalPages,
    start,
    end,
    searchValue,
    setSearchValue,
    onSelectCategory,
    categoryFilter,
    setPage,
  } = useProductQuery();

  const {
    formKey,
    modalOpen,
    editingProduct,
    uploadRef,
    register,
    handleSubmit,
    errors,
    watchedMainCategory,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
    deleteManyProductImages,
  } = useProductForm();

  const { mutate: deleteProduct } = useDeleteProduct();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<IProduct>({
      onDelete: deleteProduct,
      itemName: "product",
      onBeforeDelete: async (p) => {
        const imageDeletions: Promise<void>[] = [];

        if (p.thumbnail)
          imageDeletions.push(
            deleteStorageImage(p.thumbnail, "product-images"),
          );

        if (p.product_images?.length)
          p.product_images.forEach((img) =>
            imageDeletions.push(
              deleteStorageImage(img.image_url, "product-images"),
            ),
          );

        await Promise.all(imageDeletions);
        await deleteManyProductImages({ eq: { product_id: p.id } });
      },
    });

  const productStats = useProductStats(productList, total);

  return (
    <>
      <AdminHeader
        title={t("admin_management.products.products")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.product_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.product_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminStats stats={productStats} />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!productsQuery.data}
        isSearchDisabled={productsQuery.isFetching}
        searchInputClassName="rounded-none!"
        selectDropdownOptions={{
          selectValue: categoryFilter,
          onSelect: onSelectCategory,
          selectOptions: CATEGORIES.map((category) => ({
            value: capitalize(category),
            label: t(`common.${category.replace(/\s+/g, "-")}`),
          })),
          selectBaseLabel: t("admin_management.products.all_categories"),
        }}
      />

      <TableContainer>
        <AdminProductsTable
          products={productList}
          isLoading={productsQuery.isFetching}
          onEdit={openEdit}
          onDelete={openDelete}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={setPage}
          showInfo={t("common.showing_items", { start, end, total })}
          className="p-4 mt-0!"
        />
      </TableContainer>

      <ItemModal
        open={modalOpen}
        isEditing={!!editingProduct}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        disableClickOutside={true}
        itemName="product_genitive"
      >
        <ProductFormFields
          register={register}
          errors={errors}
          control={control}
          mainCategoryId={Number(watchedMainCategory) || undefined}
          uploadRef={uploadRef}
          formKey={formKey}
          editingProduct={editingProduct}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.product_genitive"),
        })}
        variant="danger"
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        description={
          <>
            {t("admin_management.are_you_sure_you_want_to_delete")}{" "}
            <span className="font-bold">{deleteModal?.name}</span>?{" "}
            {t("admin_management.this_action_cannot_be_undone")}
          </>
        }
      />
    </>
  );
};

export default AdminProducts;
