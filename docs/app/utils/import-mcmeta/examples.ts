import { sanitizeCodeBlock } from '~/docs/utils/json';

export const importMcmetaFileModule = sanitizeCodeBlock(`
declare module '*.png.mcmeta' {
	import type { TextureMCMeta } from 'react-minecraft';

	const value: TextureMCMeta;
	export default value;
}
`);

export const importMcmetaFileConfig = sanitizeCodeBlock(`
{
  // ...
	"compilerOptions": {
		// ...
    "typeRoots": [
      "types"
    ]
		// ...
  },
	// ...
}
`);

export const importMcmetaFileExample = sanitizeCodeBlock(`
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