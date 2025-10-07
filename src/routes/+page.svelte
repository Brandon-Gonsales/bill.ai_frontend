<script lang="ts">
	//page.svelte
	import FileUploader from '$lib/components/invoice/fileUploader.svelte';
	import TemplateUploader from '$lib/components/invoice/templateUploader.svelte';
	import Modal from '$lib/components/ui/modal.svelte';
	import { apiService } from '$lib/services/apiService.service';
	import { addProcessedFile } from '$lib/stores/processedFilesStore';
	import { alert } from '$lib/utils/alert';

	let selectedFiles: File[] = [];
	let ocrEngine: 'easyocr' | 'gemini' = 'easyocr';
	let isProcessing = false;
	let showTemplateUploader = false;
	let processedFileUrl: string | null = null;
	let processedFileName: string = '';

	// Modal state
	let showModal = false;
	let userNombre = '';
	let userNit = '';

	// Template state
	let hasTemplate = false;

	const handleFilesSelected = (files: File[]) => {
		selectedFiles = files;
		// Limpiar archivo procesado anterior al seleccionar nuevos archivos
		if (processedFileUrl) {
			URL.revokeObjectURL(processedFileUrl);
			processedFileUrl = null;
		}
	};

	const handleTemplateUploaded = () => {
		hasTemplate = true;
	};

	const processInvoices = async () => {
		if (selectedFiles.length === 0) {
			alert('info', 'Por favor selecciona al menos un archivo');
			return;
		}

		// Si no hay template, mostrar modal
		if (!hasTemplate) {
			showModal = true;
			return;
		}

		// Si hay template, procesar directamente
		await executeProcessing('', '');
	};

	const handleModalConfirm = async (event: CustomEvent<{ nombre: string; nit: string }>) => {
		const { nombre, nit } = event.detail;
		userNombre = nombre;
		userNit = nit;
		showModal = false;
		await executeProcessing(nombre, nit);
	};

	const handleModalCancel = () => {
		showModal = false;
	};

	const executeProcessing = async (nombre: string, nit: string) => {
		isProcessing = true;
		try {
			const blob = await apiService.processInvoices(selectedFiles, nombre, nit);

			// Crear URL para descarga inmediata
			if (processedFileUrl) {
				URL.revokeObjectURL(processedFileUrl);
			}

			processedFileUrl = URL.createObjectURL(blob);
			processedFileName = `facturas_procesadas_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.xlsx`;

			// Agregar al store para persistencia
			addProcessedFile(blob, selectedFiles);

			alert('success', 'Facturas procesadas exitosamente');
			await apiService.clearTemplate();
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
		userNombre = '';
		userNit = '';
	};
</script>

<!-- Modal -->
<Modal
	bind:show={showModal}
	nombre={userNombre}
	nit={userNit}
	on:confirm={handleModalConfirm}
	on:cancel={handleModalCancel}
/>

<div class="min-h-screen bg-white">
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
							{#if hasTemplate}
								<span
									class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700"
								>
									✓ Cargada
								</span>
							{/if}
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
							<TemplateUploader on:templateUploaded={handleTemplateUploaded} />
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

						{#if !hasTemplate}
							<div class="mb-4 flex items-start gap-3 rounded-lg bg-amber-50 p-4">
								<svg
									class="h-5 w-5 flex-shrink-0 text-amber-600"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fill-rule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									/>
								</svg>
								<div>
									<p class="text-sm font-medium text-amber-800">No has subido una plantilla</p>
									<p class="mt-1 text-sm text-amber-700">
										Se te pedirán datos adicionales antes de procesar
									</p>
								</div>
							</div>
						{/if}

						<div class="flex gap-3 pt-4">
							<button
								on:click={processInvoices}
								disabled={isProcessing}
								class="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
							>
								{#if isProcessing}
									<svg
										class="h-5 w-5 animate-spin"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											class="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											stroke-width="4"
										></circle>
										<path
											class="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
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
