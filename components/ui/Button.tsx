import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center font-inter tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-gold text-brand-black hover:bg-brand-gold-light border border-transparent font-medium shadow-md shadow-brand-gold/10",
    secondary: "border border-brand-off-white text-brand-off-white hover:bg-brand-off-white hover:text-brand-black",
    accent: "border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3.5 text-xs sm:text-sm",
    lg: "px-8 py-4.5 text-sm font-semibold",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
