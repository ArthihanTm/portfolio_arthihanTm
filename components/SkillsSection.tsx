const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "JavaScript", level: "good" },
      { name: "React", level: "good" },
      { name: "Next.js", level: "good" },
      { name: "HTML & CSS", level: "good" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Python & Flask", level: "good" },
      { name: "MySQL", level: "intermediate" },
      { name: "MongoDB", level: "intermediate" },
      { name: "Java", level: "basic" },
    ],
  },
];

const levelStyles = {
  good: "bg-white",
  intermediate: "bg-white/50",
  basic: "border border-white/60",
};

export default function SkillsSection() {
  return (
    <section
      id="kompetenzen"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]">
            Kompetenzen
          </h2>

          <div className="flex flex-wrap gap-x-6 gap-y-2 font-label text-[9px] uppercase tracking-[0.16em] text-muted">
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-white" /> Gut
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full bg-white/50" /> Solide Basis
            </span>
            <span className="flex items-center gap-2">
              <i className="h-1.5 w-1.5 rounded-full border border-white/60" /> Grundlagen
            </span>
          </div>
        </div>

        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-20">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="font-label text-[10px] uppercase tracking-label text-muted">
                {group.title}
              </h3>
              <ul className="mt-6 space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className={`h-1.5 w-1.5 flex-none rounded-full ${
                        levelStyles[skill.level as keyof typeof levelStyles]
                      }`}
                    />
                    <span className="text-lg text-white/90">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
