import {useEffect, useRef, useState} from 'react';
import {
	AbsoluteFill,
	continueRender,
	delayRender,
	Easing,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
	Sequence,
} from 'remotion';
import Globe, {GlobeMethods} from 'react-globe.gl';
import {BrazilTribute} from './BrazilTribute';
import {Confetti} from './Confetti';

const HOSTS = [
	{name: 'USA', lat: 39.83, lng: -98.58, color: '#3b82f6'},
	{name: 'CANADA', lat: 56.13, lng: -106.34, color: '#ef4444'},
	{name: 'MEXICO', lat: 23.63, lng: -102.55, color: '#22c55e'},
];

const BRAZIL_POINT = {name: 'BRASIL', lat: -14.24, lng: -51.93, color: '#ffdf00', size: 2.2};

const STADIUMS = [
	{name: 'MetLife', lat: 40.81, lng: -74.07},
	{name: 'SoFi', lat: 33.95, lng: -118.34},
	{name: 'AT&T', lat: 32.75, lng: -97.09},
	{name: 'Mercedes-Benz', lat: 33.76, lng: -84.4},
	{name: 'Hard Rock', lat: 25.96, lng: -80.24},
	{name: 'Arrowhead', lat: 39.05, lng: -94.48},
	{name: 'Lumen', lat: 47.59, lng: -122.33},
	{name: "Levi's", lat: 37.4, lng: -121.97},
	{name: 'NRG', lat: 29.68, lng: -95.41},
	{name: 'Lincoln', lat: 39.9, lng: -75.17},
	{name: 'Gillette', lat: 42.09, lng: -71.26},
	{name: 'BC Place', lat: 49.28, lng: -123.11},
	{name: 'BMO Field', lat: 43.63, lng: -79.42},
	{name: 'Azteca', lat: 19.3, lng: -99.15},
	{name: 'Akron', lat: 20.68, lng: -103.46},
	{name: 'Monterrey', lat: 25.67, lng: -100.31},
];

const HOST_ARCS = [
	{startLat: 56.13, startLng: -106.34, endLat: 39.83, endLng: -98.58, color: ['#ef4444', '#3b82f6']},
	{startLat: 39.83, startLng: -98.58, endLat: 23.63, endLng: -102.55, color: ['#3b82f6', '#22c55e']},
	{startLat: 23.63, startLng: -102.55, endLat: 56.13, endLng: -106.34, color: ['#22c55e', '#ef4444']},
];

const BRAZIL_ARC = {
	startLat: -14.24,
	startLng: -51.93,
	endLat: 39.83,
	endLng: -98.58,
	color: ['#ffdf00', '#3b82f6'],
};

const Stars: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	return (
		<svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
			{Array.from({length: 220}).map((_, i) => {
				const seed = `s-${i}`;
				const x = random(seed + 'x') * width;
				const y = random(seed + 'y') * height;
				const r = 0.3 + random(seed + 'r') * 1.5;
				const phase = random(seed + 'p') * Math.PI * 2;
				const tw = 0.3 + 0.7 * Math.abs(Math.sin(frame * 0.04 + phase));
				return <circle key={i} cx={x} cy={y} r={r} fill="#f8fafc" opacity={tw * 0.85} />;
			})}
		</svg>
	);
};

const IntroText: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 15, 60, 80], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const letterSpacing = interpolate(frame, [0, 80], [6, 16], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.45, 0, 0.55, 1),
	});
	return (
		<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
			<div
				style={{
					opacity,
					fontFamily: 'Georgia, serif',
					fontSize: 26,
					color: '#94a3b8',
					letterSpacing: `${letterSpacing}px`,
					fontStyle: 'italic',
				}}
			>
				um planeta · um esporte · uma paixão
			</div>
		</AbsoluteFill>
	);
};

const HostsTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 18, 140, 165], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const yShift = interpolate(frame, [0, 28], [-20, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingTop: 80,
				pointerEvents: 'none',
			}}
		>
			<div style={{opacity, transform: `translateY(${yShift}px)`, textAlign: 'center'}}>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 22,
						color: '#22d3ee',
						letterSpacing: '14px',
						fontWeight: 600,
					}}
				>
					AS SEDES
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 84,
						fontWeight: 800,
						color: '#f8fafc',
						letterSpacing: '6px',
						marginTop: 4,
						textShadow: '0 0 30px rgba(56, 189, 248, 0.4)',
					}}
				>
					UNIDOS PELO JOGO
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 28,
						color: '#94a3b8',
						letterSpacing: '14px',
						marginTop: 14,
					}}
				>
					USA · CANADA · MEXICO
				</div>
			</div>
		</AbsoluteFill>
	);
};

