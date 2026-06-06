import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CardSection } from '../components/CardSection';
import bulletinmain from '../assets/bulletin.svg'
import fccwmain from '../assets/fccwmain.svg'
import lumenmain from '../assets/lumenmain.svg';
import radiantmain from '../assets/radiantmain.svg'
import schedulemain from '../assets/schedulemain.svg'
import tortlemain from '../assets/tortlemain.svg'

const FF_BG   = "'Bricolage Grotesque', sans-serif";
const FF_INT  = "'Inter', sans-serif";
const FF_MONO = "'JetBrains Mono', ui-monospace, monospace";

const YELLOW_OUTER  = '#f3e5b7';
const YELLOW_DARK   = '#dfbf4f';
const YELLOW_BRIGHT = '#f3d85b';
const CREAM_BODY    = '#f7f3e6';
const PINK_SOFT     = '#f3c3c2';
const PINK_TAG      = '#d3727a';

// ── Types ─────────────────────────────────────────────────────────────────────

interface MetaItem       { label: string; value?: string; values?: string[]; isStatus?: boolean }
interface ProcessStep    { title: string; body: string }
interface CompareCol     { label: string; name: string; desc: string; highlight?: boolean }
interface InspoItem      { color: string; label: string }
interface DesignCard     { title: string; desc: string }

interface TextSection    { kind: 'text';    heading: string; body: string; quote?: string; body2?: string }
interface ProcessSection { kind: 'process'; heading: string; steps: ProcessStep[] }
interface CompareSection { kind: 'compare'; heading: string; cols: CompareCol[] }
interface DesignSection  { kind: 'design';  heading: string; body: string; inspo?: InspoItem[]; cards?: DesignCard[] }
interface NextSection    { kind: 'next';    heading: string; items: string[] }
interface ImagesSection  { kind: 'images';  heading: string; images: { src: string; caption: string }[] }
type CaseSection = TextSection | ProcessSection | CompareSection | DesignSection | NextSection | ImagesSection;

interface CaseStudy {
  title: string;
  tagline: string;
  meta: MetaItem[];
  heroImage?: string;
  heroCaption?: string;
  sections: CaseSection[];
  links: { label: string; href: string }[];
}

interface Project {
  id: string;
  title: string;
  date: string;
  body: string;
  hasCase: boolean;
  image?: string;
  imageW?: number | string;
  imageH?: number | string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  { id: 'lumen',               title: 'lumen',               date: '05.25-08.25', body: "AI-powered product insights platform that automatically turns fragmented user feedback into crystal-clear product decisions. Won Best Demo.", hasCase: false, image: lumenmain, imageW: 600, imageH: 500  },
  { id: 'bulletin',            title: 'bulletin',            date: '05.25-08.25', body: "Post a free window, see who's around without any plans or pressure. For the most spontaneous and most unplanned hangouts.", hasCase: true, image: bulletinmain, imageW: 600, imageH: 500},
  { id: 'fccw',                title: 'fccw',                date: '05.25-08.25', body: "Middleware CRM platform for the Feminist Center for Creative Work to help them keep their data consolidated and organized.", hasCase: false, image: fccwmain, imageW: 600, imageH: 450},
  { id: 'schedule-planner',    title: 'schedule planner',    date: '05.25-08.25', body: "Schedule planner that helps students at Vista Del Lago High School plan their ideal schedules. Adopted by Vista Del Lago High School in 2023.", hasCase: false, image: schedulemain, imageW: 600, imageH: 450 },
  { id: 'tortle',              title: 'tortle',              date: '05.25-08.25', body: "iOS app for mental health. Journal, log your mood, or meditate (or all three). Won the Congressional App Challenge for our district.", hasCase: false, image: tortlemain, imageW: 600, imageH: 450  },
  { id: 'radiant-reflections', title: 'radiant reflections', date: '05.25-08.25', body: "A mood tracking and wellness web app for women and gender minorities. Placed 2nd out of 85 hackathon submissions.", hasCase: false, image: radiantmain, imageW: 600, imageH: 450  },
];

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis lobortis odio. Donec non purus lectus. In vulputate turpis in ante sollicitudin iaculis. Pellentesque habitant morbi tristique senectus.';

