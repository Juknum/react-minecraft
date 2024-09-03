import type { CanvasHTMLAttributes, ImgHTMLAttributes } from 'react';
import { TextureBackground, type TextureBackgroundProps } from './background.js';
import { TextureCanvas, type TextureCanvasProps } from './canvas.js';
import { TextureImage } from './image.js';
import React from 'react';

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