const CopaTitle: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 25, 160, 195], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(frame, [0, 40], [0.85, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const letterSpacing = interpolate(frame, [0, 60], [4, 22], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill
			style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}
		>
			<div style={{opacity, transform: `scale(${scale})`, textAlign: 'center'}}>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 34,
						color: '#fbbf24',
						letterSpacing: '14px',
						fontWeight: 600,
					}}
				>
					◆ FIFA ◆
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 140,
						fontWeight: 900,
						background: 'linear-gradient(180deg, #fef3c7 0%, #fbbf24 50%, #92400e 100%)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						letterSpacing: `${letterSpacing}px`,
						textShadow: '0 0 50px rgba(251, 191, 36, 0.6)',
						marginTop: -10,
					}}
				>
					WORLD CUP
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 96,
						fontWeight: 800,
						color: '#f8fafc',
						letterSpacing: '36px',
						marginTop: -10,
					}}
				>
					2026
				</div>
			</div>
		</AbsoluteFill>
	);
};

const TrophySvg: React.FC = () => (
	<svg width="260" height="320" viewBox="0 0 200 240">
		<defs>
			<linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
				<stop offset="0%" stopColor="#fef3c7" />
				<stop offset="30%" stopColor="#fbbf24" />
				<stop offset="55%" stopColor="#fef3c7" />
				<stop offset="80%" stopColor="#d97706" />
				<stop offset="100%" stopColor="#92400e" />
			</linearGradient>
			<linearGradient id="darkGold" x1="0%" y1="0%" x2="0%" y2="100%">
				<stop offset="0%" stopColor="#d97706" />
				<stop offset="100%" stopColor="#78350f" />
			</linearGradient>
		</defs>
		<ellipse cx="100" cy="220" rx="60" ry="6" fill="#000" opacity="0.4" />
		<rect x="70" y="180" width="60" height="30" rx="3" fill="url(#darkGold)" />
		<rect x="60" y="170" width="80" height="14" rx="3" fill="url(#gold)" />
		<path d="M 75 170 L 80 90 Q 80 70 100 65 Q 120 70 120 90 L 125 170 Z" fill="url(#gold)" />
		<path d="M 50 90 Q 30 95 28 120 Q 26 145 55 155 L 78 145 L 78 95 Z" fill="url(#gold)" />
		<path d="M 150 90 Q 170 95 172 120 Q 174 145 145 155 L 122 145 L 122 95 Z" fill="url(#gold)" />
		<path d="M 78 95 Q 78 50 100 40 Q 122 50 122 95 Q 122 110 100 115 Q 78 110 78 95 Z" fill="url(#gold)" />
		<ellipse cx="100" cy="55" rx="14" ry="9" fill="#92400e" opacity="0.4" />
		<text x="100" y="200" textAnchor="middle" fontSize="9" fontFamily="Georgia, serif" fontWeight="bold" fill="#78350f" letterSpacing="2">
			FIFA 2026
		</text>
	</svg>
);

const TrophyReveal: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 25, 130, 165], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const scale = interpolate(frame, [0, 45], [0.4, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});
	const rotate = interpolate(frame, [0, 165], [-6, 6], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.45, 0, 0.55, 1),
	});

	return (
		<AbsoluteFill
			style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 100, pointerEvents: 'none'}}
		>
			<div
				style={{
					opacity,
					transform: `scale(${scale}) rotate(${rotate}deg)`,
					filter: 'drop-shadow(0 0 30px #fbbf24) drop-shadow(0 0 60px rgba(251,191,36,0.5))',
				}}
			>
				<TrophySvg />
			</div>
		</AbsoluteFill>
	);
};

const FinalHexa: React.FC = () => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, 20, 60, 90], [0, 1, 1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const letterSpacing = interpolate(frame, [0, 50], [6, 22], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	return (
		<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', pointerEvents: 'none'}}>
			<div style={{opacity, textAlign: 'center'}}>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 38,
						color: '#22d3ee',
						letterSpacing: '12px',
						fontStyle: 'italic',
					}}
				>
					o hexa nos espera
				</div>
				<div
					style={{
						fontFamily: 'Georgia, serif',
						fontSize: 160,
						fontWeight: 900,
						background: 'linear-gradient(180deg, #009c3b 0%, #ffdf00 50%, #009c3b 100%)',
						WebkitBackgroundClip: 'text',
						backgroundClip: 'text',
						color: 'transparent',
						letterSpacing: `${letterSpacing}px`,
						marginTop: -8,
						textShadow: '0 0 40px rgba(255, 223, 0, 0.5)',
					}}
				>
					#VAIBRASIL
				</div>
			</div>
		</AbsoluteFill>
	);
};

const Vignette: React.FC = () => (
	<AbsoluteFill
		style={{
			background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.85) 100%)',
			pointerEvents: 'none',
		}}
	/>
);

const FlashBurst: React.FC<{startFrame: number}> = ({startFrame}) => {
	const frame = useCurrentFrame();
	const localFrame = frame - startFrame;
	const opacity = interpolate(localFrame, [0, 4, 20], [0, 0.9, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				background: 'radial-gradient(circle at center, #fef3c7 0%, #fbbf24 35%, transparent 70%)',
				opacity,
				mixBlendMode: 'screen',
				pointerEvents: 'none',
			}}
		/>
	);
};

