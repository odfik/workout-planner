import { useState, useEffect } from "react";

/* ---------- Øvelser: [navn, beskrivelse, tidsbasert?] ---------- */
const E = {
  // Treningssenter
  legpress: ["Beinpress", "Press plattformen bort uten å låse knærne."],
  bench: ["Benkpress", "Senk stangen kontrollert til brystet og press opp."],
  lat: ["Nedtrekk", "Trekk stangen ned mot øvre bryst, skuldrene ned."],
  shoulder: ["Skulderpress", "Press manualer fra skulderhøyde til strake armer."],
  row: ["Sittende roing", "Trekk håndtaket mot magen, klem skulderbladene."],
  squat: ["Knebøy med stang", "Rett rygg, gå ned til lårene er parallelle, reis deg."],
  legcurl: ["Lårcurl", "Bøy knærne mot setet i maskinen, senk sakte."],
  legext: ["Kneekstensjon", "Strekk knærne i maskinen, hold et sekund øverst."],
  calf: ["Tåhev i maskin", "Press opp på tå, senk helen under nivå."],
  hangleg: ["Kneløft i heng", "Heng i stang og løft knærne mot brystet uten å svinge."],
  curl: ["Bicepscurl", "Albuene inntil kroppen, bøy og senk kontrollert."],
  triceps: ["Tricepspress i kabel", "Strekk armene ned, albuene stille inntil kroppen."],
  rdl: ["Rumensk markløft", "Skyv hoftene bakover med lett bøyde knær, rett rygg."],
  lungeDb: ["Utfall med manualer", "Langt steg frem, senk bakre kne mot gulvet. Bytt side."],
  hipthrust: ["Hip thrust", "Rygg mot benk, løft hoftene med stang eller manual."],
  cablecrunch: ["Kabel-crunch", "Knel på gulvet og krøll overkroppen ned mot knærne."],
  incline: ["Skråbenk med manualer", "Press manualene opp fra brystet på skråbenk."],
  pullup: ["Pull-ups (eller assistert)", "Trekk haken over stangen, kontrollert ned."],
  lateral: ["Sidehev", "Løft manualene ut til siden til skulderhøyde."],
  facepull: ["Face pull", "Trekk tauet mot ansiktet med albuene høyt."],
  hammer: ["Hammercurl", "Curl med nøytralt grep (tommel opp)."],
  ohtri: ["Overhead tricepsstrekk", "Strekk manual over hodet, albuene peker opp."],
  // Hjemme
  pushup: ["Armhevinger", "Kroppen rett, senk brystet mot gulvet og press opp."],
  homesq: ["Knebøy", "Føttene skulderbredde, sitt ned og reis deg."],
  lunge: ["Utfall", "Langt steg frem, senk bakre kne. Bytt side."],
  invrow: ["Omvendt roing under bord", "Ligg under et stødig bord og trekk brystet opp mot kanten."],
  bridge: ["Hoftehev", "Ligg på ryggen, løft hoftene og stram setet."],
  sbridge: ["Enbeins hoftehev", "Som hoftehev, men med ett ben løftet."],
  plank: ["Planke", "Underarmer og tær i gulvet, kroppen rett.", 1],
  bulg: ["Bulgarsk splittknebøy", "Bakfoten på en stol, senk det fremre kneet."],
  calfh: ["Tåhev", "Press opp på tå på en trappekant og senk sakte."],
  legraise: ["Liggende beinhev", "Løft strake ben mot taket og senk uten å berøre gulvet."],
  pike: ["Pike push-ups", "Hoftene høyt, senk hodet mot gulvet og press opp."],
  dips: ["Dips på stol", "Hendene på stolkanten, senk deg med bøyde albuer."],
  superman: ["Superman", "Ligg på magen og løft armer og ben samtidig."],
  jsquat: ["Hoppknebøy", "Knebøy med eksplosivt hopp, land mykt.", 1],
  bicycle: ["Sykkel-crunch", "Albue mot motsatt kne, annenhver gang."],
  wall: ["Veggsitt", "Rygg mot vegg, hold 90° i knærne.", 1],
  diamond: ["Diamant-armhev", "Hendene tett sammen under brystet."],
  feetpush: ["Armhev med føttene hevet", "Føttene på en stol, senk og press opp."],
  // HIIT / sirkel
  burpee: ["Burpees", "Ned i armhevingsposisjon, hopp inn og opp med armene over hodet.", 1],
  jj: ["Jumping jacks", "Hopp med bein og armer ut og sammen.", 1],
  jlunge: ["Hoppende utfall", "Bytt bein i luften mellom hvert utfall.", 1],
  mountain: ["Mountain climbers", "Armhevingsposisjon, dra knærne raskt mot brystet.", 1],
  aplank: ["Aktiv planke", "Gå opp og ned mellom albue- og håndplanke.", 1],
  highknees: ["Høye kneløft", "Løp på stedet og løft knærne til hoftehøyde.", 1],
  skater: ["Skaterhopp", "Hopp side til side og land på ett ben.", 1],
  assault: ["Assault bike", "Full fart med armer og ben i intervaller.", 1],
  boxjump: ["Hopp på boks", "Hopp opp på boksen, land mykt, gå ned.", 1],
  thruster: ["Knebøy + skulderpress (lett vekt)", "Knebøy og press vekten over hodet i én bevegelse.", 1],
  rowint: ["Rointervaller", "Skyv med beina, trekk med armene. Hardt tempo.", 1],
  kbswing: ["Kettlebell swing", "Sving vekten med hoftene til brysthøyde.", 1],
  tuck: ["Tuck jumps", "Hopp rett opp og trekk knærne mot brystet, land mykt.", 1],
  lungeknee: ["Bakoverutfall med kneløft", "Steg bakover i utfall, driv opp og løft kneet foran.", 1],
  sprint: ["Sprint på stedet", "Så fort du kan, med høy knefrekvens.", 1],
  pushtap: ["Armhev med skuldertapp", "I armhevingsposisjon: ta på motsatt skulder mellom hver armhev.", 1],
  bear: ["Bear crawl", "På alle fire med knærne løftet, krabb frem og tilbake.", 1],
  plankjack: ["Planke jacks", "I planke: hopp føttene ut og inn som jumping jacks.", 1],
  flutter: ["Flutter kicks", "Ligg på ryggen med lett løftede ben og spark raskt og smått.", 1],
  russian: ["Russian twist", "Sitt med løftede føtter og roter overkroppen side til side.", 1],
  gobletsq: ["Goblet-knebøy", "Hold en manual eller kettlebell mot brystet og gå dypt ned.", 1],
  walklunge: ["Gående utfall med manualer", "Gå frem i utfall med en manual i hver hånd.", 1],
  stepup: ["Step-up med manualer", "Stig opp på en boks eller benk og ned igjen kontrollert.", 1],
  sled: ["Sleddskyv", "Skyv sleden i lav stilling med raske steg.", 1],
  battle: ["Battle ropes", "Slå tauene opp og ned vekselvis i rask rytme.", 1],
  slam: ["Ballkast i gulvet", "Løft medisinballen over hodet og slå den hardt i gulvet.", 1],
  skierg: ["Ski-erg", "Trekk håndtakene ned mot hoftene med hele kroppen.", 1],
};

