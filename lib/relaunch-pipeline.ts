/** Relaunch.ai end-to-end pipeline (Mermaid). */
export const relaunchPipelineMermaid = `flowchart TB
  START(["▶ Pipeline starten<br/><i>CLI · Dashboard · Scheduler</i>"]) --> SCRAPE

  subgraph SCRAPE["1 · Scrape — Firmen finden"]
    direction TB
    Z["Zefix API<br/>Kantone · Limit"]
    Z --> DB0[("companies<br/><b>pending</b>")]
  end

  SCRAPE --> ENRICH

  subgraph ENRICH["2 · Enrich — Website & Kontakt"]
    direction TB
    EXA["Exa: offizielle Website suchen"]
    EXA --> ID{"Identity-Check<br/>UID · Name · Sitz"}
    ID -->|"bestätigt"| CONTACT["Kontakt aus HTML<br/>E-Mail · Telefon · Adresse"]
    ID -->|"abgelehnt"| UNVER["status = enrich_unverified"]
    CONTACT --> DB1[("companies<br/><b>enriched</b>")]
    EXA -.->|"keine Website"| SKIP1["status = skipped"]
  end

  DB1 --> HUMAN1

  HUMAN1{{"👤 Human Gate<br/>Enrichment bestätigen<br/><i>Dashboard Company-View</i>"}}
  HUMAN1 -->|"confirm / korrigieren"| SANITY
  HUMAN1 -->|"flag ohne Korrektur"| HOLD["gehalten<br/><i>enriched, nicht freigegeben</i>"]

  subgraph SANITY["3 · Site-Check — kein LLM"]
    direction TB
    SHELL["HTTP + Shell-Klassifikation<br/>Parked · Directory · Placeholder"]
    SHELL -->|"ok"| OKSITE["weiter"]
    SHELL -->|"kein echte Website"| ERR1["status = error"]
  end

  OKSITE --> ANALYZE

  subgraph ANALYZE["4 · Analyze — LLM Bewertung"]
    direction TB
    CRAWL["Crawl: Homepage + Unterseiten<br/>+ Exa Research · Firecrawl Fallback"]
    CRAWL --> P1["Pass 1 · Text-Score"]
    P1 --> P2["Pass 2 · Redesign-Briefing"]
    P2 --> P3["Pass 3 · Visual-Score<br/><i>Screenshot</i>"]
    P3 --> P4["Pass 4 · Bild-Analyse"]
    P4 --> DB2[("analyses + companies<br/><b>analyzed</b>")]
  end

  DB2 --> REVIEWMODE

  REVIEWMODE{{"👤 Human Gate optional<br/>Review-Mode: Briefing freigeben?"}}
  REVIEWMODE -->|"auto / approved"| IMAGES
  REVIEWMODE -->|"rejected"| SKIP2["status = skipped"]
  REVIEWMODE -->|"pending review"| QUEUE["Review-Queue<br/><i>wartet auf Approve</i>"]

  subgraph IMAGES["5 · Images — Bildquellen"]
    direction TB
    RESOLVE["image_resolver<br/>Site-Bilder (Vision) · sonst Unsplash/Pexels"]
  end

  IMAGES --> GENERATE

  subgraph GENERATE["6 · Generate — Mockup bauen"]
    direction TB
    GEN["LLM: Vite + React + Tailwind<br/>+ Framer Motion"]
    GEN --> VAL{"Quality Gates<br/>Layout · Motion · Typo"}
    VAL -->|"fail → Retry"| GEN
    VAL -->|"pass"| SLOP["Anti-Slop Check"]
    SLOP -->|"zu generisch → Fix"| GEN
    SLOP -->|"ok"| QA["QA Check<br/>Build · Imports · img/alt"]
    QA -->|"fail → Fix"| GEN
    QA -->|"ok"| DB3[("mockups + companies<br/><b>generated</b>")]
  end

  DB3 --> DEPLOY

  subgraph DEPLOY["7 · Deploy — optional"]
    direction TB
    VERCEL["Vite Build → Vercel"]
    VERCEL -->|"ok"| DB4[("deploy_url<br/><b>deployed</b>")]
    VERCEL -->|"fehler"| KEEP["bleibt generated"]
  end

  DB4 --> MAIL

  subgraph MAIL["8 · Mail — optional"]
    direction TB
    SEND["Outreach via Resend<br/>DE · FR · IT"]
    SEND --> DB5[("companies<br/><b>mailed</b>")]
  end

  classDef entry fill:#0f172a,stroke:#38bdf8,color:#e0f2fe,stroke-width:2px
  classDef stage fill:#111827,stroke:#4b5563,color:#f3f4f6
  classDef gate fill:#422006,stroke:#f59e0b,color:#fde68a,stroke-width:2px
  classDef db fill:#052e16,stroke:#22c55e,color:#bbf7d0
  classDef stop fill:#450a0a,stroke:#ef4444,color:#fecaca
  classDef optional fill:#1e1b4b,stroke:#818cf8,color:#e0e7ff,stroke-dasharray: 5 5

  class START entry
  class DB0,DB1,DB2,DB3,DB4,DB5 db
  class HUMAN1,REVIEWMODE gate
  class UNVER,SKIP1,SKIP2,ERR1,HOLD,QUEUE,KEEP stop
  class DEPLOY,MAIL optional
`;