const CASE_STUDIES: Record<string, CaseStudy> = {
  lumen: {
    title: 'lumen',
    tagline: 'AI-driven onboarding companion for new hires',
    meta: [
      { label: 'Role',  value: 'lead designer + full-stack' },
      { label: 'When',  value: 'may 2025 – aug 2025' },
      { label: 'Stack', value: 'React · TypeScript · Node · OpenAI · Postgres' },
    ],
    sections: [
      { kind: 'text',    heading: 'the problem', body: LOREM },
      { kind: 'text',    heading: 'my role',     body: 'I owned design and shipped the frontend end-to-end. ' + LOREM },
      { kind: 'process', heading: 'process', steps: [
        { title: 'research',  body: 'Interviews with 12 new hires across 4 teams to map confusion points.' },
        { title: 'prototype', body: 'Three click-through prototypes, narrowed to one direction in a stakeholder review.' },
        { title: 'ship',      body: 'Phased rollout, A/B\'d the first-day flow, iterated weekly on telemetry.' },
      ]},
      { kind: 'text', heading: 'outcome', body: 'Onboarding completion up, time-to-first-PR down, no measurable drop in week-2 retention.' },
    ],
    links: [{ label: 'see it live →', href: '#' }, { label: 'the github →', href: '#' }],
  },
  bulletin: {
  title: 'bulletin',
  tagline: 'A spontaneous hangout app for when you have a free hour and no one to spend it with.',
  heroImage: bulletinmain,
  meta: [
    { label: 'Role',   values: ['Solo Designer', 'Solo Developer'] },
    { label: 'Tools',  value: 'Figma' },
    { label: 'Status', values: ['Design complete', 'In development'], isStatus: true },
  ],
  sections: [
    {
      kind: 'text',
      heading: 'The "I\'m bored" text that goes nowhere',
      body: 'It\'s 2pm on a Tuesday. You have two free hours and nowhere to be. You open your texts, hover over a few names, and then put your phone down. It feels weird to mass-text people. You don\'t want to seem desperate. So you just don\'t.',
      quote: 'My friend and I were stuck in this loop constantly. Bored at the same odd hours, living near each other, with no easy way to figure out if the other was free. We\'d find out after the fact. Every time.',
      body2: 'The problem isn\'t that people don\'t want to hang out. It\'s that reaching out feels like a bigger ask than it actually is. Bulletin is about removing that friction. Making availability something you post, not something you negotiate.',
    },
    {
      kind: 'compare',
      heading: 'Partiful is great, but you need a plan first',
      cols: [
        {
          label: 'Existing tools',
          name: 'Partiful, iMessage, group chats',
          desc: 'All assume you already know what you\'re doing, when, and with who. They\'re coordination tools, not discovery tools. They work great once there\'s a plan, but they can\'t help you make one from scratch.',
        },
        {
          label: 'Where Bulletin fits',
          name: 'Unplanned, low-stakes availability',
          desc: 'Post a free window with loose details and a capacity. Whoever sees it first and wants in, signs up. No approval, no back-and-forth, no group chat needed.',
          highlight: true,
        },
      ],
    },
    {
      kind: 'design',
      heading: 'How the design came together',
      body: 'I started with lo-fi wireframes to figure out structure before touching color. The earliest frames were just placeholder blocks. I needed to know what the feed card had to communicate (title, time, location, who\'s going) before making it look like anything.\n\nFor the feed, I was using Reddit as a reference for how information hierarchy works at a glance. A designer friend flagged that my cards were too spread out and suggested condensing them so only the essential info shows upfront, with full details inside. That pushed me toward the tighter card layout with just a title, time and location tags, a photo, and a signup count.\n\nThe event detail view took the most rounds. Early on, the info fields (where, when, how many people, notes) looked like they could be tapped, which confused the hierarchy. The sign-up button was also getting lost. After feedback, I cleaned up the padding throughout and made the sign-up button the clear primary action, visually distinct from everything else on the screen.\n\nOne detail I liked was the message button. It\'s visible on every event, but the actual group chat doesn\'t open until the event closes, either because it filled up or it started. That way people aren\'t coordinating in a half-formed group chat before anyone\'s even committed.',
      cards: [
        { title: 'Condensed feed cards', desc: 'Inspired by Reddit\'s info hierarchy. Only the essentials show on the card: title, time, location, and who\'s already in. Full details open on tap.' },
        { title: 'First-come-first-serve signups', desc: 'No approval, no RSVP back-and-forth. You post a capacity, people claim spots. Simple and low-pressure on both sides.' },
        { title: 'Info that reads as info', desc: 'A big feedback round was making sure where/when/how many didn\'t look like interactive fields. They\'re display only. The sign-up button is the one thing you tap.' },
        { title: 'Sticky note color system', desc: 'Pink, blue, and yellow come straight from sticky note colors, which fit the bulletin board metaphor. Users pick the color for their own event, so the feed ends up feeling like an actual board with a mix of notes pinned to it.' },
        { title: 'Chat unlocks when the event closes', desc: 'There\'s a message button on every event, but the group chat only opens once enough people have signed up or the event has started. Keeps things from getting chaotic before the hangout is even confirmed.' },
      ],
    },
    {
      kind: 'images',
      heading: 'how it evolved',
      images: [
        { src: '', caption: 'early lo-fi, structure before color' },
        { src: '', caption: 'event detail modal, before feedback' },
        { src: '', caption: 'after condensing cards and fixing padding' },
      ],
    },
    {
      kind: 'next',
      heading: 'What I\'d actually do next',
      items: [
        'Start with my own friend group. I\'m the target user, so I\'ll know immediately if it\'s working.',
        'College students and people new to a city are the real wedge. They want low-stakes ways to hang out with people they don\'t know well yet.',
        'Figure out the download fatigue problem early. A web version might make more sense than going native right out of the gate.',
        'Location-aware discovery is a later layer, once there\'s enough density for it to actually be useful.',
      ],
    },
  ],
  links: [{ label: 'see the figma →', href: 'https://www.figma.com/proto/lwka27GWCuxaBrEOtax51T/-DES-203--UI-UX-Designs?node-id=0-1&t=xoKZ0qy0U5jbRl4T-1' }],
  },
  fccw: {
    title: 'fccw',
    tagline: 'community tools for our women-in-cs chapter',
    meta: [
      { label: 'Role',  value: 'tech lead' },
      { label: 'When',  value: 'aug 2024 – may 2025' },
      { label: 'Stack', value: 'Next.js · Tailwind · Firebase' },
    ],
    sections: [
      { kind: 'text',    heading: 'the problem', body: 'Mentor matching was happening in spreadsheets and the directory hadn\'t been touched in a year.' },
      { kind: 'text',    heading: 'my role',     body: 'Designed and built the v1 site, recruited two more engineers, set the contribution culture.' },
      { kind: 'process', heading: 'process', steps: [
        { title: 'scope',  body: 'Board interviews to figure out what\'s actually painful.' },
        { title: 'design', body: 'Chose a directory-first IA and validated with 8 members.' },
        { title: 'build',  body: 'Shipped in 6 weeks, handed off documentation.' },
      ]},
      { kind: 'text', heading: 'outcome', body: 'Mentor sign-ups doubled. The site is the chapter\'s front door now.' },
    ],
    links: [{ label: 'the site →', href: '#' }],
  },
  'schedule-planner': {
    title: 'schedule planner',
    tagline: 'visual schedule builder for USC students',
    meta: [
      { label: 'Role',  value: 'solo project' },
      { label: 'When',  value: 'spring 2024' },
      { label: 'Stack', value: 'Svelte · TypeScript' },
    ],
    sections: [
      { kind: 'text',    heading: 'the problem', body: 'Picking classes felt like spreadsheet warfare. Schedules conflict, room times shift, friends want to overlap.' },
      { kind: 'text',    heading: 'my role',     body: 'Design and build, end to end. Tried Svelte to learn it.' },
      { kind: 'process', heading: 'process', steps: [
        { title: 'data',  body: 'Reverse-engineered the USC catalog into a clean JSON.' },
        { title: 'ui',    body: 'Drag-and-drop schedule builder with live conflict detection.' },
        { title: 'share', body: 'Shareable links so you can plan with friends.' },
      ]},
      { kind: 'text', heading: 'outcome', body: '~450 USC students used it for spring registration.' },
    ],
    links: [{ label: 'try it →', href: '#' }],
  },
  tortle: {
    title: 'tortle',
    tagline: 'a friendly turtle-shaped pomodoro timer',
    meta: [
      { label: 'Role', value: 'solo, just for fun' },
      { label: 'When', value: 'a weekend, summer 2024' },
      { label: 'Stack', value: 'Vanilla JS · Canvas' },
    ],
    sections: [
      { kind: 'text', heading: 'the idea',       body: 'A turtle that walks across your screen as the pomodoro runs. He gets faster as you focus, sleepy if you don\'t.' },
      { kind: 'text', heading: 'what i learned', body: 'Canvas sprite animation, easing, and how to make something feel alive with very little code.' },
      { kind: 'text', heading: 'outcome',         body: 'Just a small joy. Friends use it. It made me happy.' },
    ],
    links: [{ label: 'say hi to tortle →', href: '#' }],
  },
  'radiant-reflections': {
    title: 'radiant reflections',
    tagline: 'a daily journaling app with mood-mapping',
    meta: [
      { label: 'Role',  value: 'design + iOS dev' },
      { label: 'When',  value: 'hackathon, oct 2024' },
      { label: 'Stack', value: 'Swift · SwiftUI · Firebase' },
    ],
    sections: [
      { kind: 'text',    heading: 'the problem', body: 'Most journals are text-only or mood-rating-only — neither captures how a day really felt.' },
      { kind: 'text',    heading: 'my role',     body: 'UX and iOS development across a 24-hour build.' },
      { kind: 'process', heading: 'process', steps: [
        { title: 'frame',   body: 'Mapped 6 mood dimensions to a color-wheel input.' },
        { title: 'draw',    body: 'Let users sketch the day\'s shape.' },
        { title: 'reflect', body: 'Weekly recap shows the shapes side by side.' },
      ]},
      { kind: 'text', heading: 'outcome', body: 'Best design award at the hackathon.' },
    ],
    links: [{ label: 'see the demo →', href: '#' }],
  },
};

