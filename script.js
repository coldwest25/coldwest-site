document.documentElement.classList.add("js");

const LANG = document.documentElement.lang === "en" ? "en" : "ar";
const WA = "966550197070";
const waLink = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

/* ---------- Symptom picker ---------- */
const SYMPTOMS_AR = {
  cool: {
    title: "المكيف شغّال بس ما يبرد زين",
    causes: [
      "نقص في الفريون، وغالبًا وراه تسريب لازم ينصلح قبل التعبئة",
      "فلاتر وشبكة المبخر متسخة وتخنق الهواء",
      "ضعف في الكمبروسر أو الكباستر",
    ],
    todo: "نقيس ضغط الفريون، ننظف الفلاتر، ونحدد القطعة الخربانة قبل ما نغيّر أي شي.",
    msg: "السلام عليكم، المكيف شغّال بس ما يبرد زين. أبغى فني يكشف عليه.",
  },
  drip: {
    title: "المكيف يقطّر ماي من الوحدة الداخلية",
    causes: [
      "مجرى التصريف مسدود بالغبار أو الطحالب",
      "الوحدة الداخلية مركّبة بميلان غلط",
      "تجمّد على المبخر بسبب نقص فريون أو فلتر متسخ",
    ],
    todo: "نفتح مجرى التصريف ونغسله، نضبط ميلان الوحدة، ونتأكد إن الفريون مضبوط عشان ما يرجع التجمّد.",
    msg: "السلام عليكم، المكيف يقطّر ماي من الوحدة الداخلية. أبغى فني يشوفه.",
  },
  noise: {
    title: "المكيف صوته عالي أو فيه طقطقة",
    causes: [
      "مروحة متسخة أو مو متزنة",
      "براغي التثبيت مرتخية في الوحدة الداخلية أو الخارجية",
      "الكمبروسر يشتغل تحت ضغط عالي",
    ],
    todo: "نحدد مصدر الصوت بالضبط، نشد التثبيت وننظف المروحة، ونقيس ضغط التشغيل.",
    msg: "السلام عليكم، المكيف صوته عالي وفيه طقطقة. أبغى فني يكشف عليه.",
  },
  trip: {
    title: "المكيف يفصل ويرجع يشتغل",
    causes: [
      "كباستر ضعيف ما يشغّل الكمبروسر صح",
      "الوحدة الخارجية حارة زيادة: مكثف متسخ أو مكان مكتوم",
      "حساس حرارة أو لوحة تحكم فيها خلل",
    ],
    todo: "نفحص الكباستر والكهرباء الواصلة، ننظف المكثف، ونراقب تشغيل المكيف لين يستقر.",
    msg: "السلام عليكم، المكيف يفصل ويرجع يشتغل. أبغى فني يكشف عليه.",
  },
  smell: {
    title: "تطلع من المكيف ريحة غريبة",
    causes: [
      "رطوبة وعفن على المبخر وفي مجرى التصريف",
      "غبار متراكم داخل الوحدة",
      "ريحة احتراق من الكهرباء أو المروحة",
    ],
    alert: "لو الريحة ريحة احتراق: افصل المكيف من الكهرباء الحين واتصل علينا مباشرة.",
    todo: "نغسل الوحدة الداخلية والمبخر بالكامل، نعقّم مجرى التصريف، ونفحص التوصيلات الكهربائية.",
    msg: "السلام عليكم، تطلع من المكيف ريحة غريبة. أبغى فني يشوفه.",
  },
  fridge: {
    title: "الثلاجة أو غرفة التبريد ما تبرد",
    causes: [
      "تسريب أو نقص في الفريون",
      "مروحة المبخر أو المكثف واقفة",
      "خلل في الثرموستات أو في دورة إذابة الثلج",
    ],
    todo: "نقيس الضغط، نشيك المراوح والثرموستات، ونقول لك إذا البضاعة تحتاج تنتقل لين نخلص.",
    msg: "السلام عليكم، الثلاجة ما تبرد زين. أبغى فني يكشف عليها.",
  },
};

