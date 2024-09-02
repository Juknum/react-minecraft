import { Vector3 } from "three";
import type { JSONModel } from "./types.js";

/**
 * Calculate the midpoint between two points
 */
export function midPoint(a: JSONModel.xyz, b: JSONModel.xyz): Vector3;
export function midPoint(a: Vector3, b: Vector3): Vector3;
export function midPoint(a: unknown, b: unknown): Vector3 {
	if (Array.isArray(a) && Array.isArray(b)) return new Vector3((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2);
	if (a instanceof Vector3 && b instanceof Vector3) return new Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);

	return new Vector3();
}

/**
 * Calculate the height (Y axis) between two points
 */
export function height(a: JSONModel.xyz, b: JSONModel.xyz): number;
export function height(a: Vector3, b: Vector3): number;
export function height(a: unknown, b: unknown): number {
	if (Array.isArray(a) && Array.isArray(b)) return Math.abs(a[1] - b[1]);
	if (a instanceof Vector3 && b instanceof Vector3) return Math.abs(a.y - b.y);

	return -1;
}

/**
 * Clamp Minecraft coordinates (from -16 to 32) to a -1 to 1 range for Three.js
 */
export function clamp(v: JSONModel.xyz): Vector3;
export function clamp(v: Vector3): Vector3;
export function clamp(v: unknown): Vector3 {
	if (Array.isArray(v)) return new Vector3(v[0] / 16 - 1, v[1] / 16 - 1, v[2] / 16 - 1);
	if (v instanceof Vector3) return new Vector3(v.x / 16 - 1, v.y / 16 - 1, v.z / 16 - 1);

	return new Vector3();
}

/**
 * Get width/height/depth of the volume defined by two points
 */
export function getGeometry(from: JSONModel.xyz, to: JSONModel.xyz): JSONModel.xyz {
	return [Math.abs(from[0] - to[0]), Math.abs(from[1] - to[1]), Math.abs(from[2] - to[2])];
}
