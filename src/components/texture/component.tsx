import type { CanvasHTMLAttributes, ImgHTMLAttributes } from 'react';
import React from 'react';

import { TextureBackground } from './background.js';
import { TextureCanvas } from './canvas.js';
import { TextureImage } from './image.js';

import type { TextureBackgroundProps } from './background.js';
import type { TextureCanvasProps } from './canvas.js';

interface TextureProps extends Omit<TextureBackgroundProps, 'children'>, Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
	animation?: Omit<TextureCanvasProps, 'src'>;
	src: HTMLImageElement['src'];
}

export function Texture({ src, size, background, animation, ...props }: TextureProps & CanvasHTMLAttributes<HTMLCanvasElement>) {
	return (
		<TextureBackground size={size} background={background} {...props}>
			{animation && src && (
				<TextureCanvas src={src} mcmeta={animation.mcmeta} isPaused={animation.isPaused} isTiled={animation.isTiled} {...props} />
			)}
			{!animation && (
				<TextureImage src={src} {...props} />
			)}
		</TextureBackground>
	);
}
