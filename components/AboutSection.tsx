import { CONTACT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

const facts = [
  {
    label: "Ausbildung",
    value: "Informatikmittelschule (IMS)",
  },
  {
    label: "Fokus",
    value: "Web, Backend und UI/UX",
  },
  {
    label: "Stack",
    value: "React, Next.js, Java, Python, Figma",
  },
  {
    label: "Daneben",
    value: "Sport und Geige",
  },
];

export default function AboutSection({
  className,
}: {
  className?: string;
}) {
  return (
    <section
      className={cn(
        "border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16",
        className,
      )}
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]">
          Über mich.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          <div className="space-y-8 text-lg leading-9 text-white/92">
            <p>
              Ich bin neugierig darauf, wie Dinge unter der Oberfläche
              funktionieren, und das treibt mich seit meiner Schulzeit an.
              Besonders faszinierend finde ich, wie rasant sich die
              Softwareentwicklung gerade durch KI verändert, und ich bin
              gespannt, was diese Entwicklung als Nächstes ermöglicht.
            </p>
            <p className="text-white/80">
              Aus dieser Neugier sind eigene Projekte entstanden, an denen ich
              selbstständig arbeite und bei denen mir sauberer Code genauso
              wichtig ist wie ein durchdachtes Design. Ich lerne aktuell an
              der Informatikmittelschule (IMS) und nehme mir dabei genauso
              viel Zeit für Struktur und Wartbarkeit wie fürs Design selbst.
              Außerhalb von Code beschäftigen mich Sport und Geige, beides
              Dinge, bei denen Übung und Präzision zählen, genau wie beim
              Programmieren.
            </p>
          </div>

          <div className="flex flex-col">
            <dl className="divide-y divide-border border-y border-border">
              {facts.map((fact) => (
                <div
                  key={fact.label}
                  className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-[8.5rem_1fr] sm:items-baseline sm:gap-6"
                >
                  <dt className="font-label text-[11px] uppercase tracking-label text-muted">
                    {fact.label}
                  </dt>
                  <dd className="text-base leading-7 text-white/90">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-auto border-b border-border py-5">
              <p className="font-label text-[11px] uppercase tracking-label text-muted">
                Kontakt
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 inline-block text-base text-white/90 underline decoration-border decoration-1 underline-offset-[7px] transition-[color,text-decoration-color] duration-300 hover:text-white hover:decoration-white"
                data-cursor="grow"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}