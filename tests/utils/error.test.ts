import { describe, expect, it } from "vitest";
import { error } from "../../src/utils/error.js";

describe('error', () => {
	it('should throw an error with a prefixed message', () => {
		expect(() => {
			error('test');
		}).toThrowError('[react-minecraft] test');
	});
})