'use client';
export default function ThemeToggle() {
  function toggle() { const dark = !document.documentElement.classList.contains('dark'); document.documentElement.classList.toggle('dark', dark); localStorage.setItem('mitech-theme', dark ? 'dark' : 'light'); }
  return <button aria-label="Cambiar tema" onClick={toggle} className="h-10 w-10 rounded-full border line surface text-lg">◐</button>;
}
