import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

export interface IProject {
  href: string;
  title: string;
  description: string;
  duration?: string;
  tags?: string[];
}

const TAG_DOT_COLORS: Record<string, string> = {
  react: "#7ec8d4",
  typescript: "#6b8db5",
  go: "#6bb8c4",
  nextjs: "#8a8a92",
  nodejs: "#6aad6a",
  mongodb: "#6fad6f",
  express: "#7fa07f",
  fastify: "#8a8a92",
  redis: "#c47a72",
  desktop: "#9a7ec4",
  cli: "#c4a86b",
  dsa: "#c4926b",
  algorithms: "#c47aaa",
  cleancode: "#9abf6b",
  educational: "#8484b8",
};

const ProjectCard = ({ project, showDuration = true, showTags = false }: { project: IProject; showDuration?: boolean; showTags?: boolean }) => (
  <a
    href={project.href}
    target="_blank"
    rel="noopener noreferrer"
    className="project-card group block rounded-lg border p-4 cursor-pointer"
  >
    <div className="flex flex-col gap-2">
      {(showTags || showDuration) && (
        <div className="flex items-center justify-between gap-2 min-h-[1.25rem] mb-3">
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
  </a>
);

export default ProjectCard;
