import { writable } from 'svelte/store';

export const token = writable<string | null>(localStorage.getItem('token') ?? null);
token.subscribe((value) => {
	if (!value) localStorage.removeItem('token');
	else localStorage.setItem('token', value);
});
