import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantClasses = {
    primary: "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "text-blue-700 bg-blue-100 hover:bg-blue-200 focus:ring-blue-500",
    outline:
      "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 focus:ring-blue-500",
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default Button;
