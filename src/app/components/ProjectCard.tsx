import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export interface IProject {
  href: string;
  title: string;
  description: string;
  duration?: string;
}

const ProjectCard = ({ project, showDuration = true }: { project: IProject; showDuration?: boolean }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group block rounded-lg border p-4 cursor-pointer"
  >
    <div className="relative flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="project-card-title underline decoration-neutral-500 transition duration-200 ease-in-out group-hover:decoration-[#8A2BE2] truncate">{project.title}</p>
        <ArrowRightIcon className="h-4 w-4 shrink-0 text-neutral-500 opacity-0 transition-all duration-200 ease-in-out group-hover:opacity-100 group-hover:text-[#8A2BE2] group-hover:translate-x-1" />
      </div>
      {showDuration && project.duration && (
        <span className="absolute top-0 right-0 text-xs text-neutral-500">
          {project.duration}
        </span>
      )}
      <p className="text-sm text-neutral-500">{project.description}</p>
    </div>
  </a>
);

export default ProjectCard;
