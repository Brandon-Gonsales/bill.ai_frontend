import { writable } from 'svelte/store';

export interface ProcessedFile {
	id: string;
	name: string;
	blob: Blob;
	processedAt: Date;
	originalFiles: string[];
}

export const processedFiles = writable<ProcessedFile[]>([]);

export function addProcessedFile(blob: Blob, originalFiles: File[]): void {
	const newFile: ProcessedFile = {
		id: crypto.randomUUID(),
		name: `facturas_procesadas_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`,
		blob,
		processedAt: new Date(),
		originalFiles: originalFiles.map((f) => f.name)
	};

	processedFiles.update((files) => [newFile, ...files]);
}

export function downloadFile(file: ProcessedFile): void {
	const url = URL.createObjectURL(file.blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = file.name;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
