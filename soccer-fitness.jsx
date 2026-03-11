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
    subtitle: "13-week soccer match fitness program. Target: 90 minutes, mid-May 2026.",
    phases: [
      { name: "Base + Nerve Recovery", weeks: [1, 2, 3], color: "#2d6a4f" },
      { name: "Transition to Running", weeks: [4, 5, 6], color: "#e07a2f" },
      { name: "Soccer-Specific", weeks: [7, 8, 9, 10], color: "#c2255c" },
      { name: "Match Prep & Taper", weeks: [11, 12, 13], color: "#364fc7" },
    ],
  },
  hrZones: [
    { zone: 1, name: "Recovery", bpm: "121-133", desc: "Very easy, walking pace" },
    { zone: 2, name: "Aerobic Base", bpm: "133-145", desc: "Conversational, sustainable" },
    { zone: 3, name: "Tempo", bpm: "145-158", desc: "Comfortably hard, breathing heavier" },
    { zone: 4, name: "Threshold", bpm: "158-170", desc: "Hard, short sentences only" },
    { zone: 5, name: "Max", bpm: "170-182", desc: "All-out sprint effort" },
  ],
  dailyPhysio: [
    { name: "── TIER 1: ESSENTIAL (every day, ~12 min) ──", detail: "Do these FIRST. Hip mobility drills (#1–3): do 2–3 rounds/day (morning, afternoon, evening). ~5 min per round. Frequency is the accelerator.", icon: "⭐" },
    { name: "90/90 Hip Switches", detail: "2×10 slow, controlled. Focus on LEFT hip internal rotation. Primary drill for PTFJ chain. DO 2–3×/DAY.", icon: "🔁" },
    { name: "Half-Kneeling Hip Flexor Stretch", detail: "3×30s each side, posterior pelvic tilt. LEFT priority. DO 2–3×/DAY. Addresses anterior capsule tightness.", icon: "🧎" },
    { name: "Side-Lying Hip IR Stretch", detail: "2×30s LEFT side. Knee at 90°, let lower leg fall outward. Do not force. DO 2–3×/DAY.", icon: "🔓" },
    { name: "Single-Leg Mini Squats (valgus control)", detail: "2x10 each side, mirror or phone camera. Quarter squat, slow, knee over 4th/5th toe.", icon: "🎯" },
    { name: "Piriformis Release (ball)", detail: "6-8 passes each side, 3-5 sec per roll", icon: "🎾" },
    { name: "Glutes Release", detail: "3x30s, do 3x throughout the day", icon: "🍑" },
    { name: "Hollow Hold", detail: "3x30s barefoot on firm surface", icon: "🔄" },
    { name: "Side Plank Hip Abduction (physio-prescribed)", detail: "3x30s each side, 90s rest. 3x/WEEK (strength days + 1). Side plank position, lift top leg keeping foot forward and leg directly over bottom leg. Fires glute med under stability demand.", icon: "💪" },
    { name: "── TIER 2: EXTENDED (training days + weekends) ──", detail: "Add these when you have time. ~10 min additional.", icon: "📋" },
    { name: "Short Foot Exercise", detail: "3x10 holds, barefoot, activate arch without curling toes", icon: "🦶" },
    { name: "Big Toe Press-Downs", detail: "3x10, press big toe down/lift others, then reverse", icon: "👣" },
    { name: "Towel Scrunches", detail: "3x30s each foot, intrinsic foot strengthening", icon: "🧶" },
    { name: "Single-Leg Balance (both ankles)", detail: "3x30s each leg, eyes CLOSED. L = hypermobility control. R = plantar plate stability.", icon: "⚖️" },
    { name: "Alphabet Tracing (both)", detail: "Trace A-Z with each foot. GATE: skip LEFT if L ankle >1/10.", icon: "🔤" },
    { name: "Banded Dorsiflexion (both)", detail: "Light band, 3x10 each side. GATE: skip LEFT if L ankle >1/10.", icon: "🔗" },
    { name: "Resisted Eversion (physio-prescribed)", detail: "3x12 each side, 90s rest. Band around foot below toes, other foot as lever. Start sole facing in, bring foot up and out so sole faces outside. Strengthens peroneals. GATE: skip LEFT if L ankle >1/10.", icon: "🔄" },
    { name: "Peroneal Nerve Glides", detail: "NOT YET. Ask Nick next visit. Do not DIY while nerve is sensitized from manual work (March 7).", icon: "⏳" },
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
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep: Ankle hops, A-skip, B-skip, Carioca (3Ã—50ft each, 90s rest). CUE: L ankle control on all landings. SKIP Carioca if groin nerve is active â€” the crossover loads adduction + rotation."],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain Strength + H10 Setup",
        sessions: [
          { name: "ðŸŽ‰ H10 arrives today â€” charge it, pair with Polar app, wear it for every session from now on" },
          { name: "Adduction plank, long lever â€” 3Ã—45â€“60s. MONITOR: if inguinal groin area flares, reduce hold time or skip." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) â€” 3Ã—8 (single 18lb DB, 5s eccentric) â€” LEFT SIDE: stop at torso parallel (hip restriction + sit-bone). RIGHT SIDE: stop before sit-bone stretch.", zone: "Controlled" },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) â€” 3Ã—6" },
          { name: "Adductor slide (towel) â€” 3Ã—8. MONITOR: if groin nerve tingling increases, reduce range or skip." },
          { name: "Side lunges (CUE: knee over 4th/5th toe) â€” 3Ã—6. LEFT SIDE: don't sink as deep (hip restriction â€” deep flexion + adduction compresses anterior hip)." },
        ],
        notes: "On 1-leg RDL: LEFT side has two depth limits â€” sit-bone AND anterior hip restriction. Start at torso parallel, progress deeper as hip mobility improves. RIGHT side: sit-bone is the only limiter. Groin nerve: if the warm/tingly sensation increases during adductor work, stop those exercises and note it. Stabilization lunge (CUE: knee over 4th/5th toe) is also your L ankle proprioception builder â€” focus on controlling the ankle on every rep.",
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
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep: Ankle hops, A-skip, B-skip, Carioca (3Ã—50ft each, 90s rest). CUE: L ankle control on all landings. SKIP Carioca if groin nerve is active."],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Stability (Modified)",
        sessions: [
          { name: "GROIN SCREEN FIRST: 4 bodyweight side lunges each side. Rate groin 0â€“10. If 3+/10 â†’ rest day." },
          { name: "1. Stabilization lunge (CUE: knee over 4th/5th toe) â€” 3Ã—6 (TEST: if groin nerve fires, drop this exercise and skip adduction plank + adductor slide below)" },
          { name: "2. DB 1-leg RDL (CUE: knee over 4th/5th toe) â€” 3Ã—8 (single 18lb DB, 5s eccentric) â€” LEFT: torso parallel start — progress deeper as hip mobility improves. RIGHT: stop before sit-bone stretch." },
          { name: "3. Side lunges (CUE: knee over 4th/5th toe) â€” 3Ã—6 BODYWEIGHT ONLY. LEFT: shallower depth — progress as hip mobility improves." },
          { name: "4. Single leg hip thrust â€” 3Ã—6 (bodyweight)" },
          { name: "5. Single-leg calf raises (CUE: knee over 4th/5th toe) â€” 3Ã—15 each leg, straight knee + bent knee (bodyweight, 3s eccentric). Wall for balance. Bent-knee is extra important on LEFT â€” soleus acts as dynamic ankle stabilizer." },
          { name: "6. Adduction plank, long lever â€” 3Ã—45â€“60s. ONLY attempt if stabilization lunge was clean (no groin reaction)." },
          { name: "7. Adductor slide (towel) â€” 3Ã—8. ONLY attempt if adduction plank was clean." },
        ],
        notes: "Exercise order is intentional â€” stabilization lunge is the groin screen for the adductor exercises at the end. If lunge fires the groin, do exercises 2â€“5 only and skip 6â€“7. LEFT RDL depth starts at torso parallel â€” don't test it.",
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Conditioning + Max HR Test",
        hrTarget: "Z2 for warm-up, ALL-OUT for max HR test, Z1â€“2 for jog intervals",
        sessions: [
          { name: "GROIN SCREEN: 4 bodyweight side lunges each side. Rate groin 0â€“10. If 3+/10 â†’ rest day." },
          { name: "Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep: Ankle hops, A-skip, B-skip. SKIP Carioca unless groin screen is 0/10." },
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
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep: Ankle hops, A-skip, B-skip, Carioca. CUE: L ankle control on all landings. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain Strength",
        sessions: [
          { name: "Adduction plank, long lever â€” 3Ã—50â€“60s (progress hold time). MONITOR: skip or reduce if groin nerve is still active." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) â€” 3Ã—10 (single 18lb DB, 5s eccentric). LEFT: torso parallel start — progress deeper as hip mobility improves. RIGHT: sit-bone limit." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) â€” 3Ã—6" },
          { name: "Adductor slide â€” 3Ã—8" },
          { name: "Side lunges (CUE: knee over 4th/5th toe) â€” 3Ã—8 (progressed from 6). LEFT: shallower depth — progress as hip mobility improves." },
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
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) â€” 3Ã—10 (single 18lb DB, 5s eccentric). LEFT: torso parallel start — progress deeper as hip mobility improves." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) â€” 3Ã—6" },
          { name: "Adductor slide â€” 3Ã—8" },
          { name: "Side lunges (CUE: knee over 4th/5th toe) â€” 3Ã—8. LEFT: shallower depth — progress as hip mobility improves." },
          { name: "Single leg hip thrust â€” 3Ã—6 (bodyweight)" },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) â€” 3Ã—15 each, straight + bent knee (bodyweight, 3s eccentric)" },
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
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep before jog. SKIP Carioca if groin nerve is still active."],
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
    progressionGate: "Can tolerate 10+ min seated bike. Jog 15 min continuous without PTFJ or sit-bone flare. LEFT hip ROM improving â€" compare L vs R internal rotation. Groin nerve resolved. Ready for Phase 2.",
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
        label: "Lateral Chain â€” Progress Load",
        sessions: [
          { name: "Adduction plank â€” 3Ã—60s. MONITOR: skip or reduce if groin nerve is still active." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) â€” 3Ã—10 (single 18lb DB, 5s eccentric â€” progress depth on RIGHT if sit-bone allows. LEFT: torso parallel start — progress deeper as hip mobility improves)" },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) â€” 3Ã—8 (progressed)" },
          { name: "Adductor slide â€” 3Ã—10" },
          { name: "Side lunges (CUE: knee over 4th/5th toe) â€” 3Ã—8 with single 18lb DB goblet hold. LEFT: shallower depth — progress as hip mobility improves." },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) â€” 3Ã—15 each, straight + bent knee (bodyweight, 3s eccentric)" },
        ],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      {
        day: "Thursday",
        type: "conditioning",
        label: "Seated Bike Test + Aerobic",
        hrTarget: "Z2",
        sessions: [
          { name: "15 min seated bike at Z2 â€” assess sit-bone tolerance", zone: "Z2" },
          { name: "If tolerated: continue to 35 min total", zone: "Z2" },
          { name: "If not tolerated: switch to elliptical for remaining time", zone: "Z2" },
        ],
        notes: "This is the key test. If you can sit for 15+ min, we're on track to use the bike normally going forward.",
        physio: ["Movement Prep drills. SKIP Carioca if groin nerve is still active."],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Thrust",
        sessions: [
          { name: "Full strength circuit (same as Tuesday + single leg hip thrust 3Ã—8 bodyweight)" },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) â€” 3Ã—15 each, straight + bent knee (bodyweight, 3s eccentric)" },
        ],
        notes: "Hip thrust progressed to 8 reps.",
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Continuous Jog Attempt",
        hrTarget: "Z2",
        sessions: [
          { name: "Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep drills as warm-up. SKIP Carioca if groin nerve is still active." },
          { name: "15 min continuous jog at Z2", zone: "Z2" },
          { name: "5 min walk", zone: "Z1" },
          { name: "4Ã—50m strides at 70% effort", zone: "Z3" },
        ],
        notes: "First continuous jog. Stay slow. The strides at the end introduce your legs to faster turnover without full sprinting.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest â€” Phase Gate Assessment", sessions: [], notes: "Check all three gates before moving to Phase 2. If sit-bone still can't handle the bike, extend Phase 1 by a week and adjust." },
    ],
  });

  // WEEK 4
  weeks.push({
    number: 4,
    phase: "Transition to Running",
    focus: "Reintroduce seated bike if tolerated, first running intervals, increase lateral chain demand",
    progressionGate: "Can jog 20 min without issue. Running intervals don't aggravate PTFJ.",
    days: [
      {
        day: "Monday",
        type: "conditioning",
        label: "Bike Intervals (Seated if tolerated)",
        hrTarget: "Z4â€“5",
        sessions: [
          { name: "Warm-up: 8 min easy spin", zone: "Z2" },
          { name: "10Ã—10s sprints / 50s recovery", zone: "Z5" },
          { name: "3 min rest" },
          { name: "4Ã—30s hard / 90s recovery", zone: "Z4" },
          { name: "Cool-down: 5 min", zone: "Z1" },
        ],
        notes: "If seated is okay, great. If not, stay standing or use elliptical intervals. BIKE CUE: push knees slightly outward on every pedal stroke â€" valgus tendency loads PTFJ and peroneal nerve.",
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation), then Movement Prep drills"],
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "Lateral Chain Strength",
        sessions: [
          { name: "ANKLE GATE: If L ankle >1/10, skip all LEFT-side loading (L RDL, L calf raises). Side lunges and stab lunges both sides okay if ankle is 0–1." },
          { name: "Adduction plank — 3×60s" },
          { name: "Copenhagen plank, SHORT LEVER (knee on bench) — 3×15s each side. Only if groin screen is 0/10. First introduction of Harøy protocol." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) — 3×10 (1×25lb DB, 5s eccentric). LEFT: 1×20lb, torso parallel start — progress deeper as hip mobility improves. Contralateral hand holds DB." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) — 3×8 (2×20lb DB, one each hand). L ankle: control on every rep." },
          { name: "Adductor slide — 3×10" },
          { name: "Side lunges (CUE: knee over 4th/5th toe) — 3×8 (1×25lb DB goblet). LEFT: shallower depth — progress as hip mobility improves." },
          { name: "Cable hip abduction — 3×12 each side (5lb baseline, slow tempo). Stand on RIGHT leg when working left if L ankle is active." },
        ],
      },
      { day: "Wednesday", type: "rest", label: "Rest + Daily Physio", sessions: [] },
      {
        day: "Thursday",
        type: "conditioning",
        label: "First Running Intervals",
        hrTarget: "Z3â€“4",
        sessions: [
          { name: "Banded BW squats (mini band above knees, 2x10 — valgus activation), then Movement Prep drills" },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "6Ã—100m at 75% effort / walk back recovery", zone: "Z3â€“4" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "First real running intervals. 75% effort, not sprinting. Focus on smooth mechanics. Monitor PTFJ â€” any lateral knee pain, stop and walk.",
        physio: ["Banded BW squats (mini band above knees, 2x10 — valgus activation). Movement Prep before, stretching after"],
      },
      {
        day: "Friday",
        type: "strength",
        label: "Lateral Chain + Hip Thrust",
        sessions: [
          { name: "ANKLE GATE: If L ankle >1/10, skip L calf raises. Do RIGHT only." },
          { name: "Full strength circuit (same as Tuesday weights)" },
          { name: "Single leg hip thrust — 3×8 (1×25lb DB on lap)" },
          { name: "Cable hip abduction — 3×12 each side (progress from Tuesday weight if clean)" },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) 3×12 each — straight + bent knee, 1×20lb DB, 3s eccentric. LEFT: bodyweight only until ankle gate clears." },
        ],
        notes: "Hip thrust progressed to 25lb. If 15 reps was easy at 20lb, 8–10 reps at 25lb is the right zone.",
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Tempo Jog",
        hrTarget: "Z2â€“3",
        sessions: [
          { name: "Banded BW squats (mini band above knees, 2x10 — valgus activation), then Movement Prep drills" },
          { name: "20 min continuous jog", zone: "Z2" },
          { name: "5 min at Z3 (comfortably hard)", zone: "Z3" },
          { name: "5 min walk cool-down", zone: "Z1" },
        ],
        notes: "Building toward sustained moderate effort. The 5 min at Z3 simulates a passage of play. After session: 5 min barefoot walking on grass (first barefoot exposure beyond daily physio). Orthotics stay in for all running.",
      },
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
    ],
  });

  // WEEK 5
  weeks.push({
    number: 5,
    phase: "Transition to Running",
    focus: "Introduce Nordics, Pallof press, full Copenhagen. Hip mobility 2–3×/day is the priority. All strength at gym.",
    progressionGate: "Nordics tolerated (sit-bone stays 0/10). PTFJ stays 0–1 baseline. L hip ROM improving — compare to baseline.",
    days: [
      {
        day: "Sunday",
        type: "strength",
        label: "GYM — Strength A",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10 (knees over 4th/5th toe)" },
          { name: "ANKLE GATE: If L ankle >1/10, skip LEFT-side loading (L RDL, L calf raises)." },
          { name: "Copenhagen plank, SHORT LEVER (knee on bench) — 3×60s each side, 60s rest." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) — 3×10 (1×30lb R, 1×25lb L, 5s eccentric). LEFT: torso parallel start — progress deeper as hip mobility improves. Contralateral hand holds DB." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) — 3×8 (2×25lb DB, one each hand)." },
          { name: "Side lunges (CUE: knee over 4th/5th toe) — 3×10 (1×25lb DB goblet). LEFT: shallower depth." },
          { name: "Cable hip abduction — 3×12 each side, 10lb." },
          { name: "Leg extension (bilateral) — 3×8, 25–40lb. Open chain, easy on PTFJ." },
          { name: "Single leg hip thrust — 3×10 (1×30lb DB on lap)." },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) — 3×12, wall touch mandatory. R: 1×20lb. L: bodyweight. Straight + bent knee, 3s eccentric. LEFT: ankle gate." },
        ],
        notes: "Full strength session. Knees over 4th/5th toe on everything. 90s rest between sets.",
      },
      {
        day: "Monday",
        type: "conditioning",
        label: "Easy Jog (from door)",
        hrTarget: "Z2",
        sessions: [
          { name: "Movement Prep: ankle hops, A-skip, B-skip (skip Carioca if groin >0). 3×50ft each, 90s rest." },
          { name: "20 min jog, orthotics in. Feet straight, knees over 4th/5th toe.", zone: "Z2" },
        ],
        notes: "From door — no gym needed. If PTFJ or ankle talks, stop and walk home.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [], notes: "Hip mobility drills morning, afternoon, and evening. This is the program now." },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength B (Introductions)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10 (knees over 4th/5th toe)" },
          { name: "ANKLE GATE: If L ankle >1/10, skip LEFT-side loading (L RDL, L calf raises)." },
          { name: "Copenhagen plank, FULL LEVER (foot on bench) — 3×10s each side. Progress from short lever only if zero complaints last week." },
          { name: "Side plank hip abduction (physio-prescribed) — 3×30s each side, 90s rest. Side plank, lift top leg, foot forward over bottom leg." },
          { name: "Assisted Nordic curls — 3×3 (hands control descent, SLOW eccentric only). SIT-BONE GATE: only if 0/10 for 2+ weeks. FIRST INTRODUCTION — Nick requested." },
          { name: "Pallof press (cable or band) — 3×10 each side. Anti-rotation core. NEW." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) — 3×10 (1×30lb R, 1×25lb L, 5s eccentric). Contralateral hand holds DB." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) — 3×8 (2×25lb DB)." },
          { name: "Cable hip abduction — 3×12 each side, 10lb." },
          { name: "Single-leg calf raises (CUE: knee over 4th/5th toe) — 3×12, wall touch mandatory. R: 1×20lb. L: bodyweight. Straight + bent knee, 3s eccentric. LEFT: ankle gate." },
        ],
        notes: "New exercises: full Copenhagen, assisted Nordics, Pallof press. Note any reactions — we adjust Saturday. No side lunges or hip thrust today — save for Saturday.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Intervals",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep: banded BW squats 2×10, ankle hops, A-skip, B-skip, Carioca (skip if groin >0). 3×50ft each." },
          { name: "10 min jog warm-up (track or treadmill)", zone: "Z2" },
          { name: "6×30s at Z4 / 90s jog recovery", zone: "Z4" },
          { name: "5 min jog cool-down", zone: "Z2" },
        ],
        notes: "Intervals build repeated sprint capacity for match play. Track preferred. Elliptical backup — cap at 20 min, stop if PTFJ whispers.",
      },
      {
        day: "Friday",
        type: "conditioning",
        label: "GYM — Easy Conditioning",
        hrTarget: "Z2–3",
        sessions: [
          { name: "Movement Prep: banded BW squats 2×10, ankle hops, A-skip, B-skip." },
          { name: "25 min steady jog or elliptical (cap 20 min). Z2–3.", zone: "Z2–3" },
        ],
        notes: "Active recovery pace. Stay easy — Saturday is strength. Track or elliptical, your call.",
      },
      {
        day: "Saturday",
        type: "strength",
        label: "GYM — Strength C (Side Lunges + Hip Thrust)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10 (knees over 4th/5th toe)" },
          { name: "ANKLE GATE: If L ankle >1/10, skip L calf raises." },
          { name: "Copenhagen plank, SHORT LEVER (knee on bench) — 3×60s each side." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) — 3×10 (1×30lb R, 1×25lb L, 5s eccentric). Contralateral hand." },
          { name: "Side lunges (CUE: knee over 4th/5th toe) — 3×10 (1×25lb DB goblet). LEFT: shallower." },
          { name: "Leg extension (bilateral) — 3×8, 25–40lb." },
          { name: "Single leg hip thrust — 3×10 (1×30lb DB on lap)." },
          { name: "Assisted Nordic curls — 3×3 (if sit-bone still 0/10 from Wednesday)." },
          { name: "Single-leg calf raises — 3×12, wall touch mandatory. R: 1×20lb. L: bodyweight. Straight + bent knee, 3s eccentric." },
        ],
        notes: "Assess Nordic response from Wednesday. If sit-bone reacted, skip Nordics and reassess Monday.",
      },
    ],
  });

  // WEEK 6
  weeks.push({
    number: 6,
    phase: "Transition to Running",
    focus: "Final transition week. Running becomes primary. Introduce lateral shuttles if PTFJ allows. Practice ankle taping.",
    progressionGate: "Can run 30 min with tempo blocks. Shuttles tolerated. LEFT hip ROM improving. Ready for soccer-specific work.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [], notes: "Phase gate assessment. Check PTFJ, L hip ROM (compare to baseline photo), sit-bone, and overall fatigue." },
      {
        day: "Monday",
        type: "conditioning",
        label: "Jog + Tempo Blocks (from door)",
        hrTarget: "Z2–3",
        sessions: [
          { name: "Movement Prep: banded BW squats 2×10, ankle hops, A-skip, B-skip, Carioca (skip if groin >0)." },
          { name: "25 min: 10 min Z2, 10 min Z3, 5 min Z2 cool-down.", zone: "Z2–3" },
        ],
        notes: "From door. Orthotics in. Building toward sustained moderate effort.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [], notes: "Hip mobility morning, afternoon, evening." },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength A (Full Lever + Nordics)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10 (knees over 4th/5th toe)" },
          { name: "ANKLE GATE: If L ankle >1/10, skip LEFT-side loading." },
          { name: "Copenhagen plank, FULL LEVER — 3×15s each side (progress from Week 5)." },
          { name: "Side plank hip abduction — 3×30s each side, 90s rest." },
          { name: "Assisted Nordic curls — 3×5 (progress reps from Week 5)." },
          { name: "Pallof press — 3×10 each side." },
          { name: "DB 1-leg RDL (CUE: knee over 4th/5th toe) — 3×10 (1×35lb R, 1×30lb L, 5s eccentric). Contralateral hand." },
          { name: "Stabilization lunge (CUE: knee over 4th/5th toe) — 3×10 (2×30lb DB)." },
          { name: "Cable hip abduction — 3×12 each side, 15lb." },
          { name: "Lateral band walks — 3×15 each direction. NEW." },
          { name: "Single-leg calf raises — 3×12, wall touch. R: 1×25lb. L: bodyweight. 3s eccentric." },
        ],
        notes: "Progress all weights from Week 5. Practice ankle taping during warm-up — test fit before Week 7.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Intervals + Lateral Shuttles",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep: banded BW squats 2×10, ankle hops, A-skip, B-skip, Carioca." },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "8×200m at 80% / jog back recovery", zone: "Z4" },
          { name: "Rest 3 min" },
          { name: "6× lateral shuttle (5m each way) — ONLY if PTFJ allows. L ankle: decelerate with control.", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "First lateral shuttles. Low intensity. If any PTFJ pain, remove and stick to forward/back. ANKLE TAPE: try taping L ankle for this session.",
      },
      {
        day: "Friday",
        type: "conditioning",
        label: "GYM — Easy Conditioning",
        hrTarget: "Z2",
        sessions: [
          { name: "25 min easy jog or elliptical (cap 20 min). Recovery pace.", zone: "Z2" },
        ],
        notes: "Stay genuinely easy. Saturday is strength.",
      },
      {
        day: "Saturday",
        type: "strength",
        label: "GYM — Strength B (Side Lunges + Power)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "ANKLE GATE: If L ankle >1/10, skip L calf raises." },
          { name: "Copenhagen plank, SHORT LEVER — 3×60s each side." },
          { name: "DB 1-leg RDL — 3×10 (1×35lb R, 1×30lb L, 5s eccentric). Contralateral hand." },
          { name: "Side lunges — 3×10 (1×30lb DB goblet). LEFT: progress depth." },
          { name: "Box step-ups — 3×8 each leg (1×20lb DB). NEW." },
          { name: "Leg extension (bilateral) — 3×8, progress weight." },
          { name: "Single leg hip thrust — 3×10 (1×35lb DB on lap)." },
          { name: "Assisted Nordic curls — 3×5." },
          { name: "Single-leg calf raises — 3×12. R: 1×25lb. L: bodyweight. 3s eccentric." },
        ],
        notes: "Box step-ups are new — dynamic lateral chain. Adding ankle taping practice again.",
      },
    ],
  });

  // WEEK 7
  weeks.push({
    number: 7,
    phase: "Soccer-Specific",
    focus: "Pickup games are the priority. Plyometrics introduced. Tape/brace L ankle for all dynamic work.",
    progressionGate: "Can sustain 30 min mixed-intensity running. Lateral movements tolerated. Split squat jump landing controlled.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [], notes: "Tier 1 hip mobility at least once." },
      {
        day: "Monday",
        type: "conditioning",
        label: "Match Simulation Lite (from door or gym)",
        hrTarget: "Z2–5 (mixed)",
        sessions: [
          { name: "Movement Prep: banded BW squats, A-skip, B-skip, Carioca." },
          { name: "2×15 min blocks: jog 2–3 min Z2, sprint 10–15s every 2–3 min, walk 30s recovery after each sprint.", zone: "mixed" },
          { name: "3 min rest between blocks." },
        ],
        notes: "Random sprint pattern mimics game demands. Orthotics in, L ankle taped/braced.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength A (Power + Nordics)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank, FULL LEVER — 3×20s each side." },
          { name: "Side plank hip abduction — 3×30s each side." },
          { name: "Assisted Nordic curls — 3×5 (reduce hand assistance if Week 6 was clean)." },
          { name: "Split squat jumps (CUE: knee over 4th/5th toe) — 3×6 (low height, controlled landing). SKIP if PTFJ reacts. LEFT leg forward: don't drop into deep hip flexion on landing. NEW." },
          { name: "Cable woodchops — 3×10 each side. Rotational power. NEW." },
          { name: "Pallof press — 3×10 each side." },
          { name: "DB 1-leg RDL — 3×10 (1×35lb R, 1×30lb L, 5s eccentric). Contralateral hand." },
          { name: "Stabilization lunge — 3×10 (2×30lb DB)." },
          { name: "Cable hip abduction — 3×12 each side, 15lb." },
          { name: "Smith machine calf raises — 3×8–10, heavy (60lb+ working up), 4s eccentric, straight + bent knee." },
        ],
        notes: "Split squat jumps and cable woodchops are new. Both must be pain-free. Smith machine for heavy calf work builds tendon resilience.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Agility + Sprint Work",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep: banded BW squats, ankle hops, A-skip, B-skip, Carioca." },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "10×40m sprints / walk back recovery", zone: "Z5" },
          { name: "Rest 3 min" },
          { name: "Agility circuit: 4×(sprint 10m, lateral shuffle 5m, backpedal 10m, sprint 10m). L ankle: control every direction change.", zone: "Z4–5" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Full multi-directional work. Lateral shuffle, not cutting. Orthotics in. L ankle taped/braced — fatigue + hypermobility + direction changes is highest roll risk.",
      },
      { day: "Friday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [], notes: "Recovery before Saturday." },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game or GYM Strength B",
        hrTarget: "Z2–5",
        sessions: [
          { name: "OPTION A — Pickup game (45–60 min). L ankle taped. Orthotics in boots. H10 active." },
          { name: "OPTION B — GYM Strength B: short lever Copenhagen 3×60s, RDLs, side lunges 1×30lb goblet, hip thrust 1×35lb, leg extension, Nordics 3×5, calf raises." },
        ],
        notes: "Pickup game is the single best thing for match fitness. If no game available, do Strength B. The H10 data from a real game will be your benchmark.",
      },
    ],
  });

  // WEEK 8
  weeks.push({
    number: 8,
    phase: "Soccer-Specific",
    focus: "Peak loading week before deload. Progress all weights. Pickup games continue.",
    progressionGate: "Can sustain 45 min mixed-intensity effort. Plyos tolerated. Nordic reps progressing. Ready for deload.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
      {
        day: "Monday",
        type: "conditioning",
        label: "Match Simulation (from door or gym)",
        hrTarget: "Z2–5 (mixed)",
        sessions: [
          { name: "Movement Prep: banded BW squats, A-skip, B-skip, Carioca." },
          { name: "2×20 min blocks: jog Z2, sprint 10–15s every 2 min, walk 30s recovery. 5 min rest between blocks.", zone: "mixed" },
        ],
        notes: "Longer blocks than Week 7. Building toward full-match energy systems.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength A (Peak Load)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank, FULL LEVER — 3×25s each side." },
          { name: "Side plank hip abduction — 3×30s each side." },
          { name: "Nordic curls — 3×6 (progress hand assistance — less support each week)." },
          { name: "Split squat jumps — 3×8 (progress height/depth from Week 7). LEFT leg forward: control landing depth." },
          { name: "Cable woodchops — 3×10 each side." },
          { name: "Pallof press — 3×10 each side." },
          { name: "DB 1-leg RDL — 3×10 (1×40lb R, 1×35lb L, 5s eccentric). Contralateral hand." },
          { name: "Stabilization lunge — 3×10 (2×35lb DB)." },
          { name: "Cable hip abduction — 3×12 each side, 15–20lb." },
          { name: "Smith machine calf raises — 3×10, heavy, 4s eccentric, straight + bent knee." },
        ],
        notes: "Peak loading week. These are the heaviest weights in the program. Everything gets dialled back next week.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Agility + Reactive Drills",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep: banded BW squats, ankle hops, A-skip, B-skip, Carioca." },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "8×40m sprints / walk back", zone: "Z5" },
          { name: "Rest 3 min" },
          { name: "Agility circuit: 6×(sprint 10m, lateral shuffle 5m, backpedal 10m, sprint 10m).", zone: "Z4–5" },
          { name: "Mirror drill intro: partner or cone-react, 4×15s. NEW — reactive agility.", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Mirror drills are the bridge from predictable gym movements to game chaos. If no partner, use ball-drop reactions or random cone touches.",
      },
      { day: "Friday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [] },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game or GYM Strength B",
        hrTarget: "Z2–5",
        sessions: [
          { name: "OPTION A — Pickup game (60+ min). L ankle taped. Orthotics in boots. H10 active." },
          { name: "OPTION B — GYM Strength B: short lever Copenhagen 3×60s, RDLs 1×40R/1×35L, side lunges 1×35lb goblet, hip thrust 1×40lb, leg extension, Nordics 3×6, calf raises." },
        ],
        notes: "Pickup game remains the priority. If no game, this is your heaviest Strength B before deload.",
      },
    ],
  });

  // WEEK 9 — DELOAD
  weeks.push({
    number: 9,
    phase: "Soccer-Specific",
    focus: "DELOAD WEEK. Reduce volume 40%, maintain intensity. Non-negotiable recovery week before final push.",
    progressionGate: "Feel recovered. Aches and niggles settling. Ready for Weeks 10–13 push.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
      {
        day: "Monday",
        type: "conditioning",
        label: "Easy Jog (from door)",
        hrTarget: "Z2",
        sessions: [
          { name: "15 min easy jog. No intervals. No tempo.", zone: "Z2" },
        ],
        notes: "Deload. Keep it genuinely easy.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Deload Strength (2 sets, same weight)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank, FULL LEVER — 2×15s each side." },
          { name: "Nordic curls — 2×3 (maintain form, reduce volume)." },
          { name: "Pallof press — 2×8 each side." },
          { name: "DB 1-leg RDL — 2×8 (same weights as Week 8: 1×40lb R, 1×35lb L)." },
          { name: "Stabilization lunge — 2×8 (2×35lb DB)." },
          { name: "Cable hip abduction — 2×10 each side." },
          { name: "Single-leg calf raises — 2×10, same weight. Wall touch." },
        ],
        notes: "DELOAD: 2 sets instead of 3. Same weights — maintain intensity, reduce volume. No split squat jumps, no woodchops. Bare minimum to keep patterns sharp.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Light Conditioning",
        hrTarget: "Z2–3",
        sessions: [
          { name: "20 min easy jog or elliptical. Z2–3 max.", zone: "Z2–3" },
          { name: "4×30m strides (not sprints — smooth and controlled)", zone: "Z3" },
        ],
        notes: "Deload. Strides keep the nervous system sharp without taxing recovery.",
      },
      { day: "Friday", type: "rest", label: "Rest + Tier 1", sessions: [] },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game (easy) or Rest",
        sessions: [
          { name: "OPTION A — Pickup game at moderate effort (don't chase everything, play smart). L ankle taped." },
          { name: "OPTION B — Full rest." },
        ],
        notes: "If you play, keep it at 70% effort. Deload means deload — even in games.",
      },
    ],
  });

  // WEEK 10
  weeks.push({
    number: 10,
    phase: "Soccer-Specific",
    focus: "Return to full intensity post-deload. Reactive agility emphasis. Pickup games are your primary tool now.",
    progressionGate: "Feel sharp and recovered from deload. Game fitness building. Can sustain 60 min mixed-intensity effort.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
      {
        day: "Monday",
        type: "conditioning",
        label: "Match Simulation (from door or gym)",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Movement Prep: banded BW squats, A-skip, B-skip, Carioca." },
          { name: "2×20 min blocks: jog Z2, sprint 10–15s every 90s, walk 30s recovery. 3 min rest between blocks.", zone: "mixed" },
        ],
        notes: "Back to full intensity post-deload. Sprint frequency increases — every 90s instead of every 2 min.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1 (2–3 rounds)", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength A (Full Intensity Return)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank, FULL LEVER — 3×25s each side." },
          { name: "Side plank hip abduction — 3×30s each side." },
          { name: "Nordic curls — 3×6 (same as Week 8 peak — re-establish)." },
          { name: "Split squat jumps — 3×8. Progress height/depth." },
          { name: "Cable woodchops — 3×10 each side." },
          { name: "Pallof press — 3×10 each side." },
          { name: "DB 1-leg RDL — 3×10 (1×40lb R, 1×35lb L). Contralateral hand." },
          { name: "Stabilization lunge — 3×10 (2×35lb DB)." },
          { name: "Cable hip abduction — 3×12 each side, 15–20lb." },
          { name: "Smith machine calf raises — 3×10, heavy, 4s eccentric." },
        ],
        notes: "Same weights as Week 8 peak. Post-deload you should feel stronger at these weights.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Reactive Agility",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep: banded BW squats, ankle hops, A-skip, B-skip, Carioca." },
          { name: "10 min jog warm-up", zone: "Z2" },
          { name: "6×40m sprints / walk back", zone: "Z5" },
          { name: "Mirror drills: 6×15s (partner or random cone touches).", zone: "Z4–5" },
          { name: "Lateral bounds — 3×6 each direction. SKIP if PTFJ reacts. NEW.", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Lateral bounds are new — explosive lateral power. Must be pain-free. L ankle taped/braced. Land softly through midfoot.",
      },
      { day: "Friday", type: "rest", label: "Rest + Tier 1", sessions: [] },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game or GYM Strength B",
        hrTarget: "Z2–5",
        sessions: [
          { name: "OPTION A — Pickup game (60–75 min). L ankle taped. Orthotics in boots. H10 active." },
          { name: "OPTION B — GYM Strength B: short lever Copenhagen, RDLs, side lunges 1×35lb, hip thrust 1×40lb, leg extension, Nordics, calf raises." },
        ],
        notes: "Game play is the priority. You should be feeling match-sharp by now.",
      },
    ],
  });

  // WEEK 11
  weeks.push({
    number: 11,
    phase: "Match Prep & Taper",
    focus: "Taper begins. Reduce volume, maintain intensity. Game play + sharpness.",
    progressionGate: "Match fitness building. Can play 60+ min at game intensity. Confidence in body increasing.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
      {
        day: "Monday",
        type: "conditioning",
        label: "Match Simulation (from door or gym)",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "1×20 min block: jog Z2, sprint 10–15s every 90s, walk recovery.", zone: "mixed" },
        ],
        notes: "Taper: single block instead of double. Maintain intensity, cut volume.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Strength (Taper — 2 sets)",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank, FULL LEVER — 2×25s each side." },
          { name: "Nordic curls — 2×5." },
          { name: "Split squat jumps — 2×6." },
          { name: "Cable woodchops — 2×8 each side." },
          { name: "DB 1-leg RDL — 2×10 (1×40lb R, 1×35lb L)." },
          { name: "Stabilization lunge — 2×10 (2×35lb DB)." },
          { name: "Smith machine calf raises — 2×10, same weight." },
        ],
        notes: "TAPER: 2 sets, same weights. Keep the patterns sharp without accumulating fatigue.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Sharpness Session",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "10 min jog", zone: "Z2" },
          { name: "6×30m sprints with full recovery", zone: "Z5" },
          { name: "Mirror drills or reactive agility: 4×15s", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Short and sharp. You should feel FAST after the taper.",
      },
      { day: "Friday", type: "rest", label: "Rest + Tier 1", sessions: [] },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Pickup game (60–75 min). L ankle taped. Orthotics in. H10 active." },
        ],
        notes: "Game play is the best taper tool. Play smart — test your fitness without wrecking yourself.",
      },
    ],
  });

  // WEEK 12
  weeks.push({
    number: 12,
    phase: "Match Prep & Taper",
    focus: "Final taper week. Minimal strength, maximum sharpness. Confidence building.",
    progressionGate: "Feel fast, recovered, and confident. Can play 75+ min at game intensity.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [] },
      {
        day: "Monday",
        type: "conditioning",
        label: "Light Match Sim",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "15 min: jog Z2 with 4×10s sprints. Easy.", zone: "Z2–4" },
        ],
        notes: "Just keeping the engine warm. Very low volume.",
      },
      { day: "Tuesday", type: "rest", label: "Rest + Tier 1", sessions: [] },
      {
        day: "Wednesday",
        type: "strength",
        label: "GYM — Activation Only",
        sessions: [
          { name: "Warm-up: 5 min bike or walk + BW squats 2×10" },
          { name: "Copenhagen plank — 2×20s each side." },
          { name: "Nordic curls — 2×3 (light, maintain pattern)." },
          { name: "DB 1-leg RDL — 2×8 (1×35lb R, 1×30lb L — lighter than peak)." },
          { name: "Stabilization lunge — 2×8 (2×30lb DB)." },
          { name: "Single-leg calf raises — 2×10, moderate weight." },
        ],
        notes: "Activation only. Lighter weights, fewer sets. Just keeping the motor patterns alive.",
      },
      {
        day: "Thursday",
        type: "conditioning",
        label: "GYM — Sharpness + Sprints",
        hrTarget: "Z4–5",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "10 min jog", zone: "Z2" },
          { name: "6×20m sprints with full recovery", zone: "Z5" },
          { name: "4×15s reactive agility", zone: "Z4" },
          { name: "8 min jog cool-down", zone: "Z2" },
        ],
        notes: "Short, sharp, explosive. You should feel the fastest you've felt all program.",
      },
      { day: "Friday", type: "rest", label: "Rest", sessions: [] },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pickup Game",
        hrTarget: "Z2–5",
        sessions: [
          { name: "Pickup game (60–75 min). Full kit: taped ankle, orthotics, H10." },
        ],
        notes: "Last hard game before match week. Play with confidence. Note how your body feels — this is your benchmark.",
      },
    ],
  });

  // WEEK 13 — MATCH WEEK
  weeks.push({
    number: 13,
    phase: "Match Prep & Taper",
    focus: "Match week. Stay sharp, stay fresh. Trust 13 weeks of work.",
    progressionGate: "YOU'RE MATCH READY.",
    days: [
      { day: "Sunday", type: "rest", label: "Full Rest", sessions: [], notes: "Tier 1 hip mobility once. Rest everything else." },
      {
        day: "Monday",
        type: "conditioning",
        label: "Light Match Sim",
        hrTarget: "Z2–4",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "15 min: easy jog with 4×30m strides.", zone: "Z2–4" },
        ],
        notes: "Keep the engine ticking. Low volume, moderate intensity.",
      },
      {
        day: "Tuesday",
        type: "strength",
        label: "GYM — Light Activation Only",
        sessions: [
          { name: "Abbreviated circuit — 2 sets, light weight. Activation only, not loading." },
          { name: "Single-leg calf raises 2×10 each, light. Maintenance." },
        ],
        notes: "Just enough to feel the patterns. No fatigue.",
      },
      { day: "Wednesday", type: "rest", label: "Rest + Tier 1 only", sessions: [] },
      {
        day: "Thursday",
        type: "conditioning",
        label: "Sharpening Session",
        hrTarget: "Z4–5",
        sessions: [
          { name: "10 min jog", zone: "Z2" },
          { name: "6×20m sprints with full recovery", zone: "Z5" },
          { name: "Light reactive agility × 4 reps", zone: "Z4" },
          { name: "10 min jog cool-down", zone: "Z2" },
        ],
        notes: "Last session before match. Short, sharp. You should feel FAST. If match is Saturday, do this Wednesday instead.",
      },
      {
        day: "Friday",
        type: "rest",
        label: "Rest — Pre-Match",
        sessions: [],
        notes: "Hydrate, eat well, sleep 8+ hours. Lay out your kit: boots with orthotics, ankle tape, H10 strap, shin guards.",
      },
      {
        day: "Saturday",
        type: "conditioning",
        label: "Pre-Match Activation",
        sessions: [
          { name: "Movement Prep drills." },
          { name: "10 min easy jog", zone: "Z2" },
          { name: "4×30m strides", zone: "Z3" },
          { name: "Dynamic stretching." },
        ],
        notes: "Just enough to feel loose and ready. If match is Sunday, this is your activation day. If match is Saturday, move this to Friday.",
      },
      {
        day: "Sunday",
        type: "match",
        label: "MATCH DAY",
        sessions: [
          { name: "Full warm-up with Movement Prep drills" },
          { name: "Play the full 90 minutes" },
          { name: "Wear your H10 — this is the data set you've been building toward" },
        ],
        notes: "Trust the 13 weeks. Manage your energy — don't sprint everything in the first 15 min. The fitness is there. Orthotics in boots. L ankle taped. Go play.",
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
              Karvonen method. Max 182 | Rest 60 | HRR 122. Polar H10 active.
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
                    <div style={{ fontSize: 13, color: zoneColors[z.zone - 1], fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>{z.bpm} bpm</div>
                    <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{z.desc}</div>
                  </div>
                </div>
              );
            })}
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
                Piriformis release is critical for ischial tuberosity recovery. Glutes release 3x/day maintains tissue quality around the nerve. Hollow hold builds core stability that protects everything else. The foot exercises (short foot, big toe press-downs, towel scrunches) rebuild intrinsic foot strength that your orthotics suppress. The ankle work (single-leg balance, alphabet tracing, banded dorsiflexion) is bilateral â€” L ankle for hypermobility control, R ankle for stability around the plantar plate and orthotics. Do foot and ankle work barefoot at home.
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
              {Array.from({ length: 13 }, (_, i) => i + 1).map((wk) => {
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
