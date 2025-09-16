import type { AppState, ProcessingState } from '$lib/interfaces/api.interface';
import { derived, writable } from 'svelte/store';

// Estado principal de la aplicación
function createAppStore() {
	const { subscribe, set, update } = writable<AppState>({
		templateLoaded: false,
		detectedFields: [],
		processedData: null,
		currentStep: 'template'
	});

	return {
		subscribe,
		setTemplateLoaded: (fields: string[]) =>
			update((state) => ({
				...state,
				templateLoaded: true,
				detectedFields: fields,
				currentStep: 'upload'
			})),
		setProcessedData: (data: Blob) =>
			update((state) => ({
				...state,
				processedData: data,
				currentStep: 'results'
			})),
		setCurrentStep: (step: AppState['currentStep']) =>
			update((state) => ({
				...state,
				currentStep: step
			})),
		reset: () =>
			set({
				templateLoaded: false,
				detectedFields: [],
				processedData: null,
				currentStep: 'template'
			})
	};
}

// Estado de procesamiento
function createProcessingStore() {
	const { subscribe, set, update } = writable<ProcessingState>({
		isLoading: false,
		progress: 0,
		currentFile: undefined
	});

	return {
		subscribe,
		startProcessing: () =>
			update((state) => ({
				...state,
				isLoading: true,
				progress: 0
			})),
		updateProgress: (progress: number, currentFile?: string) =>
			update((state) => ({
				...state,
				progress,
				currentFile
			})),
		finishProcessing: () =>
			update((state) => ({
				...state,
				isLoading: false,
				progress: 100,
				currentFile: undefined
			})),
		reset: () =>
			set({
				isLoading: false,
				progress: 0,
				currentFile: undefined
			})
	};
}

export const appStore = createAppStore();
export const processingStore = createProcessingStore();

// Store derivado para determinar si se puede procesar
export const canProcess = derived(
	appStore,
	($appStore) => $appStore.templateLoaded && $appStore.currentStep === 'upload'
);
