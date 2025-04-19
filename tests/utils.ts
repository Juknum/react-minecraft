import { renderHook } from '@testing-library/react';

import type { queries, Queries } from '@testing-library/react';

export function renderHookUnpacker<R, P, Q extends Queries = typeof queries, C = HTMLElement, B = C>(params: ReturnType<typeof renderHook<R, P, Q, C, B>>) {
	return params.result.current;
}
