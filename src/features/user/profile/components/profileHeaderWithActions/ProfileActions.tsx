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
  return (
    <div className="ml-auto space-x-3">
      {isEditing ? (
        <>
          <PrimaryButton
            text="profile.cancel"
            onClick={onEdit}
            disabled={isSaving}
          />
          <PrimaryButton
            text={isSaving ? "profile.saving" : "profile.save"}
            onClick={onSave}
            disabled={isSaving}
          />
        </>
      ) : (
        <PrimaryButton text="profile.edit" onClick={onEdit} />
      )}
    </div>
  );
};

export default ProfileActions;
