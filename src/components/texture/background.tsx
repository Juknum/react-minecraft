import React from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export interface TextureBackgroundProps {
	/**
	 * The size of the texture in the parent container
	 * @default '100%'
	 */
	size?: CSSProperties['width'];
	/**
	 * The background color or image url to use for the texture
	 */
	background?: {
		/**
		 * CSS color to use as the background
		 */
		color?: CSSProperties['color'];
		/**
		 * URL of the image to use as the background, used as `url(${background.url})` in the style
		 */
		url?: HTMLImageElement['src'];
	};
	/**
	 * The children to render inside the background, usually the `TextureCanvas` or `TextureImage`
	 */
	children: ReactNode; 
}

export function TextureBackground({ size, children, background, style, ...props }: TextureBackgroundProps & HTMLAttributes<HTMLDivElement>) {
	const _style: CSSProperties = {
		backgroundImage: background?.url ? `url(${background.url})` : undefined,
		backgroundSize: 'cover',
		imageRendering: 'pixelated',

		minHeight: size ?? '100%',
		height: size ?? '100%',
		width: size ?? '100%',

		backgroundColor: background?.color ? background.color : 'transparent',
		...style,
	};

	return (
		<div style={_style} {...props}>
			{children}
		</div>
	);
}