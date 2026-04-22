import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType, ZodTypeDef } from "zod";
import type { DefaultValues } from "react-hook-form";

interface IUseItemForm<T, TForm extends Record<string, unknown>> {
  schema: ZodType<TForm, ZodTypeDef, TForm>;
  defaultValues: TForm;
  toFormValues?: (item: T) => TForm;
}

export const useItemForm = <T, TForm extends Record<string, unknown>>({
  schema,
  defaultValues,
  toFormValues,
}: IUseItemForm<T, TForm>) => {
  const [formKey, setFormKey] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const form = useForm<TForm>({
    resolver: zodResolver(schema as ZodType),
    defaultValues: defaultValues as DefaultValues<TForm>,
  });

  const openCreate = () => {
    setEditingItem(null);
    form.reset(defaultValues as DefaultValues<TForm>);
    setModalOpen(true);
    setFormKey((k) => k + 1);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    form.reset(
      (toFormValues
        ? toFormValues(item)
        : defaultValues) as DefaultValues<TForm>,
    );
    setModalOpen(true);
    setFormKey((k) => k + 1);
  };

  const closeModal = () => setModalOpen(false);

  return {
    formKey,
    modalOpen,
    editingItem,
    openCreate,
    openEdit,
    closeModal,
    ...form,
  };
};
