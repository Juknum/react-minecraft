import type { BlockModelType } from '../../../types/model.js';
import { ThreeContainer, type ThreeContainerProps } from '../three.js';
import React, { useState, type RefObject } from 'react';
import { error } from '../../../utils/error.js';
import { TextureCanvas, type TextureCanvasProps } from '../../texture/canvas.js';
import { Element } from '../element.js';
import { Vector3 } from 'three';

interface BlockModelProps extends Omit<ThreeContainerProps, 'children'>, ThreeContainerProps {
	model: Required<Pick<BlockModelType, 'elements' | 'textures'>>;
	textures: 
		Record<`#${string}`,
			| HTMLImageElement['src']
			| TextureCanvasProps
		>;

	resolution?: number;

	style?: React.CSSProperties;
	className?: string;
}

export function BlockModel({ model, textures, resolution, style, className, ...props }: BlockModelProps) {
	const [canvasRefs, setCanvasRefs] = useState<Map<`#${string}`, RefObject<HTMLCanvasElement>>>(new Map());
	const [ready, setReady] = useState(false);

	for (const texture of Object.keys(model.textures)) {
		if (!textures[`#${texture}`])
			error(`Missing texture for ${texture}: \n- Given textures: ${Object.keys(textures).join(', ')}\n- Expected textures: ${Object.keys(model.textures).join(', ')}`);
	}

	return (
		<div
			className={className} 
			style={{ 
				position: 'relative', // so the overflow: hidden on the canvas elements works
				...style
			}}
		>
			<div
				// hide the canvas elements, 
				// but keep them in the DOM so they can be copied to the Three.js geometry planes
				style={{
					visibility: 'hidden',
					maxWidth: '100%',
					maxHeight: '100%',
					position: 'absolute',
					zIndex: -10000,
					overflow: 'hidden',
				}}
			>
				{Object.entries(textures).map(([key, value], index) => (
					<TextureCanvas
						key={index}

						src={typeof value === 'string' ? value : value.src}
						mcmeta={typeof value === 'string' ? { animation: {} } : { animation: value.mcmeta?.animation ?? {} }}

						isTiled={typeof value === 'string' ? false : value.isTiled}
						isPaused={typeof value === 'string' ? false : value.isPaused}

						onCanvasRefUpdate={(ref) => {
							setCanvasRefs(canvasRefs.set(key as `#${string}`, ref));
							setReady(canvasRefs.size === Object.keys(textures).length);
						}}

						style={{
							maxWidth: resolution ?? 1024,
							maxHeight: resolution ?? 1024,
							minWidth: resolution ?? 1024,
							minHeight: resolution ?? 1024,
						}}
					/>
				))}
			</div>
			<div
				style={{
					width: '100%',
					height: '100%',
				}}
			>
				{ready && (
					<ThreeContainer {...props}>
						{model.elements.map((element, index) => (
							<Element 
								key={index}
								from={new Vector3(...element.from)}
								to={new Vector3(...element.to)}
								faces={element.faces}
								canvas={canvasRefs}
							/>
						))}
					</ThreeContainer>
				)}
			</div>
		</div>
	);
}