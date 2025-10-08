import { ENDPOINTS } from '$lib/constants';
import type { TemplateResponse } from '$lib/interfaces/api.interface.js';

const getEnvVariable = (key: string): string => {
	const value = import.meta.env[key];
	if (!value) {
		throw new Error(`La variable de entorno ${key} no está definida`);
	}
	return value;
};

const API_BASE_URL = getEnvVariable('VITE_API_BASE_URL');

class ApiService {
	private baseUrl = API_BASE_URL;

	async uploadTemplate(file: File): Promise<TemplateResponse> {
		const formData = new FormData();
		formData.append('file', file);

		const response = await fetch(`${this.baseUrl}${ENDPOINTS.UPLOAD_TEMPLATE}`, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			throw new Error(`Error al cargar plantilla: ${response.statusText}`);
		}

		return response.json();
	}

	// async processInvoices(files: File[]): Promise<Blob> {
	// 	const formData = new FormData();

	// 	files.forEach((file) => {
	// 		formData.append('files', file);
	// 	});

	// 	const response = await fetch(`${this.baseUrl}${ENDPOINTS.PROCESS_INVOICE}`, {
	// 		method: 'POST',
	// 		body: formData
	// 	});

	// 	if (!response.ok) {
	// 		const errorText = await response.text();
	// 		throw new Error(`Error al procesar facturas: ${errorText}`);
	// 	}

	// 	return response.blob();
	// }

	async processInvoices(files: File[], nombre: string, nit: string): Promise<Blob> {
		const formData = new FormData();
		console.log(files);
		// Agregar los archivos
		files.forEach((file) => {
			formData.append('files', file);
		});

		// Agregar los nuevos campos
		formData.append('nombre', nombre);
		formData.append('nit', nit);

		const response = await fetch(`${this.baseUrl}${ENDPOINTS.PROCESS_INVOICE}`, {
			method: 'POST',
			body: formData
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error al procesar facturas: ${errorText}`);
		}
		console.log(response);
		return response.blob();
	}

	async clearTemplate(): Promise<{ message: string }> {
		const response = await fetch(`${this.baseUrl}${ENDPOINTS.CLEAR_TEMPLATE}`, {
			method: 'POST',
			headers: {
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Error al limpiar plantilla: ${errorText}`);
		}
		console.log(response);

		return response.json();
	}
}

export const apiService = new ApiService();
// import { ENDPOINTS } from '$lib/constants';
// import type { TemplateResponse } from '$lib/interfaces/api.interface.js';

// const getEnvVariable = (key: string): string => {
// 	const value = import.meta.env[key];
// 	if (!value) {
// 		throw new Error(`La variable de entorno ${key} no está definida`);
// 	}
// 	return value;
// };

// const API_BASE_URL = getEnvVariable('VITE_API_BASE_URL');

// class ApiService {
// 	private baseUrl = API_BASE_URL;

// 	async uploadTemplate(file: File): Promise<TemplateResponse> {
// 		const formData = new FormData();
// 		formData.append('file', file);

// 		const response = await fetch(`${this.baseUrl}${ENDPOINTS.UPLOAD_TEMPLATE}`, {
// 			method: 'POST',
// 			body: formData
// 		});

// 		if (!response.ok) {
// 			throw new Error(`Error al cargar plantilla: ${response.statusText}`);
// 		}

// 		return response.json();
// 	}

// 	async processInvoices(files: File[], ocrEngine: 'easyocr' | 'gemini'): Promise<Blob> {
// 		const formData = new FormData();
// 		formData.append('ocr_engine', ocrEngine);

// 		// Agregar todos los archivos
// 		files.forEach((file) => {
// 			formData.append('file', file);
// 		});

// 		const response = await fetch(`${this.baseUrl}${ENDPOINTS.PROCESS_INVOICE}`, {
// 			method: 'POST',
// 			body: formData
// 		});

// 		if (!response.ok) {
// 			const errorText = await response.text();
// 			throw new Error(`Error al procesar facturas: ${errorText}`);
// 		}

// 		return response.blob();
// 	}

// 	async processInvoicesWithProgress(
// 		files: File[],
// 		ocrEngine: 'easyocr' | 'gemini',
// 		onProgress: (progress: number, currentFile: string) => void
// 	): Promise<Blob> {
// 		onProgress(0, 'Preparando archivos...');

// 		const formData = new FormData();
// 		for (let i = 0; i < files.length; i++) {
// 			const file = files[i];
// 			formData.append('files', file); // Cambio aquí: "files" sin []

// 			// Actualizar progreso de preparación
// 			const prepProgress = ((i + 1) / files.length) * 30; // 30% para preparación
// 			onProgress(prepProgress, `Preparando ${file.name}...`);
// 		}

// 		onProgress(40, 'Enviando archivos al servidor...');

// 		const response = await fetch(`${this.baseUrl}${ENDPOINTS.PROCESS_INVOICE}`, {
// 			method: 'POST',
// 			body: formData
// 		});

// 		if (!response.ok) {
// 			const errorText = await response.text();
// 			throw new Error(`Error procesando facturas: ${errorText}`);
// 		}

// 		onProgress(90, 'Descargando resultado...');
// 		const blob = await response.blob();

// 		onProgress(100, 'Completado');
// 		return blob;
// 	}
// }

// export const apiService = new ApiService();
