export function trackEvent(eventName: string, parameters: Record<string, string | number | boolean> = {}) {
  if (typeof window === "undefined") return;
  const win = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, parameters);
    return;
  }
  const dataLayer = win.dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: eventName, ...parameters });
  }
}
