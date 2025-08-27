import Image from "next/image";

const Avatar = ({
  src,
  alt,
  name = "",
  size = "w-5 h-5",
  rounded = "rounded-full",
}) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase())
      .join("")
      .slice(0, 1);
  };

  const hasImage = Boolean(src);

  return (
    <div
      className={`w-8 h-8 inline-flex items-center justify-center bg-gray-800 text-white font-medium ${size} ${rounded} overflow-hidden`}
    >
      {hasImage ? (
        <Image
          src={src}
          alt={alt || name}
          className={`object-cover ${size} ${rounded}`}
          onError={(e) => (e.target.style.display = "none")}
        />
      ) : (
        <span className="text-[14px]">{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;
