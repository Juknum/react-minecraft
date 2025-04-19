import React from 'react';
import type { ImgHTMLAttributes } from 'react';

export function TextureImage({ src, alt, style, ...props }: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & { src: HTMLImageElement['src'] }) {
	const _style: React.CSSProperties = {
		height: '100%',
		width: '100%',
		imageRendering: 'pixelated',
		objectFit: 'contain',
		...style,
	};

	return <img src={src} alt={alt} style={_style} {...props} />;
}