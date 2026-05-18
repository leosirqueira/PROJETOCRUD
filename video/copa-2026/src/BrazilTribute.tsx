import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, Easing, Sequence} from 'remotion';
import {FiveStars} from './FiveStars';

const CHAMPIONSHIPS = [
	{year: '1958', host: 'Suécia'},
	{year: '1962', host: 'Chile'},
	{year: '1970', host: 'México'},
	{year: '1994', host: 'EUA'},
	{year: '2002', host: 'Coreia/Japão'},
];

const BrazilFlagBadge: React.FC<{progress: number}> = ({progress}) => {
	return (
		<svg
			width="140"
			height="98"
			viewBox="0 0 140 98"
			style={{
				opacity: progress,
				filter: 'drop-shadow(0 4px 18px rgba(0, 0, 0, 0.6))',
			}}
		>
			<defs>
				<linearGradient id="bg-green" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#00b04f" />
					<stop offset="100%" stopColor="#007a37" />
				</linearGradient>
				<linearGradient id="bg-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#fff7ad" />
					<stop offset="50%" stopColor="#ffdf00" />
					<stop offset="100%" stopColor="#c79900" />
				</linearGradient>
				<radialGradient id="bg-blue" cx="50%" cy="40%" r="50%">
					<stop offset="0%" stopColor="#1e3a8a" />
					<stop offset="100%" stopColor="#001a5c" />
				</radialGradient>
			</defs>
			<rect x="2" y="2" width="136" height="94" rx="6" fill="url(#bg-green)" stroke="#fff" strokeWidth="1.5" />
			<path d="M 70 14 L 124 49 L 70 84 L 16 49 Z" fill="url(#bg-yellow)" stroke="#92400e" strokeWidth="0.8" />
			<circle cx="70" cy="49" r="20" fill="url(#bg-blue)" stroke="#fff" strokeWidth="0.8" />
			<path
				d="M 52 47 Q 70 38 88 47"
				fill="none"
				stroke="#fff"
				strokeWidth="1.5"
			/>
			<text
				x="70"
				y="52"
				textAnchor="middle"
				fontSize="3.5"
				fontFamily="Georgia, serif"
				fontWeight="bold"
				fill="#fff"
				letterSpacing="0.5"
			>
				ORDEM E PROGRESSO
			</text>
			{[
				{cx: 60, cy: 44, r: 0.7},
				{cx: 75, cy: 41, r: 0.9},
				{cx: 80, cy: 48, r: 0.8},
				{cx: 65, cy: 55, r: 0.7},
				{cx: 78, cy: 58, r: 0.6},
				{cx: 70, cy: 47, r: 1.0},
				{cx: 85, cy: 53, r: 0.8},
			].map((s, i) => (
				<circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="#fff" />
			))}
		</svg>
	);
};

const PentaText: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 12, 120, 140], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(frame, [0, 18], [0.7, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.34, 1.56, 0.64, 1),
	});
	const letterSpacing = interpolate(frame, [0, 30], [4, 24], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				pointerEvents: 'none',
			}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale})`,
					textAlign: 'center',
				}}
			>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 28,
						color: '#ffdf00',
						letterSpacing: '14px',
						fontWeight: 600,
						textShadow: '0 0 20px rgba(255, 223, 0, 0.7)',
					}}
				>
					◆ PENTACAMPEÃO ◆
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 180,
						fontWeight: 900,
						background: 'linear-gradient(180deg, #fff7ad 0%, #ffdf00 45%, #009c3b 100%)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						letterSpacing: `${letterSpacing}px`,
						textShadow: '0 4px 30px rgba(0, 156, 59, 0.5)',
						marginTop: -10,
					}}
				>
					BRASIL
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 26,
						color: '#fff',
						letterSpacing: '12px',
						fontStyle: 'italic',
						marginTop: -8,
					}}
				>
					O país do futebol
				</div>
			</div>
		</AbsoluteFill>
	);
};

const ChampionshipsList: React.FC = () => {
	const frame = useCurrentFrame();
	const overallOpacity = interpolate(frame, [0, 15, 90, 110], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-end',
				alignItems: 'center',
				paddingBottom: 80,
				pointerEvents: 'none',
				opacity: overallOpacity,
			}}
		>
			<div style={{display: 'flex', gap: 30}}>
				{CHAMPIONSHIPS.map((c, i) => {
					const delay = i * 8;
					const op = interpolate(frame - delay, [0, 12], [0, 1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					});
					const y = interpolate(frame - delay, [0, 20], [20, 0], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
						easing: Easing.bezier(0.16, 1, 0.3, 1),
					});
					return (
						<div
							key={i}
							style={{
								opacity: op,
								transform: `translateY(${y}px)`,
								padding: '14px 22px',
								background: 'rgba(0, 156, 59, 0.25)',
								border: '1.5px solid #ffdf00',
								borderRadius: 8,
								backdropFilter: 'blur(6px)',
								textAlign: 'center',
								boxShadow: '0 4px 24px rgba(255, 223, 0, 0.2)',
							}}
						>
							<div
								style={{
									fontFamily: 'Georgia, serif',
									fontSize: 28,
									fontWeight: 800,
									color: '#ffdf00',
									letterSpacing: '2px',
								}}
							>
								{c.year}
							</div>
							<div
								style={{
									fontFamily: 'Georgia, serif',
									fontSize: 13,
									color: '#fff',
									letterSpacing: '2px',
									marginTop: 4,
								}}
							>
								{c.host.toUpperCase()}
							</div>
						</div>
					);
				})}
			</div>
		</AbsoluteFill>
	);
};

export const BrazilTribute: React.FC = () => {
	const frame = useCurrentFrame();
	const introOpacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const flagY = interpolate(frame, [0, 30], [-40, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill style={{pointerEvents: 'none'}}>
			<AbsoluteFill
				style={{
					justifyContent: 'flex-start',
					alignItems: 'center',
					paddingTop: 60,
				}}
			>
				<div style={{transform: `translateY(${flagY}px)`}}>
					<BrazilFlagBadge progress={introOpacity} />
				</div>
			</AbsoluteFill>

			<PentaText />

			<Sequence from={30}>
				<FiveStars />
			</Sequence>

			<Sequence from={60} durationInFrames={140}>
				<ChampionshipsList />
			</Sequence>
		</AbsoluteFill>
	);
};
