import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { CanvasTexture, Euler, Mesh, MeshBasicMaterial, PlaneGeometry, Texture, Vector2, Vector3, type Vector4 } from 'three';
import { midPoint } from '../../utils/three.js';
import React from 'react';
import type { face } from '../../types/model.js';

export interface FaceProps {
	canvasRef: React.RefObject<HTMLCanvasElement>;
	face: face;
	uv: Vector4;
	corners: [
		Vector3, Vector3, Vector3, Vector3,
		Vector3, Vector3, Vector3, Vector3,
	];
	position: Vector3;
}

export function Face({ canvasRef, face, uv, corners, position }: FaceProps) {
	const meshRef = useRef<Mesh<PlaneGeometry, MeshBasicMaterial>>(null);
	const textureRef = useRef<Texture | null>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		textureRef.current = new CanvasTexture(canvas);
	}, [canvasRef]);

	useFrame(() => {
		const mesh = meshRef.current;
		const texture = textureRef.current;

		if (!mesh || !texture) return;

		mesh.material.map = texture;
		mesh.material.needsUpdate = true;
	});

	const rotation = useMemo(() => {
		switch (face) {
			case 'north': 
				return new Euler(0, 0, 0);
			case 'south': 
				return new Euler(0, Math.PI, 0);
			case 'east': 
				return new Euler(0, -Math.PI / 2, 0);
			case 'west': 
				return new Euler(0, Math.PI / 2, 0);
			case 'up': 
				return new Euler(-Math.PI / 2, 0, 0);
			case 'down': 
				return new Euler(Math.PI / 2, 0, 0);
		}
	}, [face]);

	const faceDimensions = useMemo(() => {
		switch (face) {
			case 'north':
			case 'south':
				return new Vector2(corners[1].distanceTo(corners[5]), corners[1].distanceTo(corners[3]));
			case 'east':
			case 'west':
				return new Vector2(corners[0].distanceTo(corners[1]), corners[0].distanceTo(corners[2]));
			case 'up':
			case 'down':
				return new Vector2(corners[0].distanceTo(corners[4]), corners[0].distanceTo(corners[1]));
		}
	}, [corners, face]);

	const realPosition = useMemo(() => {
		switch (face) {
			case 'north':
				return midPoint(corners[1], corners[7]);
			case 'south':
				return midPoint(corners[4], corners[2]);
			case 'east':
				return midPoint(corners[0], corners[3]);
			case 'west':
				return midPoint(corners[5], corners[6]);
			case 'up':
				return midPoint(corners[6], corners[3]);
			case 'down':
				return midPoint(corners[5], corners[0]);
		}
	}, [face, position]);

	useEffect(() => {
		const mesh = meshRef.current;
		if (!mesh) return;

		const geometry = mesh.geometry;
		const uvAttribute = geometry.getAttribute('uv');
		const uvArray = uvAttribute.array;

		// Map the UV coordinates to the correct position on the texture
		const [x1, y1, x2, y2] = [uv.x, uv.y, uv.z, uv.w];

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
			frustumCulled={false} // TODO: check why it does nothing
		>
			<planeGeometry args={[faceDimensions.x, faceDimensions.y]} />
			<meshBasicMaterial transparent />
		</mesh>
	);
}