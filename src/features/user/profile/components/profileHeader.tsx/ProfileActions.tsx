import PrimaryButton from "../../../../../components/button/PrimaryBtn";

interface IProfileActions {
  isEditing: boolean;
  isSaving: boolean;
  onEdit: () => void;
  onSave: () => void;
}

const ProfileActions = ({
  isEditing,
  isSaving,
  onEdit,
  onSave,
}: IProfileActions) => {
  return isEditing ? (
    <PrimaryButton
      text={isSaving ? "profile.saving" : "profile.save"}
      onClick={onSave}
      disabled={isSaving}
    />
  ) : (
    <PrimaryButton text="profile.edit" onClick={onEdit} />
  );
};

export default ProfileActions;