// ── ProjectCard ───────────────────────────────────────────────────────────────

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <CardSection
      title={project.title}
      date={project.date}
      outerBg={YELLOW_OUTER}
      squareBg={YELLOW_DARK}
      headerBg={YELLOW_BRIGHT}
      dateBg={YELLOW_DARK}
      innerBg={CREAM_BODY}
      className={project.hasCase ? 'cursor-pointer' : ''}
      onClick={project.hasCase ? onClick : undefined}
      role={project.hasCase ? 'button' : undefined}
      tabIndex={project.hasCase ? 0 : undefined}
      onKeyDown={project.hasCase ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}
    >
      <div className="flex flex-col gap-3">
        <p className="text-[1.2rem] tracking-[1.4px] leading-snug" style={{ fontFamily: FF_INT }}>
          {project.body}
        </p>
        {project.image
          ? <img src={project.image} alt={project.title} style={{ width: '100%', aspectRatio: project.imageW && project.imageH ? `${project.imageW}/${project.imageH}` : '16/9', height: 'auto', objectFit: 'cover', border: '1px solid black', display: 'block' }} />
          : <div style={{ aspectRatio: '16/9', background: 'repeating-linear-gradient(45deg, #efe9d6 0 14px, #e5dec7 14px 28px)', border: '1px solid black' }} />
        }
        {project.hasCase && (
          <p className="proj-card-hint">read the case study →</p>
        )}
      </div>
    </CardSection>
  );
}

