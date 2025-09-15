import { writable } from 'svelte/store';

export const sidebarOpen = writable(false);
export const modalOpen = writable(false);
export const currentStep = writable(1);