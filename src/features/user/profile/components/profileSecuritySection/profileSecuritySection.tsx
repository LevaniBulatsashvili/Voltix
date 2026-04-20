import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";

interface IProfileSecuritySection {
  email: string | null;
  createdAt: string;
}

const ProfileSecuritySection = ({
  email,
  createdAt,
}: IProfileSecuritySection) => {
  return (
    <>
      {email && <EmailSection email={email} created_at={createdAt} />}
      <PasswordSection />
    </>
  );
};

export default ProfileSecuritySection;
