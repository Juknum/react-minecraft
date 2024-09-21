import { useEffect, useRef, useState } from 'react';

import type { Animation, AnimationFrame } from '~/types/mcmeta.js';

interface params {
	/**
	 * The URL of the image to animate
	 */
	src: HTMLImageElement['src'];
	/**
	 * The MCMETA data to use for the animation
	 * @see https://minecraft.wiki/w/Resource_pack#Animation
	 */
	mcmeta?: { animation?: Animation };
	/**
	 * Tells the hook to center the image in the canvas
	 * Used for fluids and other textures when it needs to seamlessly rotates (in-game) 
	 * without cutting off corners or extending beyond the texture's boundaries.
	 * @default false
	 */
	isTiled?: boolean;
	/**
	 * Tells if the animation should play or not, if a number is provided, the animation will pause on that tick
	 * @default false
	 */
	isPaused?: boolean | number;
}

interface output {
	/**
	 * A reference to the canvas element used for the animation
	 */
	canvasRef: React.RefObject<HTMLCanvasElement>;
	/**
	 * Determined sprites from the MCMETA data
	 */
	sprites: AnimationFrame[];
}

/**
 * A hook to animate a texture using the given MCMETA data
 * @returns A ref to the canvas element and a boolean indicating if the MCMETA data is valid
 */
export function useAnimation({ src, mcmeta, isTiled, isPaused }: params): output {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const tickingRef = useRef<NodeJS.Timeout>();

	const [image, setImage] = useState<HTMLImageElement | null>(null);
	const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

	const [sprites, setSprites] = useState<AnimationFrame[]>([]);
	const [frames, setFrames] = useState<Record<number, [AnimationFrame, number][]>>({});
	const [currentTick, setTick] = useState(1);

	// Update the image when the src changes
	useEffect(() => {
		setCanvas(canvasRef.current);

		const img = new Image();
		img.setAttribute('crossorigin', 'anonymous');
		img.src = src;

		img.onload = () => {
			setImage(img);
			tickingRef.current = setInterval(() => { void 0; }, 1000 / 20);
		};

		img.onerror = () => {
			setImage(null);
			if (tickingRef.current) {
				clearInterval(tickingRef.current);
				tickingRef.current = undefined;
			}
		};

	}, [src]);

	// Update the frames when the image or mcmeta changes
	useEffect(() => {
		if (!image || !mcmeta) return;
		const animation = mcmeta.animation ?? {};

		// convert all frames to an array of objects with index and time
		const animationFrames: AnimationFrame[] = [];

		if (animation.frames) {
			for (const frame of animation.frames) {
				switch (typeof frame) {
					// already in the correct format
					case 'object':
						animationFrames.push({ index: frame.index, time: Math.max(frame.time, 1) });
						break;
					// map the frame to the correct format
					case 'number':
						animationFrames.push({ index: frame, time: animation.frametime ?? 1 });
						break;
				}
			}
		}
		// no frames specified, so we assume the image is a sprite sheet
		else {
			const framesCount = isTiled ? (image.height / 2) / (image.width / 2) : image.height / image.width;
			for (let fi = 0; fi < framesCount; fi++) {
				animationFrames.push({ index: fi, time: animation.frametime ?? 1 });
			}
		}

		// determines what frames (including interpolated ones) to play on each tick
		// => { tick: [frame, alpha][] } (where the first frame has always an alpha of 1 and the second one is interpolated)
		const framesToPlay: Record<number, [AnimationFrame, number][]> = {};

		let ticks = 1;
		animationFrames.forEach((frame, index) => {
			for (let t = 1; t <= frame.time; t++) {
				framesToPlay[ticks] = [[frame, 1]];
				
				if (animation.interpolate) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					const nextFrame = animationFrames[index + 1] ?? animationFrames[0]!;
					framesToPlay[ticks]?.push([nextFrame, t / nextFrame.time]);
				}

				ticks++;
			}
		});

		setFrames(framesToPlay);
		setSprites(animationFrames);
	}, [image, isTiled, mcmeta]);

	// Main loop to play the animation
	useEffect(() => {
		if (Object.keys(frames).length === 0) return;

		setTimeout(() => {
			if (!isPaused && isPaused !== 0) {
				let next = currentTick + 1;
				if (frames[next] === undefined) next = 1;
				setTick(next);
			}
			else {
				const tickToPause = typeof isPaused === 'number' 
					? ((isPaused - 1) % Object.keys(frames).length) + 1 // 1-indexed
					: currentTick;
				setTick(tickToPause);
			}
		}, 1000 / 20); // 20 ticks per second (50ms per tick)

	}, [frames, currentTick, isPaused]);

	useEffect(() => {
		if (Object.keys(frames).length === 0) return;
		const framesToDraw = frames[currentTick];

		const context = canvas?.getContext('2d');
		if (!canvas || !context || !image || !framesToDraw) return;

		canvas.style.width = '100%';
		canvas.width = canvas.offsetWidth;
		canvas.height = canvas.offsetWidth;

		const padding = isTiled ? image.width / 4 : 0;
		const width = isTiled ? image.width / 2 : image.width;

		context.clearRect(0, 0, width, width);
		context.globalAlpha = 1;
		context.imageSmoothingEnabled = false;

		for (const frame of framesToDraw) {
			const [data, alpha] = frame;
			context.globalAlpha = alpha;

			context.drawImage(
				// source image
				image,

				// position on source image
				// top left, top right
				padding, padding + (width * data.index) * (isTiled ? 2 : 1),
				// width, height of the source image
				width, width,

				// position on canvas
				// top left, top right
				0, 0,
				// width, height
				canvas.width, canvas.width
			);
		}
	}, [currentTick, canvas, image, canvasRef, frames]);

	return { 
		canvasRef,
		sprites,
	};
}

useAnimation.defaultProps = {
	mcmeta: { animation: {} },
	isTiled: false,
	isPaused: false,
};
