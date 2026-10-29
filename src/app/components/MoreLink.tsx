import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

// Purple text link with a trailing arrow ("Ver mais postagens", "Carregar
// mais", "Voltar ao início"). Apply MORE_LINK_CLASS to the clickable element;
// inside a flex column, add self-start so it keeps its own width.
export const MORE_LINK_CLASS =
  "inline-flex h-hit cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-callout font-medium text-accent transition-colors hover:text-accent-hover disabled:cursor-not-allowed disabled:text-label-3";

export const MoreLinkContent = ({ children }: { children: React.ReactNode }) => (
  <>
    <span>{children}</span>
    <ArrowRightIcon size={14} />
  </>
);

// Section label (13px semibold, secondary). Linked labels get the arrow and the
// purple hover; plain labels (Experiência) use SECTION_LABEL_CLASS alone.
export const SECTION_LABEL_CLASS =
  "inline-flex items-center gap-2 self-start text-footnote font-semibold text-label-2";

export const SECTION_LINK_CLASS = `${SECTION_LABEL_CLASS} h-hit transition-colors hover:text-accent`;
