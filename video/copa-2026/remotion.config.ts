import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer('angle');
Config.setScale(1);

Config.overrideWebpackConfig((current) => {
	return {
		...current,
		resolve: {
			...current.resolve,
			alias: {
				...(current.resolve?.alias ?? {}),
				'three/webgpu': false,
				'three/tsl': false,
			},
		},
	};
});
