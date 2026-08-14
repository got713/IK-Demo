import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: "dark" | "light";
}

export default function Logo({ width = 180, height = 60, className = "", variant = "dark" }: LogoProps) {
  const src = variant === "light" ? "/images/logo-light.png" : "/images/logo.png";

  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <div style={{ width, height }} className="relative">
        <Image
          src={src}
          alt="Ibrahim Khoder"
          fill
          priority
          className="object-contain hover:opacity-90 transition-opacity"
        />
      </div>
    </Link>
  );
}
