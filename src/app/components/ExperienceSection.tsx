import {
  BriefcaseIcon,
  HeadsetIcon,
  HeartbeatIcon,
  ReceiptIcon,
  TruckIcon,
} from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { localeDateString } from "@/lib/locale";
import { SECTION_LABEL_CLASS } from "./MoreLink";

interface Experience {
  role: string;
  company: string;
  start: string; // YYYY-MM
  end: string; // YYYY-MM, or "" for the current position
  icon: string;
}

const ICONS: Record<string, typeof TruckIcon> = {
  Truck: TruckIcon,
  Receipt: ReceiptIcon,
  Heartbeat: HeartbeatIcon,
  Headset: HeadsetIcon,
};

// "Nov 2024 – atual", "Abr – Nov 2024", "Ago 2022 – Abr 2024". The year shows
// once when both ends fall in the same year.
function formatPeriod(start: string, end: string, locale: string, present: string): string {
  const intlLocale = localeDateString(locale);
  const month = (value: string) => {
    const [year, monthIndex] = value.split("-").map(Number);
    const name = new Intl.DateTimeFormat(intlLocale, { month: "short", timeZone: "UTC" })
      .format(new Date(Date.UTC(year, monthIndex - 1, 1)))
      .replace(".", "");
    return locale === "es" ? name : name.charAt(0).toUpperCase() + name.slice(1);
  };
  const year = (value: string) => value.slice(0, 4);

  if (!end) return `${month(start)} ${year(start)} – ${present}`;
  if (year(start) === year(end)) return `${month(start)} – ${month(end)} ${year(end)}`;
  return `${month(start)} ${year(start)} – ${month(end)} ${year(end)}`;
}

export default function ExperienceSection({ locale }: { locale: string }) {
  const t = useTranslations();
  const items = t.raw("experience") as Experience[];
  const present = t("experiencePresent");

  return (
    <section className="flex flex-col gap-1">
      <h2 className={`${SECTION_LABEL_CLASS} m-0 h-8`}>
        <BriefcaseIcon size={15} />
        <span>{t("experienceTitle")}</span>
      </h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0 pt-1">
        {items.map((item) => {
          const Icon = ICONS[item.icon] ?? BriefcaseIcon;
          const isCurrent = !item.end;
          return (
            <li key={`${item.company}-${item.start}`} className="flex items-center gap-3">
              <span
                className={`grid size-control shrink-0 place-items-center rounded-inner ${
                  isCurrent ? "bg-exp-tint text-accent" : "bg-exp-square text-label-2"
                }`}
              >
                <Icon size={18} />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-role font-medium text-label">{item.role}</span>
                <span className="flex flex-wrap gap-x-1 text-footnote text-label-2 tabular-nums">
                  <span>{item.company} ·</span>
                  <span className="whitespace-nowrap">
                    {formatPeriod(item.start, item.end, locale, present)}
                  </span>
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
