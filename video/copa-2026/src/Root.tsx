import {Composition} from 'remotion';
import {CopaComposition} from './CopaComposition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="Copa2026"
				component={CopaComposition}
				durationInFrames={900}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{}}
			/>
		</>
	);
};
