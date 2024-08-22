import { useEffect, useRef, useState } from 'react';

import type { MCMeta } from '../types.js';

export declare namespace useAnimation {
	interface params {
		/**
		 * The URL of the image to animate
		 */
		src: HTMLImageElement['src'];
		/**
		 * The MCMETA data to use for the animation
		 * @see https://minecraft.wiki/w/Resource_pack#Animation
		 */
		mcmeta?: { animation?: MCMeta.Animation };
		/**
		 * Tells the hook to center the image in the canvas
		 * Used for fluids and other textures when it needs to seamlessly rotates (in-game) 
		 * without cutting off corners or extending beyond the texture's boundaries.
		 */
		isTiled?: boolean;
	}

	interface output {
		/**
		 * A reference to the canvas element used for the animation
		 */
		canvasRef: React.RefObject<HTMLCanvasElement>;
		/**
		 * A boolean indicating if the animation is valid and is displayed
		 */
		isValid: boolean;
	}
}

/**
 * A hook to animate a texture using the given MCMETA data
 * @author Even Torset &lt;https://github.com/EvenTorset&gt; for the original MCMETA to canvas code
 *
 * @returns A ref to the canvas element and a boolean indicating if the MCMETA data is valid
 */
export function useAnimation({ src, mcmeta, isTiled }: useAnimation.params): useAnimation.output {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationInterval = useRef<NodeJS.Timeout>();

	const [isValid, setValid] = useState(false);

	useEffect(() => {
		// Clear the previous interval if it exists
		// >> avoid cumulative intervals when the component re-renders
		if (animationInterval.current) {
			clearInterval(animationInterval.current);
			animationInterval.current = undefined;
		}

		// Short return if the mcmeta is not valid or not present
		if (!mcmeta) return setValid(false);

		setValid(true);

		const image = new Image();
		image.src = src;

		const tick = Math.max(mcmeta?.animation?.frametime || 1, 1);
		const frames: MCMeta.AnimationFrame[] = [];

		let interval: number;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext('2d');
		if (!context) return;

		const draw = (frame = 0, ticks = 0) => {
			const padding = isTiled ? image.width / 4 : 0;
			const width = isTiled ? image.width / 2 : image.width;

			context.clearRect(0, 0, width, width);
			context.globalAlpha = 1;
			context.imageSmoothingEnabled = false;

			context.drawImage(
				// source image
				image,

				// position on source image
				// top left, top right
				padding, padding + (width * frames[frame]?.index!) * (isTiled ? 2 : 1),
				// width, height of the source image
				width, width,

				// position on canvas
				// top left, top right
				0, 0,
				// width, height
				canvas.width, canvas.width
			);

			// Partially draw the next frame if interpolation is enabled
			if (mcmeta?.animation?.interpolate) {
				context.globalAlpha = ticks / (frames[frame]?.time ?? 1);
				context.drawImage(
					image,

					padding, padding + (width * frames[(frame + 1) % frames.length]?.index!) * (isTiled ? 2 : 1),
					width, width,

					0, 0,
					canvas.width, canvas.height
				);
			}
		};

		image.onload = () => {
			if (mcmeta?.animation?.frames && mcmeta?.animation.frames.length > 0) {
				interval =
					mcmeta?.animation.interpolate ||
						mcmeta?.animation.frames.find((e) => typeof e === 'object' && e.time % tick !== 0)
						? 1
						: tick;

				for (let e = 0; e < mcmeta?.animation.frames.length; e++) {
					const a = mcmeta?.animation.frames[e]!;

					if (typeof a === 'object')
						frames.push({
							index: a.index,
							time: Math.max(a.time, 1) / interval,
						});
					else
						frames.push({
							index: a,
							time: tick / interval,
						});
				}
			} else {
				interval = mcmeta?.animation?.interpolate ? 1 : tick;
				const framesCount = isTiled 
					? (image.height / 2) / (image.width / 2)
					: image.height / image.width;

				for (let fi = 0; fi < framesCount; fi++) {
					frames.push({ index: fi, time: tick / interval });
				}
			}

			let ticks = 0;
			let currentFrame = 0;

			const update = () => {
				ticks++;

				// update canvas size each frame to match the container size
				// >> this is required if the canvas is first hidden and then shown
				canvas.style.width = '100%';
				canvas.width = canvas.offsetWidth;
				canvas.height = canvas.offsetWidth;

				if (frames[currentFrame]!.time <= ticks) {
					ticks = 0;
					currentFrame++;
					if (currentFrame >= frames.length) currentFrame = 0;
					draw(currentFrame);
				} else if (mcmeta?.animation?.interpolate) draw(currentFrame, ticks);
			};

			if (!animationInterval.current) {
				update(); // initial draw before starting interval
				animationInterval.current = setInterval(update, interval * 60);
			}
		};

		image.onerror = () => {
			canvas.remove();
			setValid(false);
		};

	}, [
		src,
		mcmeta,
		isValid, // re-run if the mcmeta validity changes
	]);

	return { canvasRef, isValid };
}
