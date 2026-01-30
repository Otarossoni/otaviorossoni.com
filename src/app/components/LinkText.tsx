import Link from "next/link";
import React, { CSSProperties } from "react";

interface LinkTextProps {
  children: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
  style?: CSSProperties;
}

const LinkText = ({
  children,
  href,
  target = "_blank",
  rel = "noopener noreferrer",
  style,
}: LinkTextProps) => {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`text-neutral-200 underline decoration-neutral-500 transition duration-200 ease-in-out hover:decoration-[#8A2BE2]`}
      style={style}>

      {children}

    </Link>
  );
};

export default LinkText;