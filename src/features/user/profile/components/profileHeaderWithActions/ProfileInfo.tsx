interface IProfileInfo {
  name?: string;
  email: string;
}

const ProfileInfo = ({ name, email }: IProfileInfo) => {
  return (
    <div className="max-w-[55dvw] px-4">
      <div className="overflow-x-auto whitespace-nowrap scrollbar-none">
        <h1 className="text-2xl font-semibold">{name}</h1>
      </div>

      <div className="overflow-x-auto mt-1 whitespace-nowrap scrollbar-none">
        <p className="opacity-70">{email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
