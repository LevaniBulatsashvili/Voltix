import { useTranslation } from "react-i18next";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import AdminHeader from "../../components/AdminHeader";
import AdminToolbar from "../../components/AdminToolbar";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import type { IBrand } from "@/types/public/product";
import { useBrandQuery } from "../hooks/useBrandQuery";
import { useBrandForm } from "../hooks/useBrandForm";
import { useDeleteBrand } from "@/features/public/search/hooks/brandCRUD";
import { deleteStorageImage } from "@/features/shared/imageSelector/utils/deleteStorageImage";
import { BrandsTable } from "./brandsTable/BrandsTable";
import BrandFormFields from "./brandFormFields/BrandFormFields";

const AdminBrands = () => {
  const { t } = useTranslation();

  const {
    brandsQuery,
    brandList,
    currentPage,
    total,
    totalPages,
    start,
    end,
    searchValue,
    setSearchValue,
    setPage,
  } = useBrandQuery();

  const {
    formKey,
    modalOpen,
    editingBrand,
    uploadRef,
    register,
    handleSubmit,
    errors,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  } = useBrandForm();

  const { mutate: deleteBrand } = useDeleteBrand();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<IBrand>({
      onDelete: deleteBrand,
      onBeforeDelete: (b) => {
        if (b.logo_url) return deleteStorageImage(b.logo_url, "brands");
      },
    });

  return (
    <>
      <AdminHeader
        title={t("admin_management.brands.brands")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.brand_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.brand_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!brandsQuery.data}
        isSearchDisabled={brandsQuery.isFetching}
        searchInputClassName="rounded-none!"
      />

      <TableContainer>
        <BrandsTable
          brands={brandList}
          isLoading={brandsQuery.isFetching}
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
        isEditing={!!editingBrand}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        disableClickOutside={true}
        itemName="brand_genitive"
      >
        <BrandFormFields
          register={register}
          errors={errors}
          uploadRef={uploadRef}
          formKey={formKey}
          editingBrand={editingBrand}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.brand_genitive"),
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

export default AdminBrands;
