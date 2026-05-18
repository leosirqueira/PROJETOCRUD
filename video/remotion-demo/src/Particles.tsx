import React from "react";
import {useCurrentFrame, useVideoConfig, interpolate, random} from "remotion";

export const Particles: React.FC<{count?: number}> = ({count = 80}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();

  return (
    <svg
      width={width}
      height={height}
      style={{position: "absolute", inset: 0}}
    >
      {Array.from({length: count}).map((_, i) => {
        const seed = `p-${i}`;
        const x0 = random(seed + "x") * width;
        const y0 = random(seed + "y") * height;
        const drift = random(seed + "d") * 40 - 20;
        const speed = 0.3 + random(seed + "s") * 0.7;
        const size = 0.6 + random(seed + "r") * 2.4;
        const phase = random(seed + "p") * Math.PI * 2;

        const t = frame / fps;
        const x = x0 + Math.sin(t * speed + phase) * drift;
        const y = y0 + Math.cos(t * speed * 0.7 + phase) * drift - (frame * 0.2);
        const tw = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + phase));
        const opacity = interpolate(frame, [0, 30, 240, 300], [0, tw, tw, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        return (
          <circle
            key={i}
            cx={x}
            cy={(y + height) % height}
            r={size}
            fill={i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#22d3ee" : "#f8fafc"}
            opacity={opacity * 0.8}
          />
        );
      })}
    </svg>
  );
};
