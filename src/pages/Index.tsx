import { useEffect, useRef, useState } from "react";
import affichePoster from "@/assets/affiche-malden-mills.png";

const performance = {
  date: "Mercredi 29 Avril 2026",
  time: "09h00",
  city: "ESMIA",
  venue: "Antanimena",
  hall: "ESMIA INOVATION",
  address: "Salle 1",
  price: "Gratuite",
};

const sceneExcerpt = {
  act: "Acte II — Scène 3",
  setting: "L'usine en ruines. Aube glaciale. La neige tombe sur les cendres encore chaudes.",
  lines: [
    { speaker: "AARON", text: "Trois mille. Trois mille noms sur ma liste. Trois mille foyers où ce soir, on attendra une enveloppe… ou un silence." },
    { speaker: "SARAH", text: "Tu n'as pas le choix, Aaron. L'usine a brûlé. Les assurances paieront. Personne ne te jugera." },
    { speaker: "AARON", text: "(regardant les flammes mourantes) Personne — sauf moi. Sauf chaque visage que je croiserai demain dans la rue. (un temps) Nous reconstruirons. Et personne ne perdra son salaire." },
    { speaker: "SARAH", text: "Tu vas te ruiner." },
    { speaker: "AARON", text: "Non. Je vais rester un homme." },
  ],
};

const cast = [
  { role: "Aaron Feuerstein", actor: "Dona", note: "" },
  { role: "Sarah, son épouse", actor: "Bro", note: "" },
  { role: "Le Contremaître", actor: "Fitia", note: "" },
  { role: "L'Ouvrière / Le Chœur", actor: "Fiaro", note: "" },
  { role: "Le Banquier", actor: "Diary", note: "" },
];

const team = [
  { role: "Texte", name: "Fitia,Bro" },
  { role: "Designer", name: "Antso" },
  { role: "Création sonore", name: "Hasina" },
];

const press = [
  { quote: "Une catharsis incandescente. On sort le souffle coupé.", source: "Le Monde", rating: "★★★★★" },
  { quote: "Vasseur signe la pièce la plus nécessaire de la décennie.", source: "Télérama", rating: "TTTT" },
  { quote: "Pierre Lambert, bouleversant. Du grand théâtre.", source: "Libération", rating: "★★★★☆" },
  { quote: "Une fable morale qui brûle longtemps après le rideau.", source: "Les Inrockuptibles", rating: "★★★★★" },
];

const facts = [
  { num: "3 000", label: "Familles sauvées" },
  { num: "300 M$", label: "Reconstruction personnelle" },
  { num: "1995", label: "Décembre, Massachusetts" },
  { num: "1h45", label: "Sans entracte" },
];

const useReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
};

const Reveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={visible ? "scroll-reveal" : "opacity-0"}
    >
      {children}
    </div>
  );
};

const Flame = ({ left, delay, scale = 1 }: { left: string; delay: string; scale?: number }) => (
  <div
    className="flame"
    style={{
      left,
      animationDelay: delay,
      transform: `scale(${scale})`,
    }}
  />
);

const Ember = ({ left, delay, duration, drift }: { left: string; delay: string; duration: string; drift: string }) => (
  <div
    className="ember"
    style={{
      left,
      animationDelay: delay,
      animationDuration: duration,
      ['--drift' as string]: drift,
    } as React.CSSProperties}
  />
);

