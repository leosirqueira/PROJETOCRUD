import React from "react";
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from "remotion";
import {EmblemSvg} from "./EmblemSvg";

export const LogoReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const reveal = interpolate(frame, [0, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scale = interpolate(frame, [0, 35, 130, 180], [1.6, 1, 1, 0.97], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(frame, [0, 20, 150, 180], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yShift = interpolate(frame, [0, 30], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const shimmerX = interpolate(frame, [40, 110], [-100, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  return (
    <AbsoluteFill style={{justifyContent: "center", alignItems: "center"}}>
      <div
        style={{
          width: 520,
          height: 520,
          transform: `translateY(${yShift}px) scale(${scale})`,
          opacity,
          position: "relative",
        }}
      >
        <EmblemSvg progress={reveal} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.45) 50%, transparent 60%)`,
            mixBlendMode: "screen",
            transform: `translateX(${shimmerX}%)`,
            pointerEvents: "none",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
