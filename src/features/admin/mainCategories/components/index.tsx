import { useTranslation } from "react-i18next";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import AdminHeader from "../../components/AdminHeader";
import AdminToolbar from "../../components/AdminToolbar";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import type { IMainCategory } from "@/types/public/product";
import MainCategoryFormFields from "./mainCategoryFormFields/MainCategoryFormFields";
import { MainCategoriesTable } from "./mainCategoriesTable/MainCategoriesTable";
import { useMainCategoryForm } from "../hooks/useMainCategoryForm";
import { useMainCategoryQuery } from "../hooks/useMainCategoryQuery";
import { useDeleteMainCategory } from "@/features/public/category/hooks/mainCategoryCRUD";
import { deleteStorageImage } from "@/features/shared/imageSelector/utils/deleteStorageImage";

const AdminMainCategories = () => {
  const { t } = useTranslation();

  const {
    mainCategoriesQuery,
    mainCategoryList,
    currentPage,
    total,
    totalPages,
    start,
    end,
    searchValue,
    setSearchValue,
    setPage,
  } = useMainCategoryQuery();

  const {
    uploadRef,
    formKey,
    modalOpen,
    editingMainCategory,
    register,
    handleSubmit,
    errors,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  } = useMainCategoryForm();

  const { mutate: deleteCategory } = useDeleteMainCategory();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<IMainCategory>({
      onDelete: deleteCategory,
      itemName: "main_category",
      onBeforeDelete: (mc) => {
        if (mc.thumbnail)
          return deleteStorageImage(mc.thumbnail, "main-categories");
      },
    });

  return (
    <>
      <AdminHeader
        title={t("admin_management.main_categories.main_categories")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.main_category_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.main_category_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!mainCategoriesQuery.data}
        isSearchDisabled={mainCategoriesQuery.isFetching}
        searchInputClassName="rounded-none!"
      />

      <TableContainer>
        <MainCategoriesTable
          mainCategories={mainCategoryList}
          isLoading={mainCategoriesQuery.isFetching}
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
        isEditing={!!editingMainCategory}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        disableClickOutside={true}
        itemName="main_category_genitive"
      >
        <MainCategoryFormFields
          register={register}
          errors={errors}
          uploadRef={uploadRef}
          formKey={formKey}
          editingMainCategory={editingMainCategory}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.main_category_genitive"),
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

export default AdminMainCategories;
