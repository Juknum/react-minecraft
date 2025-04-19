import { sanitizeCodeBlock } from '~/docs/utils/json';

export const textureExample = sanitizeCodeBlock(`
export function MyComponent() {
	const url = 'https://api.faithfulpack.net/v2/textures/304/url/faithful_32x/latest';

	return (
		<Texture src={url} />
	);
}`);

export const textureSizeExample = sanitizeCodeBlock(`
export function MyComponent() {
	return (
		<Texture src="../textures/diamond_ore.png" size={SIZE} />
	);
}`);

export const textureAnimationExample = sanitizeCodeBlock(`
import mcmeta from '../textures/fire_1.png.mcmeta';

export function MyComponent() {
	return (
		<Texture
			src="../textures/fire_1.png"
			animation={{
				mcmeta,
				isTiled: false,
				isPaused: false,
			}}
		/>
	);
}`);