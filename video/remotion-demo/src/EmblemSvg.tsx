import React from "react";

export const EmblemSvg: React.FC<{progress: number}> = ({progress}) => {
  const dash = 1200;
  const drawnOffset = dash * (1 - progress);

  return (
    <svg
      viewBox="-200 -200 400 400"
      width="100%"
      height="100%"
      style={{
        overflow: "visible",
        filter: `drop-shadow(0 0 ${20 * progress}px rgba(56, 189, 248, ${0.6 * progress}))`,
      }}
    >
      <defs>
        <linearGradient id="metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="35%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#f8fafc" />
          <stop offset="65%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>

        <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>

        <filter id="emblemGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="0" cy="0" r="170" fill="url(#innerGlow)" opacity={progress} />

      <g
        opacity={progress}
        style={{
          strokeDasharray: dash,
          strokeDashoffset: drawnOffset,
        }}
      >
        <polygon
          points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="3"
          filter="url(#emblemGlow)"
        />
        <polygon
          points="0,-135 117,-67.5 117,67.5 0,135 -117,67.5 -117,-67.5"
          fill="none"
          stroke="url(#cyan)"
          strokeWidth="1.2"
          opacity="0.8"
        />
        <polygon
          points="0,-115 100,-57.5 100,57.5 0,115 -100,57.5 -100,-57.5"
          fill="none"
          stroke="url(#metal)"
          strokeWidth="0.8"
          opacity="0.6"
        />
      </g>

      <g opacity={progress * 0.9}>
        {Array.from({length: 24}).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          const r1 = 155;
          const r2 = i % 6 === 0 ? 172 : 162;
          return (
            <line
              key={i}
              x1={Math.cos(angle) * r1}
              y1={Math.sin(angle) * r1}
              x2={Math.cos(angle) * r2}
              y2={Math.sin(angle) * r2}
              stroke="url(#metal)"
              strokeWidth={i % 6 === 0 ? 2 : 1}
            />
          );
        })}
      </g>

      <g opacity={progress}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const r = 150;
          const rad = (deg * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={Math.cos(rad) * r}
              cy={Math.sin(rad) * r}
              r="4"
              fill="url(#cyan)"
              filter="url(#emblemGlow)"
            />
          );
        })}
      </g>

      <g opacity={progress}>
        <path
          d="M -55 -55 L -55 55 L -35 55 L -35 15 L -10 15 Q 25 15 25 -20 Q 25 -55 -10 -55 Z M -35 -38 L -15 -38 Q 5 -38 5 -20 Q 5 -2 -15 -2 L -35 -2 Z"
          fill="url(#metal)"
          stroke="url(#cyan)"
          strokeWidth="0.8"
          filter="url(#emblemGlow)"
        />
        <path
          d="M 55 -45 Q 30 -55 15 -35 Q 0 -15 0 5 Q 0 35 25 50 Q 45 60 60 50 L 55 35 Q 45 45 32 38 Q 20 30 20 10 Q 20 -15 35 -30 Q 50 -40 60 -30 Z"
          fill="url(#metal)"
          stroke="url(#cyan)"
          strokeWidth="0.8"
          filter="url(#emblemGlow)"
        />
      </g>

      <g opacity={progress * 0.5}>
        {Array.from({length: 12}).map((_, i) => {
          const angle = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={Math.cos(angle) * 60}
              y1={Math.sin(angle) * 60}
              x2={Math.cos(angle) * 100}
              y2={Math.sin(angle) * 100}
              stroke="url(#metal)"
              strokeWidth="0.4"
              strokeDasharray="2 3"
            />
          );
        })}
      </g>

      <text
        x="0"
        y="95"
        textAnchor="middle"
        fill="url(#metal)"
        fontSize="9"
        fontFamily="Georgia, serif"
        letterSpacing="4"
        opacity={progress}
        fontWeight="bold"
      >
        EST · MMXXVI
      </text>
    </svg>
  );
};
