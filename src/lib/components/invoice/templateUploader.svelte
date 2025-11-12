<script lang="ts">
	//templateUploader.svelte
	import { createEventDispatcher } from 'svelte';
	import type { TemplateResponse } from '$lib/interfaces/api.interface.js';
	import { apiService } from '$lib/services/apiService.service';
	import { alert } from '$lib/utils/alert';
	import { templateStore } from '$lib/stores/templateStore';
	import { Button } from '../ui';

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
			//	console.log('result: ', result);
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

<div class="p-4">
	<div class="flex items-center justify-between">
		<div>
			<h4 class="font-medium text-light-black dark:text-dark-white">
				Plantilla Excel <span class="font-normal">(opcional)</span>
			</h4>
			<p class="text-sm text-light-black dark:text-dark-white">
				Define los campos que quieres extraer
			</p>
		</div>

		<input
			bind:this={fileInput}
			type="file"
			accept=".xlsx,.xls"
			on:change={handleFileSelect}
			class="hidden"
		/>

		<Button
			onclick={() => fileInput.click()}
			disabled={isUploading}
			variant="secondary"
			loading={isUploading}
		>
			Subir plantilla
		</Button>
	</div>

	{#if $templateStore.campos_detectados.length > 0}
		<div class="rounded-lg border border-light-success p-3 dark:border-dark-success">
			<p class="mb-2 text-sm font-medium text-light-success dark:text-dark-success">
				✅ {$templateStore.message}
			</p>

			{#if $templateStore.campos_detectados.length > 0}
				<div>
					<p class="mb-2 text-xs text-light-success dark:text-dark-success">Campos detectados:</p>
					<div class="flex flex-wrap gap-1">
						{#each $templateStore.campos_detectados as campo}
							<span class="rounded px-2 py-1 text-xs text-light-success dark:text-dark-success">
								{campo}
							</span>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
