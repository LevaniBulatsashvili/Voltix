import { useTranslation } from "react-i18next";
import { MAINCATEGORIES } from "@/utils/consts";
import { capitalize } from "@/utils/capitalize";
import ConfirmModal from "@/components/ui/modal/ConfirmModal";
import ItemModal from "@/components/ui/modal/ItemModal";
import Pagination from "@/components/ui/Pagination";
import TableContainer from "@/components/ui/table/TableContainer";
import AdminHeader from "../../components/AdminHeader";
import AdminToolbar from "../../components/AdminToolbar";
import { useCategoryQuery } from "../hooks/useCategoryQuery";
import AdminCategoriesTable from "./adminCategoriesTable/AdminCategoriesTable";
import { useDeleteCategory } from "@/features/public/category/hooks/categoryCRUD";
import { useDeleteModal } from "../../hooks/useDeleteModal";
import type { ICategory } from "@/types/public/product";
import { useCategoryForm } from "../hooks/useCategoryForm";
import CategoryFormFields from "./categoryFormFields/CategoryFormFields";

const AdminCategories = () => {
  const { t } = useTranslation();

  const {
    categoriesQuery,
    categoryList,
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
  } = useCategoryQuery();

  const {
    modalOpen,
    editingCategory,
    register,
    handleSubmit,
    errors,
    control,
    openCreate,
    openEdit,
    closeModal,
    onSubmit,
  } = useCategoryForm();

  const { mutate: deleteCategory } = useDeleteCategory();
  const { deleteModal, openDelete, closeDelete, confirmDelete } =
    useDeleteModal<ICategory>({
      onDelete: deleteCategory,
    });

  return (
    <>
      <AdminHeader
        title={t("admin_management.categories.categories")}
        description={t("admin_management.manage_your_catalog", {
          item: t("admin_management.items.category_genitive"),
        })}
        actionText={t("admin_management.add_item", {
          item: t("admin_management.items.category_genitive"),
        })}
        onAction={openCreate}
      />

      <AdminToolbar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        hasData={!!categoriesQuery.data}
        isSearchDisabled={categoriesQuery.isFetching}
        searchInputClassName="rounded-none!"
        selectDropdownOptions={{
          selectValue: categoryFilter,
          onSelect: onSelectCategory,
          selectOptions: MAINCATEGORIES.map((mainCategory) => ({
            value: capitalize(mainCategory),
            label: t(`common.${mainCategory}`),
          })),
          selectBaseLabel: t("admin_management.products.all_categories"),
        }}
      />

      <TableContainer>
        <AdminCategoriesTable
          categories={categoryList}
          isLoading={categoriesQuery.isFetching}
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
        isEditing={!!editingCategory}
        onClose={closeModal}
        onSubmit={handleSubmit(onSubmit)}
        disableClickOutside={true}
        itemName="category_genitive"
      >
        <CategoryFormFields
          register={register}
          errors={errors}
          control={control}
        />
      </ItemModal>

      <ConfirmModal
        open={!!deleteModal}
        title={t("admin_management.delete_item", {
          item: t("admin_management.items.category_genitive"),
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

export default AdminCategories;
