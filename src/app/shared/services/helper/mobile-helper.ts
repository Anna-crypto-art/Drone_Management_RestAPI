export function getMobileQuery(): MediaQueryList {
  return window.matchMedia("screen and (max-width: 1000px)");
}

export function isOnMobileDevice(): boolean {
  return getMobileQuery().matches;
}