import { Canvas, useFrame, type MeshProps } from "@react-three/fiber";
import React, { useMemo } from "react";

import { useRef, useState } from "react";
import * as THREE from 'three'
import type { JSONModel } from "../types.js";
import { clamp, getGeometry, midPoint } from "../utils.js";
import { Grid, OrbitControls } from "@react-three/drei";

export declare namespace Model {
	interface props {
		model: JSONModel.Block;
	}

	namespace Cube {
		interface props {
			color: string;
			geometry: JSONModel.xyz;
			position: THREE.Vector3;
		}
	}

	namespace Scene {
		interface props {
			children: React.ReactNode;
		}
	}
}

export function Model({ model }: Model.props) {
	if (!model.elements) return null;

	const colors: string[] = [
		'#ff0000',
		'#00ff00',
		'#0000ff',
		'#ffff00',
		'#ff00ff',
		'#00ffff',
		'#ffffff',
		'#000000',
		'#ff8000',
	];

	return (
		<Model.Scene>
			{model.elements.map((element, index) => (
				<Model.Cube 
					key={index}
					color={colors[index % colors.length]!}
					geometry={getGeometry(element.from, element.to)}
					position={clamp(midPoint(element.from, element.to))}
				/>
			))}
		</Model.Scene>
	)
}

Model.Cube = ({ color, geometry, position }: Model.Cube.props) => {
	const meshRef = useRef<THREE.Mesh>(null!);

	const [hovered, setHover] = useState(false);

	return (
		<mesh
      ref={meshRef}
      scale={.0625}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
			position={[position.x + .5, position.y + 1, position.z + .5]}
		>
      <boxGeometry args={geometry} />
      <meshStandardMaterial color={hovered ? 'hotpink' : color} opacity={1} />
		</mesh>
	)
}

Model.Scene = ({ children }: Model.Scene.props) => {
	return (
		<Canvas camera={{ position: [3, 3, 3] }}>
			<Grid 
				scale={[3, 3, 3]}
			/>
			<OrbitControls 
				enableZoom={true}
			/>
			<ambientLight intensity={Math.PI / 2} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			{children}
		</Canvas>
	)
}