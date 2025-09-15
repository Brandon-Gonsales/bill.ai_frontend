import type { ProcessingJob } from "$lib/interfaces/processing.interface";
import { writable } from "svelte/store";

export const processingStore = writable<ProcessingJob | null>(null);
export const isProcessing = writable<boolean>(false);