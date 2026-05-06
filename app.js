(function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!location.protocol.startsWith("http")) return;

  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {
      // PWA registration is optional; the landing page remains fully usable.
    });
  });
})();
