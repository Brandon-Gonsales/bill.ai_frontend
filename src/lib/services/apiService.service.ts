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

	async processInvoices(
		files: File[],
		nombre: string,
		nit: string,
		es_compra: boolean
	): Promise<Blob> {
		const formData = new FormData();
		console.log(es_compra);
		// Agregar los archivos
		files.forEach((file) => {
			formData.append('files', file);
		});

		// Agregar los nuevos campos
		formData.append('nombre', nombre);
		formData.append('nit', nit);
		formData.append('es_compra', String(es_compra));

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
