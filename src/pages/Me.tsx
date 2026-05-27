import { useState, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSection } from '../components/CardSection';
import cplusplus from '../assets/cplusplus.svg'
import css from '../assets/css3.svg'
import headshot from '../assets/headshot.svg'
import html5 from '../assets/html5.svg'
import java from '../assets/java.svg'
import javascript from '../assets/javascript.svg'
import python from '../assets/python.svg'
import react from '../assets/react.svg'
import resume from '../assets/resume.pdf'
import swift from '../assets/swift.svg'
import typescript from '../assets/typescript.svg'
import vuejs from '../assets/vuejs.svg'

const skills = [
  { name: 'python',     src: python,       rotation: 8 },
  { name: 'react',      src: react,        rotation: -18 },
  { name: 'typescript', src: typescript,   rotation: -8 },
  { name: 'c++',        src: cplusplus,    rotation: 21 },
  { name: 'java',       src: java,         rotation: 12 },
  { name: 'html',       src: html5,        rotation: 0 },
  { name: 'css',        src: css,          rotation: 0 },
  { name: 'javascript', src: javascript,   rotation: 0 },
  { name: 'swift',      src: swift,        rotation: -9 },
  { name: 'vue',        src: vuejs,        rotation: 0 },
];

const links = [
  {
    label: 'resume',
    href: resume,
  },
  {
    label: 'linkedin',
    href: 'https://www.linkedin.com/in/naysa-bhargava/',
  },
  {
    label: 'github',
    href: 'https://github.com/n-bhargava',
  },
] as const;

const FUN_OFFSETS   = [0,  8, 2];
const FACTS_OFFSETS = [8,  4, 0, 6, 2];

// ── Interactive name ──────────────────────────────────────────────────────────

