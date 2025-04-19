import mcmeta from '~/docs/public/textures/fire_1.png.mcmeta';
import { sanitizeCodeBlock, sanitizeJSON } from '~/docs/utils/json';

export const useAnimationExample = sanitizeCodeBlock(`
import { useAnimation } from 'react-minecraft';

export function MyComponent() {
	const mcmeta = ${sanitizeJSON(mcmeta)};
	const { canvasRef, sprites } = useAnimation({ 
		src: './textures/fire_1.png', 
		mcmeta 
	});

	return (
		<canvas ref={canvasRef} />
	);
}`);