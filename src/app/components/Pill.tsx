// 36px capsule centred in a 44px hit area. Apply PILL_LINK_CLASS to the
// clickable element and put the Pill inside it.
export const PILL_LINK_CLASS = "group/pill inline-flex h-hit items-center transition-transform active:scale-98";

const VARIANTS = {
  surface: "bg-surface font-medium shadow-card group-hover/pill:bg-surface-2",
  tint: "bg-tint font-semibold text-accent group-hover/pill:bg-tint-2",
};

const Pill = ({
  children,
  variant = "surface",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
}) => (
  <span
    className={`inline-flex h-control items-center gap-2 rounded-full px-4 text-callout transition-colors ${VARIANTS[variant]}`}
  >
    {children}
  </span>
);

export default Pill;
