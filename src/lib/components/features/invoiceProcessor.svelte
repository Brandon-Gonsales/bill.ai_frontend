<script lang="ts">
	import { appStore, processingStore } from '$lib/stores/appStore';
	import { ACCEPTED_FILE_TYPES, OCR_ENGINES } from '$lib/constants';
	import { apiService } from '$lib/services/apiService.service';
	import ProgressBar from '../ui/progressBar.svelte';
	import Card from '../ui/card.svelte';
	import Select from '../ui/select.svelte';
	import FileUpload from '../ui/FileUpload.svelte';
	import Button from '../ui/Button.svelte';

	let invoiceFiles: File[] = [];
	let selectedOcrEngine: 'easyocr' | 'gemini' = 'easyocr';

	$: canProcess = invoiceFiles.length > 0 && selectedOcrEngine && !$processingStore.isLoading;

	async function handleProcessInvoices() {
		if (!canProcess) return;

		processingStore.startProcessing();
		appStore.setCurrentStep('processing');

		try {
			// Procesar archivos con callback de progreso
			const results = await apiService.processInvoicesWithProgress(
				invoiceFiles,
				selectedOcrEngine,
				(progress, currentFile) => {
					processingStore.updateProgress(progress, currentFile);
				}
			);

			// Por ahora tomamos el último resultado (en el futuro podrías combinar múltiples)
			const finalResult = results[results.length - 1];

			processingStore.finishProcessing();
			appStore.setProcessedData(finalResult);
		} catch (error) {
			alert(
				`Error al procesar facturas: ${error instanceof Error ? error.message : 'Error desconocido'}`
			);
			processingStore.reset();
			appStore.setCurrentStep('upload');
		}
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
		<!-- Selector de motor OCR -->
		<div>
			<label class="mb-2 block text-sm font-medium text-gray-700"> Motor OCR </label>
			<select name="" id="">
				<option value="" disabled>Selecciona un motor OCR</option>
				{#each OCR_ENGINES as option}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>

		<!-- Carga de archivos -->
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