// ── Case study sub-components ─────────────────────────────────────────────────

function CsCloseBtn({ onClose }: { onClose: () => void }) {
  const [h, setH] = useState(false);
  return (
    <button
      onClick={onClose}
      aria-label="close case study"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        position: 'absolute', top: '18px', right: '22px',
        width: '38px', height: '38px',
        border: '1px solid black',
        backgroundColor: h ? PINK_TAG : PINK_SOFT,
        fontFamily: FF_BG, fontWeight: 700, fontSize: '22px',
        lineHeight: 1, cursor: 'pointer',
        transition: 'transform 180ms ease, background 180ms ease',
        transform: h ? 'rotate(-8deg) scale(1.05)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      ×
    </button>
  );
}

function CsStep({ stepNum, title, body }: { stepNum: number; title: string; body: string }) {
  const [h, setH] = useState(false);
  return (
    <li
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'flex', gap: '14px', padding: '16px 18px',
        backgroundColor: PINK_SOFT, border: '1px solid black',
        transition: 'transform 220ms ease',
        transform: h ? 'translateX(4px) rotate(-0.3deg)' : 'none',
      }}
    >
      <div style={{
        fontFamily: "'Akshar', sans-serif", fontWeight: 700,
        fontSize: '36px', lineHeight: 1, flexShrink: 0, color: '#7b0619',
      }}>
        {stepNum}
      </div>
      <div>
        <h4 style={{ margin: '0 0 4px', fontFamily: FF_BG, fontWeight: 700, fontSize: '17px', letterSpacing: '0.04em' }}>
          {title}
        </h4>
        <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.5 }}>{body}</p>
      </div>
    </li>
  );
}

