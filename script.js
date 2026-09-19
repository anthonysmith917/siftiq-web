const tabs = [...document.querySelectorAll(".feature-tab")];
const featureImage = document.querySelector("#feature-image");
const featureKicker = document.querySelector("#feature-kicker");
const featureTitle = document.querySelector("#feature-title");
const featureCopy = document.querySelector("#feature-copy");
const menuButton = document.querySelector(".menu-button");
const header = document.querySelector(".site-header");

const modalMarkup = `
  <div class="demo-modal" id="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title" aria-hidden="true">
    <div class="demo-modal-shell">
      <header><div class="demo-modal-brand"><img src="assets/siftiq-mark.png" alt=""><span><strong id="demo-modal-title">SiftIQ live workspace</strong><small>Interactive product preview</small></span></div><div class="demo-modal-actions"><a href="demo/" target="_blank" rel="noreferrer">Open full screen ↗</a><button type="button" data-close-demo aria-label="Close demo">×</button></div></header>
      <iframe data-demo-frame title="Interactive SiftIQ desktop mock"></iframe>
    </div>
  </div>`;
document.body.insertAdjacentHTML("beforeend", modalMarkup);
const demoModal = document.querySelector("#demo-modal");
const demoFrame = document.querySelector("[data-demo-frame]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    featureImage.src = tab.dataset.image;
    featureImage.alt = tab.dataset.alt;
    featureKicker.textContent = tab.dataset.kicker;
    featureTitle.textContent = tab.dataset.title;
    featureCopy.textContent = tab.dataset.copy;
  });
});

menuButton.addEventListener("click", () => {
  const open = header.classList.toggle("menu-open");
  menuButton.setAttribute("aria-expanded", String(open));
});

header.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll("[data-open-demo]").forEach((button) => button.addEventListener("click", () => {
  if (!demoFrame.src) demoFrame.src = "demo/";
  demoModal.classList.add("open");
  demoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}));

function closeDemo() {
  demoModal.classList.remove("open");
  demoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

document.querySelector("[data-close-demo]").addEventListener("click", closeDemo);
demoModal.addEventListener("click", (event) => { if (event.target === demoModal) closeDemo(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape" && demoModal.classList.contains("open")) closeDemo(); });
