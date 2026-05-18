import React from 'react';
import {useCurrentFrame, useVideoConfig, random, interpolate} from 'remotion';

const COLORS = ['#009c3b', '#ffdf00', '#002776', '#f8fafc'];

export const Confetti: React.FC<{count?: number; startFrame?: number; endFrame?: number}> = ({
	count = 120,
	startFrame = 0,
	endFrame = 9999,
}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	if (frame < startFrame || frame > endFrame + 60) return null;

	return (
		<svg width={width} height={height} style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
			{Array.from({length: count}).map((_, i) => {
				const seed = `c-${i}`;
				const x0 = random(seed + 'x') * width;
				const speed = 1 + random(seed + 's') * 2;
				const sway = 30 + random(seed + 'w') * 60;
				const phase = random(seed + 'p') * Math.PI * 2;
				const size = 4 + random(seed + 'r') * 8;
				const color = COLORS[Math.floor(random(seed + 'co') * COLORS.length)];
				const rotSpeed = (random(seed + 'rot') - 0.5) * 12;
				const delay = random(seed + 'd') * 90;
				const localFrame = frame - startFrame - delay;
				if (localFrame < 0) return null;

				const y = -50 + localFrame * speed * 3;
				const x = x0 + Math.sin(localFrame * 0.05 + phase) * sway;
				const rotation = localFrame * rotSpeed;
				const opacity = interpolate(
					frame,
					[startFrame, startFrame + 15, endFrame, endFrame + 60],
					[0, 1, 1, 0],
					{extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
				);
				if (y > height + 50) return null;

				return (
					<g key={i} transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={opacity}>
						<rect
							x={-size / 2}
							y={-size / 4}
							width={size}
							height={size / 2}
							fill={color}
							rx={1}
						/>
					</g>
				);
			})}
		</svg>
	);
};
