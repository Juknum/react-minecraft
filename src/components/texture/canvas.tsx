import React, { useEffect, type CanvasHTMLAttributes } from 'react';
import { useAnimation } from '../../hooks/useAnimation.js';
import type { Animation } from '../../types/mcmeta.js';

export interface TextureCanvasProps {
	/**
	 * Source URL of the texture (any url that can be used in an img tag)
	 */
	src: HTMLImageElement['src'];
	/**
	 * The MCMETA data to use for the animation
	 */
	mcmeta: { animation: Animation };
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

export function TextureCanvas({ src, mcmeta, isPaused, isTiled, onCanvasRefUpdate, ...props }: TextureCanvasProps & CanvasHTMLAttributes<HTMLCanvasElement>) {
	const { canvasRef } = useAnimation({ src, mcmeta, isPaused, isTiled });

	useEffect(() => {
		onCanvasRefUpdate?.(canvasRef);
	}, [canvasRef]);

	return (
		<canvas ref={canvasRef} {...props} />
	);
}