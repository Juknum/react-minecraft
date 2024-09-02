import { Vector2, Vector3 } from "three";
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

const MC_MIN = -16;
const MC_MAX =  32; 
const THREE_MIN = -1.5;
const THREE_MAX =  1.5;

export const clampValue = (value: number, old_min = MC_MIN, old_max = MC_MAX, min = THREE_MIN, max = THREE_MAX) => {
	const normalized = (value - old_min) / (old_max - old_min);
	return normalized * (max - min) + min;
}

/**
 * Clamp coordinates [-16, 32] to [-1.5, 1.5] range for Three.js
 * This adjusts the position of the block to be centered in the middle of the block instead of the corner
 */
export function clampAndAdjust(v: JSONModel.xyz): Vector3;
export function clampAndAdjust(v: Vector3): Vector3;
export function clampAndAdjust(v: unknown): Vector3 {
	let output = new Vector3(0, 0, 0);
	if (Array.isArray(v)) output = new Vector3(clampValue(v[0]), clampValue(v[1]), clampValue(v[2]));
	if (v instanceof Vector3) output = new Vector3(clampValue(v.x), clampValue(v.y), clampValue(v.z));

	return output.add(new Vector3(0, 0.5, 0));
}

export function clampAndAdjust2D(v: [number, number]): Vector2;
export function clampAndAdjust2D(v: Vector2): Vector2;
export function clampAndAdjust2D(v: unknown): Vector2 {
	let output = new Vector2(0, 0);
	if (Array.isArray(v)) output = new Vector2(clampValue(v[0]), clampValue(v[1]));
	if (v instanceof Vector2) output = new Vector2(clampValue(v.x), clampValue(v.y));

	return output.add(new Vector2(0.5, 0.5));
}

/**
 * Get the distance between two points
 */
export function length(a: JSONModel.xyz, b: JSONModel.xyz): number;
export function length(a: Vector3, b: Vector3): number;
export function length(a: unknown, b: unknown): number {
	if (Array.isArray(a) && Array.isArray(b)) return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
	if (a instanceof Vector3 && b instanceof Vector3) return a.distanceTo(b);

	return 0;
}

export function normalizedLength(a: JSONModel.xyz, b: JSONModel.xyz): number;
export function normalizedLength(a: Vector3, b: Vector3): number;
export function normalizedLength(a: any, b: any): number {
	return clampValue(length(a, b));
}

export const COLORS = [
	'red', 'blue', 'green', 'yellow', 'purple', 'black', 'orange', 'pink'
] as const;