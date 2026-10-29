import Link from "next/link";
import { CSSProperties } from "react";

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
      className="text-label underline decoration-label-3 transition-colors hover:decoration-accent"
      style={style}
    >
      {children}
    </Link>
  );
};

export default LinkText;
