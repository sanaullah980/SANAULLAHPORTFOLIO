import { hasProjectsAccess } from '@/lib/project-access';
import { projectsData } from '@/content/projects';
import { Projects } from './Projects';
import { ProjectUnlock } from './ProjectUnlock';

export async function ProjectsGate() {
  const allowed = await hasProjectsAccess();
  return allowed ? <Projects projects={projectsData} /> : <ProjectUnlock />;
}
