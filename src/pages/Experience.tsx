import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardSection } from '../components/CardSection';
import annotators from '../../public/annotators.pdf'
import campfire from '../assets/campfire.svg'
import datebetter from '../assets/datebetter.svg'
import fccw from '../assets/fccw.svg'
import google from '../assets/google.svg';
import lavabonfire from '../assets/lavabonfire.svg'
import lavademo from '../assets/lavademo.svg'
import lavaladies from '../assets/lavaladies.svg'
import lavaretreat from '../assets/lavaretreat.svg'
import lovectc from '../assets/lovectc.svg'
import lumen from '../assets/lumen.svg';
import paper from '../assets/paper.svg'
import poster from '../assets/poster.svg'
import team from '../assets/team.svg'
import vpaper from '../assets/vpaper.svg'
import vryan from '../../public/vRyan.pdf'

const IMG_TMG     = 'https://www.figma.com/api/mcp/asset/93550f64-0fc4-45b4-9e61-c813acd9342d';
const IMG_USC     = 'https://www.figma.com/api/mcp/asset/c7e3b6c4-7fda-4f60-b214-64511f0927a9';
const IMG_LAVALAB = 'https://www.figma.com/api/mcp/asset/4de4f249-1e1e-4133-8407-e1f90e3083f5';
const IMG_CTC     = 'https://www.figma.com/api/mcp/asset/c10b24a6-30f8-49b3-9f02-09c82b4b39ea';
const IMG_PORTICO = 'https://www.figma.com/api/mcp/asset/b5cf03fd-f22a-44ec-9039-653be58eadb2';
const IMG_SCOWTT  = 'https://www.figma.com/api/mcp/asset/cdc0aba6-a9a2-4a72-b246-b3bdaa75e3ff';
const IMG_GOOGLE  = 'https://www.figma.com/api/mcp/asset/d071b0a8-e2d2-4a42-a986-d9c78b7c8e2f';


const FF_BG  = "'Bricolage Grotesque', sans-serif";
const FF_INT = "'Inter', sans-serif";
const FF_FIN = "'Finlandica', sans-serif";

// ── Tag link (scroll-to) ─────────────────────────────────────────────────────
function TagLink({ label, target }: { label: string; target: string }) {
  return (
    <button
      onClick={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}
      className="border border-black px-4 py-2 text-[1.75rem] font-bold tracking-[1.5px] hover:opacity-80 transition-opacity"
      style={{ fontFamily: FF_BG, backgroundColor: '#f7f3e6' }}
    >
      {label}
    </button>
  );
}

// ── Draggable images ─────────────────────────────────────────────────────────

export interface DragItem {
  w: number; h: number; initX: number; initY: number; rot: number; src: string; caption?: string;
}

