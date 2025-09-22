<script lang="ts">
	import type { OcrEngine } from '$lib/interfaces/api.interface';
	import { ApiService } from '$lib/services/apiService.service';
	import { FileService } from '$lib/services/fileService.service';
	import { isProcessing } from '$lib/stores/processingStore';
	import { templateStore } from '$lib/stores/templateStore';
	import { addToast } from '$lib/stores/toastStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		processingComplete: { downloadUrl: string };
	}>();

	export let disabled = false;

	let selectedFiles: File[] = [];
	let selectedEngine: OcrEngine = 'gemini';
	let processing = false;

	function handleFileSelect(event: CustomEvent<{ files: FileList }>) {
		const files = Array.from(event.detail.files);

		const validFiles = files.filter((file) => {
			if (!FileService.isValidInvoiceFile(file)) {
				addToast({
					type: 'error',
					title: 'Archivo inválido',
					message: `${file.name} no es un archivo válido. Solo se permiten PNG, JPG y PDF.`
				});
				return false;
			}
			return true;
		});

		selectedFiles = [...selectedFiles, ...validFiles];
	}

	function removeFile(index: number) {
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
	}

	async function processFiles() {
		if (!$templateStore.uploaded) {
			addToast({
				type: 'error',
				title: 'Plantilla requerida',
				message: 'Primero debes cargar una plantilla de Excel'
			});
			return;
		}

		if (selectedFiles.length === 0) {
			addToast({
				type: 'error',
				title: 'Archivos requeridos',
				message: 'Debes seleccionar al menos un archivo para procesar'
			});
			return;
		}

		processing = true;
		isProcessing.set(true);

		try {
			const blob = await ApiService.processInvoices(selectedFiles, selectedEngine);

			const downloadUrl = URL.createObjectURL(blob);
			const filename = `processed_invoices_${new Date().toISOString().split('T')[0]}.xlsx`;

			FileService.downloadBlob(blob, filename);

			addToast({
				type: 'success',
				title: 'Procesamiento completado',
				message: `Se procesaron ${selectedFiles.length} archivos correctamente`
			});

			dispatch('processingComplete', { downloadUrl });

			// Limpiar archivos seleccionados
			selectedFiles = [];
		} catch (error) {
			addToast({
				type: 'error',
				title: 'Error en el procesamiento',
				message: error instanceof Error ? error.message : 'Error desconocido'
			});
		} finally {
			processing = false;
			isProcessing.set(false);
		}
	}

	function handleFileError(event: CustomEvent<{ message: string }>) {
		addToast({
			type: 'error',
			title: 'Error de archivo',
			message: event.detail.message
		});
	}
</script>
