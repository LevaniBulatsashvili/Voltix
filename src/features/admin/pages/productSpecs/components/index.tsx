import { useTranslation } from "react-i18next";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import type { IProductSpec } from "@/types/public/product";
import { useDeleteModal } from "@/features/admin/hooks/useDeleteModal";
import AdminHeader from "@/features/admin/components/AdminHeader";
import AdminStats from "@/features/admin/components/AdminStats";
import AdminToolbar from "@/features/admin/components/AdminToolbar";
import AdminProductSpecsTable from "./adminProductSpecsTable/AdminProductSpecsTable";
import { useProductSpecForm } from "../hooks/useProductSpecForm";
import { useProductSpecStats } from "../hooks/useProductSpecStats";
import { useProductSpecQuery } from "../hooks/useProductSoecQuery";
import { useDeleteProductSpec } from "@/features/public/product/hooks/productSpecCRUD";
import ProductSpecFormFields from "./productSpecForm/ProductSpecForm";

const AdminProductSpecs = () => {
  const { t } = useTranslation();

  const {
    specsQuery,
    specList,
    currentPage,
    total,
    totalPages,
    start,
    end,
    searchValue,
    setSearchValue,
    setPage,
  } = useProductSpecQuery();

  const {
    formKey,
    modalOpen,
    editingSpec,
    register,
    handleSubmit,
    errors,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  } = useProductSpecForm();

  const { mutate: deleteSpec } = useDeleteProductSpec();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<IProductSpec>({
      onDelete: deleteSpec,
    });

  const specStats = useProductSpecStats(specList, total);

  return (
    <>
      <AdminHeader
        title={t("admin_management.product_specs.product_specs")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.product_spec_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.product_spec_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminStats stats={specStats} />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!specsQuery.data}
        isSearchDisabled={specsQuery.isFetching}
        searchInputClassName="rounded-none!"
      />

      <TableContainer>
        <AdminProductSpecsTable
          specs={specList}
          isLoading={specsQuery.isFetching}
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
        isEditing={!!editingSpec}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        itemName="product_spec_genitive"
      >
        <ProductSpecFormFields
          key={formKey}
          register={register}
          errors={errors}
          control={control}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.product_spec_genitive"),
        })}
        variant="danger"
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        description={
          <>
            {t("admin_management.are_you_sure_you_want_to_delete")}{" "}
            <span className="font-bold">{deleteModal?.spec}</span>?{" "}
            {t("admin_management.this_action_cannot_be_undone")}
          </>
        }
      />
    </>
  );
};

export default AdminProductSpecs;
