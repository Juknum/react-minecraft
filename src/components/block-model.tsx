import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo } from "react";

import { useRef, useState } from "react";
import * as THREE from 'three'
import type { JSONModel } from "../types.js";
import { Grid, OrbitControls } from "@react-three/drei";
import { Texture } from "./texture.js";
import { COLORS, clampAndAdjust, clampAndAdjust2D, clampValue, length, midPoint } from "../utils.js";
import { ReactMinecraftError } from "../utils/index.js";

export declare namespace BlockModel {
	interface props {
		/**
		 * Block model content from `/assets/[namespace]/models/block/*.json`
		 */
		model: Required<Pick<JSONModel.Block, 'elements' | 'textures'>>;
		/**
		 * Textures used by the block model, can be either a src string or an animated texture object
		 */
		textures: {
			[key: `#${string}`]: 
				| Omit<Partial<Texture.Canvas.props>, 'src'> & Required<Pick<Texture.Canvas.props, 'src'>>
				| Texture.props['src'];
		};

		/**
		 * Background color of the 3D scene
			 * @default transparent
		 */
		backgroundColor?: THREE.ColorRepresentation;

		/**
		 * Styles to apply to the container div
		 */
		style?: React.CSSProperties;

		/**
		 * Resolution of the textures to render, lower values may look blurry
		 * @default 1024 pixels
		 */
		resolution?: number;

		/**
		 * Enable orbit controls for the 3D scene
		 * @default false
		 */
		draggable?: boolean;
	}

	
	namespace ThreeJS {
		interface props {
			/**
			 * Children to render in the ThreeJS scene
			 */
			children: React.ReactNode;
			/**
			 * Background color of the 3D scene 
			 * @default transparent
			 */
			backgroundColor?: THREE.ColorRepresentation;
			/**
			 * Enable orbit controls for the 3D scene
			 * @default false
			 */
			draggable?: boolean;
		}
	}

	namespace Element {
		interface props {
			from: JSONModel.xyz;
			to: JSONModel.xyz;
			canvas: Map<`#${string}`, React.RefObject<HTMLCanvasElement>>;
			faces: JSONModel.Faces;

			/**
			 * Display corners of the element for debugging purposes
			 */
			debug?: boolean;
		}
	}

	namespace Face {
		interface props {
			canvasRef: React.RefObject<HTMLCanvasElement>;
			face: JSONModel.face;
			uv: JSONModel.x1y1x2y2;
			corners: [JSONModel.xyz, JSONModel.xyz, JSONModel.xyz, JSONModel.xyz, JSONModel.xyz, JSONModel.xyz, JSONModel.xyz, JSONModel.xyz];
			position: THREE.Vector3;
		}
	}
}

/**
 * Render a Minecraft Block Model in 3D using ThreeJS
 */
