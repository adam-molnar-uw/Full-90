import { useState, useEffect, useCallback } from "react";

const START_DATE = new Date(2026, 1, 7); // Feb 7, 2026

function getDateForDay(weekNum, dayIdx) {
  let totalDays = 0;
  for (let w = 0; w < weekNum - 1; w++) {
    if (PROGRAM_DATA.weeks[w]) {
      totalDays += PROGRAM_DATA.weeks[w].days.length;
    }
  }
  totalDays += dayIdx;
  const date = new Date(START_DATE);
  date.setDate(date.getDate() + totalDays);
  return date;
}

function formatDate(date) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

const PROGRAM_DATA = {
  meta: {
    title: "Full 90",
    subtitle: "Soccer conditioning for a 45-year-old with PTFJ, lateral chain weakness, ischial tuberosity nerve flare-up, plantar plate tear (R foot, orthotics) & left ankle hypermobility",
    phases: [
      { name: "Base + Nerve Recovery", weeks: [1, 2, 3], color: "#2d6a4f" },
      { name: "Transition to Running", weeks: [4, 5, 6], color: "#e07a2f" },
      { name: "Soccer-Specific", weeks: [7, 8, 9], color: "#c2255c" },
      { name: "Match Prep & Taper", weeks: [10, 11], color: "#364fc7" },
    ],
  },
  hrZones: [
    { zone: 1, name: "Recovery", pct: "50â€“60%", desc: "Very easy, walking pace" },
    { zone: 2, name: "Aerobic Base", pct: "60â€“70%", desc: "Conversational, sustainable" },
    { zone: 3, name: "Tempo", pct: "70â€“80%", desc: "Comfortably hard, breathing heavier" },
    { zone: 4, name: "Threshold", pct: "80â€“90%", desc: "Hard, short sentences only" },
    { zone: 5, name: "Max", pct: "90â€“100%", desc: "All-out sprint effort" },
  ],
  dailyPhysio: [
    { name: "Hollow Hold", detail: "3Ã—30s â€” do barefoot on firm surface", icon: "ðŸ”„" },
    { name: "Piriformis Release (ball)", detail: "6â€“8 passes each side", icon: "ðŸŽ¾" },
    { name: "Glutes Release", detail: "3Ã—30s, do 3x throughout the day", icon: "ðŸ‘" },
    { name: "Banded Side-Lying Hip Abduction", detail: "3×15 each side, light band. Slow tempo: 2s up, 2s hold, 2s down. Corrects TFL compensation — release glutes first, then activate.", icon: "🦵" },
    { name: "Short Foot Exercise", detail: "3Ã—10 holds â€” barefoot, activate arch without curling toes", icon: "ðŸ¦¶" },
    { name: "Big Toe Press-Downs", detail: "3Ã—10 â€” press big toe down/lift others, then reverse. Rebuilds windlass mechanism", icon: "ðŸ‘£" },
    { name: "Towel Scrunches", detail: "3Ã—30s each foot â€” intrinsic foot strengthening", icon: "ðŸ§¶" },
    { name: "Single-Leg Balance (both ankles)", detail: "3Ã—30s each leg, eyes CLOSED. L = hypermobility control. R = stability around plantar plate. Bare feet on firm surface.", icon: "âš–ï¸" },
    { name: "Ankle Alphabet Tracing (both)", detail: "Trace Aâ€“Z with each foot in the air. L builds proprioceptive control. R rebuilds active ROM around orthotics.", icon: "ðŸ”¤" },
    { name: "Banded Ankle Dorsiflexion (both)", detail: "Light band around forefoot, 3Ã—10 each side, slow controlled dorsiflexion. Builds active control at end range.", icon: "ðŸ”—" },
  ],
  weeks: generateWeeks(),
};

