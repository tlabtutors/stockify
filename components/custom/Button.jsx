// app/components/ui/Button.jsx
import React from "react";
import Link from "next/link";

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150";

  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    btnRectangle: "btn-rectangle",
    btnLink: "btn-link",
  };

  const classes = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} type={type} className={classes}>
      {children}
    </button>
  );
}
