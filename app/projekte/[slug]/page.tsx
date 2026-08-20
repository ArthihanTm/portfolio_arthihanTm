import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="px-6 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto max-w-[1040px]">
        <div className="mb-10 flex items-center justify-between gap-6">
          <Link
            href="/#projekte"
            className="font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
          >
            ← Zurück
          </Link>
          <span className="font-label text-[10px] uppercase tracking-label text-muted/50">
            {project.category} · {project.year}
          </span>
        </div>

        <h1 className="font-display text-[clamp(3rem,7vw,5.5rem)] font-black italic leading-[0.95]">
          {project.name}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-8 text-white/85 md:text-lg">
          {project.description}
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="border border-border px-3 py-1.5 font-label text-[10px] uppercase tracking-label text-white/60"
            >
              {tag}
            </span>
          ))}
        </div>

        {project.links?.live || project.links?.github ? (
          <div className="mt-10 flex flex-wrap gap-6">
            {project.links.live ? (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="grow"
                className="inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
              >
                Live ansehen
                <span className="font-display italic text-lg">→</span>
              </a>
            ) : null}
            {project.links.github ? (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="grow"
                className="inline-flex items-center gap-3 font-label text-[11px] uppercase tracking-label text-muted transition-colors duration-300 hover:text-white"
              >
                GitHub
                <span className="font-display italic text-lg">→</span>
              </a>
            ) : null}
          </div>
        ) : null}

        {project.details?.length ? (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="font-display text-3xl font-bold italic leading-tight">
              Kurzüberblick
            </h2>
            <ul className="mt-6 space-y-3 text-base leading-8 text-white/80">
              {project.details.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
}

