<script lang="ts">
	import FileUploader from '$lib/components/invoice/fileUploader.svelte';
	import TemplateUploader from '$lib/components/invoice/templateUploader.svelte';
	import { apiService } from '$lib/services/apiService.service';
	import { addProcessedFile } from '$lib/stores/processedFilesStore';
	import { alert } from '$lib/utils/alert';

	let selectedFiles: File[] = [];
	let ocrEngine: 'easyocr' | 'gemini' = 'easyocr';
	let isProcessing = false;
	let showTemplateUploader = false;
	let processedFileUrl: string | null = null;
	let processedFileName: string = '';

	const handleFilesSelected = (files: File[]) => {
		selectedFiles = files;
		// Limpiar archivo procesado anterior al seleccionar nuevos archivos
		if (processedFileUrl) {
			URL.revokeObjectURL(processedFileUrl);
			processedFileUrl = null;
		}
	};

	const processInvoices = async () => {
		if (selectedFiles.length === 0) {
			alert('info', 'Por favor selecciona al menos un archivo');
			return;
		}

		isProcessing = true;
		try {
			const blob = await apiService.processInvoices(selectedFiles, ocrEngine);

			// Crear URL para descarga inmediata
			if (processedFileUrl) {
				URL.revokeObjectURL(processedFileUrl);
			}

			processedFileUrl = URL.createObjectURL(blob);
			processedFileName = `facturas_procesadas_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`;

			// Agregar al store para persistencia
			addProcessedFile(blob, selectedFiles);

			alert('success', 'Facturas procesadas exitosamente');
		} catch (error) {
			console.error('Error:', error);
			alert('error', 'Error al procesar facturas');
		} finally {
			isProcessing = false;
		}
	};

	const downloadProcessedFile = () => {
		if (processedFileUrl) {
			const a = document.createElement('a');
			a.href = processedFileUrl;
			a.download = processedFileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		}
	};

	const startOver = () => {
		selectedFiles = [];
		if (processedFileUrl) {
			URL.revokeObjectURL(processedFileUrl);
			processedFileUrl = null;
		}
		processedFileName = '';
	};
</script>

<div class="min-h-screen bg-white">
	<!-- Header -->
	<header class="border-b border-gray-200 bg-white">
		<div class="mx-auto max-w-4xl px-4 py-6">
			<div class="text-center">
				<h1 class="mb-2 text-3xl font-bold text-gray-900">Procesador de Facturas</h1>
				<p class="text-gray-600">Extrae y procesa datos de tus facturas automáticamente</p>
			</div>
		</div>
	</header>

	<main class="mx-auto max-w-4xl px-4 py-8">
		{#if !processedFileUrl}
			<!-- Estado inicial: Subir archivos -->
			<div class="space-y-6">
				<!-- Template Uploader (colapsible) -->
				<div class="rounded-lg border border-gray-200 bg-gray-50">
					<button
						class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-gray-100"
						on:click={() => (showTemplateUploader = !showTemplateUploader)}
					>
						<div class="flex items-center gap-3">
							<span class="text-lg">📋</span>
							<span class="font-medium text-gray-700">Configurar plantilla Excel (opcional)</span>
						</div>
						<span
							class="transform text-gray-400 transition-transform {showTemplateUploader
								? 'rotate-180'
								: ''}"
						>
							▼
						</span>
					</button>

					{#if showTemplateUploader}
						<div class="px-4 pb-4">
							<TemplateUploader />
						</div>
					{/if}
				</div>

				<!-- Main Upload Area -->
				<div class="rounded-xl border-2 border-dashed border-gray-300 bg-white">
					<FileUploader on:filesSelected={(e) => handleFilesSelected(e.detail)} {selectedFiles} />
				</div>

				{#if selectedFiles.length > 0}
					<!-- Configuration Panel -->
					<div class="rounded-lg border border-gray-200 bg-white p-6">
						<h3 class="mb-4 text-lg font-medium text-gray-900">Configuración del procesamiento</h3>

						<div class="flex gap-3 pt-4">
							<button
								on:click={processInvoices}
								disabled={isProcessing}
								class="flex-1 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
							>
								{#if isProcessing}
									Procesando facturas...
								{:else}
									Procesar facturas
								{/if}
							</button>
							<button
								on:click={startOver}
								disabled={isProcessing}
								class="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50"
							>
								Limpiar
							</button>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<!-- Estado: Archivo procesado -->
			<div class="space-y-6 text-center">
				<div class="rounded-lg border border-green-200 bg-green-50 p-8">
					<div class="mb-4 text-6xl">✅</div>
					<h2 class="mb-2 text-2xl font-bold text-gray-900">¡Facturas procesadas!</h2>
					<p class="text-gray-600">Tu archivo está listo para descargar</p>
				</div>

				<div class="rounded-lg border border-gray-200 bg-white p-6">
					<div class="mb-4 flex items-center justify-center gap-4">
						<span class="text-3xl">📊</span>
						<div class="text-left">
							<h3 class="font-medium text-gray-900">{processedFileName}</h3>
							<p class="text-sm text-gray-500">Archivo Excel procesado</p>
						</div>
					</div>

					<div class="flex justify-center gap-3">
						<button
							on:click={downloadProcessedFile}
							class="rounded-lg bg-red-600 px-8 py-3 font-medium text-white transition-colors hover:bg-red-700"
						>
							Descargar archivo
						</button>
						<button
							on:click={startOver}
							class="rounded-lg border border-gray-300 px-8 py-3 text-gray-700 transition-colors hover:bg-gray-50"
						>
							Procesar más facturas
						</button>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
<!-- <script lang="ts">
	import InvoiceProcessor from '$lib/components/features/invoiceProcessor.svelte';
	import TemplateUpload from '$lib/components/features/templateUpload.svelte';
	import Header from '$lib/components/layout/header.svelte';

	import { appStore, processingStore } from '$lib/stores/appStore.js';
	import { onMount } from 'svelte';

	// Reset stores on mount to ensure clean state
	onMount(() => {
		appStore.reset();
		processingStore.reset();
	});
</script>

<svelte:head>
	<title>Conversor de Facturas a Excel</title>
	<meta
		name="description"
		content="Convierte facturas PDF e imágenes a Excel de forma automática usando OCR"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<Header />


	<main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		{#if $appStore.currentStep === 'template'}
			<TemplateUpload />
		{/if}

		{#if $appStore.currentStep === 'upload' || $appStore.currentStep === 'processing'}
			<InvoiceProcessor />
		{/if}

	</main>
</div> -->
