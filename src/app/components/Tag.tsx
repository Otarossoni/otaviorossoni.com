import { tagDotColor } from "@/lib/tagColors";

const Tag = ({ tag }: { tag: string }) => (
  <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-fill px-2.5 text-caption font-medium text-label-2">
    <span className="size-1.5 shrink-0 rounded-full" style={{ backgroundColor: tagDotColor(tag) }} />
    {tag}
  </span>
);

export const TagList = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-1">
    {tags.map((tag) => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
);

export default Tag;