function generateWeeks() {
  const weeks = [];

  // WEEK 1
  weeks.push({
    number: 1,
    phase: "Base + Nerve Recovery",
    focus: "Establish routine, protect sit-bone, build aerobic base without bike seat",
    progressionGate: "Ischial tuberosity pain not worsening. Groin nerve at 0/10 or resolving. Can complete all physio exercises without flare-up.",
    days: [
      {
        day: "Saturday",
        type: "rest",
        label: "Day 1 â€” Inflammation Management",
        sessions: [
          { name: "Piriformis release with ball â€” do now and again tonight" },
          { name: "Glute release â€” all 3 rounds today" },
          { name: "Hollow hold â€” 3Ã—30s barefoot" },
          { name: "Foot exercises: short foot, big toe press-downs, towel scrunches" },
          { name: "Heat pad on sit-bone/glute area: 15â€“20 min (NOT ice â€” ice aggravates nerve irritation). Do piriformis release right after while tissue is warm." },
        ],
        notes: "NO bike. NO sitting on hard surfaces. Use a cushion with coccyx cutout or sit on folded towel offset to thighs. Do NOT stretch hamstrings â€” pulls directly on ischial tuberosity. Gentle walking is fine.",
      },
      {
        day: "Sunday",
        type: "rest",
        label: "Day 2 â€” Rest + Physio Only",
        sessions: [
          { name: "Full daily physio (hollow hold, piriformis, glute release, foot exercises)" },
          { name: "Assess sit-bone after sleep â€” is inflammation settling?" },
          { name: "Heat pad 15â€“20 min on glute/sit-bone area if still sensitive. NO ice on nerve irritation." },
          { name: "Gentle 15 min walk if feeling okay", zone: "Z1" },
        ],
        notes: "If sit-bone is calming down, you're on track for Monday. If still very irritated, we adjust Monday to pure upper body or pool work. HEAT not ice for all nerve-related flare-ups throughout this program.",
      },
      {
        day: "Monday",
        type: "conditioning",
        label: "Standing Bike Intervals",
        hrTarget: "RPE 8â€“9 during sprints (no H10 yet â€” use perceived effort)",
        sessions: [
          { name: "Warm-up: 5 min standing pedal, easy pace", zone: "RPE 4" },
          { name: "8Ã—10s standing sprints / 50s easy standing pedal", zone: "RPE 8â€“9" },
          { name: "Cool-down: 5 min easy", zone: "RPE 2â€“3" },
        ],
        notes: "Stay standing the entire time. If sit-bone flares even standing, switch to elliptical. No H10 yet â€” use RPE: sprints should feel 8â€“9/10 (can barely talk), easy pedal 4/10 (conversational).",
        physio: ["Movement Prep: Ankle hops, A-skip, B-skip, Carioca (3Ã—50ft each, 90s rest). CUE: L ankle control on all landings. SKIP Carioca if groin nerve is active â€” the crossover loads adduction + rotation."],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain Strength + H10 Setup",
        sessions: [
          { name: "ðŸŽ‰ H10 arrives today â€” charge it, pair with Polar app, wear it for every session from now on" },
          { name: "Adduction plank, long lever â€” 3Ã—45â€“60s. MONITOR: if inguinal groin area flares, reduce hold time or skip." },
          { name: "DB 1-leg RDL â€” 3Ã—8 (single 18lb DB, 5s eccentric) â€” LEFT SIDE: stop at torso parallel (FAI impingement limit + sit-bone). RIGHT SIDE: stop before sit-bone stretch.", zone: "Controlled" },
          { name: "Stabilization lunge â€” 3Ã—6" },
          { name: "Adductor slide (towel) â€” 3Ã—8. MONITOR: if groin nerve tingling increases, reduce range or skip." },
          { name: "Side lunges â€” 3Ã—6. LEFT SIDE: don't sink as deep (FAI â€” deep flexion + adduction compresses anterior hip)." },
        ],
        notes: "On 1-leg RDL: LEFT side has two depth limits â€” sit-bone AND anterior hip impingement. Stop at torso parallel, never chase depth. RIGHT side: sit-bone is the only limiter. Groin nerve: if the warm/tingly sensation increases during adductor work, stop those exercises and note it. Stabilization lunge is also your L ankle proprioception builder â€” focus on controlling the ankle on every rep.",
      },
      {
        day: "Wednesday",
        type: "rest",
        label: "Rest + Daily Physio Only",
        sessions: [],
        notes: "Daily physio only. Piriformis release and glute release are especially important today.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "Aerobic Base",
        hrTarget: "Z2",
        sessions: [
          { name: "PUT ON H10 â€” first tracked session" },
          { name: "30 min elliptical or standing bike at conversational pace", zone: "Z2" },
          { name: "If using pool: 30 min aqua jogging (excellent for nerve recovery)", zone: "Z2" },
        ],
        notes: "H10 is on â€” stay in Z2 throughout. Priority is time on feet with zero sit-bone pressure. Elliptical or pool are ideal. Max HR test moved to Saturday.",
        physio: ["Movement Prep: Ankle hops, A-skip, B-skip, Carioca (3Ã—50ft each, 90s rest). CUE: L ankle control on all landings. SKIP Carioca if groin nerve is active."],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Stability (Modified)",
        sessions: [
          { name: "GROIN SCREEN FIRST: 4 bodyweight side lunges each side. Rate groin 0â€“10. If 3+/10 â†’ rest day." },
          { name: "1. Stabilization lunge â€” 3Ã—6 (TEST: if groin nerve fires, drop this exercise and skip adduction plank + adductor slide below)" },
          { name: "2. DB 1-leg RDL â€” 3Ã—8 (single 18lb DB, 5s eccentric) â€” LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "3. Side lunges â€” 3Ã—6 BODYWEIGHT ONLY. LEFT: shallower depth (FAI)." },
          { name: "4. Single leg hip thrust â€” 3Ã—6 (bodyweight)" },
          { name: "5. Single-leg calf raises â€” 3Ã—15 each leg, straight knee + bent knee (bodyweight, 3s eccentric). Wall for balance. Bent-knee is extra important on LEFT â€” soleus acts as dynamic ankle stabilizer." },
          { name: "6. Adduction plank, long lever â€” 3Ã—45â€“60s. ONLY attempt if stabilization lunge was clean (no groin reaction)." },
          { name: "7. Adductor slide (towel) â€” 3Ã—8. ONLY attempt if adduction plank was clean." },
        ],
        notes: "Exercise order is intentional â€” stabilization lunge is the groin screen for the adductor exercises at the end. If lunge fires the groin, do exercises 2â€“5 only and skip 6â€“7. LEFT RDL depth limit is permanent (FAI) â€” don't test it.",
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Conditioning + Max HR Test",
        hrTarget: "Z2 for warm-up, ALL-OUT for max HR test, Z1â€“2 for jog intervals",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side. Rate groin 0â€“10. If 3+/10 â†’ rest day." },
          { name: "Movement Prep: Ankle hops, A-skip, B-skip. SKIP Carioca unless groin screen is 0/10." },
          { name: "5 min walk warm-up", zone: "Z1" },
          { name: "10â€“15 min easy jog or standing bike to extend warm-up", zone: "Z2" },
          { name: "MAX HR TEST: 4-min all-out on standing bike or treadmill incline (8â€“10% grade). Build each minute. Last 30s = absolute max. NOT seated.", zone: "Z5" },
          { name: "Rest 5 min. Record peak HR. Set Polar zones from this number." },
          { name: "4Ã—(2 min jog / 2 min walk) â€” use your new HR zones", zone: "Z2" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Max HR test pacing: min 1 = hard but sustainable (RPE 7), min 2 = uncomfortable (RPE 8), min 3 = hurting (RPE 9), last 30s = everything (RPE 10). Your HR only hits true max in the final 30s. If you can't last 4 min, your peak reading is still your max. After test + rest, the jog intervals are easy â€” use them to validate your new zones feel right. ORTHOTICS IN for all running.",
      },
      {
        day: "Sunday",
        type: "rest",
        label: "Full Rest â€” End of Week 1",
        sessions: [],
        notes: "Daily physio only. DAILY MORNING SCREEN: 4 bodyweight side lunges each side, rate groin 0â€“10. If 3+/10 â†’ rest day. Assess: how does the sit-bone feel after a full week? How are the knees? Compare to last Saturday.",
      },
    ],
  });

  // WEEK 2
  weeks.push({
    number: 2,
    phase: "Base + Nerve Recovery",
    focus: "Progress standing intervals, extend jog duration, continue nerve recovery",
    progressionGate: "Sit-bone pain stable or improving. Groin nerve resolved or nearly resolved. Knees tolerated walk/jog without PTFJ flare.",
    days: [
      {
        day: "Monday",
        type: "conditioning",
        label: "Standing Bike Intervals",
        hrTarget: "Z4â€“5 during sprints",
        sessions: [
          { name: "Warm-up: 5 min standing pedal", zone: "Z2" },
          { name: "10Ã—10s standing sprints / 50s recovery", zone: "Z5" },
          { name: "Cool-down: 5 min easy", zone: "Z1" },
        ],
        notes: "Progressed from 8 to 10 sprints. Full standing throughout. H10 on â€” compare your sprint HR peaks to your max from Thursday's test.",
        physio: ["Movement Prep: Ankle hops, A-skip, B-skip, Carioca. CUE: L ankle control on all landings. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain Strength",
        sessions: [
          { name: "Adduction plank, long lever â€” 3Ã—50â€“60s (progress hold time). MONITOR: skip or reduce if groin nerve is still active." },
          { name: "DB 1-leg RDL â€” 3Ã—10 (single 18lb DB, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: sit-bone limit." },
          { name: "Stabilization lunge â€” 3Ã—6" },
          { name: "Adductor slide â€” 3Ã—8" },
          { name: "Side lunges â€” 3Ã—8 (progressed from 6). LEFT: shallower depth (FAI)." },
        ],
        notes: "Small progressions in reps. LEFT RDL depth limit is permanent â€” torso parallel, no deeper.",
      },
      {
        day: "Wednesday",
        type: "rest",
        label: "Rest + Daily Physio",
        sessions: [],
        notes: "Piriformis and glute release. Consider gentle nerve flossing if physio has shown you how.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "Aerobic Base",
        hrTarget: "Z2",
        sessions: [
          { name: "35 min elliptical or pool at steady conversational pace", zone: "Z2" },
        ],
        notes: "Extend duration by 5 min from last week. Try seated bike briefly (5 min) at end to test sit-bone tolerance. H10 on â€” stay in Z2 throughout.",
        physio: ["Movement Prep drills. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Thrust",
        sessions: [
          { name: "Adduction plank â€” 3Ã—60s" },
          { name: "DB 1-leg RDL â€” 3Ã—10 (single 18lb DB, 5s eccentric). LEFT: torso parallel max (FAI)." },
          { name: "Stabilization lunge â€” 3Ã—6" },
          { name: "Adductor slide â€” 3Ã—8" },
          { name: "Side lunges â€” 3Ã—8. LEFT: shallower depth (FAI)." },
          { name: "Single leg hip thrust â€” 3Ã—6 (bodyweight)" },
          { name: "Single-leg calf raises â€” 3Ã—15 each, straight + bent knee (bodyweight, 3s eccentric)" },
        ],
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Walk/Jog Progression",
        hrTarget: "Z1â€“2",
        sessions: [
          { name: "5 min walk", zone: "Z1" },
          { name: "5Ã—(2 min jog / 90s walk)", zone: "Z2" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "More intervals, shorter rest. Total jog time: 10 min (up from 8). H10 on â€” your jog should stay in Z2.",
        physio: ["Movement Prep before jog. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Sunday",
        type: "rest",
        label: "Full Rest",
        sessions: [],
        notes: "Weekly assessment: sit-bone status, knee response to jogging, overall energy.",
      },
    ],
  });

  // WEEK 3
  weeks.push({
    number: 3,
    phase: "Base + Nerve Recovery",
    focus: "Test seated bike, extend running, introduce longer sprint intervals",
    progressionGate: "Can tolerate 10+ min seated bike. Jog 15 min continuous without PTFJ or sit-bone flare. LEFT hip tolerating RDL/side lunge at parallel depth (FAI stable). Groin nerve resolved. Ready for Phase 2.",
    days: [
      {
        day: "Monday",
        type: "conditioning",
        label: "Interval Progression",
        hrTarget: "Z4â€“5",
        sessions: [
          { name: "Warm-up: 5 min", zone: "Z2" },
          { name: "10Ã—10s sprints / 50s recovery (standing)", zone: "Z5" },
          { name: "Rest 3 min, then 3Ã—30s hard efforts / 90s recovery", zone: "Z4" },
          { name: "Cool-down: 5 min", zone: "Z1" },
        ],
        notes: "First introduction of 30s intervals. These build lactate tolerance needed for match play.",
        physio: ["Movement Prep drills. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain — Progress Load",
        sessions: [
          { name: "Side plank — 3×45–60s each side" },
          { name: "DB 1-leg RDL — 3×10 (1×18lb DB same-side hand, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "Stabilization lunge — 3×8 (2×18lb DB, one each hand)" },
          { name: "Adductor slide — 3×10" },
          { name: "Side lunges — 3×8 (1×18lb DB goblet hold). LEFT: shallower depth (FAI)." },
          { name: "Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB same-side hand, 3s eccentric). Bent-knee extra important on LEFT." },
        ],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      {
        day: "Thursday",
        type: "conditioning",
        label: "Seated Bike Test + Aerobic",
        hrTarget: "Z2",
        sessions: [
          { name: "15 min seated bike at Z2 — assess sit-bone tolerance", zone: "Z2" },
          { name: "If tolerated: continue to 35 min total", zone: "Z2" },
          { name: "If not tolerated: switch to elliptical for remaining time", zone: "Z2" },
        ],
        notes: "This is the key test. If you can sit for 15+ min, we're on track to use the bike normally going forward.",
        physio: ["Movement Prep drills"],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Thrust",
        sessions: [
          { name: "Side plank — 3×45–60s each side" },
          { name: "DB 1-leg RDL — 3×10 (1×18lb DB, 5s eccentric). LEFT: torso parallel max (FAI)." },
          { name: "Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "Adductor slide — 3×10" },
          { name: "Side lunges — 3×8 (1×18lb DB goblet). LEFT: shallower depth (FAI)." },
          { name: "Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Continuous Jog Attempt",
        hrTarget: "Z2",
        sessions: [
          { name: "Movement Prep drills as warm-up" },
          { name: "15 min continuous jog at Z2", zone: "Z2" },
          { name: "5 min walk", zone: "Z1" },
          { name: "4×50m strides at 70% effort", zone: "Z3" },
        ],
        notes: "First continuous jog. Stay slow. The strides at the end introduce your legs to faster turnover without full sprinting.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest — Phase Gate Assessment", sessions: [], notes: "Check all three gates before moving to Phase 2. If sit-bone still can't handle the bike, extend Phase 1 by a week and adjust." },
    ],
  });

  // WEEK 4
  weeks.push({
    number: 4, phase: "Transition to Running",
    focus: "Gym introduction, first running intervals, running replaces bike as primary conditioning",
    progressionGate: "Can jog 20 min without issue. Running intervals don't aggravate PTFJ. Gym loads tolerated at starting weights.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Activation + Stability",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side. Rate groin 0–10. If 3+/10 → rest day." },
          { name: "1. Side plank — 3×45–60s each side" },
          { name: "2. Stabilization lunge — 3×8 (2×18lb DB, one each hand). L ankle: focus on control." },
          { name: "3. Adductor slide (towel) — 3×10" },
          { name: "4. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "5. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric). Bent-knee extra important on LEFT." },
        ],
        notes: "Activation/stability day at home with your 18lb DBs. No Copenhagen yet — that starts Week 5 and needs 0/10 groin to introduce. Adductor slides are fine at 1–2/10 (proven tolerance). If groin is 3+/10, rest day.",
      },
      { day: "Tuesday", type: "conditioning", label: "Track Accel/Decel Work",
        hrTarget: "Z3–4",
        sessions: [
          { name: "Movement Prep: Ankle hops, A-skip, B-skip (3×50ft each). SKIP Carioca — banked turns + crossover = L ankle risk." },
          { name: "10 min jog warm-up (straight sections only, walk the turns)", zone: "Z2" },
          { name: "6×20–30m acceleration/deceleration on straightaway. Build to 75% over 15m, decelerate over 15m. Walk back recovery.", zone: "Z3–4" },
          { name: "Rest 3 min" },
          { name: "4×10m forward/backward shuttle (no lateral). Touch line, return.", zone: "Z3" },
          { name: "10 min jog cool-down (walk the turns)", zone: "Z2" },
        ],
        notes: "TRACK RULES: Run straightaways only. Walk all banked turns — banking left loads L ankle inversion + PTFJ lateral force. Accel/decel reps are highly soccer-specific. Orthotics in. If track unavailable due to weather, substitute 20 min outdoor jog at Z2 or bike intervals as backup.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [],
        notes: "Daily physio only. Piriformis + glute release especially important after yesterday's running.",
      },
      { day: "Thursday", type: "strength", label: "Gym Strength — Progressive Overload",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side. Rate groin 0–10. If 3+/10 → home activation day instead." },
          { name: "1. DB 1-leg RDL — 3×10 (1×20lb DB, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "2. Stabilization lunge — 3×8 (2×20lb DB, one each hand). L ankle: control on every rep." },
          { name: "3. DB side lunges — 3×8 (1×20lb DB goblet). LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×12 each side (light weight, slow tempo). NEW: direct glute med loading. Ankle cuff attachment, stand on one leg, abduct the other against cable." },
          { name: "5. Single-leg hip thrust — 3×8 (1×20lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×12 each, straight + bent knee (1×20lb DB, 3s eccentric)." },
        ],
        notes: "First gym session. Small bump from home 18lb to 20lb across the board, focus on form in new environment. Cable hip abduction is the priority new exercise: directly targets the weak glute med causing TFL to overwork. If gym unavailable, do home strength with 18lb DBs.",
      },
      { day: "Friday", type: "conditioning", label: "Tempo Jog",
        hrTarget: "Z2–3",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "20 min continuous jog", zone: "Z2" },
          { name: "5 min at Z3 (comfortably hard)", zone: "Z3" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Outdoor if weather allows, track if not (walk the turns). The Z3 block simulates a passage of play. Orthotics in for all running.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Track Intervals + Strides",
        hrTarget: "Z3–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "4×straightaway acceleration to 75% / walk the turn recovery", zone: "Z3–4" },
          { name: "Rest 3 min" },
          { name: "4×50m strides on straightaway at 70%", zone: "Z3" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "If weather is good enough for outdoor grass, try 2–3 of the strides on grass instead of track. First outdoor sprint exposure if conditions allow. Orthotics in.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [],
        notes: "Assess: How did the gym loads feel? Any PTFJ reaction to running volume?",
      },
    ],
  });

  // WEEK 5
  weeks.push({
    number: 5, phase: "Transition to Running",
    focus: "Progress gym loads, extend running intervals, introduce shuttles, Copenhagen plank intro",
    progressionGate: "Gym loads progressing without pain. Shuttles don't aggravate PTFJ. Copenhagen short lever tolerated. HR recovers to Z2 within 90s after sprints.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Activation + Copenhagen Intro",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side. Rate groin 0–10." },
          { name: "1. Side plank — 3×60s each side" },
          { name: "2. Copenhagen plank, SHORT LEVER (knee on bench) — 3×15s each side. ONLY if groin screen is 0/10. Week 1 of Harøy protocol. Stop immediately if groin nerve fires." },
          { name: "3. Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "4. Adductor slide — 3×12" },
          { name: "5. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Copenhagen intro — keep it short lever and low duration. If you can't hold 15s, hold as long as you can. If groin nerve fires, drop Copenhagen and adductor slide. Home day stays at 18lb — gym day is where loads progress.",
      },
      { day: "Tuesday", type: "conditioning", label: "Track Accel/Decel + Shuttles",
        hrTarget: "Z3–4",
        sessions: [
          { name: "Movement Prep: Ankle hops, A-skip, B-skip (3×50ft each). SKIP Carioca on banked track." },
          { name: "10 min jog warm-up (walk the turns)", zone: "Z2" },
          { name: "8×20–30m accel/decel on straightaway at 80%. Walk back recovery.", zone: "Z4" },
          { name: "Rest 3 min" },
          { name: "6×forward/backward shuttle (5-10-15m). No lateral yet.", zone: "Z3–4" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "First shuttle runs. These train deceleration and direction change needed for match play. Forward/backward only — no lateral cutting yet (PTFJ risk). If outdoors, even better for shuttle space.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [],
        notes: "Daily physio. Piriformis + glute release.",
      },
      { day: "Thursday", type: "strength", label: "Gym Strength — Load Progression",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 3×10 (1×25lb DB, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "2. Stabilization lunge — 3×10 (2×20lb DB). Reps up, load holds from Wk 4. L ankle: control on every rep." },
          { name: "3. DB side lunges — 3×8 (1×25lb DB goblet). LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×12 each side (increase weight one notch from Wk 4)." },
          { name: "5. Single-leg hip thrust — 3×8 (1×25lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×12 each, straight + bent knee (1×25lb DB, 3s eccentric)." },
        ],
        notes: "5lb increase on RDL, side lunge, hip thrust, calf raises. Stab lunge holds at 2×20lb but reps go to 10 (load went up last week, now earn the reps). If gym unavailable, home strength with 18lb DBs.",
      },
      { day: "Friday", type: "conditioning", label: "Tempo Run",
        hrTarget: "Z2–3",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "25 min continuous run: 15 min Z2, 8 min Z3, 2 min Z2", zone: "Z2–3" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Outdoor preferred. The Z3 block should feel like match-pace jogging — uncomfortable but sustainable. Orthotics in.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Interval Session",
        hrTarget: "Z3–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "6×straightaway accel/decel at 80% (track) OR 6×100m at 80% (outdoor)", zone: "Z4" },
          { name: "Rest 3 min" },
          { name: "6×50m strides at 75%", zone: "Z3" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Outdoor grass if conditions allow — more realistic surface for soccer prep. Track is the backup. Walk all banked turns.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [],
        notes: "Assess: shuttle tolerance? PTFJ after increased running volume? Gym loads appropriate?",
      },
    ],
  });

  // WEEK 6
  weeks.push({
    number: 6, phase: "Transition to Running",
    focus: "Final transition week. Running primary, gym loads progressing, introduce lateral shuttles if PTFJ allows.",
    progressionGate: "Can run 30 min with tempo blocks. Shuttles (fwd/back) clean. Gym loads progressing. Ready for soccer-specific work.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Activation + Copenhagen Progress",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. Side plank — 3×60s each side (add top leg lift if able)" },
          { name: "2. Copenhagen plank, SHORT LEVER — 3×20–25s each side. Progress from Wk 5's 15s. ONLY if groin screen is 0/10. If 15s was hard, stay at 15s." },
          { name: "3. Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "4. Adductor slide — 3×12" },
          { name: "5. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Copenhagen hold time progressing — only if Wk 5 was comfortable. Don't rush to long lever yet, that's a Week 7+ consideration.",
      },
      { day: "Tuesday", type: "conditioning", label: "Running Intervals + Lateral Shuttle Test",
        hrTarget: "Z4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "6×forward/backward shuttle (5-10-15m) at 80%", zone: "Z4" },
          { name: "Rest 2 min" },
          { name: "TEST: 4×lateral shuffle (5m each way) — LOW intensity. ONLY if PTFJ has been clean through Wk 5. L ankle: decelerate with control.", zone: "Z3" },
          { name: "Rest 3 min" },
          { name: "4×straightaway accel/decel to 85% (track) OR 4×100m at 85% (outdoor)", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "First lateral movement test. Shuffle, don't cut — stay low, control L ankle. If ANY PTFJ pain, stop lateral work immediately and finish with forward/back only. Outdoor preferred for shuttle space.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [],
        notes: "Daily physio. Assess: how did lateral shuffles feel? Any PTFJ reaction overnight?",
      },
      { day: "Thursday", type: "strength", label: "Gym Strength — Phase 2 Peak",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 3×10 (1×30lb DB, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "2. Stabilization lunge — 3×8 (2×25lb DB). Load up, reps back to 8. L ankle: control on every rep." },
          { name: "3. DB side lunges — 3×10 (1×30lb DB goblet). Reps up from 8. LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×15 each side (progress weight)." },
          { name: "5. Single-leg hip thrust — 3×8 (1×30lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×12 each, straight + bent knee (1×30lb DB, 3s eccentric)." },
        ],
        notes: "Phase 2 peak loads. If any exercise didn't progress cleanly from Wk 5, hold at Wk 5 weight. These loads become your baseline for Phase 3. If gym unavailable, home strength with 18lb DBs.",
      },
      { day: "Friday", type: "conditioning", label: "30-Min Tempo Run",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "30 min: 10 min Z2, 12 min Z3, 5 min Z2, 3 min Z4", zone: "Z2–4" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Longest run of the program so far. The 3-min Z4 block at the end simulates pressing hard when already fatigued — this is match reality. Outdoor preferred. Orthotics in.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Mixed Conditioning",
        hrTarget: "Z3–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "4×forward/backward shuttle (5-10-15m)", zone: "Z4" },
          { name: "4×lateral shuffle (5m each way) — ONLY if Tuesday's test was clean", zone: "Z3" },
          { name: "6×50m strides at 80%", zone: "Z3–4" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "This session previews the movement patterns you'll need in Phase 3 soccer-specific work. If lateral shuffles aggravated PTFJ on Tuesday, replace with forward/back shuttles.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest — Phase 2 Gate Assessment", sessions: [],
        notes: "PHASE GATE: Can run 30 min with tempo blocks? Forward/back shuttles clean? Lateral shuffles tolerated? Gym loads progressing? PTFJ, sit-bone, groin all stable? If yes → Phase 3 soccer-specific work.",
      },
    ],
  });

  // WEEK 7
  weeks.push({
    number: 7, phase: "Soccer-Specific",
    focus: "Match simulation intro, plyometrics intro, strength continues progressing, Copenhagen long lever test",
    progressionGate: "Can sustain 2×15 min match sim. Split squat jumps tolerated. L ankle stable under plyometric landing.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Copenhagen Long Lever Test",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. Side plank with top leg lift — 3×60s each side" },
          { name: "2. Copenhagen plank — TEST LONG LEVER (foot on bench) 3×10–15s each side. ONLY if short lever at 20–25s was clean in Wk 6. If not ready, continue short lever 3×25–30s." },
          { name: "3. Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "4. Adductor slide — 3×12" },
          { name: "5. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Long lever Copenhagen is a significant jump. If short lever wasn't solid at 20s+, stay short lever. Home day stays at 18lb — gym day is where loads progress.",
      },
      { day: "Tuesday", type: "conditioning", label: "Match Simulation Lite",
        hrTarget: "Z2–5 (mixed)",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "2×15 min blocks: jog at Z2, sprint 10–15s every 2–3 min, walk 30s recovery after each sprint", zone: "mixed" },
          { name: "3 min rest between blocks" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "First match simulation. The random sprint pattern mimics game demands. Outdoor preferred. L ankle: tape or lightweight brace from this week onward for all multi-directional work. Orthotics in.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      { day: "Thursday", type: "strength", label: "Gym Strength + Plyometric Intro",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 3×10 (1×35lb DB, 5s eccentric). LEFT: torso parallel max (FAI). RIGHT: stop before sit-bone stretch." },
          { name: "2. Stabilization lunge — 3×10 (2×25lb DB). Reps up from Wk 6. L ankle: control on every rep." },
          { name: "3. DB side lunges — 3×12 (1×30lb DB goblet). Reps up, load holds. LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×15 each side (progress weight)." },
          { name: "5. Single-leg hip thrust — 3×8 (1×35lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×30lb DB, 3s eccentric). Reps up, load holds." },
          { name: "7. NEW: Split squat jumps — 3×6 (low height, controlled landing). Land softly through midfoot. SKIP if PTFJ reacts. Monitor L ankle on every landing." },
        ],
        notes: "Plyometric introduction. Split squat jumps must be pain-free — land like you're trying to be silent. If L ankle wobbles on landing, reduce height. If gym unavailable, home strength with 18lb DBs + skip plyos.",
      },
      { day: "Friday", type: "conditioning", label: "Tempo Run + Agility",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "20 min continuous run: 10 min Z2, 8 min Z3, 2 min Z4", zone: "Z2–4" },
          { name: "Rest 3 min" },
          { name: "4×agility circuit: forward sprint 10m, lateral shuffle 5m, backpedal 10m, sprint 10m. L ankle: control every direction change.", zone: "Z4" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "First full multi-directional work. Shuffle don't cut. L ankle taped/braced. If PTFJ reacts to lateral shuffles, drop them and add more forward/back shuttles.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Pickup Game or Long Match Sim",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Option A: Pickup game (aim for 45–60 min of play)" },
          { name: "Option B: Solo match sim — 2×20 min with mixed sprints throughout, 5 min half-time" },
        ],
        notes: "If you can find a pickup game, this is the single best thing for match fitness. H10 data from a real game is your benchmark. L ankle: taped/braced for all game play. Orthotics in boots.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
    ],
  });

  // WEEK 8
  weeks.push({
    number: 8, phase: "Soccer-Specific",
    focus: "Extend match sim duration, add lateral bounds, progress Copenhagen, strength continues",
    progressionGate: "Can sustain 2×20 min match sim. Average HR in game/sim at 75–80% max. Lateral bounds tolerated.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Copenhagen Progress",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. Side plank with top leg lift — 3×60s each side" },
          { name: "2. Copenhagen plank — LONG LEVER 3×15–20s each side (if Wk 7 test was clean). Otherwise SHORT LEVER 3×30s." },
          { name: "3. Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "4. Adductor slide — 3×12" },
          { name: "5. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Copenhagen long lever progressing if Wk 7 test went well. If not, keep building short lever time.",
      },
      { day: "Tuesday", type: "conditioning", label: "Match Simulation — Extended",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "2×20 min blocks: jog with sprint bursts every 2 min (10–20s)", zone: "mixed" },
          { name: "5 min half-time walk" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Progression: longer blocks, more frequent sprints. L ankle taped/braced. Orthotics in.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      { day: "Thursday", type: "strength", label: "Gym Strength + Lateral Bounds",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 3×12 (1×35lb DB, 5s eccentric). Reps up, load holds. LEFT: torso parallel max (FAI)." },
          { name: "2. Stabilization lunge — 3×8 (2×30lb DB). Load up, reps back to 8. L ankle: control on every rep." },
          { name: "3. DB side lunges — 3×10 (1×35lb DB goblet). Load up, reps back to 10. LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×12 each side (progress weight)." },
          { name: "5. Single-leg hip thrust — 3×10 (1×35lb DB on lap). Reps up, load holds." },
          { name: "6. Single-leg calf raises — 3×12 each, straight + bent knee (1×35lb DB, 3s eccentric). Load up, reps back to 12." },
          { name: "7. Split squat jumps — 3×8 (progress from Wk 7 if tolerated)" },
          { name: "8. NEW: Lateral bounds — 3×6 each side (low, controlled). Land midfoot, stick the landing. HIGHEST ankle-roll risk exercise — L ankle must be braced. SKIP if PTFJ reacts." },
        ],
        notes: "Lateral bounds are the key soccer movement pattern addition. Stay low, land soft, stick each landing. If L ankle wobbles when fatigued, stop the set. If gym unavailable, home strength at 18lb + skip plyos.",
      },
      { day: "Friday", type: "conditioning", label: "Repeated Sprint Ability (RSA)",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "3 sets of: 6×20m sprint / 20s rest between sprints / 3 min between sets", zone: "Z5" },
          { name: "Rest 3 min" },
          { name: "Agility circuit × 6 reps", zone: "Z4–5" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "RSA training — the most match-specific conditioning. Short rest between sprints simulates game situations where you sprint, barely recover, then sprint again. L ankle: if control gets sloppy when fatigued, stop the set early.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Pickup Game or Match Sim",
        hrTarget: "Z2–5",
        sessions: [
          { name: "60–75 min of game play or 2×25 min solo match sim" },
        ],
        notes: "Push the duration. Compare this week's H10 data to last week's. L ankle taped/braced.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
    ],
  });

  // WEEK 9
  weeks.push({
    number: 9, phase: "Soccer-Specific",
    focus: "Peak training load week. Longest match sim. Peak gym loads. Copenhagen peak.",
    progressionGate: "Can sustain 2×30 min match sim at 80%+ average HR. Ready for taper.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Copenhagen Peak",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. Side plank with top leg lift — 3×60s each side" },
          { name: "2. Copenhagen plank — LONG LEVER 3×20–25s each side (or SHORT LEVER 3×30–35s if still building)." },
          { name: "3. Stabilization lunge — 3×8 (2×18lb DB)" },
          { name: "4. Adductor slide — 3×12" },
          { name: "5. Single-leg hip thrust — 3×8 (1×18lb DB on lap)" },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Peak Copenhagen holds. After this week, everything shifts to maintenance for taper.",
      },
      { day: "Tuesday", type: "conditioning", label: "Match Simulation — Peak",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "2×30 min: jog with sprint bursts every 90s–2 min", zone: "mixed" },
          { name: "5 min half-time" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Hardest conditioning session of the program. 60 min of mixed-intensity work. This proves you can handle match duration. L ankle taped/braced.",
        physio: ["Movement Prep before session"],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      { day: "Thursday", type: "strength", label: "Gym Strength — PEAK LOADS",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 3×10 (1×40lb DB, 5s eccentric). PEAK LOAD. LEFT: torso parallel max (FAI)." },
          { name: "2. Stabilization lunge — 3×10 (2×30lb DB). Reps up from Wk 8. PEAK LOAD." },
          { name: "3. DB side lunges — 3×12 (1×35lb DB goblet). Reps up from Wk 8. PEAK LOAD. LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 3×15 each side (hold at current weight)." },
          { name: "5. Single-leg hip thrust — 3×8 (1×40lb DB on lap). PEAK LOAD." },
          { name: "6. Single-leg calf raises — 3×15 each, straight + bent knee (1×35lb DB, 3s eccentric). Reps up. PEAK LOAD." },
          { name: "7. Split squat jumps — 3×8" },
          { name: "8. Lateral bounds — 3×8 each side (if tolerated). L ankle braced." },
        ],
        notes: "Peak loads for the entire program. Do not push beyond these — priority shifts to conditioning and match readiness. These become your maintenance reference for taper. If gym unavailable, home strength at 18lb.",
      },
      { day: "Friday", type: "conditioning", label: "Peak RSA Session",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "4 sets of: 6×20m sprint / 20s rest / 3 min between sets", zone: "Z5" },
          { name: "Agility circuit × 8 reps", zone: "Z4–5" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Peak sprint volume — 4 sets instead of 3. If you feel crushed by set 3, drop set 4. L ankle: if control deteriorates in later sets, stop agility work and jog out. Tape/brace on for all agility.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Pickup Game — Full Duration",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Full pickup game aiming for 75–90 min" },
          { name: "Or 2×35 min solo match sim" },
        ],
        notes: "Try to play as close to full game duration as possible. This is your fitness test. L ankle taped/braced. Orthotics in boots.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest — Phase 3 Gate Assessment", sessions: [],
        notes: "PHASE GATE: Sustained 60 min match sim? RSA completing 3+ sets? Gym loads at peak? All injury sites stable? If yes → taper for match day.",
      },
    ],
  });

  // WEEK 10
  weeks.push({
    number: 10, phase: "Match Prep & Taper",
    focus: "Reduce volume, maintain intensity, sharpen for match day. Drop to 2 sets, -5lb from peak.",
    progressionGate: "Feeling fresh, not fatigued. Resting HR stable. Confidence in 90-min capacity.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Maintenance",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. Side plank — 2×60s each side (reduced from 3)" },
          { name: "2. Copenhagen plank — maintain Wk 9 level, 2 sets only (reduced from 3)" },
          { name: "3. Stabilization lunge — 2×8 (2×18lb DB)" },
          { name: "4. Single-leg hip thrust — 2×8 (1×18lb DB on lap)" },
          { name: "5. Single-leg calf raises — 2×12 each, straight + bent knee (1×18lb DB, 3s eccentric)" },
        ],
        notes: "Everything drops to 2 sets. Same movements, less fatigue. You should feel fresh, not tired.",
      },
      { day: "Tuesday", type: "conditioning", label: "Reduced Match Sim",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "2×20 min match sim (reduced from 2×30)", zone: "mixed" },
          { name: "5 min half-time walk" },
        ],
        notes: "Volume drops but intensity stays. You should feel faster and sharper than Wk 9. L ankle taped/braced.",
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      { day: "Thursday", type: "strength", label: "Gym Strength — Taper Loads",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side." },
          { name: "1. DB 1-leg RDL — 2×10 (1×35lb DB, 5s eccentric). -5lb from peak. LEFT: torso parallel max (FAI)." },
          { name: "2. Stabilization lunge — 2×8 (2×25lb DB). -5lb per hand from peak." },
          { name: "3. DB side lunges — 2×10 (1×30lb DB goblet). -5lb from peak. LEFT: shallower depth (FAI)." },
          { name: "4. Cable hip abduction — 2×12 each side (hold weight)." },
          { name: "5. Single-leg hip thrust — 2×8 (1×35lb DB on lap). -5lb from peak." },
          { name: "6. Single-leg calf raises — 2×12 each, straight + bent knee (1×30lb DB, 3s eccentric). -5lb from peak." },
          { name: "7. Plyometrics — 2×6 each (split squat jumps + lateral bounds). Reduced volume." },
        ],
        notes: "Taper: 2 sets instead of 3, loads drop 5lb from peak. Keep the movement patterns alive without creating fatigue. If gym unavailable, home strength with 18lb DBs, 2 sets.",
      },
      { day: "Friday", type: "conditioning", label: "Sharp Sprints",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "2 sets of: 6×20m sprint / 30s rest / 3 min between sets", zone: "Z5" },
          { name: "Light agility circuit × 4 reps", zone: "Z4" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "Reduced sets, full recovery. Maintaining speed without accumulating fatigue. You should feel fast.",
        physio: ["Movement Prep before session"],
      },
      { day: "Saturday", type: "conditioning", label: "Pickup Game — Controlled",
        hrTarget: "Z2–5",
        sessions: [
          { name: "45–60 min game — play at 85%, save something" },
        ],
        notes: "This is a dress rehearsal, not the performance. Don't go all out. L ankle taped/braced.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
    ],
  });

  // WEEK 11
  weeks.push({
    number: 11, phase: "Match Prep & Taper",
    focus: "Final taper. Keep legs fresh. Stay sharp without heavy load.",
    progressionGate: "YOU'RE MATCH READY. Trust the work you've done.",
    days: [
      { day: "Monday", type: "strength", label: "Home Strength — Light Activation Only",
        sessions: [
          { name: "1. Side plank — 2×45s each side" },
          { name: "2. Copenhagen plank — 2 sets at comfortable hold time" },
          { name: "3. Stabilization lunge — 2×6 (bodyweight)" },
          { name: "4. Single-leg calf raises — 2×10 each (bodyweight, 3s eccentric)" },
        ],
        notes: "Minimum effective dose. Just enough to keep patterns alive. No loading, no fatigue.",
      },
      { day: "Tuesday", type: "conditioning", label: "Light Match Sim",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "15 min match sim at moderate intensity", zone: "Z2–4" },
          { name: "6×40m strides at 80%", zone: "Z3–4" },
        ],
        notes: "Keep the engine ticking. Low volume, moderate intensity. L ankle taped/braced.",
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      { day: "Thursday", type: "conditioning", label: "Sharpening Session",
        hrTarget: "Z4–5",
        sessions: [
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "6×20m sprints with full recovery", zone: "Z5" },
          { name: "Light agility circuit × 4 reps", zone: "Z4" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "Last hard session. Short, sharp. You should feel fast. L ankle taped/braced for agility.",
      },
      { day: "Friday", type: "rest", label: "Rest",
        sessions: [],
        notes: "Hydrate, eat well, sleep 8+ hours. Lay out your kit: boots + orthotics + ankle tape/brace + H10.",
      },
      { day: "Saturday", type: "conditioning", label: "Pre-Match Activation",
        sessions: [
          { name: "Movement Prep drills" },
          { name: "10 min easy jog", zone: "Z2" },
          { name: "4×30m strides", zone: "Z3" },
          { name: "Dynamic stretching" },
        ],
        notes: "Just enough to feel loose and ready. If match is Sunday, this is your activation day. Test boot + orthotic + tape combo one final time.",
      },
      { day: "Sunday", type: "match", label: "⚽ MATCH DAY",
        sessions: [
          { name: "Full warm-up with Movement Prep drills" },
          { name: "Play the full 90 minutes" },
          { name: "Wear your H10 — this is the data set you've been building toward" },
        ],
        notes: "Trust the 11 weeks. Manage your energy — don't sprint everything in the first 15 min. The fitness is there. Orthotics in your boots. L ankle taped or braced. You've tested this boot+orthotic+tape combo in training. Go play.",
      },
    ],
  });
  return weeks;
}

function getPhaseForWeek(weekNum) {
  return PROGRAM_DATA.meta.phases.find((p) => p.weeks.includes(weekNum));
}

const typeColors = {
  conditioning: { bg: "#14532d", text: "#bbf7d0", badge: "#22c55e" },
  strength: { bg: "#4a1d96", text: "#ddd6fe", badge: "#a78bfa" },
  rest: { bg: "#1e293b", text: "#94a3b8", badge: "#475569" },
  match: { bg: "#7c2d12", text: "#fed7aa", badge: "#fb923c" },
};

const StorageManager = {
  key: "full-90-tracker",
  async load() {
    try {
      const result = await window.storage.get(this.key);
      return result ? JSON.parse(result.value) : {};
    } catch {
      return {};
    }
  },
  async save(data) {
    try {
      await window.storage.set(this.key, JSON.stringify(data));
    } catch (e) {
      console.error("Storage save failed:", e);
    }
  },
};

function App() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [expandedDay, setExpandedDay] = useState(null);
  const [completions, setCompletions] = useState({});
  const [notes, setNotes] = useState({});
  const [view, setView] = useState("program"); // program, zones, daily
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StorageManager.load().then((data) => {
      if (data.completions) setCompletions(data.completions);
      if (data.notes) setNotes(data.notes);
      setLoading(false);
    });
  }, []);

  const persist = useCallback(
    (newCompletions, newNotes) => {
      StorageManager.save({
        completions: newCompletions || completions,
        notes: newNotes || notes,
      });
    },
    [completions, notes]
  );

  const toggleComplete = (weekNum, dayIdx) => {
    const key = `${weekNum}-${dayIdx}`;
    const next = { ...completions, [key]: !completions[key] };
    setCompletions(next);
    persist(next, notes);
  };

  const updateNote = (weekNum, dayIdx, text) => {
    const key = `${weekNum}-${dayIdx}`;
    const next = { ...notes, [key]: text };
    setNotes(next);
    persist(completions, next);
  };

  const weekData = PROGRAM_DATA.weeks.find((w) => w.number === selectedWeek);
  const phase = getPhaseForWeek(selectedWeek);
  const completedDays = weekData
    ? weekData.days.filter((_, i) => completions[`${selectedWeek}-${i}`]).length
    : 0;

  if (loading) {
    return (
      <div style={{
        background: "#0a0a0a", minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center", color: "#e2e8f0",
        fontFamily: "'DM Sans', system-ui, sans-serif",
      }}>
        <p>Loading your program...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: "#0a0a0a", minHeight: "100vh", color: "#e2e8f0",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      padding: "0 0 60px 0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1a1a2e 50%, #16213e 100%)",
        padding: "28px 20px 20px", borderBottom: "1px solid #1e293b",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{
            fontSize: 11, fontFamily: "'DM Mono', monospace", color: phase?.color || "#94a3b8",
            textTransform: "uppercase", letterSpacing: 2, marginBottom: 6,
          }}>
            11-WEEK PROGRAM
          </div>
          <h1 style={{
            fontSize: 26, fontWeight: 700, margin: "0 0 4px",
            background: "linear-gradient(90deg, #f8fafc, #94a3b8)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            Full 90
          </h1>
          <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.4 }}>
            Adapted for PTFJ Â· lateral chain rehab Â· ischial tuberosity Â· plantar plate (R) Â· ankle hypermobility (L)
          </p>
        </div>
      </div>

      {/* Nav tabs */}
      <div style={{
        display: "flex", gap: 0, maxWidth: 600, margin: "0 auto",
        borderBottom: "1px solid #1e293b", background: "#0f1219",
      }}>
        {[
          { id: "program", label: "Program" },
          { id: "zones", label: "HR Zones" },
          { id: "daily", label: "Daily Physio" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            style={{
              flex: 1, padding: "12px 8px", border: "none",
              background: view === tab.id ? "#1e293b" : "transparent",
              color: view === tab.id ? "#f8fafc" : "#64748b",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
              borderBottom: view === tab.id ? `2px solid ${phase?.color || "#64748b"}` : "2px solid transparent",
              fontFamily: "'DM Sans', system-ui",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
        {/* HR Zones View */}
        {view === "zones" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Heart Rate Zones</h2>
            <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
              Do a 4-min all-out bike effort in Week 1 to find your actual max HR. Set zones from that number.
            </p>
            {PROGRAM_DATA.hrZones.map((z) => {
              const zoneColors = ["#22c55e", "#84cc16", "#eab308", "#f97316", "#ef4444"];
              return (
                <div key={z.zone} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 14px", marginBottom: 8, borderRadius: 10,
                  background: "#111827", border: "1px solid #1e293b",
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: zoneColors[z.zone - 1] + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 700, color: zoneColors[z.zone - 1],
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    Z{z.zone}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{z.name}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{z.pct} of max HR</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{z.desc}</div>
                  </div>
                </div>
              );
            })}
            <div style={{
              marginTop: 16, padding: 14, borderRadius: 10,
              background: "#0f1a14", border: "1px solid #16653422",
            }}>
              <p style={{ fontSize: 12, color: "#4ade80", margin: 0, fontWeight: 600 }}>ðŸ“± Use RPE until Thursday Week 1 when your H10 arrives</p>
              <div style={{ fontSize: 12, color: "#6b9e7e", margin: "6px 0 0", lineHeight: 1.8 }}>
                <div>RPE 2â€“3 â†’ Walking, easy conversation</div>
                <div>RPE 4â€“5 â†’ Light jog, full sentences</div>
                <div>RPE 6â€“7 â†’ Tempo, short phrases only</div>
                <div>RPE 8â€“9 â†’ Hard sprint, can barely talk</div>
                <div>RPE 10 â†’ Absolute max, no talking</div>
              </div>
              <p style={{ fontSize: 12, color: "#6b9e7e", margin: "8px 0 0" }}>
                H10 arrives Tuesday Week 1. Max HR test is Thursday Week 1 â€” 4-min all-out effort. Set your Polar zones from that number.
              </p>
            </div>
            <div style={{
              marginTop: 16, padding: 14, borderRadius: 10,
              background: "#1a1207", border: "1px solid #854d0e33",
            }}>
              <p style={{ fontSize: 12, color: "#fbbf24", margin: 0, fontWeight: 600 }}>âš ï¸ Sit-bone note</p>
              <p style={{ fontSize: 12, color: "#a3865a", margin: "4px 0 0" }}>
                If you find your max HR via the bike test, stay standing the entire time. Alternatively, use a hard hill run or elliptical sprint.
              </p>
            </div>
          </div>
        )}

        {/* Daily Physio View */}
        {view === "daily" && (
          <div style={{ paddingTop: 20 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Daily Non-Negotiables</h2>
            <p style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
              These happen every single day, including rest days. No exceptions.
            </p>
            {PROGRAM_DATA.dailyPhysio.map((ex, i) => (
              <div key={i} style={{
                padding: "16px", marginBottom: 10, borderRadius: 12,
                background: "#111827", border: "1px solid #1e293b",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{ex.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{ex.name}</div>
                    <div style={{ fontSize: 13, color: "#94a3b8" }}>{ex.detail}</div>
                  </div>
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 16, padding: 14, borderRadius: 10,
              background: "#0f1a14", border: "1px solid #16653422",
            }}>
              <p style={{ fontSize: 13, color: "#4ade80", margin: 0, fontWeight: 600 }}>
                From your physio program + foot rehab + ankle stability
              </p>
              <p style={{ fontSize: 12, color: "#6b9e7e", margin: "6px 0 0" }}>
                Piriformis release is critical for ischial tuberosity recovery. Glutes release 3x/day maintains tissue quality around the nerve. Banded hip abduction directly activates glute med — do it right after glute release (release then activate). This offloads the chronically overworked TFL on the left side. Hollow hold builds core stability that protects everything else. The foot exercises (short foot, big toe press-downs, towel scrunches) rebuild intrinsic foot strength that your orthotics suppress. The ankle work (single-leg balance, alphabet tracing, banded dorsiflexion) is bilateral â€” L ankle for hypermobility control, R ankle for stability around the plantar plate and orthotics. Do foot and ankle work barefoot at home.
              </p>
            </div>
          </div>
        )}

        {/* Program View */}
        {view === "program" && (
          <>
            {/* Phase indicator */}
            <div style={{
              display: "flex", gap: 4, padding: "16px 0 8px",
            }}>
              {PROGRAM_DATA.meta.phases.map((p) => (
                <div key={p.name} style={{ flex: p.weeks.length, textAlign: "center" }}>
                  <div style={{
                    height: 4, borderRadius: 2, marginBottom: 6,
                    background: p.weeks.includes(selectedWeek) ? p.color : p.color + "33",
                    transition: "background 0.3s",
                  }} />
                  <div style={{
                    fontSize: 9, fontFamily: "'DM Mono', monospace",
                    textTransform: "uppercase", letterSpacing: 1,
                    color: p.weeks.includes(selectedWeek) ? p.color : "#475569",
                  }}>
                    {p.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Week selector */}
            <div style={{
              display: "flex", gap: 4, padding: "12px 0",
              overflowX: "auto", WebkitOverflowScrolling: "touch",
            }}>
              {Array.from({ length: 11 }, (_, i) => i + 1).map((wk) => {
                const wkPhase = getPhaseForWeek(wk);
                const isSelected = selectedWeek === wk;
                const wkData = PROGRAM_DATA.weeks.find((w) => w.number === wk);
                const wkCompleted = wkData
                  ? wkData.days.filter((_, di) => completions[`${wk}-${di}`]).length
                  : 0;
                const allDone = wkData && wkCompleted === wkData.days.length;

                return (
                  <button
                    key={wk}
                    onClick={() => { setSelectedWeek(wk); setExpandedDay(null); }}
                    style={{
                      minWidth: 44, height: 44, borderRadius: 10, border: "none",
                      background: isSelected ? wkPhase?.color || "#334155" : "#111827",
                      color: isSelected ? "#fff" : "#94a3b8",
                      fontSize: 14, fontWeight: 700, cursor: "pointer",
                      position: "relative", transition: "all 0.2s",
                      outline: isSelected ? `2px solid ${wkPhase?.color}44` : "none",
                      outlineOffset: 2,
                      fontFamily: "'DM Sans', system-ui",
                    }}
                  >
                    {wk}
                    {allDone && (
                      <div style={{
                        position: "absolute", top: -3, right: -3,
                        width: 14, height: 14, borderRadius: 7,
                        background: "#22c55e", fontSize: 9, lineHeight: "14px",
                        textAlign: "center", color: "#fff",
                      }}>âœ“</div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Week header */}
            {weekData && (
              <>
                <div style={{
                  padding: "14px 16px", borderRadius: 12, marginBottom: 12,
                  background: `${phase?.color}11`, border: `1px solid ${phase?.color}33`,
                }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: 6,
                  }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                      Week {weekData.number}
                      <span style={{ fontSize: 12, fontWeight: 400, color: "#64748b", marginLeft: 8 }}>
                        {formatDate(getDateForDay(weekData.number, 0))} â€“ {formatDate(getDateForDay(weekData.number, weekData.days.length - 1))}
                      </span>
                    </h2>
                    <span style={{
                      fontSize: 12, fontFamily: "'DM Mono', monospace",
                      color: phase?.color, fontWeight: 500,
                    }}>
                      {completedDays}/{weekData.days.length} days
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 8px" }}>
                    {weekData.focus}
                  </p>
                  <div style={{
                    fontSize: 11, color: "#f59e0b", fontFamily: "'DM Mono', monospace",
                    padding: "6px 10px", background: "#1a160a", borderRadius: 6,
                  }}>
                    ðŸš¦ Gate: {weekData.progressionGate}
                  </div>
                </div>

                {/* Days */}
                {weekData.days.map((day, dayIdx) => {
                  const isExpanded = expandedDay === dayIdx;
                  const isComplete = completions[`${selectedWeek}-${dayIdx}`];
                  const tc = typeColors[day.type] || typeColors.rest;
                  const noteKey = `${selectedWeek}-${dayIdx}`;

                  return (
                    <div key={dayIdx} style={{
                      marginBottom: 8, borderRadius: 12, overflow: "hidden",
                      border: `1px solid ${isComplete ? "#22c55e33" : "#1e293b"}`,
                      background: isComplete ? "#0a1f0f" : "#111827",
                      transition: "all 0.2s",
                    }}>
                      {/* Day header */}
                      <div
                        onClick={() => setExpandedDay(isExpanded ? null : dayIdx)}
                        style={{
                          display: "flex", alignItems: "center", gap: 10,
                          padding: "12px 14px", cursor: "pointer",
                        }}
                      >
                        <div
                          onClick={(e) => { e.stopPropagation(); toggleComplete(selectedWeek, dayIdx); }}
                          style={{
                            width: 24, height: 24, borderRadius: 6,
                            border: isComplete ? "2px solid #22c55e" : "2px solid #334155",
                            background: isComplete ? "#22c55e" : "transparent",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", flexShrink: 0, transition: "all 0.2s",
                            fontSize: 14, color: "#fff",
                          }}
                        >
                          {isComplete ? "âœ“" : ""}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{
                              fontSize: 12, fontFamily: "'DM Mono', monospace",
                              color: "#64748b", minWidth: 28,
                            }}>
                              {day.day.slice(0, 3)}
                            </span>
                            <span style={{
                              fontSize: 10, fontFamily: "'DM Mono', monospace",
                              color: "#475569",
                            }}>
                              {formatDate(getDateForDay(selectedWeek, dayIdx))}
                            </span>
                            <span style={{
                              fontSize: 10, padding: "2px 8px", borderRadius: 4,
                              background: tc.bg, color: tc.badge,
                              fontWeight: 600, textTransform: "uppercase",
                              letterSpacing: 0.5,
                            }}>
                              {day.type}
                            </span>
                          </div>
                          <div style={{
                            fontSize: 14, fontWeight: 600, marginTop: 2,
                            color: isComplete ? "#6ee7b7" : "#e2e8f0",
                            textDecoration: isComplete ? "line-through" : "none",
                            opacity: isComplete ? 0.7 : 1,
                          }}>
                            {day.label}
                          </div>
                        </div>
                        <div style={{
                          fontSize: 18, color: "#475569",
                          transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                          transition: "transform 0.2s",
                        }}>
                          â–¾
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div style={{
                          padding: "0 14px 14px", borderTop: "1px solid #1e293b",
                        }}>
                          {day.hrTarget && (
                            <div style={{
                              display: "inline-block", margin: "10px 0 6px",
                              fontSize: 11, fontFamily: "'DM Mono', monospace",
                              padding: "3px 10px", borderRadius: 4,
                              background: "#ef444422", color: "#fca5a5",
                            }}>
                              â™¥ Target: {day.hrTarget}
                            </div>
                          )}

                          {day.sessions.length > 0 && (
                            <div style={{ marginTop: 8 }}>
                              {day.sessions.map((s, si) => (
                                <div key={si} style={{
                                  display: "flex", gap: 8, padding: "6px 0",
                                  borderBottom: si < day.sessions.length - 1 ? "1px solid #1e293b22" : "none",
                                }}>
                                  <span style={{
                                    color: "#475569", fontSize: 11, marginTop: 2,
                                    fontFamily: "'DM Mono', monospace",
                                  }}>
                                    {String(si + 1).padStart(2, "0")}
                                  </span>
                                  <div style={{ flex: 1 }}>
                                    <span style={{ fontSize: 13, color: "#cbd5e1" }}>
                                      {s.name}
                                    </span>
                                    {s.zone && (
                                      <span style={{
                                        marginLeft: 6, fontSize: 10,
                                        padding: "1px 6px", borderRadius: 3,
                                        background: "#1e293b", color: "#94a3b8",
                                        fontFamily: "'DM Mono', monospace",
                                      }}>
                                        {s.zone}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {day.physio && (
                            <div style={{
                              marginTop: 10, padding: "8px 10px", borderRadius: 8,
                              background: "#4a1d9611", border: "1px solid #4a1d9633",
                            }}>
                              <div style={{
                                fontSize: 10, fontWeight: 700, color: "#a78bfa",
                                textTransform: "uppercase", letterSpacing: 1, marginBottom: 4,
                              }}>
                                Physio Integration
                              </div>
                              {day.physio.map((p, pi) => (
                                <div key={pi} style={{ fontSize: 12, color: "#c4b5fd", lineHeight: 1.5 }}>
                                  {p}
                                </div>
                              ))}
                            </div>
                          )}

                          {day.notes && (
                            <div style={{
                              marginTop: 10, padding: "8px 10px", borderRadius: 8,
                              background: "#1e293b44",
                            }}>
                              <div style={{
                                fontSize: 10, fontWeight: 700, color: "#64748b",
                                textTransform: "uppercase", letterSpacing: 1, marginBottom: 4,
                              }}>
                                Notes & Precautions
                              </div>
                              <p style={{ fontSize: 12, color: "#94a3b8", margin: 0, lineHeight: 1.5 }}>
                                {day.notes}
                              </p>
                            </div>
                          )}

                          {/* Personal notes */}
                          <div style={{ marginTop: 10 }}>
                            <textarea
                              placeholder="Add your notes (HR readings, how you felt, pain levels...)"
                              value={notes[noteKey] || ""}
                              onChange={(e) => updateNote(selectedWeek, dayIdx, e.target.value)}
                              style={{
                                width: "100%", minHeight: 60, padding: "8px 10px",
                                borderRadius: 8, border: "1px solid #1e293b",
                                background: "#0a0a0a", color: "#e2e8f0",
                                fontSize: 12, fontFamily: "'DM Sans', system-ui",
                                resize: "vertical", outline: "none",
                                boxSizing: "border-box",
                              }}
                              onFocus={(e) => e.target.style.borderColor = phase?.color || "#475569"}
                              onBlur={(e) => e.target.style.borderColor = "#1e293b"}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
