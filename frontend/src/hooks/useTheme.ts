import { useState, useEffect } from 'react';

export function useTheme() {
  const [dark, setDark] = useState(() => localStorage.getItem('c1-theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('c1-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark((v) => !v);

  return [dark, toggle] as const;
}