/* ---------- Ukeplaner ---------- */
const M = {
  g: {
    n: [["Helkropp", ["legpress", "legcurl", "bench", "lat", "shoulder", "plank"]],
        ["Bein + mage", ["squat", "legcurl", "legext", "calf", "hangleg", "plank"]],
        ["Overkropp", ["bench", "lat", "shoulder", "row", "curl", "triceps"]]],
    e: [["Bein + mage A", ["squat", "rdl", "legpress", "legcurl", "calf", "hangleg"]],
        ["Overkropp A", ["bench", "row", "shoulder", "lat", "triceps", "curl"]],
        ["Bein + mage B", ["lungeDb", "hipthrust", "legext", "calf", "cablecrunch", "plank"]],
        ["Overkropp B", ["incline", "pullup", "lateral", "facepull", "hammer", "ohtri"]]],
  },
  h: {
    n: [["Helkropp", ["pushup", "homesq", "lunge", "invrow", "bridge", "plank"]],
        ["Bein + mage", ["homesq", "bulg", "lunge", "bridge", "calfh", "legraise"]],
        ["Overkropp", ["pushup", "pike", "dips", "invrow", "superman", "plank"]]],
    e: [["Bein + mage A", ["bulg", "jsquat", "sbridge", "lunge", "legraise", "plank"]],
        ["Overkropp A", ["pushup", "pike", "dips", "invrow", "superman", "plank"]],
        ["Bein + mage B", ["homesq", "wall", "calfh", "sbridge", "bicycle", "legraise"]],
        ["Overkropp B", ["diamond", "feetpush", "pike", "dips", "invrow", "plank"]]],
  },
};
const WL = {
  h: [["HIIT: Helkropp", ["burpee", "jj", "jlunge", "mountain", "aplank", "highknees"]],
      ["HIIT: Bein og hopp", ["jsquat", "skater", "tuck", "lungeknee", "sprint", "flutter"]],
      ["HIIT: Overkropp og core", ["pushtap", "bear", "plankjack", "burpee", "mountain", "russian"]],
      ["HIIT: Sprint og core", ["sprint", "highknees", "skater", "flutter", "russian", "aplank"]]],
  g: [["Sirkel: Kondisjon", ["assault", "boxjump", "thruster", "rowint", "kbswing", "plank"]],
      ["Sirkel: Underkropp", ["gobletsq", "walklunge", "stepup", "sled", "kbswing", "plank"]],
      ["Sirkel: Overkropp", ["battle", "slam", "skierg", "shoulder", "row", "pushup"]],
      ["Sirkel: Finale", ["skierg", "assault", "rowint", "slam", "boxjump", "burpee"]]],
};
function cardio(place, lvl) {
  const g = place === "g";
  const mod = g ? "assault bike, sykkel, ellipse eller romaskin" : "løping ute (eller høye kneløft/jogg på stedet)";
  const cool = { n: "Nedjogg", d: "Rolig gange eller jogg for å få pulsen ned.", dose: "5 min", noRest: 1 };
  const it = (n, d, dose) => [{ n, d, dose, noRest: 1 }, cool];
  const long = (min) => ["Rolig langkjøring", it("Langkjøring i snakketempo", `Du skal klare å snakke i hele setninger. ${g ? "Tredemølle, ellipse eller ute." : "Ute."}`, `ca. ${min} min`)];
  const longInt = (r, m, p) => it(`Lange intervaller på ${mod.split(",")[0]}/løping`.replace(" på assault bike/løping", ""), `Hardt, men jevnt tempo. Alternativer: ${mod}.`, `${r} × ${m} min hardt, ${p} min rolig pause`);
  const hill = it("Motbakkeløp", g ? "Tredemølle med 6–8 % stigning, eller ute i bakke." : "Løp opp en bakke og gå/jogg rolig ned.", "6 × 3 min hardt, jogg ned som pause");
  if (lvl === "n") return [
    ["Rolig langkjøring", long(30)[1]],
    ["Lange intervaller", longInt(4, 4, 3)],
    ["Lengre intervaller", it("Lengre terskelintervaller", `Kontrollert hardt tempo (kan si noen få ord). ${mod}.`, "2 × 10 min, 3 min rolig pause")],
  ];
  return [
    ["Rolig langkjøring", long(45)[1]],
    ["Lange intervaller", longInt(5, 5, 2)],
    ["Korte intervaller", it("Korte intervaller 30/30", `30 sek fort, 30 sek rolig. ${mod}.`, "2 serier × 10 repetisjoner, 3 min mellom")],
    ["Motbakkeløp", hill[0] ? hill : hill],
  ];
}
const GOAL = { m: "Bygge muskler", w: "Gå ned i vekt", k: "Bedre kondisjon" };
const LVL = { n: "Nybegynner", e: "Erfaren" };
const PLC = { h: "Hjemme", g: "Treningssenter" };
const DAYS = ["Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"];