const SYMPTOMS_EN = {
  cool: {
    title: "The AC runs but does not cool well",
    causes: [
      "Low refrigerant, usually from a leak that must be fixed before recharging",
      "Dirty filters and evaporator coil restricting the airflow",
      "A weak compressor or capacitor",
    ],
    todo: "We measure refrigerant pressure, clean the filters, and identify the faulty part before replacing anything.",
    msg: "Hello, my AC runs but does not cool well. I need a technician to inspect it.",
  },
  drip: {
    title: "The AC is dripping water from the indoor unit",
    causes: [
      "A drain line blocked by dust or algae",
      "The indoor unit is installed at the wrong slope",
      "Ice on the evaporator from low refrigerant or a dirty filter",
    ],
    todo: "We clear and wash the drain line, correct the unit's slope, and check the refrigerant so the ice does not come back.",
    msg: "Hello, my AC is dripping water from the indoor unit. I need a technician to look at it.",
  },
  noise: {
    title: "The AC is loud or rattling",
    causes: [
      "A dirty or unbalanced fan",
      "Loose mounting screws on the indoor or outdoor unit",
      "The compressor running at high pressure",
    ],
    todo: "We find the exact source of the noise, tighten the mounts, clean the fan, and measure the operating pressure.",
    msg: "Hello, my AC is loud and rattling. I need a technician to inspect it.",
  },
  trip: {
    title: "The AC cuts out and restarts",
    causes: [
      "A weak capacitor that does not start the compressor properly",
      "An overheating outdoor unit: a dirty condenser or a poorly ventilated spot",
      "A faulty temperature sensor or control board",
    ],
    todo: "We check the capacitor and the power supply, clean the condenser, and watch the AC until it runs steadily.",
    msg: "Hello, my AC cuts out and restarts. I need a technician to inspect it.",
  },
  smell: {
    title: "A strange smell is coming from the AC",
    causes: [
      "Moisture and mold on the evaporator and in the drain line",
      "Dust built up inside the unit",
      "A burning smell from the wiring or the fan",
    ],
    alert: "If it smells like burning: unplug the AC now and call us directly.",
    todo: "We fully wash the indoor unit and evaporator, sanitize the drain line, and check the electrical connections.",
    msg: "Hello, there is a strange smell coming from my AC. I need a technician to look at it.",
  },
  fridge: {
    title: "The refrigerator or cold room is not cooling",
    causes: [
      "A refrigerant leak or low refrigerant",
      "A stopped evaporator or condenser fan",
      "A fault in the thermostat or the defrost cycle",
    ],
    todo: "We measure the pressure, check the fans and thermostat, and tell you if your stock needs to be moved until we finish.",
    msg: "Hello, my refrigerator is not cooling well. I need a technician to inspect it.",
  },
};
const SYMPTOMS = LANG === "en" ? SYMPTOMS_EN : SYMPTOMS_AR;

const chips = document.querySelectorAll(".chip");
const panel = document.querySelector(".diag-panel");
const heading = document.getElementById("diag-heading");
const causes = document.getElementById("diag-causes");
const alertBox = document.getElementById("diag-alert");
const todo = document.getElementById("diag-do");
const diagCta = document.getElementById("diag-cta");

function renderSymptom(key, animate) {
  const s = SYMPTOMS[key];
  const apply = () => {
    heading.textContent = s.title;
    causes.replaceChildren(...s.causes.map((c) => Object.assign(document.createElement("li"), { textContent: c })));
    alertBox.hidden = !s.alert;
    alertBox.textContent = s.alert || "";
    todo.textContent = s.todo;
    diagCta.href = waLink(s.msg);
    diagCta.dataset.symptom = key;
    panel.classList.remove("is-swapping");
  };
  if (!animate || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
  panel.classList.add("is-swapping");
  setTimeout(apply, 180);
}

chips.forEach((chip, idx) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.setAttribute("aria-selected", String(c === chip)));
    renderSymptom(chip.dataset.sym, true);
  });
  chip.addEventListener("keydown", (e) => {
    const forward = LANG === "en" ? "ArrowRight" : "ArrowLeft";
    const back = LANG === "en" ? "ArrowLeft" : "ArrowRight";
    const step = e.key === forward ? 1 : e.key === back ? -1 : 0;
    if (!step) return;
    const next = chips[(idx + step + chips.length) % chips.length];
    next.focus();
    next.click();
  });
});
renderSymptom("cool", false);

