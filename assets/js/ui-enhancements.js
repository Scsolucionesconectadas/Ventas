(() => {
  "use strict";

  const enhancedForms = new WeakSet();
  const buttonSnapshots = new WeakMap();
  const tooltipSelector = [
    ".icon-button[aria-label]",
    ".row-menu-button[aria-label]",
    ".experience-close-button[aria-label]",
    ".presentation-top-actions button[aria-label]",
    ".presentation-controls button[aria-label]",
  ].join(",");

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    enhanceWithin(document);
    document.addEventListener("invalid", handleInvalidField, true);
    document.addEventListener("input", handleFieldUpdate, true);
    document.addEventListener("change", handleFieldUpdate, true);
    document.addEventListener("reset", handleFormReset, true);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) enhanceWithin(node);
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  function enhanceWithin(root) {
    const tooltips = root.matches?.(tooltipSelector) ? [root] : Array.from(root.querySelectorAll?.(tooltipSelector) || []);
    tooltips.forEach(enhanceTooltip);

    const formSelector = "form.field-grid, form[data-contact-form]";
    const forms = root.matches?.(formSelector) ? [root] : Array.from(root.querySelectorAll?.(formSelector) || []);
    forms.forEach(enhanceForm);
  }

  function enhanceTooltip(control) {
    if (!(control instanceof HTMLElement) || control.dataset.uiTooltip) return;
    const label = control.getAttribute("aria-label")?.trim();
    if (!label) return;
    control.dataset.uiTooltip = label;
    if (!control.hasAttribute("title")) control.setAttribute("title", label);
  }

  function enhanceForm(form) {
    if (!(form instanceof HTMLFormElement) || enhancedForms.has(form)) return;
    enhancedForms.add(form);
    form.classList.add("ui-form-enhanced");

    getValidatableControls(form).forEach((control) => {
      control.setAttribute("aria-invalid", "false");
      control.addEventListener("blur", () => {
        if (!control.value && !control.dataset.uiTouched) return;
        control.dataset.uiTouched = "true";
        updateFieldState(control);
      });
    });
  }

  function handleInvalidField(event) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) return;
    const form = control.form;
    if (!form || !enhancedForms.has(form)) return;

    control.dataset.uiTouched = "true";
    updateFieldState(control);
    setFormStatus(form, "error", "Revisá los campos señalados antes de continuar.");
  }

  function handleFieldUpdate(event) {
    const control = event.target;
    if (!(control instanceof HTMLInputElement || control instanceof HTMLSelectElement || control instanceof HTMLTextAreaElement)) return;
    const form = control.form;
    if (!form || !enhancedForms.has(form)) return;

    if (control.disabled) {
      clearFieldState(control);
      return;
    }

    if (control.dataset.uiTouched === "true" || control.getAttribute("aria-invalid") === "true") {
      updateFieldState(control);
    }

    if (getValidatableControls(form).every((field) => field.disabled || field.validity.valid)) {
      clearFormStatus(form);
    }
  }

  function handleFormReset(event) {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !enhancedForms.has(form)) return;
    window.requestAnimationFrame(() => {
      getValidatableControls(form).forEach(clearFieldState);
      clearFormStatus(form);
    });
  }

  function updateFieldState(control) {
    if (control.disabled || control.validity.valid) {
      clearFieldState(control);
      return;
    }

    const container = getFieldContainer(control);
    if (!container) return;

    const feedback = ensureFieldFeedback(control, container);
    feedback.textContent = validationMessage(control);
    feedback.hidden = false;
    container.classList.add("is-invalid");
    container.classList.remove("is-valid");
    control.setAttribute("aria-invalid", "true");
    mergeDescribedBy(control, feedback.id);
  }

  function clearFieldState(control) {
    const container = getFieldContainer(control);
    const feedback = container?.querySelector(`[data-ui-feedback-for="${cssEscape(control.id)}"]`);
    container?.classList.remove("is-invalid", "is-valid");
    control.setAttribute("aria-invalid", "false");
    delete control.dataset.uiTouched;

    if (feedback) {
      feedback.textContent = "";
      feedback.hidden = true;
      removeDescribedBy(control, feedback.id);
    }
  }

  function getFieldContainer(control) {
    return control.closest(".form-field, .consent-field");
  }

  function getValidatableControls(form) {
    return Array.from(form.elements).filter((control) => (
      control instanceof HTMLInputElement
      || control instanceof HTMLSelectElement
      || control instanceof HTMLTextAreaElement
    ) && control.type !== "hidden");
  }

  function ensureFieldFeedback(control, container) {
    if (!control.id) control.id = `ui-field-${Math.random().toString(36).slice(2, 9)}`;
    let feedback = container.querySelector(`[data-ui-feedback-for="${cssEscape(control.id)}"]`);
    if (feedback) return feedback;

    feedback = document.createElement("small");
    feedback.className = "field-feedback";
    feedback.id = `${control.id}-feedback`;
    feedback.dataset.uiFeedbackFor = control.id;
    feedback.setAttribute("aria-live", "polite");
    feedback.hidden = true;
    container.appendChild(feedback);
    return feedback;
  }

  function validationMessage(control) {
    const { validity } = control;
    if (validity.valueMissing) {
      return control.type === "checkbox" ? "Necesitamos tu aceptación para enviar la consulta." : "Este campo es obligatorio.";
    }
    if (validity.typeMismatch && control.type === "email") return "Ingresá un email válido, por ejemplo nombre@empresa.com.";
    if (validity.tooShort) return `Ingresá al menos ${control.minLength} caracteres.`;
    if (validity.tooLong) return `El contenido no puede superar ${control.maxLength} caracteres.`;
    if (validity.patternMismatch) return "Revisá el formato de este campo.";
    if (validity.rangeUnderflow) return `El valor mínimo permitido es ${control.min}.`;
    if (validity.rangeOverflow) return `El valor máximo permitido es ${control.max}.`;
    return "Revisá este dato antes de continuar.";
  }

  function setFormStatus(form, type, message) {
    let status = form.querySelector(":scope > [data-ui-form-status]");
    if (!status) {
      status = document.createElement("div");
      status.dataset.uiFormStatus = "true";
      status.setAttribute("role", "alert");
      const heading = form.querySelector(":scope > .contact-form-heading");
      if (heading) heading.insertAdjacentElement("afterend", status);
      else form.prepend(status);
    }

    status.className = `ui-form-status is-${type}`;
    status.innerHTML = `<span aria-hidden="true"></span><strong>${escapeHtml(message)}</strong>`;
    status.hidden = false;
  }

  function clearFormStatus(form) {
    const status = form.querySelector(":scope > [data-ui-form-status]");
    if (!status) return;
    status.hidden = true;
    status.innerHTML = "";
  }

  function mergeDescribedBy(control, id) {
    const ids = new Set((control.getAttribute("aria-describedby") || "").split(/\s+/).filter(Boolean));
    ids.add(id);
    control.setAttribute("aria-describedby", Array.from(ids).join(" "));
  }

  function removeDescribedBy(control, id) {
    const ids = (control.getAttribute("aria-describedby") || "").split(/\s+/).filter((value) => value && value !== id);
    if (ids.length) control.setAttribute("aria-describedby", ids.join(" "));
    else control.removeAttribute("aria-describedby");
  }

  function setButtonState(button, state, label) {
    if (!(button instanceof HTMLButtonElement)) return;
    if (!buttonSnapshots.has(button)) {
      buttonSnapshots.set(button, {
        html: button.innerHTML,
        disabled: button.disabled,
        minWidth: button.style.minWidth,
        ariaBusy: button.getAttribute("aria-busy"),
        ariaLive: button.getAttribute("aria-live"),
      });
      button.style.minWidth = `${Math.ceil(button.getBoundingClientRect().width)}px`;
    }

    button.classList.remove("is-ui-loading", "is-ui-success", "is-ui-error");
    button.classList.add(`is-ui-${state}`);
    button.disabled = true;
    button.setAttribute("aria-live", "polite");

    if (state === "loading") {
      button.setAttribute("aria-busy", "true");
      button.innerHTML = `<span class="ui-button-spinner" aria-hidden="true"></span><span>${escapeHtml(label || "Procesando...")}</span>`;
    } else {
      button.removeAttribute("aria-busy");
      const icon = state === "success" ? "circle-check" : "triangle-alert";
      button.innerHTML = `<i data-lucide="${icon}" aria-hidden="true"></i><span>${escapeHtml(label || (state === "success" ? "Completado" : "Revisar"))}</span>`;
      refreshIcons();
    }
  }

  function restoreButton(button) {
    if (!(button instanceof HTMLButtonElement)) return;
    const snapshot = buttonSnapshots.get(button);
    if (!snapshot) return;

    button.innerHTML = snapshot.html;
    button.disabled = snapshot.disabled;
    button.style.minWidth = snapshot.minWidth;
    restoreAttribute(button, "aria-busy", snapshot.ariaBusy);
    restoreAttribute(button, "aria-live", snapshot.ariaLive);
    button.classList.remove("is-ui-loading", "is-ui-success", "is-ui-error");
    buttonSnapshots.delete(button);
    refreshIcons();
  }

  function completeButton(button, label, duration = 900) {
    setButtonState(button, "success", label);
    window.setTimeout(() => restoreButton(button), duration);
  }

  function failButton(button, label, duration = 1200) {
    setButtonState(button, "error", label);
    window.setTimeout(() => restoreButton(button), duration);
  }

  function restoreAttribute(element, name, value) {
    if (value === null) element.removeAttribute(name);
    else element.setAttribute(name, value);
  }

  function wait(duration) {
    return new Promise((resolve) => window.setTimeout(resolve, duration));
  }

  function refreshIcons() {
    window.lucide?.createIcons();
  }

  function cssEscape(value) {
    if (window.CSS?.escape) return window.CSS.escape(value || "");
    return String(value || "").replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  window.SCUI = Object.freeze({
    completeButton,
    failButton,
    restoreButton,
    setButtonState,
    setFormStatus,
    wait,
  });
})();
