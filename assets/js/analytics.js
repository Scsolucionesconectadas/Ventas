(function () {
  "use strict";

  const source = document.currentScript;
  const token = source?.dataset.cloudflareToken?.trim() || "";

  window.SCAnalytics = Object.freeze({
    provider: "cloudflare-web-analytics",
    enabled: Boolean(token),
  });

  if (!token) return;

  const beacon = document.createElement("script");
  beacon.defer = true;
  beacon.src = `https://static.cloudflareinsights.com/beacon.min.js?token=${encodeURIComponent(token)}`;
  beacon.dataset.cfBeacon = JSON.stringify({ token });
  document.head.appendChild(beacon);
})();
