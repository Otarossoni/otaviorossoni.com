// 36px filled circle centred in a 44px hit area. Apply ICON_BUTTON_CLASS to
// the clickable element (button, a or Link) and wrap the icon in IconCircle.
export const ICON_BUTTON_CLASS =
  "grid size-hit shrink-0 cursor-pointer place-items-center border-0 bg-transparent p-0 text-label transition-[color,transform] hover:text-accent active:scale-94";

export const IconCircle = ({ children }: { children: React.ReactNode }) => (
  <span className="grid size-control place-items-center rounded-full bg-surface-2">{children}</span>
);
