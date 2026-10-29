import { StarIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@/i18n/navigation";
import { TagList } from "./Tag";

export interface IProject {
  slug: string;
  github: string;
  title: string;
  description: string;
  duration?: string;
  tags?: string[];
  highlight?: boolean;
}

// One treatment for every project; a highlight only adds the star. Without the
// tags/duration row (home), the card follows the home's height-fluid spacing.
const ProjectCard = ({ project, showDuration = true, showTags = false }: { project: IProject; showDuration?: boolean; showTags?: boolean }) => {
  const showMeta = showTags || showDuration;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`flex flex-col rounded-card bg-surface shadow-card transition-[background-color,transform] hover:bg-surface-2 active:scale-98 ${
        showMeta ? "gap-3 p-5" : "min-h-home-card-min gap-1 px-5 py-home-card-py"
      }`}
    >
      {showMeta && (
        <div className="flex min-h-6 items-start justify-between gap-4">
          {showTags && project.tags?.length ? <TagList tags={project.tags} /> : <div />}
          {showDuration && project.duration && (
            <span className="shrink-0 pt-1 font-mono text-footnote text-label-3 tabular-nums">
              {project.duration}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-col gap-1">
        <div className="flex items-start justify-between gap-4">
          <span className="text-headline font-semibold text-balance">{project.title}</span>
          {project.highlight && (
            <StarIcon weight="fill" size={14} className="mt-1 shrink-0 text-accent" />
          )}
        </div>
        <span className="text-description text-pretty text-label-2">{project.description}</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
