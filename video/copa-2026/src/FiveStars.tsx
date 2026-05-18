import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';

const StarSvg: React.FC<{size: number; delay: number; frame: number}> = ({size, delay, frame}) => {
	const localFrame = frame - delay;
	const opacity = interpolate(localFrame, [0, 12], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(localFrame, [0, 18], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});
	const rot = interpolate(localFrame, [0, 30], [-30, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<svg
			width={size}
			height={size}
			viewBox="-50 -50 100 100"
			style={{
				opacity,
				transform: `scale(${scale}) rotate(${rot}deg)`,
				filter: 'drop-shadow(0 0 12px #ffdf00) drop-shadow(0 0 24px rgba(255, 223, 0, 0.5))',
			}}
		>
			<defs>
				<radialGradient id={`starG-${delay}`} cx="50%" cy="40%" r="55%">
					<stop offset="0%" stopColor="#fffbe6" />
					<stop offset="60%" stopColor="#ffdf00" />
					<stop offset="100%" stopColor="#b45309" />
				</radialGradient>
			</defs>
			<path
				d="M 0 -42 L 12 -13 L 42 -13 L 18 5 L 27 35 L 0 18 L -27 35 L -18 5 L -42 -13 L -12 -13 Z"
				fill={`url(#starG-${delay})`}
				stroke="#7c2d12"
				strokeWidth="1.5"
			/>
		</svg>
	);
};

export const FiveStars: React.FC = () => {
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingTop: 180,
				pointerEvents: 'none',
			}}
		>
			<div style={{display: 'flex', gap: 20}}>
				{[0, 6, 12, 18, 24].map((d, i) => (
					<StarSvg key={i} size={70} delay={d} frame={frame} />
				))}
			</div>
		</AbsoluteFill>
	);
};
