Script.css;
/* Mobile nav toggle & close on item click */
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

if (burger && navLinks) {
  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("is-open");
  });

  navLinks.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a && navLinks.classList.contains("is-open")) {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

/* Sticky header */
const header = document.querySelector(".site-header");
const threshold = 40;
const updateHeaderBg = () => {
  const y = window.scrollY || 0;
  if (y > threshold) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
updateHeaderBg();
window.addEventListener("scroll", updateHeaderBg, { passive: true });

/* BMI Calculator (kg/m^2) + moving indicator */
const form = document.getElementById("bmi-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const hEl = document.getElementById("height");
    const wEl = document.getElementById("weight");
    const heightCm = parseFloat(hEl.value);
    const weightKg = parseFloat(wEl.value);
    if (!heightCm || !weightKg) return;

    const h = heightCm / 100;
    const bmi = weightKg / (h * h);

    const pointer = document.querySelector(".bmi-pointer");
    if (pointer) {
      const MIN = 15,
        MAX = 40;
      const clamped = Math.max(MIN, Math.min(MAX, bmi));
      const percent = ((clamped - MIN) / (MAX - MIN)) * 100;
      pointer.style.left = percent + "%";
      pointer.title = `BMI: ${bmi.toFixed(1)}`;
    }

    const out = document.getElementById("bmi-result");
    if (out) {
      let cat = "";
      if (bmi < 18.5) cat = "Underweight";
      else if (bmi < 25) cat = "Normal";
      else if (bmi < 30) cat = "Overweight";
      else if (bmi < 35) cat = "Obese";
      else cat = "Extremely Obese";
      out.innerHTML = `BMI: <strong>${bmi.toFixed(
        1
      )}</strong> — <em>${cat}</em>`;
    }
  });
}

/* Our Classes chips filter (accessible + fade-in) */
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".class-card");

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    if (chip.classList.contains("is-active")) return;
    chips.forEach((c) => {
      c.classList.remove("is-active");
      c.setAttribute("aria-pressed", "false");
    });
    chip.classList.add("is-active");
    chip.setAttribute("aria-pressed", "true");

    const tag = chip.dataset.class;
    cards.forEach((card) => {
      const show = card.dataset.tag === tag;
      card.hidden = !show;
      card.classList.remove("is-show");
      if (show) requestAnimationFrame(() => card.classList.add("is-show"));
    });
  });
});

/* Carousel auto-scroll */
const car = document.querySelector(".carousel");
if (car && car.dataset.autoscroll && car.scrollWidth > car.clientWidth) {
  setInterval(() => {
    car.scrollBy({ left: 280, behavior: "smooth" });
    if (car.scrollLeft + car.clientWidth >= car.scrollWidth - 5) {
      car.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, 2500);
}

/* Trainers hover preview for touch devices */
if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
  document.querySelectorAll(".t-card").forEach((card) => {
    const on = () => card.classList.add("is-hover");
    const off = () => card.classList.remove("is-hover");
    card.addEventListener("touchstart", on, { passive: true });
    card.addEventListener("touchend", off);
    card.addEventListener("touchcancel", off);
  });
}
