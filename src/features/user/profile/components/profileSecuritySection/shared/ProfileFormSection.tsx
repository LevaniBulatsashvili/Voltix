import type { ReactNode } from "react";
import PrimaryButton from "@/components/button/PrimaryBtn";

interface IProfileFormSection {
  title: string;
  children: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  buttonClassName?: string;
}

const ProfileFormSection = ({
  title,
  children,
  buttonText,
  onButtonClick,
  buttonClassName,
}: IProfileFormSection) => {
  return (
    <div className="mt-8 space-y-5">
      <p className="text-xl font-semibold capitalize">{title}</p>
      <div className="grid md:grid-cols-2 gap-8">
        {children}
        {buttonText && onButtonClick && (
          <PrimaryButton
            text={buttonText}
            className={buttonClassName}
            onClick={onButtonClick}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileFormSection;
