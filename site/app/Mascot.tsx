"use client"; // follows the pointer and reacts to what the visitor does

import { useEffect, useRef, useState } from "react";
import type { Mood } from "@/lib/mascot";

// Two 3x3 sprite sheets in /public/mascots (made with scripts/process-mascot.py):
//  directions: row 1 up-left, up, up-right / row 2 left, front, right / row 3 down-left, down, down-right
//  reactions : 1 blink, 2 heart, 3 sparkles, 4 surprised, 5 starstruck, 6 blush, 7 sleeping, 8 dizzy, 9 grin
const DIRECTIONS = "/mascots/op-directions.webp";
const REACTIONS = "/mascots/op-reactions.webp";
const R = { blink: 1, heart: 2, sparkle: 3, surprised: 4, starstruck: 5, blush: 6, sleep: 7, dizzy: 8, grin: 9 }; // our names for the reaction cells
const HAPPY = [R.heart, R.sparkle, R.starstruck, R.blush, R.grin]; // what a click can show
const SECTOR_TO_CELL = [6, 9, 8, 7, 4, 1, 2, 3]; // pointer angle (0 = right, clockwise, 45 degree steps) to a direction cell
const IDLE_MS = 45_000; // falls asleep after this long without any activity

type View = { sheet: "dir" | "react"; cell: number }; // our type: which sprite cell is shown

// Position of cell 1..9 inside a 3x3 sheet, as CSS background-position. Our helper.
const pos = (cell: number) => `${((cell - 1) % 3) * 50}% ${Math.floor((cell - 1) / 3) * 50}%`;

export default function Mascot() {
  const [ready, setReady] = useState(false); // both sprite sheets loaded
  const [hidden, setHidden] = useState(false);
  const [view, setView] = useState<View>({ sheet: "dir", cell: 5 });
  const root = useRef<HTMLButtonElement>(null);
  const state = useRef({ look: 5, hold: null as null | View, sleeping: false, lastTouch: false, lastClick: 0, timers: [] as number[] });

  // Show the sheet that matches the current situation: a held reaction beats sleeping, which beats looking around.
  function render() {
    const s = state.current;
    setView(s.hold ?? (s.sleeping ? { sheet: "react", cell: R.sleep } : { sheet: "dir", cell: s.look }));
  }
  // Shows a reaction for a while (ms = 0 keeps it until the next one), then goes back to normal.
  function react(cell: number, ms: number) {
    const s = state.current;
    s.hold = { sheet: "react", cell };
    render();
    if (ms > 0) {
      const t = window.setTimeout(() => { if (s.hold?.cell === cell) { s.hold = null; render(); } }, ms);
      s.timers.push(t);
    }
  }

  // Load both sheets; if one is missing the mascot simply does not appear.
  useEffect(() => {
    try { if (sessionStorage.getItem("op-hidden") === "1") setHidden(true); } catch {}
    let loaded = 0;
    const done = () => { if (++loaded === 2) setReady(true); };
    for (const src of [DIRECTIONS, REACTIONS]) { const img = new Image(); img.onload = done; img.src = src; }
  }, []);

  useEffect(() => {
    if (!ready || hidden) return;
    const s = state.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let idleTimer = 0, blinkTimer = 0;

    const wake = () => {
      window.clearTimeout(idleTimer);
      if (s.sleeping) { s.sleeping = false; render(); }
      idleTimer = window.setTimeout(() => { s.sleeping = true; render(); }, IDLE_MS);
    };
    // Look toward the pointer (mouse only: on touch screens there is no pointer to follow).
    const onMove = (e: PointerEvent) => {
      s.lastTouch = e.pointerType === "touch";
      wake();
      if (s.lastTouch || reduce || !root.current) return;
      const b = root.current.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height / 2);
      const next = Math.hypot(dx, dy) < 70 ? 5 : SECTOR_TO_CELL[(Math.round((Math.atan2(dy, dx) * 180) / Math.PI / 45) + 8) % 8];
      if (next !== s.look) { s.look = next; if (!s.hold && !s.sleeping) render(); }
    };
    // Reactions to what the visitor does elsewhere on the page (see lib/mascot.ts).
    const onMood = (e: Event) => {
      wake();
      const mood = (e as CustomEvent<Mood>).detail;
      if (mood === "thinking") react(R.surprised, 0);
      else if (mood === "happy") react(R.starstruck, 1800);
      else if (mood === "error") react(R.dizzy, 2500);
      else if (mood === "look-up") { s.hold = null; s.look = 2; render(); }
      else if (mood === "calm") { s.hold = null; s.look = 5; render(); }
    };
    // A short blink every few seconds, only while it is just looking around.
    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        if (!s.hold && !s.sleeping && !reduce) { s.hold = { sheet: "react", cell: R.blink }; render(); window.setTimeout(() => { if (s.hold?.cell === R.blink) { s.hold = null; render(); } }, 150); }
        scheduleBlink();
      }, 4000 + Math.random() * 3500);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("keydown", wake);
    window.addEventListener("scroll", wake, { passive: true });
    window.addEventListener("mascot", onMood);
    wake();
    scheduleBlink();
    // Greeting once per browser session.
    try {
      if (sessionStorage.getItem("op-greeted") !== "1") { sessionStorage.setItem("op-greeted", "1"); s.timers.push(window.setTimeout(() => react(R.grin, 1400), 900)); }
    } catch {}
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("keydown", wake);
      window.removeEventListener("scroll", wake);
      window.removeEventListener("mascot", onMood);
      window.clearTimeout(idleTimer); window.clearTimeout(blinkTimer);
      s.timers.forEach((t) => window.clearTimeout(t)); s.timers = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, hidden]);

  if (!ready || hidden) return null;

  const sprite = (sheet: "dir" | "react", url: string) => (
    <span className="op-sprite" style={{ backgroundImage: `url(${url})`, backgroundPosition: pos(view.cell), opacity: view.sheet === sheet ? 1 : 0 }} />
  );

  return (
    <div className="op-wrap">
      <button
        type="button"
        className="op-hide"
        aria-label="Hide the mascot"
        onClick={() => { setHidden(true); try { sessionStorage.setItem("op-hidden", "1"); } catch {} }}
      >
        x
      </button>
      <button
        ref={root}
        type="button"
        className="op"
        title="Op, a community mascot (not an official Optimum character). Click for a reaction."
        aria-label="Op the mascot, click for a reaction"
        onClick={() => {
          const s = state.current;
          let pick = HAPPY[Math.floor(Math.random() * HAPPY.length)];
          if (pick === s.hold?.cell) pick = HAPPY[(HAPPY.indexOf(pick) + 1) % HAPPY.length]; // never the same one twice in a row
          s.sleeping = false;
          react(pick, 900);
        }}
      >
        {/* two stacked layers so switching sheets never flashes an empty frame */}
        {sprite("dir", DIRECTIONS)}
        {sprite("react", REACTIONS)}
      </button>
    </div>
  );
}
