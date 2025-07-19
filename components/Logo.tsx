import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import Link from "next/link";
import { StaticImageData } from "next/image";

export interface LogoProps {
  img?: string;
  imgLight?: StaticImageData;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoLightImg,
  className,
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-primary-6000 focus:outline-none focus:ring-0 ${className}`}
    >
     {/* <LogoSvgLight />
      <LogoSvg />

       THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-14 rounded-full shadow-lg shadow-neutral-300 object-cover ${imgLight ? "dark:hidden" : ""}`}
          src="/images/logo1.png"
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="rounded-full shadow-lg shadow-neutral-300 object-cover hidden max-h-14 dark:block"
          src="/images/logo1.png"
          alt="Logo-Light"
        />
      )} 
    </Link>
  );
};

export default Logo;