export function BlockModel({ model, textures, resolution, backgroundColor, style, draggable }: BlockModel.props) {
	const [canvasRefs, setCanvasRefs] = useState<Map<`#${string}`, React.RefObject<HTMLCanvasElement>>>(new Map());
	const [ready, setReady] = useState(false);

	for (const texture of Object.keys(model.textures)) {
		if (!textures[`#${texture}`]) 
			ReactMinecraftError.error(`Missing texture for ${texture}: \n- Given textures: ${Object.keys(textures).join(', ')}\n- Expected textures: ${Object.keys(model.textures).join(', ')}`);
	}

	return (
		<div style={{ position: 'relative', ...style }}>
			<div
				style={{ 
					// hide the canvas elements, but keep them in the DOM so they can be rendered
					visibility: 'hidden',
					maxWidth: '100%',
					maxHeight: '100%',
					position: 'absolute',
					zIndex: -10000,
					overflow: 'hidden',
					// => use display flex for debugging purposes
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: '10px',
				}}
			>
				{Object.entries(textures).map(([key, value], index) => (
					<Texture.Canvas
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
			<div style={{ width: '100%', height: '100%' }}>
				{ready && (
					<BlockModel.ThreeJS 
						backgroundColor={backgroundColor}
						draggable={draggable}	
					>
						{model.elements.map((element, index) => (
							<BlockModel.Element 
								key={index}
								from={element.from}
								to={element.to}
								faces={element.faces}
								canvas={canvasRefs}
							/>
						))}
					</BlockModel.ThreeJS>
				)}
			</div>
		</div>
	)
}

BlockModel.Element = ({ from, to, faces, canvas, debug }: BlockModel.Element.props) => {
	const position = useMemo(() => clampAndAdjust(midPoint(from, to)), [from, to]);
	const corners = useMemo<BlockModel.Face.props['corners']>(() => [
			[from[0], from[1], from[2]], // bottom left back
			[from[0], from[1],   to[2]], // bottom left front
			[from[0],   to[1], from[2]], // top left back
			[from[0],   to[1],   to[2]], // top left front
			[to[0],   from[1], from[2]], // bottom right back
			[to[0],   from[1],   to[2]], // bottom right front
			[to[0],     to[1], from[2]], // top right back
			[to[0],     to[1],   to[2]], // top right front
		], [from, to]);


	return (
		<>
			{debug && corners.map((corner, index) => (
				<mesh position={clampAndAdjust(corner)} key={index}>
					<sphereGeometry args={[.02]} />
					<meshBasicMaterial color={COLORS[index]} />
				</mesh>
			))}
			{Object.entries(faces).map(([face, values]) => (
				<BlockModel.Face 
					key={face}
					face={face as JSONModel.face}
					canvasRef={canvas.get(values.texture)!}
					uv={values.uv}
					corners={corners}
					position={position}
				/>
			))}
		</>
	);
}

BlockModel.Face = ({ canvasRef, face, corners, position, uv }: BlockModel.Face.props) => {
	const meshRef = useRef<THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>>(null!);
	const textureRef = useRef<THREE.Texture | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		textureRef.current = new THREE.CanvasTexture(canvas);
	})

	useFrame(() => {
		const mesh = meshRef.current;
		const texture = textureRef.current;

		if (!mesh || !texture) return;

		texture.needsUpdate = true;

		mesh.material.map = texture;
		mesh.material.needsUpdate = true;
	});

	const rotation = useMemo(() => {
		switch (face) {
			case 'north': return new THREE.Euler(0, 0, 0);
			case 'south': return new THREE.Euler(0, Math.PI, 0);
			case 'east': return new THREE.Euler(0, -Math.PI / 2, 0);
			case 'west': return new THREE.Euler(0, Math.PI / 2, 0);
			case 'up': return new THREE.Euler(-Math.PI / 2, 0, 0);
			case 'down': return new THREE.Euler(Math.PI / 2, 0, 0);
		}
	}, [face]);

	const faceDimensions = useMemo(() => {
		// points 'red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'pink'
		//            0,      1,       2,        3,        4,       5,        6,      7

		switch (face) {
			case 'north':
			case 'south':
				return clampAndAdjust2D(new THREE.Vector2(length(corners[1], corners[5]), length(corners[1], corners[3])));
			case 'east':
			case 'west':
				return clampAndAdjust2D(new THREE.Vector2(length(corners[0], corners[1]), length(corners[0], corners[2])));
			case 'up':
			case 'down':
				return clampAndAdjust2D(new THREE.Vector2(length(corners[0], corners[4]), length(corners[0], corners[1])));
		}
	}, [corners, face]);

	const realPosition = useMemo(() => {
		// points 'red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'pink'
		//            0,      1,       2,        3,        4,       5,        6,      7
		switch (face) {
			case 'north': 
				return clampAndAdjust(midPoint(corners[1], corners[7]));
			case 'south':
				return clampAndAdjust(midPoint(corners[4], corners[2]));
			case 'east':
				return clampAndAdjust(midPoint(corners[0], corners[3]));
			case 'west':
				return clampAndAdjust(midPoint(corners[5], corners[6]));
			case 'up':
				return clampAndAdjust(midPoint(corners[6], corners[3]));
			case 'down':
				return clampAndAdjust(midPoint(corners[5], corners[0]));
		}
	}, [face, position]);

	useEffect(() => {
		const mesh = meshRef.current;
		if (!mesh) return;

		const geometry = mesh.geometry;
		const uvAttribute = geometry.getAttribute('uv');
		const uvArray = uvAttribute.array;

		// Map the UV coordinates to the correct position on the texture
		const [x1, y1, x2, y2] = uv.map((v) => Math.abs(clampValue(v, 0, 16, 0, 1))) as JSONModel.x1y1x2y2;

		// Modify the UV coordinates to match the texture
		uvArray[0] = x1; uvArray[1] = y1;
		uvArray[2] = x2; uvArray[3] = y1;
		uvArray[4] = x1; uvArray[5] = y2;
		uvArray[6] = x2; uvArray[7] = y2;

		uvAttribute.needsUpdate = true;
	}, [uv]);

	return (
		<mesh 
			ref={meshRef}
			position={realPosition}
			rotation={rotation}
			frustumCulled={false}
		>
			<planeGeometry args={[faceDimensions.x, faceDimensions.y]} />
			<meshBasicMaterial transparent />
		</mesh>
	)
};

BlockModel.ThreeJS = ({ children, backgroundColor, draggable }: BlockModel.ThreeJS.props) => {
	const camera = new THREE.PerspectiveCamera(45, 1, 1, 128);
	camera.position.set(4, 4, 4);
	camera.lookAt(0, 0, 0);

	return (
		<Canvas
			camera={camera}
			onCreated={({ gl }) => {
				if (backgroundColor) gl.setClearColor(backgroundColor);
				gl.setPixelRatio(window.devicePixelRatio);
			}}
		>
			<ambientLight color={"red"} intensity={0.75} position={[0, 0, 0]} />
			<directionalLight color={"blue"} intensity={0.25} position={[64, 64, -64]} />

			{children}

			{draggable && <OrbitControls enableZoom={true} />}
		</Canvas>
	)
}