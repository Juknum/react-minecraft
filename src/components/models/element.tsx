
import React, { useMemo, type RefObject } from 'react';
import { Vector3, Vector4 } from 'three';
import { midPoint } from '../../utils/three.js';
import { Face, type FaceProps } from './face.js';
import type { face, Faces } from '../../types/model.js';

interface props {
	from: Vector3;
	to: Vector3;

	canvas: Map<`#${string}`, RefObject<HTMLCanvasElement>>;
	faces: Faces;

	debug?: boolean;
}

const COLORS = [
	0xff0000,
	0x00ff00,
	0x0000ff,
	0xffff00,
	0xff00ff,
	0x00ffff,
	0xffffff,
	0x000000,
];

/**
 * Render a Minecraft Model element in 3D using ThreeJS
 */
export function Element({ from, to, faces, canvas, debug }: props) {
	const position = useMemo(() => midPoint(from, to), [from, to]); // TODO clamp values to -1.5 / 1.5 instead of -16 / 32
	const corners: FaceProps['corners'] = useMemo(() => [
		new Vector3(from.x, from.y, from.z),
		new Vector3(from.x, from.y, to.z),
		new Vector3(from.x, to.y, from.z),
		new Vector3(from.x, to.y, to.z),
		new Vector3(to.x, from.y, from.z),
		new Vector3(to.x, from.y, to.z),
		new Vector3(to.x, to.y, from.z),
		new Vector3(to.x, to.y, to.z),
	], [from, to]);

	return (
		<>
			{debug && corners.map((corner, i) => (
				<mesh position={corner} key={i}>
					<sphereGeometry args={[.2]} />
					<meshBasicMaterial color={COLORS[i]} />
				</mesh>
			))}
			{Object.entries(faces).map(([kind, face]) => {
				const canvasRef = canvas.get(face.texture);
				if (!canvasRef) return null;

				return (
					<Face
						key={kind}
						face={kind as face}
						canvasRef={canvasRef}
						uv={new Vector4(...face.uv)}
						corners={corners}
						position={position}
					/>
				);
			})}
		</>
	);
}