import React from "react";
import {AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Easing} from "remotion";

export const LightRays: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  const rotation = (frame / fps) * 8;
  const opacity = interpolate(frame, [30, 90, 180, 240], [0, 0.55, 0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const scale = interpolate(frame, [30, 180], [0.6, 1.4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center"}}>
      <svg
        width={width}
        height={height}
        viewBox="-100 -100 200 200"
        style={{
          position: "absolute",
          transform: `rotate(${rotation}deg) scale(${scale})`,
          opacity,
          mixBlendMode: "screen",
        }}
      >
        <defs>
          <radialGradient id="rayGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#a78bfa" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({length: 16}).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <polygon
              key={i}
              points="0,0 -2,-90 0,-100 2,-90"
              fill="url(#rayGrad)"
              transform={`rotate(${angle})`}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
