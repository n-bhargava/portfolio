import { useNavigate } from 'react-router-dom';

type Page = 'me' | 'experience' | 'projects' | 'playground';

const PAGES: { key: Page; label: string; path: string; active: string; hover: string }[] = [
  { key: 'me',         label: 'me!',        path: '/',           active: '#d3727a', hover: '#f3c3c2' },
  { key: 'experience', label: 'experience', path: '/experience', active: '#90b659', hover: '#cfdfb1' },
  { key: 'projects',   label: 'projects',   path: '/projects',   active: '#f3d85b', hover: '#f3e5b7' },
  { key: 'playground', label: 'playground', path: '/playground', active: '#6fbda7', hover: '#bcd6c7' },
];

export function Header({ active }: { active: Page }) {
  const navigate = useNavigate();

  return (
    <nav
      className="flex flex-wrap justify-end gap-2 px-4 sm:px-8 pt-4 pb-3 sm:pb-8"
      style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
    >
      {PAGES.map(({ key, label, path, active: activeBg, hover }) =>
        key === active ? (
          <span
            key={key}
            className="border border-black px-2 sm:px-3 py-0.5 sm:py-1 font-bold text-lg sm:text-xl"
            style={{ backgroundColor: activeBg }}
          >
            {label}
          </span>
        ) : (
          <button
            key={key}
            className="border border-black px-2 sm:px-3 py-0.5 sm:py-1 font-bold text-lg sm:text-xl transition-colors"
            style={{ '--hover-bg': hover } as React.CSSProperties}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = hover)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '')}
            onClick={() => navigate(path)}
          >
            {label}
          </button>
        )
      )}
    </nav>
  );
}

export default Header;