function InteractiveName({ text }: { text: string }) {
  const letters = useMemo(() => text.split('').map(ch => ({ ch, isSpace: ch === ' ' })), [text]);
  const [waveCenter, setWaveCenter] = useState(-1);
  const [dancing, setDancing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLetterEnter = useCallback((i: number) => {
    if (dancing) return;
    setWaveCenter(i);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setWaveCenter(-1), 600);
  }, [dancing]);

  const onNameClick = useCallback(() => {
    setDancing(true);
    setWaveCenter(-1);
    setTimeout(() => setDancing(false), 800);
  }, []);

  return (
    <h1
      onClick={onNameClick}
      aria-label={text}
      style={{
        cursor: 'pointer',
        userSelect: 'none',
        fontFamily: "'Akshar', sans-serif",
        fontSize: 'clamp(1.9rem, 5vw, 4.2rem)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.005em',
        margin: 0,
        display: 'inline-block',
      }}
    >
      {letters.map((L, i) => {
        if (L.isSpace) {
          return <span key={i} style={{ display: 'inline-block', width: '0.32em' }}>&nbsp;</span>;
        }
        const dist = waveCenter < 0 ? Infinity : Math.abs(i - waveCenter);
        const isWave = !dancing && dist > 0 && dist <= 2;
        const classes = [
          'interactive-letter',
          isWave ? 'letter-wave' : '',
          dancing ? 'letter-dance' : '',
        ].filter(Boolean).join(' ');
        return (
          <span
            key={i}
            className={classes}
            style={dancing ? { animationDelay: `${(i % 9) * 30}ms` } : undefined}
            onMouseEnter={() => onLetterEnter(i)}
          >
            {L.ch}
          </span>
        );
      })}
    </h1>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Me() {
  const navigate = useNavigate();
  const [easterOn, setEasterOn] = useState(false);
  const [eggCount, setEggCount] = useState(0);

  const easterText =
    eggCount < 3 ? 'hi! 🌱' : eggCount < 6 ? 'still here :)' : 'ok ok stop poking';

  const handleFactMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="page-enter">
      {/* ── Navigation ── */}
      <nav className="flex flex-wrap justify-end gap-x-3 sm:gap-x-5 gap-y-1 px-4 sm:px-8 pt-4 pb-3 sm:pb-8 text-sm sm:text-[1.4rem] tracking-normal sm:tracking-[1.6px]">
        <span className="font-bold">[me!]</span>
        <button className="hover:opacity-70" onClick={() => navigate('/experience')}>[experience]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/projects')}>[projects]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/fun')}>[playground]</button>
      </nav>

      {/* ── Title (centered, interactive) ── */}
      <div className="px-8 pb-8 text-center">
        <InteractiveName text="NAYSA BHARGAVA" />
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(18px, 4.5vw, 28px)',
            color: '#444',
            letterSpacing: '0.04em',
            marginTop: '6px',
          }}
        >
          software developer
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(13px, 2.5vw, 18px)',
            color: '#444',
            letterSpacing: '0.04em',
          }}
        >
          full-stack | applied AI
        </p>
      </div>

      {/* ── Content ── */}
      <div className="px-6 sm:px-10 pb-16 max-w-[1440px] mx-auto space-y-4">

        {/* Welcome */}
        <CardSection title="welcome!!">
          <div className="space-y-6">
            <p className="text-[1.2rem] tracking-[1.4px] leading-snug">
              I got into tech because I loved making things that felt alive. Tiny websites,
              interactive experiments, little worlds people could explore. That sense of curiosity
              and childlike creativity still shapes the way I build today.
            </p>
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Headshot with easter egg */}
              <div
                className="shrink-0 w-[160px] sm:w-[200px] lg:w-[220px] mx-auto lg:mx-0"
                style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1/1' }}
                onClick={() => { setEasterOn(e => !e); setEggCount(c => c + 1); }}
                title="psst, click me"
              >
                <img
                  src={headshot}
                  alt="Portrait"
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    transition: 'transform 320ms ease',
                    transform: easterOn ? 'rotate(-2deg) scale(1.02)' : undefined,
                  }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(123,6,25,0.85)',
                  color: '#f7f3e6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700, fontSize: '14px',
                  opacity: easterOn ? 1 : 0,
                  transition: 'opacity 200ms ease',
                  textAlign: 'center', padding: '16px',
                }}>
                  {easterText}
                </div>
              </div>

              <div className="space-y-6 flex-1 text-[1.2rem] tracking-[1.4px] leading-snug">
                <p>
                  This little corner of the internet is a collection of the things I care about
                  most: thoughtful products, playful design, and technology that feels intuitive
                  and human.
                </p>
                <p>
                  I love working across the stack, from designing interfaces to building full-stack
                  products and experimenting with AI systems, especially projects involving AI
                  onboarding, social platforms, and interactive experiences.
                </p>
                <p>I hope you enjoy :)</p>
              </div>
            </div>
          </div>
        </CardSection>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-4 items-start">

          {/* ── Left column ── */}
          <div className="space-y-4">

            {/* Links */}
            <div className="border border-black p-5">
              <h3
                className="font-bold text-[1.4rem] tracking-[1.6px] mb-3"
                style={{ fontFamily: "'Finlandica', sans-serif" }}
              >
                links
              </h3>
              <div
                className="space-y-1 text-[1.4rem] tracking-[0.8px]"
                style={{ fontFamily: "'Finlandica', sans-serif" }}
              >
                {links.map(({ label, href }) => (
                  <a key={label} href= {href} className="link-hover" style={{ padding: '4px 0' }}>
                    {'>> '}{label}
                  </a>
                ))}
              </div>
            </div>

            {/* Fun facts */}
            <div className="border border-black p-5" style={{ backgroundColor: '#f3efe1' }}>
              {/* Bubble letters */}
              <div className="flex gap-3 mb-5">
                <div className="flex items-end">
                  {['f', 'u', 'n'].map((ch, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-0.5"
                      style={{ backgroundColor: '#c4a882', marginTop: FUN_OFFSETS[i] + 'px' }}
                    >
                      <span
                        className="font-bold text-[0.75rem] sm:text-[0.875rem] leading-none"
                        style={{ fontFamily: "'Akshar', sans-serif", color: '#f7f3e6' }}
                      >
                        {ch}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-end">
                  {['f', 'a', 'c', 't', 's'].map((ch, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-0.5"
                      style={{ backgroundColor: '#7c5642', marginTop: FACTS_OFFSETS[i] + 'px' }}
                    >
                      <span
                        className="font-bold text-[0.75rem] sm:text-[0.875rem] leading-none"
                        style={{ fontFamily: "'Akshar', sans-serif", color: '#f1eddf' }}
                      >
                        {ch}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p
                className="font-bold text-[1.3rem] tracking-[1.5px] mb-4"
                style={{ color: '#7b0619' }}
              >
                currently:
              </p>

              <div className="space-y-4 text-[1.2rem] leading-snug tracking-[0.32px]">
                {/* into */}
                <div
                  className="p-3 fact-highlight"
                  style={{ backgroundColor: '#f3c5c4' }}
                  onMouseMove={handleFactMove}
                >
                  <p className="font-bold tracking-[0.8px] mb-1" style={{ color: '#9b090e' }}>into</p>
                  <p>
                    collecting{' '}
                    <a href="/fun" className="font-bold underline">Hirono</a>
                    's (and various other trinkets), taking care of{' '}
                    <a href="/fun" className="font-bold underline">my Tamagotchi</a>. also,{' '}
                    <a href="/fun" className="font-bold underline">henna</a>.
                  </p>
                </div>

                {/* planning */}
                <div>
                  <p className="font-bold tracking-[0.8px] mb-1" style={{ color: '#9b090e' }}>planning</p>
                  <p>
                    my next adventure in{' '}
                    <a href="/fun" className="font-bold underline">nature</a>
                  </p>
                </div>

                {/* reminiscing on */}
                <div
                  className="p-3 fact-highlight"
                  style={{ backgroundColor: '#f3c5c3' }}
                  onMouseMove={handleFactMove}
                >
                  <p className="font-bold tracking-[0.8px] mb-1" style={{ color: '#9b090e' }}>reminiscing on</p>
                  <p>The Very Hungry Caterpillar</p>
                </div>

                {/* listening to */}
                <div>
                  <p className="font-bold tracking-[0.8px] mb-1" style={{ color: '#9b090e' }}>listening to</p>
                  <p>
                    anything {' '}
                    <a href="https://open.spotify.com/playlist/4rfyScOevBbOeZHQlcWMFY?si=OTFtUecpQd-L_uHBVO2SjQ" className="font-bold underline">bollywood</a> 
                    {' '} and the{' '}
                    <a href="https://open.spotify.com/show/4ZNGEoKCuO3X8a7dHLl13h?si=c13b6d01aca842c3" className="font-bold underline">Hey Tablo Podcast</a>
                  </p>
                </div>

                {/* reading */}
                <div
                  className="p-3 fact-highlight"
                  style={{ backgroundColor: '#f0c2c1' }}
                  onMouseMove={handleFactMove}
                >
                  <p className="font-bold tracking-[0.8px] mb-1" style={{ color: '#9b090e' }}>reading</p>
                  <p>Project Hail Mary</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ── */}
          <div className="space-y-4">

            {/* Skills */}
            <CardSection title="skills" noTilt>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-4 py-4">
                {skills.map(({ name, src, rotation }) => (
                  <div key={name} className="flex flex-col items-center gap-2 sm:gap-3 skill-item">
                    <div
                      className="w-[clamp(28px,6vw,78px)] h-[clamp(28px,6vw,78px)]"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    >
                      <img src={src} alt={name} className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[0.65rem] sm:text-[1.3rem] tracking-[0.3px] sm:tracking-[1.5px] text-center">{name}</p>
                  </div>
                ))}
              </div>
            </CardSection>

            {/* Education */}
            <CardSection title="education">
              <div className="space-y-8">
                <div>
                  <p className="text-[1.3rem] tracking-[1.5px] leading-snug">
                    University of Southern California
                  </p>
                  <p className="text-[1.3rem] tracking-[1.5px] leading-snug">
                    {`>> Computer Science / Business Administration (B.S.)`}
                  </p>
                  <ul className="list-disc pl-6 sm:pl-8 text-[1.15rem] tracking-[1.3px] space-y-1 mt-2">
                    <li>
                      GPA: 3.86
                    </li>
                    <li>
                      Courses: Introduction to Programming, Discrete Mathematics, Data Structures
                      and Algorithms, Introduction to Information Security, Applied Python
                    </li>
                    <li>Achievements: Dean's List (6x)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[1.3rem] tracking-[1.5px] leading-snug">
                    Vista Del Lago High School
                  </p>
                  <ul className="list-disc pl-6 sm:pl-8 text-[1.15rem] tracking-[1.3px] space-y-1 mt-2">
                    <li>GPA (UW/W): 4.0/4.4</li>
                    <li>
                      Courses: AP CSA, AP CSP, AP Calculus, AP Physics, AP Chemistry, AP Statistics
                    </li>
                    <li>
                      Involvement: UNICEF Club (President), National Honors Society (NHS),
                      California Scholarship Federation (CSF)
                    </li>
                    <li>Achievements: Valedictorian</li>
                  </ul>
                </div>
              </div>
            </CardSection>

          </div>
        </div>
      </div>
    </div>
  );
}