function DraggableImagesArea({ items }: { items: DragItem[] }) {
  const [positions, setPositions] = useState(() => items.map(d => ({ x: d.initX, y: d.initY })));
  const [topIdx, setTopIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const dragging = useRef<{ idx: number } | null>(null);
  const lastClient = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const containerH = Math.max(260, Math.max(...items.map(d => d.h)) + 40);
  const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);
  const getZoom = () => parseFloat(getComputedStyle(document.body).zoom || '1') || 1;

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: containerH, marginTop: 28, userSelect: 'none', overflow: 'hidden' }}
      onMouseMove={(e) => {
        if (!dragging.current) return;
        const zoom = getZoom();
        const dx = (e.clientX - lastClient.current.x) / zoom;
        const dy = (e.clientY - lastClient.current.y) / zoom;
        lastClient.current = { x: e.clientX, y: e.clientY };
        const { idx } = dragging.current;
        const item = items[idx];
        const containerW = containerRef.current?.offsetWidth ?? 800;
        setPositions(prev => prev.map((p, i) => i === idx ? {
          x: clamp(p.x + dx, 0, Math.max(0, containerW - item.w)),
          y: clamp(p.y + dy, 0, Math.max(0, containerH - item.h)),
        } : p));
      }}
      onMouseUp={() => { dragging.current = null; }}
      onMouseLeave={() => { dragging.current = null; setHoveredIdx(null); }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          onMouseDown={(e) => {
            e.preventDefault();
            setTopIdx(i);
            setHoveredIdx(null);
            lastClient.current = { x: e.clientX, y: e.clientY };
            dragging.current = { idx: i };
          }}
          onMouseEnter={() => { if (!dragging.current) setHoveredIdx(i); }}
          onMouseLeave={() => setHoveredIdx(null)}
          style={{
            position: 'absolute',
            left: positions[i].x,
            top: positions[i].y,
            width: item.w,
            height: item.h,
            border: '1px solid black',
            backgroundColor: '#d9d9d9',
            overflow: 'hidden',
            transform: `rotate(${item.rot}deg)`,
            cursor: 'grab',
            zIndex: topIdx === i ? 10 : i + 1,
            boxShadow: topIdx === i
              ? '4px 6px 0 rgba(0,0,0,0.16), 8px 14px 24px rgba(0,0,0,0.14)'
              : '1px 3px 0 rgba(0,0,0,0.08)',
            transition: 'box-shadow 120ms ease',
          }}
        >
          {item.src && (
            <img src={item.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }} />
          )}
          {item.caption && hoveredIdx === i && (
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              backgroundColor: '#f7f3e6',
              borderTop: '1px solid black',
              padding: '5px 10px',
              fontFamily: FF_FIN,
              fontSize: '1.375rem',
              letterSpacing: '0.6px',
              textAlign: 'center',
              pointerEvents: 'none',
            }}>
              {item.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Internship card (olive/green theme) ──────────────────────────────────────
interface InternProps {
  id: string;
  logo: string;
  title: string;
  date: string;
  role: string;
  location?: string;
  description: string;
  linkLabel?: string;
  image?: string;
  imageUrl?: string;
  imageLeft?: boolean;
}

function InternCard({ id, logo, title, date, role, location, description, linkLabel, image, imageUrl, imageLeft }: InternProps) {
  const [collapsed, setCollapsed] = useState(false);

  const imageEl = image !== undefined ? (
    imageUrl
      ? <a href={imageUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
          <img src={image} alt="" className="bg-[#d9d9d9] border border-black w-1/4 h-1/4 object-cover hover:opacity-80 transition-opacity" style={{ display: 'block' }} />
        </a>
      : <img src={image} alt="" className="shrink-0 bg-[#d9d9d9] border border-black w-1/4 h-1/4 object-cover" />
  ) : null;

  return (
    <CardSection
      id={id}
      title={title}
      date={date}
      imageSrc={logo}
      outerBg="#cfdfb1"
      headerBg="#90b659"
      dateBg="#619136"
      collapsed={collapsed}
      onHeaderClick={() => setCollapsed(c => !c)}
    >
      <div className="flex items-baseline justify-between mb-4">
        <p className="font-bold text-[1.75rem] tracking-[1.4px]" style={{ fontFamily: FF_INT }}>{role}</p>
        {location && <p className="text-[1.5rem] tracking-[1px]" style={{ fontFamily: FF_INT, color: '#888' }}>{location}</p>}
      </div>
      <div className="flex gap-8 items-start">
        {imageLeft && imageEl}
        <p className="flex-1 text-[1.75rem] tracking-[1.4px] leading-snug" style={{ fontFamily: FF_INT }}>
          {description}
        </p>
        {!imageLeft && imageEl}
      </div>
      {linkLabel && (
        <p className="text-right text-[1.875rem] tracking-[0.6px] mt-4 underline cursor-pointer" style={{ fontFamily: FF_FIN }}>
          {linkLabel}
        </p>
      )}
    </CardSection>
  );
}

// ── Professional card (teal theme, optional tabs) ────────────────────────────
interface ProfTabImage {
  src: string;
  url?: string;
  caption?: string;
  w?: number;
  h?: number;
}

interface ProfTab {
  label: string;
  description: string;
  location?: string;
  date?: string;
  imageCaption?: string;
  draggableImages?: DragItem[];
  image?: string;
  imageW?: number;
  imageH?: number;
  imageUrl?: string;
  images?: ProfTabImage[];
}

interface ProfProps {
  id: string;
  logo: string;
  title: string;
  date: string;
  role?: string;
  location?: string;
  tabs: ProfTab[];
}

function ProfCard({ id, logo, title, date, role, location, tabs }: ProfProps) {
  const [active, setActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const tab = tabs[active];
  const hasTabs = tabs.length > 1;

  return (
    <CardSection
      id={id}
      title={title}
      date={date}
      imageSrc={logo}
      outerBg="#bcd6c7"
      headerBg="#6fbda7"
      dateBg="#63a193"
      collapsed={collapsed}
      onHeaderClick={() => setCollapsed(c => !c)}
      afterHeader={hasTabs ? (
        <div className="flex flex-wrap items-end gap-1 mb-0">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className="px-4 py-2 border border-black text-[1.75rem] font-bold tracking-[1.4px] hover:opacity-90 transition-opacity"
              style={{
                fontFamily: FF_INT,
                backgroundColor: i === active ? '#f7f3e6' : '#bcd6c7',
                borderBottom: i === active ? '1px solid #f7f3e6' : '1px solid black',
                marginBottom: i === active ? '-1px' : '0',
                position: 'relative',
                zIndex: i === active ? 1 : 0,
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      ) : undefined}
    >
      {role && (
        <div className="flex items-baseline justify-between mb-4">
          <p className="font-bold text-[1.75rem] tracking-[1.4px]" style={{ fontFamily: FF_INT }}>{role}</p>
          {location && <p className="text-[1.5rem] tracking-[1px]" style={{ fontFamily: FF_INT, color: '#888' }}>{location}</p>}
        </div>
      )}
      <p className="text-[1.75rem] tracking-[1.4px] leading-snug whitespace-pre-line" style={{ fontFamily: FF_INT }}>
        {tab.description}
      </p>
      {tab.draggableImages && <DraggableImagesArea items={tab.draggableImages} />}
      {!tab.draggableImages?.length && tab.images && (
        <div className="flex gap-6 justify-center mt-8 flex-wrap">
          {tab.images.map((img, i) => (
            <div key={i} className="flex flex-col items-center">
              {img.url
                ? <a href={img.url} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={img.src} alt="" style={{ width: img.w ?? 300, height: img.h ?? 220 }} className="object-cover border border-black bg-[#d9d9d9] hover:opacity-80 transition-opacity" />
                  </a>
                : <img src={img.src} alt="" style={{ width: img.w ?? 300, height: img.h ?? 220 }} className="object-cover border border-black bg-[#d9d9d9]" />
              }
              {img.caption && (
                <p className="text-center mt-2 whitespace-pre-line" style={{ fontFamily: FF_FIN, fontSize: '1.875rem', letterSpacing: '0.6px', textDecoration: img.url ? 'underline' : 'none', cursor: img.url ? 'pointer' : 'default' }}>
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {!tab.draggableImages?.length && !tab.images && tab.image !== undefined && (
        <div className="flex flex-col items-center mt-8">
          {tab.imageUrl
            ? <a href={tab.imageUrl} target="_blank" rel="noopener noreferrer" className="block">
                <img src={tab.image} alt="" style={{ width: tab.imageW ?? 400, height: tab.imageH ?? 300 }} className="object-cover border border-black bg-[#d9d9d9] hover:opacity-80 transition-opacity" />
              </a>
            : <img src={tab.image} alt="" style={{ width: tab.imageW ?? 400, height: tab.imageH ?? 300 }} className="object-cover border border-black bg-[#d9d9d9]" />
          }
          {tab.imageCaption && (
            <p className="text-center mt-2 whitespace-pre-line" style={{ fontFamily: FF_FIN, fontSize: '1.875rem', letterSpacing: '0.6px', textDecoration: tab.imageUrl ? 'underline' : 'none', cursor: tab.imageUrl ? 'pointer' : 'default' }}>
              {tab.imageCaption}
            </p>
          )}
        </div>
      )}
      {(tab.location || tab.date) && (
        <div className="flex items-end justify-between mt-6">
          {tab.location
            ? <p className="text-[1.5rem] tracking-[1px]" style={{ fontFamily: FF_INT, color: '#888' }}>{tab.location}</p>
            : <span />}
          {tab.date && (
            <div className="px-4 py-2 border border-black rounded-[10px]" style={{ backgroundColor: '#6fbda7' }}>
              <span className="font-bold text-[1.5rem] tracking-[0.48px]" style={{ fontFamily: FF_BG }}>
                {tab.date}
              </span>
            </div>
          )}
        </div>
      )}
    </CardSection>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Experience() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily: FF_INT }} className="page-enter">
      {/* Navigation */}
      <nav className="flex justify-end px-8 pt-4 pb-8 text-[2rem] tracking-[1.6px]">
        <button className="mr-5 hover:opacity-70" onClick={() => navigate('/')}>[me!]</button>
        <span className="font-bold mr-5">[experience]</span>
        <button className="mr-5 hover:opacity-70" onClick={() => navigate('/projects')}>[projects]</button>
        <button className="hover:opacity-70" onClick={() => navigate('/fun')}>[playground]</button>
      </nav>

      <div className="px-6 sm:px-10 pb-16 max-w-[1440px] mx-auto space-y-6">

        {/* ── Index links — centered ── */}
        <div className="flex gap-4">
            {/* Internships */}
            <div className="flex-1.5 border border-black p-2" style={{ backgroundColor: '#cfdfb1' }}>
              <div
                className="border border-black min-h-12 flex items-center px-5 mb-3"
                style={{ backgroundColor: '#90b659' }}
              >
                <span className="font-bold text-[1.875rem] tracking-[1.5px] whitespace-nowrap" style={{ fontFamily: FF_BG }}>
                  INTERNSHIPS
                </span>
              </div>
              <div className="flex gap-2 justify-center">
                <TagLink label="GOOGLE" target="google" />
                <TagLink label="PORTICO WELLNESS" target="portico" />
                <TagLink label="SCOWTT" target="scowtt" />
              </div>
            </div>

            {/* Professional Experience */}
            <div className="flex-1 border border-black p-2" style={{ backgroundColor: '#bcd6c7' }}>
              <div
                className="border border-black min-h-12 flex items-center px-5 mb-3"
                style={{ backgroundColor: '#6fbda7' }}
              >
                <span className="font-bold text-[1.875rem] tracking-[1.5px] whitespace-nowrap" style={{ fontFamily: FF_BG }}>
                  PROFESSIONAL EXPERIENCE
                </span>
              </div>
              <div className="flex gap-2 justify-center">
                <TagLink label="CTC" target="ctc" />
                <TagLink label="LAVALAB" target="lavalab" />
                <TagLink label="RESEARCH" target="research" />
                <TagLink label="TMG" target="tmg" />
              </div>
            </div>
        </div>

        {/* ── Internships ── */}
        <InternCard
          id="scowtt"
          logo={IMG_SCOWTT}
          title="SCOWTT"
          date="05.26-??.??"
          role="AI Agent Engineer Intern"
          location="Kirkland, WA"
          description="Developing a Slack-native AI onboarding agent integrated with Jira, Confluence, and other enterprise tools to streamline client onboarding workflows and improve cross-team coordination. Built context-aware automation systems using LangGraph, Temporal, and OpenAI APIs to track onboarding progress, answer client status queries, automatically generate and assign Jira tickets, and synchronize updates across platforms. Leveraged conversational AI, workflow orchestration, and scalable backend automation to reduce manual overhead, improve operational efficiency, and maintain team-wide alignment throughout the onboarding lifecycle."
        />
        
        <InternCard
          id="google"
          logo={IMG_GOOGLE}
          title="GOOGLE"
          date="05.25-08.25"
          role="Software Development Intern"
          location="Sunnyvale, CA"
          description="Co-developed an AI-powered security audit dashboard that empowers clients to independently identify and remediate access control vulnerabilities through intuitive Angular interfaces and seamless API integrations. Conducted comprehensive user research and discovery interviews, translating client insights into user-centered Figma designs and responsive frontend experiences. Established design principles that enhanced client needs assessment and accelerated product development cycles."
          image={google}
          imageLeft
        />

        <ProfCard
          id="ctc"
          logo={IMG_CTC}
          title="[CTC] CODE THE CHANGE"
          date="08.24-??.??"
          tabs={[
            { label: "Product Manager",  description: "Led the end-to-end redesign and product strategy of Feminist Center for Creative Work's (FCCW's) middleware operations platform, built to streamline workflows between the organization's CRM, Shopify, and client-facing operations. Defined and prioritized product requirements through stakeholder interviews and operational analysis, focusing on improving efficiency for event creation and management, event sign-up tracking, donation and membership management, and centralized reporting. Owned roadmap planning and Agile execution across a year-long development cycle, balancing organizational goals, user experience, and technical feasibility. Managed a cross-functional team of seven developers and four designers, partnering closely with engineering and design leads to align product vision, UX strategy, and implementation. Delivered iterative product feedback, validated feature completeness, and presented designs to clients regularly to refine requirements and optimize operational usability. Below are some pictures of my lovely team and bonding I planned:", location: "Los Angeles, CA", draggableImages: [
              { w: 295, h: 260, initX: 10, initY: 100, rot:  3, src: fccw,     caption: "our team spelling out FCCW" },
              { w: 300, h: 265, initX: 330, initY:  60, rot:  2, src: campfire, caption: "our personal campfire in Joshua Tree during our team retreat!" },
              { w: 300, h: 330, initX:  650, initY: 20, rot: -3, src: team,   caption: "my lovely team :)" },
              { w: 315, h: 250, initX: 970, initY: 110, rot: -1, src: lovectc, caption: "our team's light painting under the stars. peak team bonding" },
            ], date: "05.25-05.26" },
            { label: "Vice President",   description: "Incoming. More Soon.", location: "Los Angeles, CA",                              date: "05.26-??.??" },
            { label: 'Developer',        description: "Delivered a mission-critical safety platform using React Native with Expo, Supabase, and Gluestack with Tailwind CSS in partnership with a 10-person cross-functional team, now actively deployed by Inner City Vision LA to protect teenage girls at risk of trafficking. I architected comprehensive full-stack functionality including secure user authentication, incident reporting systems, and case management workflows that enable real-time communication between at-risk youth and nonprofit staff. This work created a direct technological lifeline supporting the organization's critical mission to safeguard vulnerable teenagers through streamlined safety services and rapid response capabilities.", location: 'Los Angeles, CA',                                          date: '08.24-05.25' },
          ]}
        />

        <ProfCard
          id="lavalab"
          logo={IMG_LAVALAB}
          title="LAVALAB"
          date="08.24-05.26"
          tabs={[
            { label: 'Co-founder (Developer)',          description: "Led development of Lumen in collaboration with a cross-functional team, transforming scattered social media feedback into actionable insights and earning the Best Demo Award at an entrepreneurship showcase. I engineered an automated web-scraping system using Python that aggregates comments from Instagram, X, and app stores while implementing intelligent filtering and translation capabilities through the OpenAI API, ultimately saving companies over two hours of daily work. Additionally, I built a responsive frontend interface using React Vite and Tailwind CSS based on designer specifications and successfully integrated it with the web-scraping backend through Supabase, which resulted in adoption by three companies, including one with over 3 million active users.", location: "Los Angeles, CA", image: lumen, imageUrl: "https://usclavalab.org/startup-directory/lumen", imageW: 500, imageH: 500, imageCaption: "my lovely team :)\nclick to learn more about LUMEN", date: "08.24-12.24" },
            { label: 'Director of Internal Community',  description: "Acted as USC's premier startup incubator's primary culture-keeper and community builder for each incoming cohort. Planned and executed high-engagement events including retreats, bonfires, and member socials, while continuously gathering member feedback to ideate and implement new initiatives that strengthened cohort connection and belonging. Collaborated with the Director of External Community to build mentorship bridges between current members and alumni, and supported initiatives connecting members to internships and industry opportunities. Built a Python automation script to auto-assign weekly LavaLunch pairings, reducing manual coordination overhead and ensuring consistent community engagement across the cohort. Some pictures from the events I was in charge of:", location: 'Los Angeles, CA', draggableImages: [
              { w: 310, h: 255, initX:   8, initY: 25, rot: -3, src: lavabonfire, caption: "LavaLab bonfire, which happens every semester. cohort and alum get to mix and get to know each other" },
              { w: 300, h: 265, initX: 320, initY: 30, rot:  2, src: lavademo,    caption: "eboard after our semesterly LavaLab demo day :)" },
              { w: 315, h: 250, initX: 625, initY: 20, rot: -1, src: lavaretreat,  caption: "everyone mingling and yapping during Lava retreat" },
              { w: 320, h: 260, initX: 950, initY: 35, rot:  3, src: lavaladies,  caption: "much love to the Lavaladies hehe" },
            ], date: '08.25-05.26' },
            { label: 'Dev Mentor',                      description: "Mentored 6 early-stage developers over 3 semesters (2 developers per semester) through the full product development lifecycle, providing hands-on guidance across product ideation, scope definition, market positioning, and technical feasibility. Served as a consistent source of feedback and strategic direction to help mentees refine their product vision and build with clarity and confidence. Also fostered a supportive, encouraging environment to keep teams motivated and energized throughout the buildout process.", location: 'Los Angeles, CA',                                                    date: '01.25-??.??' },
          ]}
        />

        <ProfCard
          id="research"
          logo={IMG_USC}
          title="RESEARCH @ USC"
          date="09.23-05.26"
          tabs={[
            { label: 'DILL Lab',                          description: "Conducted NLP research focused on LLM personalization and subjective harm modeling, investigating whether large language models can simulate diverse human perspectives on toxic and offensive online content. Designed a persona-conditioned prompting framework spanning 3 persona constructions (demographic-only, belief-only, and combined) to evaluate model alignment with human toxicity annotations across 3 dimensions including hate speech, racism, and personal offense. Built a benchmarking suite to assess zero-shot and chain-of-thought prompting strategies, and architected a high-performance simulation pipeline using vLLM and HuggingFace Transformers to run inference across thousands of annotated data points. Research demonstrated that richer persona representations combining demographics and social beliefs achieved F1 of 0.889 on racism detection tasks, advancing context-aware and multi-perspective content moderation.", location: 'Los Angeles, CA', images: [{ src: paper, url: annotators, caption: 'read more!', w: 480, h: 400 }, { src: poster, caption: 'me presenting at ShowCAIS', w: 400, h: 420 }], date: '09.25-05.26' },
            { label: 'Radiomics Lab',                     description: "Built a comprehensive medical imaging platform leveraging Flask, Vue.js, and PyTorch to deliver AI-powered image segmentation and classification capabilities for healthcare professionals. Designed an intuitive, clinician-focused interface that streamlines diagnostic workflows and enhances clinical decision-making through advanced image analysis tools. Architected seamless AI integration and dynamic data visualization features, reducing image interpretation time and improving diagnostic accuracy for medical teams.", location: 'Los Angeles, CA', date: '09.24-12.24' },
            { label: 'Institute of Creative Technologies', description: "Architected a scalable data pipeline processing large-scale CSV datasets with Python, optimizing data transformation to JSON format for enhanced analytical performance. Developed and trained a custom Recurrent Neural Network using TensorFlow, achieving 78% prediction accuracy on complex sequential data patterns. Deployed the model to production through TensorFlow.js integration, enabling real-time predictive analytics and personalized user recommendations via interactive web visualization.\n\nContributed to the development of an AI-powered educational agent by conducting literature reviews on Retrieval-Augmented Generation (RAG), deepfake pedagogical agents, and LLM-based educational technologies. Helped establish the project's foundational RAG pipeline, including transcript embedding workflows, vector database integration with Pinecone, and semantic retrieval systems using OpenAI APIs to support context-aware question answering. Research was presented at the International Conference on Artificial Intelligence in Education (AIED Palermo 2025).", location: "Playa Vista, CA", image: vpaper, imageUrl: vryan, imageCaption: "learn more", imageW: 500, imageH: 450, date: "09.23-09.24" },
          ]}
        />

        <InternCard
          id="portico"
          logo={IMG_PORTICO}
          title="PORTICO WELLNESS"
          date="07.24-09.24"
          role="Software Development Intern"
          location="Seattle, WA"
          description="Engineered an intelligent calendar management system using React Remix, TypeScript, and Tailwind CSS with Supabase backend, seamlessly integrating Google Calendar and Outlook REST APIs to achieve a 70% improvement in scheduling efficiency. Delivered a comprehensive full-stack solution that transforms appointment management workflows, significantly enhancing user productivity through streamlined cross-platform calendar synchronization."
        />

        <ProfCard
          id="tmg"
          logo={IMG_TMG}
          title="[TMG] TROJAN MARKETING GROUP"
          date="05.25-08.25"
          role="Tech Consultant"
          location="Los Angeles, CA"
          tabs={[
            { label: 'Tech Consultant', description: "Contributed to a technology team supporting client websites, mobile applications, and data needs, while collaborating cross-functionally with designers and digital strategists. Built and deployed an interactive React quiz application for Date Better using Vite and Tailwind CSS that recommends personalized Date Better flavors based on the user's love language, driving engagement during a live cafe pop-up marketing campaign. Integrated sales tracking into the Date Better website and coordinated with stakeholders across design and strategy to deliver a polished, production-ready product used in an active consumer campaign.", image: datebetter, imageUrl: "https://date-better.vercel.app/", imageCaption: 'try it here!' },
          ]}
        />

      </div>
    </div>
  );
}
