import type { UseUserMediaStatusType, UseUserMediaStreamType } from '$lib/types/components';
import { writable } from 'svelte/store';

const _result: string | null = null;
const _error: string | null = null;
const _stream: UseUserMediaStreamType = null;
const _status: UseUserMediaStatusType = 'none';

export const stream = writable(_stream as UseUserMediaStreamType);
export const error = writable(_error as string | null);
export const status = writable(_status as UseUserMediaStatusType);
export const result = writable(_result as string | null);
