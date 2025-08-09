import { Icon } from "@phosphor-icons/react";

import LinkText from "./LinkText";
import { CSSProperties } from "react";

export interface ISocialLink {
  href: string;
  icon: Icon | string;
  text: string;
}

const SocialLink = ({ link, style }: { link: ISocialLink, style?: CSSProperties }) => (
  <LinkText href={link.href} style={style}>
    <div className="flex items-center gap-2 transition duration-200 ease-in-out">
      <link.icon className="h-4 w-4 text-neutral-500 transition-colors duration-200" />
      <p className="text-sm">{link.text}</p>
    </div>
  </LinkText>
);

export default SocialLink;