const WU_G = [["Tredemølle", "Rask gange eller lett jogg."], ["Mosjonssykkel", "Lett tråkk med økende motstand."], ["Romaskin", "Rolig, jevn roing."]];
const WU_H = [["Lett jogging på stedet", "Start rolig og øk gradvis. Avslutt med armsirkler."],
  ["Høye kneløft + hoftesirkler", "Høye kneløft i rolig tempo, så hoftesirkler og utfall med rotasjon."],
  ["Mobilitet", "Katt/ku, dype knebøy uten vekt, armsirkler og nakke-/skuldermobilitet."]];

function buildWeek(p) {
  let t;
  if (p.goal === "m") t = M[p.place][p.lvl];
  else if (p.goal === "w") t = WL[p.place].slice(0, p.lvl === "n" ? 3 : 4);
  else t = cardio(p.place, p.lvl);
  const days = p.lvl === "n" ? [0, 2, 4] : [0, 1, 3, 5];
  let k = 0;
  return DAYS.map((d) => {
    const i = days.indexOf(DAYS.indexOf(d));
    if (i < 0) return { d, s: null };
    const [title, items] = t[i];
    const wu = (p.place === "g" ? WU_G : WU_H)[i % 3];
    return { d, s: { title, items, wu, i: k++ } };
  });
}
function dose(p, id) {
  const e = E[id], n = p.lvl === "n", s = n ? 3 : 4;
  if (e[2]) return `${s} × ${n ? 30 : 45} sek`;
  return `${s} × ${p.goal === "m" ? (n ? 10 : 8) : n ? 15 : 12}`;
}
const ld = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch { return d; } };
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
const ICON = { m: "💪", w: "🔥", k: "🏃" };
const weekKey = () => { const d = new Date(); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
const TODAY = (new Date().getDay() + 6) % 7;

/* ---------- Komponenter ---------- */
function Rest({ sec }) {
  const [t, setT] = useState(null);
  useEffect(() => {
    if (t === null || t <= 0) return;
    const id = setTimeout(() => setT(t - 1), 1000);
    return () => clearTimeout(id);
  }, [t]);
  const label = t === null ? `⏱ Pause ${sec} s` : t > 0 ? `⏹ ${t} s` : "✓ Pause ferdig";
  return <button className="ghost" onClick={() => setT(t !== null && t > 0 ? null : sec)}>{label}</button>;
}

function EvalForm({ title, onSave, cta }) {
  const [st, setSt] = useState(0);
  const [c, setC] = useState("");
  return (
    <div className="card">
      <h3>{cta}</h3>
      <div className="stars">{[1, 2, 3, 4, 5].map((n) => <button key={n} className={n <= st ? "on" : ""} onClick={() => setSt(n)} aria-label={`${n} stjerner`}>★</button>)}</div>
      <textarea value={c} maxLength={200} onChange={(e) => setC(e.target.value)} placeholder="Kort kommentar (valgfritt)" />
      <button className="btn" disabled={!st} onClick={() => onSave({ title, stars: st, c: c.trim() })}>Lagre i loggen</button>
    </div>
  );
}

function Chips({ label, opts, val, set }) {
  return (
    <div className="card">
      <h3>{label}</h3>
      <div className="chips">{Object.entries(opts).map(([k, v]) => <button key={k} className={"chip" + (val === k ? " on" : "")} onClick={() => set(k)}>{v}</button>)}</div>
    </div>
  );
}

export default function App() {
  const [prof, setProf] = useState(() => ld("prof", null));
  const [log, setLog] = useState(() => ld("log", []));
  const [sel, setSel] = useState(prof || {});
  const [tab, setTab] = useState("plan");
  const [cur, setCur] = useState(null);       // åpen økt
  const [evalWeek, setEvalWeek] = useState(false);

  const week = prof ? buildWeek(prof) : [];
  const done = log.filter((l) => l.wk === weekKey() && l.day !== undefined).map((l) => l.day);
  const total = week.filter((x) => x.s).length;
  const nDone = week.filter((x) => x.s && done.includes(DAYS.indexOf(x.d))).length;
  const addLog = (x) => {
    const l = [{ ...x, wk: weekKey(), date: new Date().toLocaleDateString("no-NO", { day: "numeric", month: "long", year: "numeric" }) }, ...log];
    setLog(l); sv("log", l); setCur(null); setEvalWeek(false); setTab("log");
  };
  const lvlOf = (it) => (typeof it === "string" ? E[it] : [it.n, it.d]);

  let body;
  if (tab === "log") {
    body = (<>
      <h1>Treningslogg 📓</h1>
      {log.length === 0 && <p className="mu">Ingen økter registrert ennå. Fullfør en økt fra ukeplanen! 💪</p>}
      {log.length > 0 && (
        <div className="stats">
          <div><b>{log.filter((l) => l.day !== undefined).length}</b><span>🏋️ økter</span></div>
          <div><b>{(log.reduce((a, l) => a + l.stars, 0) / log.length).toFixed(1)}</b><span>⭐ snitt</span></div>
          <div><b>{log.filter((l) => l.wk === weekKey() && l.day !== undefined).length}</b><span>📅 denne uken</span></div>
        </div>
      )}
      {log.map((l, i) => (
        <div className="card" key={i}>
          <button className="del" aria-label="Slett" onClick={() => { const n = log.filter((_, j) => j !== i); setLog(n); sv("log", n); }}>🗑️</button><b>{l.title}</b><div className="mu">{l.date}</div>
          <div className="star">{"★".repeat(l.stars)}<span className="mu">{"★".repeat(5 - l.stars)}</span></div>
          {l.c && <p style={{ margin: "6px 0 0" }}>{l.c}</p>}
        </div>
      ))}
    </>);
  } else if (!prof) {
    body = (<>
      <h1>Lag din ukeplan</h1>
      <p className="mu">Velg alternativene dine, så setter vi sammen en ukeplan.</p>
      <Chips label="Treningsmål" opts={GOAL} val={sel.goal} set={(v) => setSel({ ...sel, goal: v })} />
      <Chips label="Erfaring" opts={LVL} val={sel.lvl} set={(v) => setSel({ ...sel, lvl: v })} />
      <Chips label="Hvor trener du?" opts={PLC} val={sel.place} set={(v) => setSel({ ...sel, place: v })} />
      <button className="btn" disabled={!(sel.goal && sel.lvl && sel.place)} onClick={() => { setProf(sel); sv("prof", sel); }}>Vis ukeplan</button>
    </>);
  } else if (evalWeek) {
    body = (<>
      <button className="ghost" onClick={() => setEvalWeek(false)}>← Tilbake</button>
      <h1 style={{ marginTop: 14 }}>Evaluer treningsuken</h1>
      <EvalForm title="Ukeevaluering" cta="Hvordan var uken?" onSave={addLog} />
    </>);
  } else if (cur !== null) {
    const s = week[cur].s;
    body = (<>
      <button className="ghost" onClick={() => setCur(null)}>← Tilbake</button>
      <div className="hero small"><span>{week[cur].d}</span><h1>{ICON[prof.goal]} {s.title}</h1></div>
      <div className="card warm">
        <span className="tag">Oppvarming · 5–10 min</span>
        <h3>{s.wu[0]}</h3><p className="mu">{s.wu[1]}</p>
      </div>
      {s.items.map((it, i) => {
        const [n, d] = lvlOf(it);
        const str = typeof it === "string";
        return (
          <div className="card" key={i}>
            <div className="num">{i + 1}</div>
            <h3>{n}</h3><p className="mu">{d}</p>
            <div className="dose">{str ? dose(prof, it) : it.dose}</div>
            {str && <div className="row"><Rest sec={prof.goal === "m" && prof.lvl === "e" ? 90 : 60} /></div>}
          </div>
        );
      })}
      <div className="card cool"><span className="tag">Etter økten</span><p style={{ margin: "6px 0 0" }}>Husk å tøye ut etter eget behov. Ta de musklene du har brukt mest.</p></div>
      <EvalForm title={`${week[cur].d}: ${s.title}`} cta="Fullfør økt 🎉" onSave={(x) => addLog({ ...x, day: cur })} />
    </>);
  } else {
    body = (<>
      <div className="hero"><span>{LVL[prof.lvl]} · {PLC[prof.place]}</span><h1>{ICON[prof.goal]} {GOAL[prof.goal]}</h1></div>
      <div className="card">
        <div className="day"><b>Ukens fremgang 📈</b><span className="mu">{nDone} av {total} økter</span></div>
        <div className="bar"><div className="fill" style={{ width: (total ? (nDone / total) * 100 : 0) + "%" }} /></div>
        {total > 0 && nDone === total && <p className="mu" style={{ marginTop: 8 }}>Alle økter fullført denne uken! 🏆 Husk å evaluere uken nederst.</p>}
      </div>
      {week.map((x) => (
        <div key={x.d} className={"card day" + (x.s ? "" : " off")}>
          <div><b>{x.d}</b>{DAYS.indexOf(x.d) === TODAY && <span className="badge">I dag</span>}<div className="mu">{x.s ? `${ICON[prof.goal]} ${x.s.title} · ${x.s.items.length} ${prof.goal === "k" ? "deler" : "øvelser"}` : "Fridag 😌"}</div></div>
          {x.s && <button className={done.includes(DAYS.indexOf(x.d)) ? "ghost" : "btn sm"} onClick={() => setCur(DAYS.indexOf(x.d))}>{done.includes(DAYS.indexOf(x.d)) ? "✅ Gjort" : "Start"}</button>}
        </div>
      ))}
      <div className="card day"><div><b>Slutten av uken</b><div className="mu">Evaluer treningen din</div></div><button className="ghost" onClick={() => setEvalWeek(true)}>Evaluer</button></div>
      <button className="ghost" onClick={() => { setSel(prof); setProf(null); }}>Endre valg</button>
    </>);
  }

  return (
    <div className="app">
      <style>{CSS}</style>
      <main>{body}</main>
      <nav>
        <button className={tab === "plan" ? "on" : ""} onClick={() => setTab("plan")}>Ukeplan</button>
        <button className={tab === "log" ? "on" : ""} onClick={() => setTab("log")}>Treningslogg</button>
      </nav>
    </div>
  );
}

const CSS = `
.app{--bg:#f4f6fb;--card:#fff;--tx:#172033;--mu:#6b7690;--ac:#4f46e5;--ac2:#7c3aed;--bd:#e5e9f2;--warm:#fff7ed;--cool:#ecfdf5;
 min-height:100vh;background:var(--bg);color:var(--tx);font:16px/1.45 Inter,system-ui,-apple-system,"Segoe UI",sans-serif}
@media(prefers-color-scheme:dark){.app{--bg:#0f1320;--card:#1a2033;--tx:#eef1f8;--mu:#9aa5c0;--ac:#818cf8;--ac2:#a78bfa;--bd:#2a3350;--warm:#2b2118;--cool:#12261f}}
.app *{box-sizing:border-box}
main{max-width:560px;margin:0 auto;padding:20px 16px 96px}
h1{font-size:26px;letter-spacing:-.02em;margin:4px 0 12px}h3{font-size:17px;margin:0 0 4px}
.mu{color:var(--mu);font-size:14px;margin:0}
.hero{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border-radius:20px;padding:20px;margin:0 0 16px}
.hero.small{margin-top:14px}.hero span{opacity:.85;font-size:14px}.hero h1{margin:4px 0 0}
.card{position:relative;background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:16px;margin-bottom:12px;box-shadow:0 1px 3px rgba(20,30,60,.05)}
.card.warm{background:var(--warm)}.card.cool{background:var(--cool)}
.tag{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--ac)}
.day{display:flex;justify-content:space-between;align-items:center;gap:10px}.day.off{opacity:.6}
.num{position:absolute;right:14px;top:12px;font-weight:800;color:var(--bd);font-size:28px}
.dose{display:inline-block;margin-top:10px;background:var(--bg);border-radius:999px;padding:4px 12px;font-weight:700;font-size:14px}
.row{display:flex;gap:10px;align-items:center;flex-wrap:wrap;margin-top:12px}
button{font:inherit;color:var(--tx);cursor:pointer}
.btn{background:linear-gradient(135deg,var(--ac),var(--ac2));color:#fff;border:0;border-radius:12px;padding:12px 16px;font-weight:600;width:100%}
.btn.sm{width:auto;padding:8px 18px}.btn:disabled{opacity:.4;cursor:default}
.ghost{background:none;border:1px solid var(--bd);border-radius:10px;padding:8px 12px}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:8px}
.chip{border:1px solid var(--bd);background:var(--bg);border-radius:999px;padding:8px 16px}
.chip.on{background:var(--ac);color:#fff;border-color:var(--ac)}
.stars button{font-size:32px;background:none;border:0;color:var(--bd);padding:0 3px}.stars button.on,.star{color:#f5a623}
textarea{width:100%;font:inherit;background:var(--bg);color:var(--tx);border:1px solid var(--bd);border-radius:10px;padding:10px;min-height:76px;margin:8px 0}
.bar{height:10px;background:var(--bg);border-radius:99px;margin-top:10px;overflow:hidden}
.fill{height:100%;background:linear-gradient(90deg,var(--ac),var(--ac2));border-radius:99px;transition:width .4s}
.badge{margin-left:8px;background:var(--ac);color:#fff;border-radius:99px;padding:1px 9px;font-size:12px;font-weight:700}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}
.stats div{background:var(--card);border:1px solid var(--bd);border-radius:16px;padding:12px;text-align:center}
.stats b{display:block;font-size:24px}.stats span{font-size:12px;color:var(--mu)}
.del{position:absolute;right:10px;top:10px;background:none;border:0;font-size:16px;opacity:.6}
nav{position:fixed;left:0;right:0;bottom:0;display:flex;background:var(--card);border-top:1px solid var(--bd)}
nav button{flex:1;border:0;background:none;padding:15px;font-weight:600;color:var(--mu)}nav button.on{color:var(--ac)}
`;
