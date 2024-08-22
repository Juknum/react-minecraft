import React, { isValidElement } from "react";
import { useAnimation } from "../hooks/useAnimation.js"

import type { MCMeta } from "../types.js";

export declare namespace Texture {
	interface props {
		src: HTMLImageElement['src'];
		alt?: string;
		style?: React.CSSProperties;
		className?: string;
		
		size?: React.CSSProperties['width'];

		mcmeta?: { 
			animation?: MCMeta.Animation;
			tiled?: boolean;
		};
		background?: {
			color?: React.CSSProperties['color'];
			url?: HTMLImageElement['src'];
		};
	}

	export namespace Image {
		interface props extends React.ImgHTMLAttributes<HTMLImageElement> {
			src: HTMLImageElement['src'];
			alt?: string;
		}
	}

	export namespace Canvas {
		interface props extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
			src: HTMLImageElement['src'];
			mcmeta?: Texture.props['mcmeta'];
		}
	}

	export namespace Background {
		interface props extends React.HTMLAttributes<HTMLDivElement> {
			size?: Texture.props['size'];
			background: Texture.props['background'];
			children?: React.ReactNode;
		}
	}
}

export function Texture({ src, size, background, mcmeta, ...props }: Texture.props) {
	return (
		<Texture.Background size={size} background={background} {...props}>
			{mcmeta && (
				<Texture.Canvas src={src} mcmeta={mcmeta} {...props} />
			)}
			{!mcmeta && (
				<Texture.Image src={src} {...props} />
			)}
		</Texture.Background>
	);
}

Texture.Background = ({ size, children, background, style, ...props }: Texture.Background.props) => {
	const _style: React.CSSProperties = {
		backgroundImage: background?.url ? `url(${background.url})` : undefined,
		backgroundSize: 'cover',
		imageRendering: 'pixelated',

		height: size ?? '100%',
		width: size ?? '100%',

		backgroundColor: background?.color ? background.color : 'transparent',
		...style,
	}

	return (
		<div style={_style} {...props}>
			{children}
		</div>
	);
}

Texture.Image = ({ src, alt, style, ...props }: Texture.Image.props) => {
	const _style: React.CSSProperties = {
		height: '100%',
		width: '100%',
		imageRendering: 'pixelated',
		objectFit: 'contain',
		...style,
	};

	return <img src={src} alt={alt} style={_style} {...props} />;
}

Texture.Canvas = ({ src, mcmeta, ...props }: Texture.Canvas.props) => {
	const { canvasRef, isValid } = useAnimation({ src, mcmeta, isTiled: mcmeta?.tiled });
	if (!isValid) return Texture.Image({ src });

	return (
		<canvas 
			ref={canvasRef}
			{...props}
		/>
	)
};
