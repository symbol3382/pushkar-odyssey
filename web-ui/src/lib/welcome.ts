const STORAGE_KEY = 'pushkar-tour-welcomed';

export function shouldShowWelcome(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return sessionStorage.getItem(STORAGE_KEY) !== '1';
}

export function markWelcomeSeen(): void {
  sessionStorage.setItem(STORAGE_KEY, '1');
}
