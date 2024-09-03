import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React from 'react';
import { PerspectiveCamera, type ColorRepresentation } from 'three';

export interface ThreeContainerProps {
	/**
	 * Children to render in the ThreeJS scene
	 */
	children: React.ReactNode;
	/**
	 * Background color of the 3D scene 
	 * @default transparent
	 */
	backgroundColor?: ColorRepresentation;
	/**
	 * Enable orbit controls for the 3D scene
	 * @default false
	 */
	draggable?: boolean;
}

export function ThreeContainer({ children, backgroundColor, draggable }: ThreeContainerProps) {
	const camera = new PerspectiveCamera(45, 1, 1, 128);
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
			<ambientLight color={'red'} intensity={0.75} position={[0, 0, 0]} />
			<directionalLight color={'blue'} intensity={0.25} position={[64, 64, -64]} />

			{children}

			{draggable && <OrbitControls enableZoom={true} />}
		</Canvas>
	);
}