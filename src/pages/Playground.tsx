import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import businessCard from '../assets/business-card.svg';
import artboard1 from '../assets/artboard-1.svg';
import artboard2 from '../assets/artboard-2.svg';
import artboard3 from '../assets/artboard-3.svg';
import artboard4 from '../assets/artboard-4.svg';
import hmhas from '../assets/hmhas.svg';
import exquisiteCorpse from '../assets/exquisite-corpse.svg';
import zine1 from '../assets/zine-page-1.svg';
import zine2 from '../assets/zine-page-2.svg';
import calico from '../assets/calico.svg';
import snowman from '../assets/cap-snowman.svg';
import summit from '../assets/cap-summit.svg';
import cap from '../assets/cap.svg';
import frog from '../assets/frog-henna.svg';
import koi from '../assets/koi-henna.svg';
import henna from '../assets/henna.svg';
import hirono from '../assets/hirono.svg';
import painting from '../assets/painting.svg';
import waterfall from '../assets/waterfall.svg';
import yosemite from '../assets/yosemite.svg';


const FF_BG  = "'Bricolage Grotesque', sans-serif";
const FF_INT = "'Inter', sans-serif";

// ── Data ──────────────────────────────────────────────────────────────────────

interface ArtItem {
  id: number;
  caption: string;
  tools: string;
  desc: string;
  aspect: string;
  src: string;
}

const ITEMS: ArtItem[] = [
  { id: 1, caption: 'business card',    tools: 'INDESIGN',        desc: '',  aspect: '7/4',  src: businessCard },
  { id: 2, caption: 'when words scrabble',       tools: 'PHOTOSHOP',        desc: '',  aspect: '1/1',  src: artboard1 },
  { id: 3, caption: 'hit me hard and soft poster',            tools: 'ILLUSTRATOR',        desc: '',  aspect: '2/3',  src: hmhas },
  { id: 4, caption: 'summit',       tools: '',        desc: 'of El Capitan (feat. my campsite)',  aspect: '4/3',  src: summit },
  { id: 5, caption: 'yosemite',       tools: '',        desc: 'me + waterfall = <3',  aspect: '3/4',  src: yosemite },
  { id: 6, caption: 'frog henna',    tools: '',        desc: 'for a friend!',  aspect: '1/1',  src: frog },
  { id: 7, caption: 'calico critters',       tools: '',        desc: 'nature themed!!',  aspect: '4/3',  src: calico },
  { id: 8, caption: 'exquisite corpse', tools: 'PHOTOSHOP',  desc: '',  aspect: '3/4',  src: exquisiteCorpse },
  { id: 9, caption: 'connection',       tools: 'PHOTOSHOP',        desc: '',  aspect: '1/1',  src: artboard4 },
  { id: 10, caption: 'snowman',      tools: '',        desc: 'from my hike up El Capitan',  aspect: '3/2',  src: snowman },
  { id: 11, caption: 'koi henna',     tools: '',        desc: 'for a friend!',  aspect: '1/1',  src: koi },
  { id: 12, caption: 'celestial',       tools: 'PHOTOSHOP',        desc: '',  aspect: '1/1',  src: artboard3 },
  { id: 13, caption: 'El Capitan',           tools: '',        desc: 'post hike picture :)',  aspect: '3/4',  src: cap },
  { id: 14, caption: 'hirono',        tools: '',        desc: 'my first!',  aspect: '1/1',  src: hirono },
  { id: 15, caption: 'cover of Naysa\'s Trinkets Zine',   tools: 'INDESIGN',        desc: '',  aspect: '2/3',  src: zine1 },
  { id: 16, caption: 'hirono spread of Naysa\'s Trinkets Zine',   tools: 'INDESIGN',        desc: '',  aspect: '4/3',  src: zine2 },
  { id: 17, caption: 'flipping emergency',       tools: 'PHOTOSHOP',        desc: '',  aspect: '1/1',  src: artboard2 },
  { id: 18, caption: 'bear painting',       tools: '',        desc: '',  aspect: '5/6',  src: painting },
  { id: 19, caption: 'henna',         tools: '',        desc: 'one of my favorite henna designs i\'ve done on myself',  aspect: '1/1',  src: henna },
  { id: 20, caption: 'waterfall',      tools: '',        desc: '',  aspect: '3/4',  src: waterfall },
];

// ── Card ──────────────────────────────────────────────────────────────────────

function ArtCard({ item }: { item: ArtItem }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ marginBottom: '8px', breakInside: 'avoid' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{
        position: 'relative',
        aspectRatio: item.aspect,
        overflow: 'hidden',
        border: '1px solid black',
      }}>
        <img
          src={item.src}
          alt={item.caption}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 400ms ease',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        {/* Slide-up info panel */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          backgroundColor: '#f7f3e6',
          borderTop: '1px solid black',
          padding: '14px 16px 18px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 240ms cubic-bezier(.25,1,.4,1)',
          zIndex: 3,
        }}>
          <p style={{ margin: 0, fontFamily: FF_BG, fontWeight: 700, fontSize: '20px', letterSpacing: '0.02em', lineHeight: 1.1 }}>
            {item.caption}
          </p>
          <p style={{ margin: '5px 0 8px', fontFamily: FF_INT, fontSize: '11px', letterSpacing: '0.09em', color: '#666', fontWeight: 600 }}>
            {item.tools}
          </p>
          {item.desc && (
            <p style={{ margin: 0, fontFamily: FF_INT, fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
              {item.desc}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Playground() {
  useEffect(() => {
    document.documentElement.classList.add('no-noise');
    return () => document.documentElement.classList.remove('no-noise');
  }, []);

  return (
    <div style={{ fontFamily: FF_INT, position: 'relative', zIndex: 2 }} className="page-enter">
      <Header active="playground" />

      <div className="px-6 sm:px-10 pb-24 max-w-[1440px] mx-auto">
        <div style={{ columns: 3, columnGap: '8px' }}>
          {ITEMS.map(item => (
            <ArtCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
