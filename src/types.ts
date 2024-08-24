export declare namespace MCMeta {
	/**
	 * @see https://minecraft.wiki/w/Resource_pack#Animation
	 */
	interface Animation {
		/**
		 * If true, generates additional frames between frames with a frame time greater than 1 between them. 
		 */
		interpolate?: boolean;
		/**
		 * The width of the tile, as a direct ratio rather than in pixels.
		 * This is unused in vanilla's files but can be used by resource packs to have frames that are 
		 * not perfect squares.
		 */
		width?: number;
		/**
		 * The height of the tile as a ratio rather than in pixels.
		 * This can be used by resource packs to have frames that are not perfect squares.
		 */
		height?: number;
		/**
		 * Sets the default time for each frame in increments of one game tick. 
		 * Defaults to 1.
		 */
		frametime?: number;
		/**
		 * Contains a list of frames. Defaults to displaying all the frames from top to bottom.
		 * - A number corresponding to position of a frame from the top, with the top frame being 0
		 * - A frame specifies a frame with additional data.
		 */
		frames?: (number | AnimationFrame)[];
	}

	interface AnimationFrame {
		/**
		 * A number corresponding to position of a frame from the top, with the top frame being 0.
		 */
		index: number;
		/**
		 * The time in ticks to show this frame, overriding {@link Animation.frametime}.
		 */
		time: number;
	}

	interface Texture {
		blur?: boolean;
		clamp?: boolean;
		mipmaps?: number[];
	}

	interface GUI {
		scaling?: {
			type?: 'stretch' | 'tile' | 'nine_slice';
			width?: number;
			height?: number;
			border?: number | GUIPosition;
		}
	}

	interface GUIPosition {
		left?: number;
		top?: number;
		right?: number;
		bottom?: number;
	}

	interface Villager {
		hat?: 'full' | 'partial';
	}
}

/**
 * Everything that can be stored in a `.png.mcmeta` file
 */
export interface TextureMCMeta {
	animation?: MCMeta.Animation;
	texture?: MCMeta.Texture;
	gui?: MCMeta.GUI;
	villager?: MCMeta.Villager;
}
