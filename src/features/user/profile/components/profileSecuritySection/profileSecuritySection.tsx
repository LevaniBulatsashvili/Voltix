import type { IProfile } from "../../../../../types/profile";
import EmailSection from "./emailSection/EmailSection";
import PasswordSection from "./passwordSection/PasswordSection";

interface IProfileSecuritySection {
  profile: IProfile;
}

const ProfileSecuritySection = ({ profile }: IProfileSecuritySection) => {
  return (
    <>
      <EmailSection profile={profile} />
      <PasswordSection />
    </>
  );
};

export default ProfileSecuritySection;
