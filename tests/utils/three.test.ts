import { Vector3 } from "three";
import { describe, expect, it } from "vitest";
import { midPoint } from "../../src/utils/three.js";

describe('three', () => {
	it('should get the midpoint of two vectors 3', () => {
		const a = new Vector3(1, 1, 1);
		const b = new Vector3(3, 3, 3);
		const mid = midPoint(a, b);
		
		expect(mid).toEqual(new Vector3(2, 2, 2));		
	});
})