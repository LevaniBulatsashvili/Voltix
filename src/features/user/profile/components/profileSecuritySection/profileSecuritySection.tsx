import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";

interface IProfileSecuritySection {
  email: string | null;
  createdAt: string;
  isOAuth: boolean;
}

const ProfileSecuritySection = ({
  email,
  createdAt,
  isOAuth,
}: IProfileSecuritySection) => {
  return (
    <>
      {email && <EmailSection email={email} created_at={createdAt} />}
      {!isOAuth && <PasswordSection />}
    </>
  );
};

export default ProfileSecuritySection;
