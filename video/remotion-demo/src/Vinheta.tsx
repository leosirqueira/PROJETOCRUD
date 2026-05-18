import React from "react";
import {AbsoluteFill, Sequence, useCurrentFrame, interpolate, Easing} from "remotion";
import {Particles} from "./Particles";
import {LightRays} from "./LightRays";
import {EnergyOrb} from "./EnergyOrb";
import {LogoReveal} from "./LogoReveal";
import {Tagline} from "./Tagline";

const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [240, 300], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, #0f172a 0%, #020617 70%, #000 100%)",
        opacity: fadeOut,
      }}
    />
  );
};

const Vignette: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
      }}
    />
  );
};

const FlashBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 4, 18], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.45, 0, 0.55, 1),
  });
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at center, #f8fafc 0%, #22d3ee 30%, transparent 70%)",
        opacity,
        mixBlendMode: "screen",
      }}
    />
  );
};

export const Vinheta: React.FC = () => {
  return (
    <AbsoluteFill style={{backgroundColor: "#000"}}>
      <Background />
      <Particles count={90} />

      <Sequence from={30} durationInFrames={220}>
        <LightRays />
      </Sequence>

      <Sequence from={30} durationInFrames={90}>
        <EnergyOrb />
      </Sequence>

      <Sequence from={115} durationInFrames={20}>
        <FlashBurst />
      </Sequence>

      <Sequence from={120} durationInFrames={180}>
        <LogoReveal />
      </Sequence>

      <Sequence from={165} durationInFrames={120}>
        <Tagline />
      </Sequence>

      <Vignette />
    </AbsoluteFill>
  );
};
