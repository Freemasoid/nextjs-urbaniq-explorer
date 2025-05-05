import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo: React.FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-explorer-yellow">
        <Image
          src="/logo_guide.svg"
          alt="UrbanIQ Logo"
          width={40}
          height={40}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <span className="font-bold text-xl sm:block">
        <span className="text-explorer-yellow text-shadow-md text-shadow-gray-700">
          UrbanIQ
        </span>{" "}
        Explorer
      </span>
    </Link>
  );
};

export default Logo;