export const CopaComposition = () => {
	const [handle] = useState(() => delayRender('globe-ready'));
	const globeEl = useRef<GlobeMethods | undefined>(undefined);
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const introOpacity = interpolate(frame, [0, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
		easing: Easing.bezier(0.16, 1, 0.3, 1),
	});

	const lat = interpolate(
		frame,
		[0, 90, 200, 380, 480, 760, 900],
		[10, -10, -14, -14, 30, 40, 40],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.45, 0, 0.55, 1),
		}
	);

	const lng = interpolate(
		frame,
		[0, 90, 200, 380, 480, 760, 900],
		[-30, -55, -52, -52, -100, -98, -98],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.45, 0, 0.55, 1),
		}
	);

	const altitude = interpolate(
		frame,
		[0, 80, 180, 380, 480, 660, 760, 870, 900],
		[8, 3, 1.6, 1.6, 2.2, 1.8, 1.8, 2.4, 5],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
			easing: Easing.bezier(0.16, 1, 0.3, 1),
		}
	);

	useEffect(() => {
		if (globeEl.current) {
			globeEl.current.pointOfView({lat, lng, altitude});
		}
	}, [lat, lng, altitude]);

	const brazilVisible = frame >= 150 && frame <= 420;
	const transitionArc = frame >= 380 && frame <= 520;
	const hostArcsVisible = frame >= 450;
	const hostsVisible = frame >= 480;
	const stadiumsVisible = frame >= 540;

	const points = [
		...(brazilVisible ? [BRAZIL_POINT] : []),
		...(hostsVisible ? HOSTS.map((h) => ({...h, size: 1.6})) : []),
		...(stadiumsVisible
			? STADIUMS.map((s) => ({...s, color: '#fbbf24', size: 0.5}))
			: []),
	];

	const arcs = [
		...(transitionArc ? [BRAZIL_ARC] : []),
		...(hostArcsVisible ? HOST_ARCS : []),
	];

	const labels = [
		...(brazilVisible ? [{...BRAZIL_POINT, size: 2.6}] : []),
		...(hostsVisible ? HOSTS.map((h) => ({...h, size: 2.0})) : []),
	];

	const fadeOut = interpolate(frame, [870, 900], [1, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{background: '#000', opacity: fadeOut}}>
			<Stars />

			<AbsoluteFill
				style={{
					opacity: introOpacity,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Globe
					ref={globeEl}
					width={width}
					height={height}
					rendererConfig={{alpha: true, antialias: true}}
					globeImageUrl={staticFile('earth-blue-marble.jpg')}
					bumpImageUrl={staticFile('earth-topology.png')}
					backgroundColor="rgba(0,0,0,0)"
					showAtmosphere
					atmosphereColor="#22d3ee"
					atmosphereAltitude={0.22}
					animateIn={false}
					arcsData={arcs}
					arcColor={(d: any) => d.color}
					arcStroke={0.7}
					arcAltitude={0.25}
					arcDashLength={0.45}
					arcDashGap={0.25}
					arcDashAnimateTime={2000}
					pointsData={points}
					pointLat={(d: any) => d.lat}
					pointLng={(d: any) => d.lng}
					pointColor={(d: any) => d.color}
					pointAltitude={(d: any) => (d.size > 1 ? 0.05 : 0.01)}
					pointRadius={(d: any) => d.size}
					labelsData={labels}
					labelLat={(d: any) => d.lat}
					labelLng={(d: any) => d.lng}
					labelText={(d: any) => d.name}
					labelSize={(d: any) => d.size ?? 1.8}
					labelDotRadius={0.6}
					labelColor={(d: any) => (d.name === 'BRASIL' ? '#ffdf00' : '#f8fafc')}
					labelResolution={2}
					onGlobeReady={() => continueRender(handle)}
				/>
			</AbsoluteFill>

			<Sequence from={20} durationInFrames={80}>
				<IntroText />
			</Sequence>

			<Sequence from={180} durationInFrames={220}>
				<Confetti count={140} startFrame={0} endFrame={200} />
			</Sequence>

			<Sequence from={180} durationInFrames={220}>
				<BrazilTribute />
			</Sequence>

			<Sequence from={440}>
				<FlashBurst startFrame={0} />
			</Sequence>

			<Sequence from={480} durationInFrames={180}>
				<HostsTitle />
			</Sequence>

			<Sequence from={660}>
				<FlashBurst startFrame={0} />
			</Sequence>

			<Sequence from={670} durationInFrames={200}>
				<CopaTitle />
			</Sequence>

			<Sequence from={670} durationInFrames={200}>
				<TrophyReveal />
			</Sequence>

			<Sequence from={820} durationInFrames={90}>
				<FinalHexa />
			</Sequence>

			<Vignette />
		</AbsoluteFill>
	);
};
