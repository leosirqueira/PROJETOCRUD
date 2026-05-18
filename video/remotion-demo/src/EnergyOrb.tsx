import React from "react";
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from "remotion";

export const EnergyOrb: React.FC = () => {
  const frame = useCurrentFrame();

  const grow = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  const burst = interpolate(frame, [60, 80], [1, 8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(frame, [0, 30, 75, 88], [0, 1, 0.9, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 0.85 + 0.15 * Math.sin(frame * 0.4);
  const scale = grow * burst * pulse;

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center"}}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #f8fafc 0%, #22d3ee 30%, #a78bfa 60%, transparent 100%)",
          filter: "blur(2px)",
          transform: `scale(${scale})`,
          opacity,
          boxShadow: "0 0 80px #22d3ee, 0 0 160px #a78bfa",
        }}
      />
    </AbsoluteFill>
  );
};
