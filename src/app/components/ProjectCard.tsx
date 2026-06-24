import { ArrowRightIcon, StarIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { TAG_DOT_COLORS } from "@/lib/tagColors";

export interface IProject {
  slug: string;
  github: string;
  title: string;
  description: string;
  duration?: string;
  tags?: string[];
  highlight?: boolean;
}

const ProjectCard = ({ project, showDuration = true, showTags = false }: { project: IProject; showDuration?: boolean; showTags?: boolean }) => (
  <Link
    href={`/projects/${project.slug}`}
    className="project-card group relative block rounded-lg border p-4 cursor-pointer"
  >
    <div className="flex flex-col gap-2">
      {(showTags || showDuration) && (
        <div className="flex items-center justify-between gap-2 min-h-5 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {showTags && project.tags?.map((tag) => (
              <span
                key={tag}
                className="project-tag text-[10px] rounded-full px-2 py-0.5 text-neutral-500 border"
                style={{ borderColor: TAG_DOT_COLORS[tag] || "#737373" }}
              >
                <span
                  className="project-tag-dot inline-block w-2 h-2 rounded-full mr-1 align-middle"
                  style={{ backgroundColor: TAG_DOT_COLORS[tag] || "#737373" }}
                />
                {tag}
              </span>
            ))}
          </div>
          {showDuration && project.duration && (
            <span className="text-xs text-neutral-500 shrink-0">
              {project.duration}
            </span>
          )}
        </div>
      )}
      <div className="flex items-center gap-2">
        <p className="project-card-title underline decoration-neutral-500 transition duration-200 ease-in-out group-hover:decoration-[#8A2BE2] truncate">{project.title}</p>
        <ArrowRightIcon className="h-4 w-4 shrink-0 text-neutral-500 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:text-[#8A2BE2] group-hover:translate-x-1" />
      </div>
      <p className="text-sm text-neutral-500">{project.description}</p>
    </div>
    {project.highlight && (
      <StarIcon weight="fill" className="absolute bottom-3 right-3 h-3.5 w-3.5 text-[#8A2BE2]" />
    )}
  </Link>
);

export default ProjectCard;