/* ---------- Parts origin ---------- */
const NOTES_AR = {
  cn: "الصيني يرجّع المكيف يشتغل بأقل تكلفة. نقول لك بصراحة كم نتوقع يعيش.",
  in: "الهندي خيار كثير من عملائنا: سعر معقول وعمر أطول من الأرخص.",
  us: "الأمريكي أغلى، بس لو المكيف جديد وتبي تريّح راسك سنين، هو الخيار.",
  used: "المستعمل نفحصه قبل التركيب، ونقترحه بس لما يكون منطقي لعمر مكيفك.",
};
const NOTES_EN = {
  cn: "Chinese parts get the AC running at the lowest cost. We tell you honestly how long we expect them to last.",
  in: "Indian parts are a choice many of our customers make: a reasonable price and a longer life than the cheapest option.",
  us: "American parts cost more, but if the AC is new and you want years of peace of mind, this is the choice.",
  used: "We test used parts before installing them, and suggest them only when they make sense for the age of your AC.",
};
const NOTES = LANG === "en" ? NOTES_EN : NOTES_AR;
const SHOW_PART = LANG === "en" ? " Before installation we show you the part and its box." : " قبل التركيب نوريك القطعة وعلبتها.";
const origins = document.querySelectorAll(".origin");
const originNote = document.getElementById("origin-note");
origins.forEach((o, idx) => {
  o.addEventListener("click", () => {
    origins.forEach((x) => x.setAttribute("aria-checked", String(x === o)));
    originNote.textContent = NOTES[o.dataset.o] + SHOW_PART;
  });
  o.addEventListener("keydown", (e) => {
    const forward = LANG === "en" ? "ArrowRight" : "ArrowLeft";
    const back = LANG === "en" ? "ArrowLeft" : "ArrowRight";
    const step = [forward, "ArrowDown"].includes(e.key) ? 1 : [back, "ArrowUp"].includes(e.key) ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = origins[(idx + step + origins.length) % origins.length];
    next.focus();
    next.click();
  });
});

/* ---------- Hero reading: one count-down on load ---------- */
const counter = document.querySelector("[data-count-from]");
if (counter && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const from = +counter.dataset.countFrom;
  const to = +counter.dataset.countTo;
  const dur = 1600;
  counter.textContent = from;
  setTimeout(() => {
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      counter.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, 550);
}

/* ---------- Analytics: Google Analytics 4, plus whatsapp_click / call_click events ---------- */
const GA_ID = "G-5LYTYQK1WR";
window.dataLayer = window.dataLayer || [];
function gtag() { window.dataLayer.push(arguments); }
if (GA_ID) {
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(tag);
  gtag("js", new Date());
  gtag("config", GA_ID);
}
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-track]");
  if (!a) return;
  gtag("event", a.dataset.track, { place: a.dataset.place || "", symptom: a.dataset.symptom || "", page_language: LANG });
});

/* ---------- Brand fonts, packaged per the Thmanyah licence: no font file is served ---------- */
if (document.documentElement.lang !== "en") {
  (async () => {
    const res = await fetch(new URL("assets/app/brand.dat", document.baseURI));
    if (!res.ok) return;
    const data = new Uint8Array(await res.arrayBuffer());
    const key = [31,235,82,236,120,165,25,194,131,227,49,185,133,44,140,53,249,15,248,40,192,209,134,170,23,230,11,115,65,25,117,64];
    for (let i = 0; i < data.length; i++) data[i] ^= key[i % 32] ^ ((i * 31) & 255);
    let at = 0;
    for (const [family, weight, size] of [["Thmanyah Display",700,81988],["Thmanyah Display",500,82552],["Thmanyah Sans",400,77776],["Thmanyah Sans",500,79064],["Thmanyah Sans",700,79160]]) {
      const face = new FontFace(family, data.slice(at, at + size), { weight: String(weight), display: "swap" });
      at += size;
      document.fonts.add(await face.load());
    }
  })().catch(() => {});
}
