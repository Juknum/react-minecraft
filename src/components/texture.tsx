import React, { useEffect } from "react";

import { useAnimation } from "../hooks/useAnimation.js"
import type { MCMeta } from "../types.js";

export declare namespace Texture {
	interface props {
		/**
		 * Source URL of the texture (any url that can be used in an img tag)
		 */
		src: HTMLImageElement['src'];
		/**
		 * The alt text for the image, unused when @see animation is provided
		 */
		alt?: string;

		/**
		 * The size of the texture in the parent container
		 * @default '100%'
		 */
		size?: React.CSSProperties['width'];
		
		/**
		 * The animation data to use for the animation
		 */
		animation?: {
			/**
			 * MCMeta data to use for the animation
			 * @see https://minecraft.wiki/w/Resource_pack#Animation
			 */
			mcmeta: { animation: MCMeta.Animation };
			/**
			 * Tells the hook to center the image in the canvas
			 * Used for fluids and other textures when it needs to seamlessly rotates (in-game) 
			 * without cutting off corners or extending beyond the texture's boundaries.
			 * @default false
			 */
			tiled?: boolean;
			/**
			 * Tells if the animation should play or not, if a number is provided, the animation will pause on that tick
			 * @default false
			 */
			paused?: boolean | number;
		};

		/**
		 * The background color or image url to use for the texture
		 */
		background?: {
			/**
			 * CSS color to use as the background
			 */
			color?: React.CSSProperties['color'];
			/**
			 * URL of the image to use as the background, used as `url(${background.url})` in the style
			 */
			url?: HTMLImageElement['src'];
		};

		style?: React.CSSProperties;
		className?: string;
	}

	export namespace Image {
		interface props extends React.ImgHTMLAttributes<HTMLImageElement> {
			/**
			 * Source URL of the image (any url that can be used in an img tag)
			 */
			src: HTMLImageElement['src'];
			/**
			 * The alt text for the image
			 */
			alt?: string;
		}
	}

	export namespace Canvas {
		interface props extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
			/**
			 * Source URL of the image to animate (any url that can be used in an img tag)
			 */
			src: Texture.props['src'];
			/**
			 * The MCMETA data to use for the animation
			 */
			mcmeta: { animation: MCMeta.Animation };
			/**
			 * Tells if the animation should play or not, if a number is provided, the animation will pause on that tick
			 * @default false
			 */
			isPaused?: boolean | number;
			/**
			 * Tells the hook to center the image in the canvas
			 * Used for fluids and other textures when it needs to seamlessly rotates (in-game) 
			 * without cutting off corners or extending beyond the texture's boundaries.
			 * @default false
			 */
			isTiled?: boolean;
			/**
			 * The ref to the canvas element
			 */
			onCanvasRefUpdate?: (ref: React.RefObject<HTMLCanvasElement>) => void;
		}
	}

	export namespace Background {
		interface props extends React.HTMLAttributes<HTMLDivElement> {
			/**
			 * The size of the texture in the parent container
			 * @default '100%'
			 */
			size?: Texture.props['size'];
			/**
			 * The background color or image url to use for the texture
			 */
			background: Texture.props['background'];
			/**
			 * The children to render inside the background, usually the @see Texture.Canvas or @see Texture.Image
			 */
			children: React.ReactNode;
		}
	}
}

export function Texture({ src, size, background, animation, ...props }: Texture.props) {
	return (
		<Texture.Background size={size} background={background} {...props}>
			{animation && (
				<Texture.Canvas src={src} mcmeta={animation.mcmeta} isPaused={animation.paused} isTiled={animation.tiled} {...props} />
			)}
			{!animation && (
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

		minHeight: size ?? '100%',
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

Texture.Canvas = ({ src, mcmeta, isPaused, isTiled, onCanvasRefUpdate, ...props }: Texture.Canvas.props) => {
	const { canvasRef } = useAnimation({ src, mcmeta, isPaused, isTiled });

	useEffect(() => {
		onCanvasRefUpdate?.(canvasRef);
	}, [canvasRef]);

	return (
		<canvas 
			ref={canvasRef}
			{...props}
		/>
	)
};
