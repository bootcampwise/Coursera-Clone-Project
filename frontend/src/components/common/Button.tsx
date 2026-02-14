import React from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  className = "",
  ...rest
}) => {
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition";
  const variantClass =
    variant === "primary"
      ? "bg-primary text-background px-4 py-2 hover:bg-primary-hover"
      : variant === "ghost"
      ? "bg-transparent text-primary px-3 py-1"
      : variant === "outline"
      ? "bg-transparent border border-primary text-primary px-4 py-2 hover:bg-primary/5"
      : "bg-surface text-primary px-3 py-2";

  const disabledClass = rest.disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none"
    : "";

  return (
    <button
      className={`${base} ${variantClass} ${disabledClass} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

















































