import { Camera } from "lucide-react";

const AvatarOverlay = () => {
  return (
    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition rounded-full">
      <Camera className="size-5 text-white group-hover:scale-110 transition" />
    </div>
  );
};

export default AvatarOverlay;