function CsLinkBtn({ href, label }: { href: string; label: string }) {
  const [h, setH] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block',
        backgroundColor: h ? PINK_TAG : YELLOW_BRIGHT,
        border: '1px solid black', padding: '10px 18px',
        fontFamily: FF_BG, fontWeight: 700, fontSize: '14px', letterSpacing: '0.04em',
        textDecoration: 'none', color: 'inherit',
        transition: 'transform 180ms ease, background 180ms ease',
        transform: h ? 'translateY(-2px) rotate(-1deg)' : 'none',
      }}
    >
      {label}
    </a>
  );
}

// ── CaseStudyOverlay ──────────────────────────────────────────────────────────

function CaseStudyOverlay({ id, onClose }: { id: string; onClose: () => void }) {
  const cs = CASE_STUDIES[id];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!cs) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(40,30,20,0.55)',
        overflowY: 'auto',
        padding: '40px 16px',
        animation: 'csFade 280ms ease',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="px-4 sm:px-14 pt-8 sm:pt-16 pb-12"
        style={{
          position: 'relative',
          maxWidth: '880px',
          margin: '0 auto',
          backgroundColor: CREAM_BODY,
          border: '1px solid black',
          fontFamily: FF_INT,
          animation: 'csSlide 380ms cubic-bezier(.3,1.4,.5,1)',
        }}
      >
        {/* Yellow tape strip at top */}
        <div style={{
          position: 'absolute', top: '-14px', left: '50%',
          transform: 'translateX(-50%) rotate(-2deg)',
          width: '120px', height: '28px',
          backgroundColor: YELLOW_BRIGHT, border: '1px solid black',
          opacity: 0.92, boxShadow: '2px 3px 0 rgba(0,0,0,0.08)',
        }} />

        <CsCloseBtn onClose={onClose} />

        {/* Header */}
        <div style={{ marginBottom: '22px' }}>
          <h2 style={{ margin: 0, fontFamily: FF_BG, fontWeight: 700, fontSize: 'clamp(24px, 5vw, 44px)', letterSpacing: '-0.005em' }}>
            {cs.title}
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '17px', color: '#555', fontStyle: 'italic' }}>
            {cs.tagline}
          </p>
        </div>

        {/* Meta row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))',
          gap: '12px', padding: '16px 18px',
          border: '1px solid black', backgroundColor: YELLOW_OUTER,
          marginBottom: '28px',
        }}>
          {cs.meta.map(({ label, value, values, isStatus }) => {
            const lines = values ?? (value ? [value] : []);
            return (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontFamily: FF_MONO, fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555' }}>
                  {label}
                </span>
                {isStatus
                  ? <span style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {lines.map((v, j) => (
                        <span key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#639922', flexShrink: 0, display: 'inline-block' }} />
                          {v}
                        </span>
                      ))}
                    </span>
                  : <span style={{ fontSize: '15px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {lines.map((v, j) => <span key={j}>{v}</span>)}
                    </span>
                }
              </div>
            );
          })}
        </div>

        {/* Hero image */}
        {cs.heroImage
          ? <div style={{ marginBottom: '28px' }}>
              <img src={cs.heroImage} alt={cs.title} style={{ width: '100%', display: 'block', border: '1px solid black', objectFit: 'cover' }} />
              {cs.heroCaption && (
                <p style={{ margin: '8px 0 0', fontFamily: FF_MONO, fontSize: '11px', letterSpacing: '0.06em', color: '#888', textAlign: 'center' }}>
                  {cs.heroCaption}
                </p>
              )}
            </div>
          : <div style={{ marginBottom: '28px' }}>
              <div style={{ width: '100%', aspectRatio: '16/9', background: 'repeating-linear-gradient(45deg, #e6dec8 0 18px, #d9d0b6 18px 36px)', border: '1px solid black' }} />
            </div>
        }

        {/* Sections */}
        {cs.sections.map((s, i) => (
          <section key={i} style={{ marginBottom: '28px' }}>
            <h3 style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              margin: '0 0 12px', fontFamily: FF_BG, fontWeight: 700,
              fontSize: '22px', letterSpacing: '0.04em',
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: PINK_TAG, border: '1px solid black',
                padding: '2px 10px',
                fontFamily: FF_MONO, fontSize: '13px', fontWeight: 700, letterSpacing: '0.05em',
                transform: 'rotate(-3deg)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              {s.heading}
            </h3>

            {s.kind === 'text' && (
              <>
                <p style={{ margin: '0 0 0', fontSize: '16px', lineHeight: 1.55 }}>{s.body}</p>
                {s.quote && (
                  <blockquote style={{
                    margin: '16px 0',
                    padding: '12px 18px',
                    borderLeft: `3px solid ${PINK_TAG}`,
                    backgroundColor: YELLOW_OUTER,
                    border: `1px solid black`,
                    borderLeftWidth: '3px',
                    borderLeftColor: PINK_TAG,
                  }}>
                    <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.65, fontStyle: 'italic', color: '#555' }}>{s.quote}</p>
                  </blockquote>
                )}
                {s.body2 && (
                  <p style={{ margin: 0, fontSize: '16px', lineHeight: 1.55 }}>{s.body2}</p>
                )}
              </>
            )}

            {s.kind === 'process' && (
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '14px' }}>
                {s.steps.map((st, j) => (
                  <CsStep key={j} stepNum={j + 1} title={st.title} body={st.body} />
                ))}
              </ol>
            )}

            {s.kind === 'compare' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {s.cols.map((col, j) => (
                  <div key={j} style={{
                    padding: '16px 18px',
                    backgroundColor: col.highlight ? PINK_SOFT : YELLOW_OUTER,
                    border: `1px solid ${col.highlight ? PINK_TAG : 'black'}`,
                  }}>
                    <p style={{ margin: '0 0 6px', fontFamily: FF_MONO, fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: col.highlight ? PINK_TAG : '#666' }}>
                      {col.label}
                    </p>
                    <p style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 600 }}>{col.name}</p>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.6, color: '#555' }}>{col.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {s.kind === 'design' && (
              <>
                <p style={{ margin: '0 0 14px', fontSize: '16px', lineHeight: 1.55 }}>{s.body}</p>
                {s.inspo && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {s.inspo.map((pill, j) => (
                      <div key={j} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '5px 14px',
                        backgroundColor: YELLOW_OUTER, border: '1px solid black',
                        fontSize: '13px',
                      }}>
                        <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: pill.color, border: '1px solid rgba(0,0,0,0.15)', flexShrink: 0, display: 'inline-block' }} />
                        {pill.label}
                      </div>
                    ))}
                  </div>
                )}
                {s.cards && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {s.cards.map((card, j, arr) => (
                      <div
                        key={j}
                        style={{
                          padding: '16px 18px',
                          backgroundColor: j % 2 === 0 ? YELLOW_OUTER : PINK_SOFT,
                          border: '1px solid black',
                          gridColumn: arr.length % 2 !== 0 && j === arr.length - 1 ? '1 / -1' : undefined,
                          display: 'flex', flexDirection: 'column', gap: '8px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{
                            fontFamily: FF_MONO, fontSize: '11px', fontWeight: 700,
                            letterSpacing: '0.08em', backgroundColor: PINK_TAG,
                            padding: '2px 7px', border: '1px solid black', flexShrink: 0,
                          }}>
                            {String(j + 1).padStart(2, '0')}
                          </span>
                          <p style={{ margin: 0, fontFamily: FF_BG, fontSize: '15px', fontWeight: 700 }}>
                            {card.title}
                          </p>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.65, color: '#555' }}>
                          {card.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {s.kind === 'next' && (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {s.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '15px', lineHeight: 1.6 }}>
                    <span style={{
                      flexShrink: 0, marginTop: '6px',
                      width: 7, height: 7, borderRadius: '50%',
                      backgroundColor: PINK_TAG, display: 'inline-block',
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {s.kind === 'images' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {s.images.map((img, j) => (
                  <div key={j} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <img
                      src={img.src}
                      alt={img.caption}
                      style={{ width: '100%', display: 'block', border: '1px solid black', objectFit: 'cover' }}
                    />
                    <p style={{ margin: 0, fontFamily: FF_MONO, fontSize: '11px', letterSpacing: '0.06em', color: '#888', textAlign: 'center' }}>
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}

        {/* Links */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '10px',
          marginTop: '32px', paddingTop: '24px',
          borderTop: '1px dashed rgba(0,0,0,0.25)',
        }}>
          {cs.links.map((l, i) => (
            <CsLinkBtn key={i} href={l.href} label={l.label} />
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '28px', textAlign: 'center',
          fontFamily: FF_MONO, fontSize: '11px', letterSpacing: '0.06em',
          color: '#888', opacity: 0.7,
        }}>
          press{' '}
          <kbd style={{
            background: '#F0E8DB', border: '1px solid black',
            padding: '1px 6px', fontFamily: FF_MONO, fontSize: '11px',
          }}>
            esc
          </kbd>
          {' '}to close · or click outside
        </div>
      </div>
    </div>,
    document.body,
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Projects() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const openProject = id ?? null;

  return (
    <div style={{ fontFamily: FF_INT }} className="page-enter">
      {/* Navigation */}
      <nav className="flex flex-wrap justify-end gap-x-3 sm:gap-x-5 gap-y-1 px-4 sm:px-8 pt-4 pb-3 sm:pb-8 text-sm sm:text-[1.4rem] tracking-normal sm:tracking-[1.6px]">
        <button className="hover:opacity-70" onClick={() => navigate('/')}>[me!]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/experience')}>[experience]</button>
        <span className="font-bold">[projects]</span>
        <button className="hover:opacity-70" onClick={() => navigate('/fun')}>[playground]</button>
      </nav>

      {/* Grid */}
      <div className="px-6 sm:px-10 pb-16 max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard
            key={p.id}
            project={p}
            onClick={() => navigate(`/projects/${p.id}`)}
          />
        ))}
      </div>

      {openProject && (
        <CaseStudyOverlay id={openProject} onClose={() => navigate('/projects')} />
      )}
    </div>
  );
}
