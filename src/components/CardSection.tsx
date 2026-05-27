import React from 'react';

const FF_BG = "'Bricolage Grotesque', sans-serif";

interface CardSectionProps {
  title: string;
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  date?: string;
  afterHeader?: React.ReactNode;
  outerBg?: string;
  squareBg?: string;
  headerBg?: string;
  dateBg?: string;
  innerBg?: string;
  id?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  role?: React.AriaRole;
  tabIndex?: number;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  collapsed?: boolean;
  onHeaderClick?: React.MouseEventHandler<HTMLDivElement>;
  noTilt?: boolean;
}

export function CardSection({
  title,
  children,
  imageSrc,
  imageAlt = '',
  date,
  afterHeader,
  outerBg = '#f3c3c2',
  squareBg = '#af505e',
  headerBg = '#d3727a',
  dateBg,
  innerBg = '#f7f3e6',
  id,
  className = '',
  onClick,
  role,
  tabIndex,
  onKeyDown,
  collapsed = false,
  onHeaderClick,
  noTilt = false,
}: CardSectionProps) {
  const squareFill = imageSrc ? '#f7f3e6' : squareBg;
  const dateFill = dateBg ?? squareBg;

  const headerMargin = collapsed
    ? ''
    : afterHeader
    ? 'mb-2'
    : 'mb-3';

  return (
    <div
      id={id}
      className={`border border-black p-3 ${noTilt ? '' : 'card-tilt'} ${className}`}
      style={{ backgroundColor: outerBg }}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
    >
      {/* ── Header row — clickable when onHeaderClick provided ── */}
      <div
        className={`flex items-start gap-2 ${headerMargin}`}
        onClick={onHeaderClick}
        style={onHeaderClick ? { cursor: 'pointer', userSelect: 'none' } : undefined}
      >
        <div
          className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 border border-black flex items-center justify-center"
          style={{ backgroundColor: squareFill }}
        >
          {imageSrc && (
            <img src={imageSrc} alt={imageAlt} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
          )}
        </div>
        <div
          className="flex-1 min-h-10 sm:min-h-12 border border-black flex items-center px-3 sm:px-4 py-1"
          style={{ backgroundColor: headerBg }}
        >
          <h2
            className="font-bold text-[1.05rem] sm:text-[1.4rem] tracking-[0.5px] sm:tracking-[1.6px]"
            style={{ fontFamily: FF_BG }}
          >
            {title}
          </h2>
          {onHeaderClick && (
            <span
              style={{
                marginLeft: 'auto',
                paddingLeft: '12px',
                fontSize: '0.9rem',
                opacity: 0.55,
                flexShrink: 0,
                transition: 'transform 200ms ease',
                display: 'inline-block',
                transform: collapsed ? 'rotate(180deg)' : 'none',
              }}
            >
              ▾
            </span>
          )}
        </div>
        {date && (
          <div
            className="min-h-10 sm:min-h-12 px-2 sm:px-4 border border-black flex items-center"
            style={{ backgroundColor: dateFill }}
          >
            <span
              className="font-bold text-[0.75rem] sm:text-[1.05rem] tracking-[0.3px] sm:tracking-[0.48px] whitespace-nowrap"
              style={{ fontFamily: FF_BG }}
            >
              {date}
            </span>
          </div>
        )}
      </div>

      {/* ── Collapsible body ── */}
      {!collapsed && afterHeader}

      {!collapsed && (
        <div
          className="border border-black p-4 sm:p-6"
          style={{ backgroundColor: innerBg, position: 'relative', zIndex: 0 }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default CardSection;