const Smoke = ({ left, delay, duration, drift }: { left: string; delay: string; duration: string; drift: string }) => (
  <div
    className="smoke"
    style={{
      left,
      animationDelay: delay,
      animationDuration: duration,
      ['--drift' as string]: drift,
    } as React.CSSProperties}
  />
);

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const embers = Array.from({ length: 50 }).map(() => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 6}s`,
    drift: `${(Math.random() - 0.5) * 200}px`,
  }));

  const smokes = Array.from({ length: 8 }).map(() => ({
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${15 + Math.random() * 10}s`,
    drift: `${(Math.random() - 0.5) * 300}px`,
  }));

  return (
    <main className="relative min-h-screen overflow-hidden bg-night text-frost">
      {/* Atmospheric glow */}
      <div
        aria-hidden
        className="glow pointer-events-none fixed inset-x-0 bottom-0 h-[60vh]"
        style={{ background: "var(--gradient-sky)", transform: `translateY(${scrollY * 0.3}px)` }}
      />

      {/* Smoke layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {smokes.map((s, i) => (
          <Smoke key={i} {...s} />
        ))}
      </div>

      {/* Rising embers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        {embers.map((e, i) => (
          <Ember key={i} {...e} />
        ))}
      </div>

      {/* Animated flames at the bottom */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 h-48">
        <Flame left="5%" delay="0s" scale={0.8} />
        <Flame left="15%" delay="0.3s" scale={1.2} />
        <Flame left="28%" delay="0.7s" scale={0.9} />
        <Flame left="42%" delay="0.2s" scale={1.4} />
        <Flame left="55%" delay="0.9s" scale={1.1} />
        <Flame left="68%" delay="0.5s" scale={1.3} />
        <Flame left="82%" delay="0.1s" scale={1} />
        <Flame left="92%" delay="0.6s" scale={0.85} />
        <Flame left="35%" delay="1.1s" scale={0.7} />
        <Flame left="60%" delay="0.4s" scale={0.95} />
        <Flame left="75%" delay="0.8s" scale={1.15} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Hero */}
        <header className="grid gap-12 md:grid-cols-[1fr,1.1fr] md:gap-16 md:items-center">
          <div className="order-2 md:order-1 animate-title-reveal">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-gold animate-heartbeat">
              Saison 2026 · Création Théâtrale
            </p>
            <h1 className="font-serif text-5xl leading-[1.05] md:text-7xl">
              <span className="text-gradient-title">L'Incendie</span>
              <br />
              <span className="text-gradient-title">de Malden Mills</span>
            </h1>
            <p className="mt-4 font-serif text-2xl italic text-frost/80 md:text-3xl">
              — La Décision Impossible
            </p>

            <div className="mt-8 h-px w-24 bg-gold/60" />

            <p className="mt-6 max-w-md text-base leading-relaxed text-frost/75">
              Décembre 1995. Une nuit glaciale du Massachusetts. L'usine brûle.
              Un homme face au choix de sa vie : licencier trois mille familles
              à Noël — ou tout reconstruire. Une tragédie contemporaine
              inspirée de faits réels.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-gold pt-6">
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-frost/50">Durée</dt>
                <dd className="mt-1 font-serif text-xl text-gold">15mn</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-frost/50">Mise en scène</dt>
                <dd className="mt-1 font-serif text-xl text-gold">É. Vasseur</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-widest text-frost/50">À partir de</dt>
                <dd className="mt-1 font-serif text-xl text-gold">09h</dd>
              </div>
            </dl>
          </div>

          <div className="order-1 md:order-2">
            <div
              className="relative mx-auto max-w-sm animate-poster-float"
              style={{ transform: `translateY(${scrollY * -0.15}px)` }}
            >
              <div className="absolute -inset-4 rounded-sm bg-ember/20 blur-2xl glow" aria-hidden />
              <img
                src={affichePoster}
                alt="Affiche de la pièce L'Incendie de Malden Mills — usine industrielle en flammes dans la nuit d'hiver"
                width={848}
                height={1264}
                className="relative w-full rounded-sm shadow-poster ring-1 ring-gold/30 transition-transform duration-700 hover:scale-[1.02]"
              />
            </div>
          </div>
        </header>

        {/* Marquee press strip */}
        <section aria-hidden className="relative mt-20 overflow-hidden border-y border-gold/30 py-4">
          <div className="marquee-track flex w-max gap-12 whitespace-nowrap font-serif text-sm italic text-frost/60">
            {[...press, ...press].map((p, i) => (
              <span key={i} className="flex items-center gap-3">
                <span className="text-gold">{p.rating}</span>
                <span>« {p.quote} »</span>
                <span className="text-gold/60">— {p.source}</span>
                <span className="text-ember">✦</span>
              </span>
            ))}
          </div>
        </section>

        {/* Synopsis */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="synopsis">
            <div className="mb-10 border-b border-gold pb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Le Récit</p>
              <h2 id="synopsis" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
                Synopsis
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-3">
              <div className="md:col-span-2 space-y-5 font-serif text-lg leading-relaxed text-frost/85">
                <p>
                  <span className="float-left mr-3 font-serif text-6xl leading-none text-ember">D</span>
                  écembre 1995, Lawrence, Massachusetts. La nuit du 11 décembre,
                  les flammes dévorent Malden Mills, l'usine textile centenaire
                  qui fait vivre toute la ville. Aaron Feuerstein, son
                  propriétaire, soixante-dix ans, regarde brûler l'œuvre de
                  trois générations.
                </p>
                <p>
                  Les conseillers se pressent. La logique est implacable :
                  encaisser l'assurance, délocaliser, fermer. Trois mille
                  ouvriers, à deux semaines de Noël, redeviendraient un coût.
                </p>
                <p className="text-ember">
                  Aaron prend une autre décision — celle qui le ruinera et le
                  fera entrer dans l'Histoire.
                </p>
              </div>
              <aside className="space-y-6 border-l border-gold/30 pl-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-frost/50">Genre</p>
                  <p className="font-serif text-lg text-frost">Tragédie morale contemporaine</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-frost/50">Langue</p>
                  <p className="font-serif text-lg text-frost">Français</p>
                </div>
              </aside>
            </div>
          </section>
        </Reveal>

        {/* Key facts */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="faits">
            <h2 id="faits" className="sr-only">Faits marquants</h2>
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-gold/30 md:grid-cols-4">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="group relative bg-night p-8 text-center transition-colors duration-500 hover:bg-night/60"
                >
                  <p className="font-serif text-4xl text-ember transition-transform duration-500 group-hover:scale-110 md:text-5xl">
                    {f.num}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-frost/60">
                    {f.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Single performance */}
        <Reveal>
        <section className="relative mt-24 md:mt-32" aria-labelledby="representation">
          <div className="mb-10 border-b border-gold pb-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Représentation Exceptionnelle</p>
            <h2 id="representation" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
              Une seule soirée
            </h2>
          </div>

          <div className="grid gap-6 rounded-sm border border-gold/30 bg-night/40 p-8 md:grid-cols-[1fr,auto] md:items-center md:gap-12 md:p-10">
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-frost/50">Date & Heure</p>
                <p className="font-serif text-3xl text-ember">{performance.date}</p>
                <p className="mt-1 text-sm text-gold">Lever de rideau · {performance.time}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-frost/50">Lieu</p>
                <p className="font-serif text-2xl text-frost">{performance.venue}</p>
                <p className="text-sm text-frost/70">{performance.hall}</p>
                <p className="text-sm text-frost/60">{performance.address}</p>
              </div>
            </div>
            <div className="md:text-right md:border-l md:border-gold/30 md:pl-12">
              <p className="text-[10px] uppercase tracking-widest text-frost/50">Tarif</p>
              <p className="font-serif text-3xl text-gold">{performance.price}</p>
              <p className="mt-2 text-xs italic text-frost/50">Placement libre</p>
              <button className="mt-6 inline-block rounded-sm border border-gold bg-gold/10 px-6 py-3 text-xs uppercase tracking-[0.3em] text-gold transition-all duration-300 hover:bg-gold hover:text-night hover:shadow-ember">
                Venez nombreux
              </button>
            </div>
          </div>
        </section>
        </Reveal>

        {/* Scene excerpt */}
        <Reveal>
        <section className="relative mt-24 md:mt-32" aria-labelledby="extrait">
          <div className="mb-10 border-b border-gold pb-4">
            <p className="text-xs uppercase tracking-[0.4em] text-gold">Aperçu de la Scène</p>
            <h2 id="extrait" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
              Extrait — {sceneExcerpt.act}
            </h2>
          </div>

          <div className="rounded-sm border border-gold/20 bg-night/60 p-8 md:p-12">
            <p className="mb-8 font-serif text-sm italic text-frost/60 md:text-base">
              {sceneExcerpt.setting}
            </p>

            <div className="space-y-6">
              {sceneExcerpt.lines.map((line, i) => (
                <div key={i} className="grid grid-cols-1 gap-2 md:grid-cols-[120px,1fr] md:gap-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-gold md:pt-1">
                    {line.speaker}
                  </p>
                  <p className="font-serif text-lg leading-relaxed text-frost/90 md:text-xl">
                    {line.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-right font-serif text-xs italic text-frost/40">
              — Rideau —
            </p>
          </div>
        </section>
        </Reveal>

        {/* Cast */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="distribution">
            <div className="mb-10 border-b border-gold pb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Sur Scène</p>
              <h2 id="distribution" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
                Distribution
              </h2>
            </div>
            <ul className="divide-y divide-gold/20">
              {cast.map((c, i) => (
                <li
                  key={c.actor}
                  className="group grid grid-cols-1 gap-2 py-5 transition-all duration-500 hover:pl-4 md:grid-cols-[1fr,1fr,auto] md:items-baseline md:gap-8"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="font-serif text-lg italic text-frost/70">{c.role}</p>
                  <p className="font-serif text-xl text-frost transition-colors duration-300 group-hover:text-ember">
                    {c.actor}
                  </p>
                  <p className="text-xs uppercase tracking-widest text-gold/70">{c.note}</p>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Team */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="equipe">
            <div className="mb-10 border-b border-gold pb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Dans l'Ombre</p>
              <h2 id="equipe" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
                Équipe Artistique
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.map((t) => (
                <div
                  key={t.role}
                  className="rounded-sm border border-gold/20 bg-night/40 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-ember"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{t.role}</p>
                  <p className="mt-2 font-serif text-lg text-frost">{t.name}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Press quotes */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="presse">
            <div className="mb-10 border-b border-gold pb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Critiques</p>
              <h2 id="presse" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
                La Presse en parle
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {press.map((p, i) => (
                <blockquote
                  key={i}
                  className="group relative rounded-sm border border-gold/20 bg-night/50 p-8 transition-all duration-500 hover:border-ember/50 hover:bg-night/80"
                >
                  <span className="absolute -top-4 left-6 font-serif text-6xl leading-none text-ember/40 transition-colors duration-500 group-hover:text-ember">
                    "
                  </span>
                  <p className="font-serif text-lg italic leading-relaxed text-frost/90 md:text-xl">
                    {p.quote}
                  </p>
                  <footer className="mt-6 flex items-center justify-between">
                    <cite className="not-italic text-xs uppercase tracking-[0.3em] text-gold">
                      — {p.source}
                    </cite>
                    <span className="text-sm text-ember">{p.rating}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Practical info */}
        <Reveal>
          <section className="relative mt-24 md:mt-32" aria-labelledby="infos">
            <div className="mb-10 border-b border-gold pb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Préparer votre venue</p>
              <h2 id="infos" className="mt-2 font-serif text-4xl md:text-5xl text-frost">
                Informations Pratiques
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: "Accès", lines: ["Salle 1"] },
                { title: "Avant le spectacle", lines: ["Ouverture portes 09h00"]},
              ].map((block) => (
                <div
                  key={block.title}
                  className="rounded-sm border border-gold/20 bg-night/40 p-6 transition-all duration-500 hover:border-gold/50"
                >
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{block.title}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-frost/75">
                    {block.lines.map((l) => (
                      <li key={l} className="flex gap-2"><span className="text-ember">·</span>{l}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Footer credits */}
        <footer className="mt-24 border-t border-gold pt-12 text-center md:mt-32">
          <p className="font-serif text-2xl italic text-frost/70 md:text-3xl">
            « Trois mille familles. Une décision. Une nuit. »
          </p>
          <div className="mx-auto mt-8 h-px w-24 bg-gold/40" />
          <p className="mt-8 text-[10px] uppercase tracking-[0.4em] text-frost/40">
            Compagnie des Braises · Production La Manufacture · Saison 2026
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-frost/30">
            Avec le soutien du Ministère de la Culture · DRAC Île-de-France
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
