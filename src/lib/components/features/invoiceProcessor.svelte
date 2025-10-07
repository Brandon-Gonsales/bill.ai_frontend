<script lang="ts">
	import { appStore, processingStore } from '$lib/stores/appStore';
	import { ACCEPTED_FILE_TYPES, OCR_ENGINES } from '$lib/constants';
	import { apiService } from '$lib/services/apiService.service';
	import Card from '$lib/components/ui/card.svelte';
	import FileUpload from '$lib/components/ui/fileUpload.svelte';
	import ProgressBar from '$lib/components/ui/progressBar.svelte';
	import Button from '$lib/components/ui/button.svelte';

	let invoiceFiles: File[] = [];
	let selectedOcrEngine: 'easyocr' | 'gemini' = 'easyocr';

	$: canProcess = invoiceFiles.length > 0 && selectedOcrEngine && !$processingStore.isLoading;

	async function handleProcessInvoices() {
		if (!canProcess) return;

		processingStore.startProcessing();
		appStore.setCurrentStep('processing');

		try {
			// CAMBIO: El método ahora devuelve un solo Blob (archivo Excel), no un array
			const resultBlob = await apiService.processInvoices(invoiceFiles, selectedOcrEngine);

			processingStore.finishProcessing();

			// CAMBIO: Manejar el resultado como un solo archivo Excel
			// Opción 1: Descargar automáticamente el archivo
			downloadExcelFile(resultBlob);

			// Opción 2: O almacenar el blob para uso posterior
			// appStore.setProcessedData(resultBlob);

			appStore.setCurrentStep('results'); // O el paso que corresponda
		} catch (error) {
			alert(
				`Error al procesar facturas: ${error instanceof Error ? error.message : 'Error desconocido'}`
			);
			processingStore.reset();
			appStore.setCurrentStep('upload');
		}
	}

	function downloadExcelFile(blob: Blob) {
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;

		// Generar nombre de archivo con timestamp
		const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
		link.download = `processed_invoices_${timestamp}.xlsx`;

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		window.URL.revokeObjectURL(url);
	}

	function handleFilesChanged(event: CustomEvent<File[]>) {
		invoiceFiles = event.detail;
	}
</script>

<Card>
	<div class="mb-6 text-center">
		<div class="mb-4 text-4xl">📄</div>
		<h2 class="mb-2 text-2xl font-bold text-gray-900">Procesar Facturas</h2>
		<p class="text-gray-600">Sube las facturas (PDF o imágenes) que deseas convertir a Excel</p>
	</div>

	{#if $appStore.detectedFields.length > 0}
		<div class="mb-6 rounded-lg bg-blue-50 p-4">
			<h3 class="mb-2 text-sm font-medium text-blue-900">Campos detectados en la plantilla:</h3>
			<div class="flex flex-wrap gap-2">
				{#each $appStore.detectedFields as field}
					<span class="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
						{field}
					</span>
				{/each}
			</div>
		</div>
	{/if}

	<div class="space-y-6">
		<FileUpload
			acceptedTypes={ACCEPTED_FILE_TYPES.INVOICE}
			multiple={true}
			maxFiles={20}
			title="Seleccionar facturas"
			description="Arrastra tus archivos PDF o imágenes aquí"
			files={invoiceFiles}
			on:filesChanged={handleFilesChanged}
		/>

		<!-- Botón de procesamiento -->
		{#if canProcess}
			<Button
				variant="success"
				fullWidth
				loading={$processingStore.isLoading}
				on:click={handleProcessInvoices}
			>
				{$processingStore.isLoading
					? 'Procesando...'
					: `Procesar ${invoiceFiles.length} archivo${invoiceFiles.length !== 1 ? 's' : ''}`}
			</Button>
		{/if}

		<!-- Barra de progreso -->
		{#if $processingStore.isLoading}
			<div class="space-y-2">
				<ProgressBar progress={$processingStore.progress} color="blue" />
				{#if $processingStore.currentFile}
					<p class="text-center text-sm text-gray-600">
						Procesando: {$processingStore.currentFile}
					</p>
				{/if}
			</div>
		{/if}
	</div>
</Card>
