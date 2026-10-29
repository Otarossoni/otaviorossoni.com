import { Icon } from "@phosphor-icons/react";
import { CSSProperties } from "react";

import LinkText from "./LinkText";

export interface ISocialLink {
  href: string;
  icon?: Icon | string;
  text: string;
}

const SocialLink = ({
  link,
  style,
}: {
  link: ISocialLink;
  style?: CSSProperties;
}) => (
  <LinkText href={link.href} style={style}>
    <div className="flex items-center gap-2 transition duration-200 ease-in-out">
      {link.icon && <link.icon className="h-4 w-4 text-label-2" />}
      <p className="text-sm">{link.text}</p>
    </div>
  </LinkText>
);

export default SocialLink;
