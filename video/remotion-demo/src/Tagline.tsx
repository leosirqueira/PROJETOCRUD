import React from "react";
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from "remotion";

export const Tagline: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const letterSpacing = interpolate(frame, [0, 30], [4, 14], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const yShift = interpolate(frame, [0, 30], [12, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 540,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${yShift}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 64,
            fontWeight: 700,
            background:
              "linear-gradient(135deg, #f8fafc 0%, #94a3b8 50%, #f8fafc 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            letterSpacing: `${letterSpacing}px`,
            textShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
          }}
        >
          PROJETOCRUD
        </div>
        <div
          style={{
            marginTop: 16,
            fontFamily: "Georgia, serif",
            fontSize: 22,
            color: "#94a3b8",
            letterSpacing: "8px",
            fontStyle: "italic",
          }}
        >
          a Claude Code production
        </div>
      </div>
    </AbsoluteFill>
  );
};
