<script lang="ts">
	//page.svelte
	import FileUploader from '$lib/components/invoice/fileUploader.svelte';
	import TemplateUploader from '$lib/components/invoice/templateUploader.svelte';
	import { Button } from '$lib/components/ui';
	import Modal from '$lib/components/ui/modal.svelte';
	import FileTextIcon from '$lib/icons/outline/fileTextIcon.svelte';
	import { apiService } from '$lib/services/apiService.service';
	import { addProcessedFile } from '$lib/stores/processedFilesStore';
	import { templateStore } from '$lib/stores/templateStore';
	import { alert } from '$lib/utils/alert';

	let selectedFiles: File[] = [];
	let isProcessing = false;
	let showTemplateUploader = false;
	let processedFileUrl: string | null = null;
	let processedFileName: string = '';

	// Modal state
	let showModal = false;
	let userNombre = '';
	let userNit = '';
	let es_compra = true;

	// Template state
	let hasTemplate = $templateStore.campos_detectados.length > 0;

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
		if ($templateStore.campos_detectados.length <= 0) {
			showModal = true;
			return;
		}

		// Si hay template, procesar directamente
		await executeProcessing('', '');
	};

	const handleModalConfirm = async (
		event: CustomEvent<{ nombre: string; nit: string; es_compra: boolean }>
	) => {
		const { nombre, nit, es_compra: nuevoValor } = event.detail;
		userNombre = nombre;
		userNit = nit;
		es_compra = nuevoValor;
		showModal = false;
		await executeProcessing(nombre, nit);
	};

	const handleModalCancel = () => {
		showModal = false;
	};

	const executeProcessing = async (nombre: string, nit: string) => {
		isProcessing = true;
		try {
			const blob = await apiService.processInvoices(selectedFiles, nombre, nit, es_compra);

			// Crear URL para descarga inmediata
			if (processedFileUrl) {
				URL.revokeObjectURL(processedFileUrl);
			}

			processedFileUrl = URL.createObjectURL(blob);
			console.log('blob: ', blob);
			processedFileName = `archivo_procesado-${Date.now()}`; // Usar el nombre del archivo del response

			// Agregar al store para persistencia
			addProcessedFile(blob, selectedFiles);

			alert('success', 'Facturas procesadas exitosamente');
			apiService.clearTemplate();
			templateStore.clear();
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
	{es_compra}
	on:confirm={handleModalConfirm}
	on:cancel={handleModalCancel}
/>

<div class="min-h-screen">
	<main class="mx-auto max-w-4xl px-4 py-8">
		{#if !processedFileUrl}
			<!-- Estado inicial: Subir archivos -->
			<div class="space-y-6">
				<!-- Template Uploader (colapsible) -->
				<div class="rounded-lg border border-light-four dark:border-dark-four">
					<button
						class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left transition-colors hover:bg-light-four_d dark:hover:bg-dark-four_d"
						on:click={() => (showTemplateUploader = !showTemplateUploader)}
					>
						<div class="flex items-center gap-3">
							<span class="size-6 text-lg text-light-black dark:text-dark-white"
								><FileTextIcon /></span
							>
							<span class="font-medium text-light-black dark:text-dark-white"
								>Configurar plantilla Excel (opcional)</span
							>
							{#if $templateStore.campos_detectados.length > 0}
								<span
									class="rounded-full px-2 py-1 text-xs font-medium text-light-success dark:text-dark-success"
								>
									✓ Cargada
								</span>
							{/if}
						</div>
						<span
							class="transform text-light-tertiary transition-transform dark:text-dark-tertiary {showTemplateUploader
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
				<div class="rounded-xl border-2 border-dashed border-light-four dark:border-dark-four">
					<FileUploader on:filesSelected={(e) => handleFilesSelected(e.detail)} {selectedFiles} />
				</div>

				{#if selectedFiles.length > 0}
					<!-- Configuration Panel -->
					<div class="p-6">
						<h3 class="mb-4 text-lg font-medium text-light-black dark:text-dark-white">
							Configuración del procesamiento
						</h3>
						<div class="flex justify-between gap-3 pt-4">
							<Button
								onclick={processInvoices}
								disabled={isProcessing}
								variant="primary"
								loading={isProcessing}
								fullWidth
							>
								Procesar facturas
							</Button>
							<Button onclick={startOver} disabled={isProcessing} variant="secondary">
								Limpiar
							</Button>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<!-- Estado: Archivo procesado -->
			<div class="space-y-6 text-center">
				<div class="rounded-lg border border-light-success p-8 dark:border-dark-success">
					<div class="mb-4 text-6xl">✅</div>
					<h2 class="mb-2 text-2xl font-bold text-light-black dark:text-dark-white">
						¡Facturas procesadas!
					</h2>
					<p class="text-light-black dark:text-dark-white">Tu archivo está listo para descargar</p>
				</div>

				<div class="rounded-lg border border-light-four p-6 dark:border-dark-four">
					<div class="mb-4 flex items-center justify-center gap-4">
						<span class="text-3xl">📊</span>
						<div class="text-left">
							<h3 class="font-medium text-light-black dark:text-dark-white">{processedFileName}</h3>
							<p class="text-sm text-light-black dark:text-dark-white">Archivo Excel procesado</p>
						</div>
					</div>

					<div class="flex justify-center gap-3">
						<Button onclick={downloadProcessedFile} variant="primary" fullWidth>
							Descargar archivo
						</Button>
						<Button onclick={startOver} variant="secondary" fullWidth>Procesar más facturas</Button>
					</div>
				</div>
			</div>
		{/if}
	</main>
</div>
