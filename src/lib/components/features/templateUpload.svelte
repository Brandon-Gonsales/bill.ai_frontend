<script lang="ts">
	import Card from '$lib/components/ui/card.svelte';
	import FileUpload from '$lib/components/ui/fileUpload.svelte';
	import Button from '$lib/components/ui/button.svelte';

	import { ACCEPTED_FILE_TYPES } from '../../constants/index.js';
	import { apiService } from '$lib/services/apiService.service';
	import { appStore } from '$lib/stores/appStore';

	let templateFile: File[] = [];
	let isUploading = false;

	async function handleUploadTemplate() {
		if (templateFile.length === 0) {
			alert('Por favor selecciona un archivo de plantilla');
			return;
		}

		isUploading = true;
		try {
			const response = await apiService.uploadTemplate(templateFile[0]);
			appStore.setTemplateLoaded(response.campos_detectados);
			alert(
				`Plantilla cargada exitosamente. Campos detectados: ${response.campos_detectados.length}`
			);
		} catch (error) {
			alert(
				`Error al cargar plantilla: ${error instanceof Error ? error.message : 'Error desconocido'}`
			);
		} finally {
			isUploading = false;
		}
	}

	function handleFilesChanged(event: CustomEvent<File[]>) {
		templateFile = event.detail;
	}
</script>

<Card>
	<div class="mb-6 text-center">
		<div class="mb-4 text-4xl">📊</div>
		<h2 class="mb-2 text-2xl font-bold text-gray-900">Cargar Plantilla de Excel</h2>
		<p class="text-gray-600">
			Sube tu archivo de Excel vacío con las columnas que deseas capturar de las facturas
		</p>
	</div>

	<FileUpload
		acceptedTypes={ACCEPTED_FILE_TYPES.TEMPLATE}
		multiple={false}
		title="Seleccionar plantilla Excel"
		description="Arrastra tu archivo .xlsx aquí o haz clic para seleccionar"
		files={templateFile}
		on:filesChanged={handleFilesChanged}
	/>

	{#if templateFile.length > 0}
		<div class="mt-6">
			<Button variant="primary" fullWidth loading={isUploading} on:click={handleUploadTemplate}>
				{isUploading ? 'Cargando plantilla...' : 'Cargar Plantilla'}
			</Button>
		</div>
	{/if}
</Card>
