<script lang="ts">
	//templateUploader.svelte
	import { createEventDispatcher } from 'svelte';
	import type { TemplateResponse } from '$lib/interfaces/api.interface.js';
	import { apiService } from '$lib/services/apiService.service';
	import { alert } from '$lib/utils/alert';
	import { templateStore } from '$lib/stores/templateStore';

	const dispatch = createEventDispatcher<{
		templateUploaded: void;
	}>();

	let fileInput: HTMLInputElement;
	let isUploading = false;
	let lastUploadResult: TemplateResponse | null = null;

	const handleFileSelect = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files || target.files.length === 0) return;

		const file = target.files[0];

		if (!file.name.match(/\.(xlsx|xls)$/i)) {
			alert('error', 'Por favor selecciona un archivo Excel (.xlsx o .xls)');
			return;
		}

		await uploadTemplate(file);
	};

	const uploadTemplate = async (file: File) => {
		isUploading = true;
		try {
			const result = await apiService.uploadTemplate(file);
			templateStore.setTemplateData(result);
			alert('success', `${result.message}`);
			// Emitir evento de template cargado exitosamente
			dispatch('templateUploaded');

			if (fileInput) {
				fileInput.value = '';
			}
		} catch (error) {
			console.error('Error:', error);
			alert('error', `Error al cargar plantilla`);
			templateStore.clear();
		} finally {
			isUploading = false;
		}
	};
</script>

<div class="bg-white p-4">
	<div class="mb-4 flex items-center justify-between">
		<div>
			<h4 class="font-medium text-gray-900">Plantilla Excel</h4>
			<p class="text-sm text-gray-600">Define los campos que quieres extraer</p>
		</div>

		<input
			bind:this={fileInput}
			type="file"
			accept=".xlsx,.xls"
			on:change={handleFileSelect}
			class="hidden"
		/>

		<button
			on:click={() => fileInput.click()}
			disabled={isUploading}
			class="rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-900 disabled:bg-gray-400"
		>
			{#if isUploading}
				Cargando...
			{:else}
				Subir plantilla
			{/if}
		</button>
	</div>

	{#if $templateStore.campos_detectados.length > 0}
		<div class="rounded-lg border border-green-200 bg-green-50 p-3">
			<p class="mb-2 text-sm font-medium text-green-800">
				✅ {$templateStore.message}
			</p>

			{#if $templateStore.campos_detectados.length > 0}
				<div>
					<p class="mb-2 text-xs text-green-700">Campos detectados:</p>
					<div class="flex flex-wrap gap-1">
						{#each $templateStore.campos_detectados as campo}
							<span class="rounded bg-green-100 px-2 py-1 text-xs text-green-800">
								{campo}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
