import { useTranslation } from "react-i18next";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import type { IProductFAQ } from "@/types/public/product";
import { useDeleteModal } from "@/features/admin/hooks/useDeleteModal";
import AdminHeader from "@/features/admin/components/AdminHeader";
import AdminToolbar from "@/features/admin/components/AdminToolbar";
import AdminProductFAQsTable from "./adminProductFAQsTable/AdminProductFAQsTable";
import ProductFAQFormFields from "./productFAQsForm/ProductFAQsForm";
import { useProductFAQForm } from "../hooks/useProductFAQForm";
import { useProductFAQQuery } from "../hooks/useProductFAQQuery";
import { useDeleteProductFAQ } from "@/features/public/product/hooks/productFAQCRUD";

const AdminProductFAQs = () => {
  const { t } = useTranslation();

  const {
    faqsQuery,
    faqList,
    currentPage,
    total,
    totalPages,
    start,
    end,
    searchValue,
    setSearchValue,
    setPage,
  } = useProductFAQQuery();

  const {
    formKey,
    modalOpen,
    editingFAQ,
    register,
    handleSubmit,
    errors,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  } = useProductFAQForm();

  const { mutate: deleteFAQ } = useDeleteProductFAQ();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<IProductFAQ>({
      onDelete: deleteFAQ,
    });

  return (
    <>
      <AdminHeader
        title={t("admin_management.product_faqs.product_faqs")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.faq_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.faq_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!faqsQuery.data}
        isSearchDisabled={faqsQuery.isFetching}
        searchInputClassName="rounded-none!"
      />

      <TableContainer>
        <AdminProductFAQsTable
          faqs={faqList}
          isLoading={faqsQuery.isFetching}
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
        isEditing={!!editingFAQ}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        itemName="faq_genitive"
      >
        <ProductFAQFormFields
          key={formKey}
          register={register}
          errors={errors}
          control={control}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.faq_genitive"),
        })}
        variant="danger"
        confirmText={t("common.delete")}
        cancelText={t("common.cancel")}
        onClose={closeDelete}
        onConfirm={confirmDelete}
        description={
          <>
            {t("admin_management.are_you_sure_you_want_to_delete")}{" "}
            <span className="font-bold">{deleteModal?.question}</span>?{" "}
            {t("admin_management.this_action_cannot_be_undone")}
          </>
        }
      />
    </>
  );
};

export default AdminProductFAQs;
