// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FF_BG  = "'Bricolage Grotesque', sans-serif";
const FF_INT = "'Inter', sans-serif";

// ── Data ──────────────────────────────────────────────────────────────────────
// aspect: CSS aspect-ratio string ('4/3', '3/4', '1/1', etc.)
// bg/stripe: placeholder colors — replace the placeholder <div> with <img src="..."
//   style={{ width:'100%', height:'100%', objectFit:'cover' }} /> when you have photos

// interface Photo {
//   id: number;
//   caption: string;
//   tools: string;
//   desc: string;
//   aspect: string;
//   bg: string;
//   stripe: string;
// }

// const PHOTOS: Photo[] = [
//   { id: 1, caption: 'tamagotchi diary',    tools: 'PROCREATE',               desc: 'the daily log of one nori-chan',                        aspect: '4/5', bg: '#f3e5b7', stripe: '#dfbf4f' },
//   { id: 2, caption: 'henna patterns',      tools: 'INK · SCANNER',           desc: 'geometric mehndi sketches from my sketchbook',         aspect: '3/4', bg: '#f3c3c2', stripe: '#d3727a' },
//   { id: 3, caption: 'nature photos',       tools: 'FILM · IPHONE 15 PRO',    desc: 'golden-hour hunting, mostly at the wrong hour',        aspect: '4/3', bg: '#cfdfb1', stripe: '#90b659' },
//   { id: 4, caption: 'hirono collection',   tools: 'HIRONO · POPMART',         desc: 'currently at 14. halt me.',                            aspect: '1/1', bg: '#bcd6c7', stripe: '#6fbda7' },
//   { id: 5, caption: 'playlists',           tools: 'SPOTIFY · APPLE MUSIC',    desc: 'moods sorted by season — heavily rotated in autumn',   aspect: '3/4', bg: '#f3c3c2', stripe: '#af505e' },
//   { id: 6, caption: 'doodles',             tools: 'UNIBALL PEN · PAPER',      desc: 'back of every notebook i\'ve ever owned',              aspect: '4/3', bg: '#f3e5b7', stripe: '#c9a23e' },
//   { id: 7, caption: 'film camera roll',    tools: 'KODAK ULTRAMAX 400',       desc: 'somewhere between overexposed and perfect',            aspect: '2/3', bg: '#d4e5d4', stripe: '#6fa671' },
//   { id: 8, caption: 'procreate sketches',  tools: 'PROCREATE · IPAD PRO',    desc: 'a lot of hands, faces, and plants',                    aspect: '4/3', bg: '#f3e5b7', stripe: '#dfbf4f' },
// ];

// ── Card ──────────────────────────────────────────────────────────────────────

// function PhotoCard({ photo }: { photo: Photo }) {
//   const [hovered, setHovered] = useState(false);

//   return (
//     <div
//       style={{ marginBottom: '8px', breakInside: 'avoid' }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <div style={{
//         position: 'relative',
//         aspectRatio: photo.aspect,
//         overflow: 'hidden',
//         border: '1px solid black',
//       }}>
//         {/* ── Placeholder — swap for <img> when you have real photos ── */}
//         <div style={{
//           position: 'absolute', inset: 0,
//           background: `repeating-linear-gradient(45deg, ${photo.bg} 0 20px, ${photo.stripe}55 20px 40px)`,
//           transition: 'transform 400ms ease',
//           transform: hovered ? 'scale(1.04)' : 'scale(1)',
//         }} />

//         {/* Arrow badge */}
//         <div style={{
//           position: 'absolute', top: '10px', right: '10px',
//           width: '28px', height: '28px',
//           border: '1px solid black',
//           backgroundColor: '#f7f3e6',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           opacity: hovered ? 1 : 0,
//           transition: 'opacity 160ms ease',
//           zIndex: 2,
//           fontSize: '13px',
//         }}>
//           ↗
//         </div>

//         {/* Slide-up info panel */}
//         <div style={{
//           position: 'absolute', bottom: 0, left: 0, right: 0,
//           backgroundColor: '#f7f3e6',
//           borderTop: '1px solid black',
//           padding: '14px 16px 18px',
//           transform: hovered ? 'translateY(0)' : 'translateY(100%)',
//           transition: 'transform 240ms cubic-bezier(.25,1,.4,1)',
//           zIndex: 3,
//         }}>
//           <p style={{ margin: 0, fontFamily: FF_BG, fontWeight: 700, fontSize: '20px', letterSpacing: '0.02em', lineHeight: 1.1 }}>
//             {photo.caption}
//           </p>
//           <p style={{ margin: '5px 0 8px', fontFamily: FF_INT, fontSize: '11px', letterSpacing: '0.09em', color: '#666', fontWeight: 600 }}>
//             {photo.tools}
//           </p>
//           <p style={{ margin: 0, fontFamily: FF_INT, fontSize: '14px', lineHeight: 1.5, color: '#333' }}>
//             {photo.desc}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Fun() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: FF_INT }} className="page-enter">
      <nav className="flex flex-wrap justify-end gap-x-3 sm:gap-x-5 gap-y-1 px-4 sm:px-8 pt-4 pb-3 sm:pb-8 text-sm sm:text-[1.4rem] tracking-normal sm:tracking-[1.6px]">
        <button className="hover:opacity-70" onClick={() => navigate('/')}>[me!]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/experience')}>[experience]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/projects')}>[projects]</button>
        <span className="font-bold">[playground]</span>
      </nav>

      <div className="px-6 sm:px-10 pb-24 max-w-[1440px] mx-auto flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <p style={{ fontFamily: FF_BG, fontSize: '2rem', letterSpacing: '0.05em', color: '#aaa' }}>
          coming soon
        </p>
      </div>

      {/* gallery — restore when ready:
      <div className="px-6 sm:px-10 pb-24 max-w-[1440px] mx-auto">
        <div style={{ columns: 4, columnGap: '8px' }}>
          {PHOTOS.map(photo => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
      */}
    </div>
  );
}
