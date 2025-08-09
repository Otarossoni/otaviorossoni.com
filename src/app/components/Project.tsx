import { CSSProperties } from "react";
import LinkText from "./LinkText";

export interface IProject {
  href: string;
  title: string;
  description: string;
}

const Project = ({ project, style }: { project: IProject, style?: CSSProperties }) => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      <LinkText href={project.href} style={style}>{project.title}</LinkText>
    </div>
    <p className="text-sm text-neutral-500">{project.description}</p>
  </div>
);

export default Project;