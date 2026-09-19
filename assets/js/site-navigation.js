document.addEventListener("DOMContentLoaded", () => {
  const topbar = document.querySelector(".landing-site .topbar");
  const toggle = topbar?.querySelector(".topbar-menu-toggle");
  const navigation = topbar?.querySelector(".topbar-actions");

  if (!(topbar instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) return;

  const mobileQuery = window.matchMedia("(max-width: 1120px)");

  const setMenuState = (open, returnFocus = false) => {
    const shouldOpen = Boolean(open && mobileQuery.matches);
    navigation.classList.toggle("is-open", shouldOpen);
    toggle.setAttribute("aria-expanded", String(shouldOpen));
    toggle.setAttribute("aria-label", shouldOpen ? "Cerrar menú principal" : "Abrir menú principal");
    document.body.classList.toggle("navigation-open", shouldOpen);

    if (mobileQuery.matches) navigation.setAttribute("aria-hidden", String(!shouldOpen));
    else navigation.removeAttribute("aria-hidden");

    if (returnFocus) toggle.focus();
  };

  const syncViewport = () => setMenuState(false);
  const syncScrollState = () => topbar.classList.toggle("is-scrolled", window.scrollY > 12);

  toggle.addEventListener("click", () => {
    setMenuState(toggle.getAttribute("aria-expanded") !== "true");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuState(false);
  });

  document.addEventListener("click", (event) => {
    if (!topbar.contains(event.target)) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenuState(false, true);
    }
  });

  mobileQuery.addEventListener("change", syncViewport);
  window.addEventListener("scroll", syncScrollState, { passive: true });

  syncViewport();
  syncScrollState();
});
