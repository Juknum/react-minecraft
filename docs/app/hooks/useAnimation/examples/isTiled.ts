import mcmeta from '~/docs/public/textures/fire_1.png.mcmeta';
import { sanitizeCodeBlock, sanitizeJSON } from '~/docs/utils/json';

export const isTiledExample = sanitizeCodeBlock(`
import { useAnimation } from 'react-minecraft';

export function MyComponent() {
	const mcmeta = ${sanitizeJSON(mcmeta)};

	const { canvasRef } = useAnimation({ 
		src: './textures/water_flow.png', 
		mcmeta,
		isTiled: true,
	});

	const { canvasRef: canvasRef2 } = useAnimation({
		src: './textures/water_flow.png',
		mcmeta,
		isTiled: false,
	});

	return (
		<>
			<canvas ref={canvasRef} />
			<canvas ref={canvasRef2} />
		</>
	);
}`);
