import React, { useState } from 'react';

import { render, renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { useAnimation } from '../src/hooks/useAnimation.js';
import { renderHookUnpacker } from './utils.js';

const url = 'https://raw.githubusercontent.com/Faithful-Pack/Default-Java/java-snapshot/assets/minecraft/textures/block';

describe('useAnimation', () => {
	it('should return a ref to the canvas element and a boolean indicating if the animation is valid', () => {
		const src = `${url}/campfire_fire.png`;
		const mcmeta = { 
			animation: {},
		};

		const { canvasRef, isValid } = renderHookUnpacker(renderHook(() => useAnimation({ src, mcmeta })));

		render(<canvas ref={canvasRef} />);

		expect(isValid).toBe(true);
		expect(canvasRef.current).toBeInstanceOf(HTMLCanvasElement);
	});

	it('should return a ref to the canvas element and a boolean indicating if the animation is invalid', () => {
		const src = `${url}/campfire_fire.png`;
		const mcmeta = undefined;

		const { canvasRef, isValid } = renderHookUnpacker(renderHook(() => useAnimation({ src, mcmeta })));

		render(<canvas ref={canvasRef} />);

		expect(isValid).toBe(false);
		expect(canvasRef.current).toBeInstanceOf(HTMLCanvasElement);
	});
});