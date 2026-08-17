export default function AboutSection() {
  return (
    <section
      id="uber-mich"
      className="border-t border-border px-6 py-24 md:px-10 md:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(3rem,8vw,5rem)] italic leading-[0.95]">
          Über mich.
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-20">
          <div className="space-y-8 text-lg leading-9 text-white/92">
            <p>
              Ich baue digitale Produkte, die sich ruhig anfühlen: klare
              Oberflächen, nachvollziehbare Abläufe und eine Umsetzung, die auch
              im Detail sauber bleibt.
            </p>
            <p className="text-white/80">
              Mir sind Struktur, Lesbarkeit und Wartbarkeit wichtig — genauso
              wie gutes Design. Ich arbeite gern iterativ, teste Annahmen früh
              und bringe Dinge zuverlässig bis zum fertigen Ergebnis.
            </p>
          </div>

          <div className="border-t border-border pt-8 text-base leading-8 text-white/80">
            <p>
              Fokus: Webentwicklung mit React/Next.js, solide Backend-Grundlagen
              (Java/Python) und UI/UX-Design in Figma.
            </p>
            <p className="mt-6">
              Wenn du ein Projekt hast, bei dem Design und Technik zusammen
              gedacht werden sollen, freue ich mich über eine Nachricht.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}