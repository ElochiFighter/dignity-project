// ==========================================================================
// Rebuilding Health PBP — shared behavior
// Handles: mobile nav toggle, donation modal open/close, newsletter form stub
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* ---------- Donation modal ---------- */
  const modalOverlay = document.getElementById("donation-modal");
  const openTriggers = document.querySelectorAll("[data-open-donate]");
  const closeTriggers = modalOverlay
    ? modalOverlay.querySelectorAll("[data-close-donate]")
    : [];

  const openModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    const firstField = modalOverlay.querySelector("input, button");
    if (firstField) firstField.focus();
  };

  const closeModal = () => {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  openTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  closeTriggers.forEach((btn) => btn.addEventListener("click", closeModal));

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modalOverlay.classList.contains("open")) {
        closeModal();
      }
    });
  }

  /* ---------- Donation amount quick-select (Donate page) ---------- */
  const customAmountInput = document.getElementById("custom-amount");
  const amountRadios = document.querySelectorAll('input[name="amount"]');
  if (customAmountInput) {
    amountRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value !== "custom") customAmountInput.value = "";
      });
    });
    customAmountInput.addEventListener("focus", () => {
      const customRadio = document.getElementById("amount-custom");
      if (customRadio) customRadio.checked = true;
    });
  }

  /* ---------- Form submission stubs ---------- */
  // Replace these with real endpoints (Stripe/PayPal for donations,
  // Mailchimp/Constant Contact/etc. for the newsletter) when ready.
  document.querySelectorAll("form[data-stub]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const note = form.querySelector(".form-status");
      if (note) {
        note.textContent = "This is a template — connect a real form handler to go live.";
      }
    });
  });
});