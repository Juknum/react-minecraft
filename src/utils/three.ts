import { Vector3 } from 'three';

/**
 * Get the midpoint between two vectors
 */
export function midPoint(a: Vector3, b: Vector3): Vector3 {
	return new Vector3().addVectors(a, b).divideScalar(2);
}