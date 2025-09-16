<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { formatFileSize, getFileIcon, validateFileType } from '$lib/utils/fileUtils';
	import Button from './Button.svelte';

	export let acceptedTypes: string;
	export let multiple = false;
	export let maxFiles = 10;
	export let title = 'Cargar archivos';
	export let description = 'Arrastra y suelta archivos aquí o haz clic para seleccionar';
	export let files: File[] = [];

	const dispatch = createEventDispatcher<{
		filesChanged: File[];
		filesAdded: File[];
		fileRemoved: { file: File; index: number };
	}>();

	let isDragOver = false;
	let fileInput: HTMLInputElement;
	let errors: string[] = [];

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		isDragOver = true;
	}

	function handleDragLeave(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDragOver = false;

		const droppedFiles = Array.from(event.dataTransfer?.files || []);
		addFiles(droppedFiles);
	}

	function handleFileInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const selectedFiles = Array.from(input.files || []);
		addFiles(selectedFiles);
		input.value = ''; // Reset input
	}

	function addFiles(newFiles: File[]) {
		errors = [];
		const validFiles: File[] = [];

		for (const file of newFiles) {
			// Validar tipo de archivo
			if (!validateFileType(file, acceptedTypes)) {
				errors.push(`${file.name}: Tipo de archivo no válido`);
				continue;
			}

			// Validar límite de archivos
			if (files.length + validFiles.length >= maxFiles) {
				errors.push(`Máximo ${maxFiles} archivos permitidos`);
				break;
			}

			// Validar archivos duplicados
			if (files.find((f) => f.name === file.name && f.size === file.size)) {
				errors.push(`${file.name}: Archivo duplicado`);
				continue;
			}

			validFiles.push(file);
		}

		if (validFiles.length > 0) {
			if (multiple) {
				files = [...files, ...validFiles];
			} else {
				files = [validFiles[0]];
			}

			dispatch('filesChanged', files);
			dispatch('filesAdded', validFiles);
		}

		if (errors.length > 0) {
			alert(errors.join('\n'));
		}
	}

	function removeFile(index: number) {
		const removedFile = files[index];
		files = files.filter((_, i) => i !== index);
		dispatch('filesChanged', files);
		dispatch('fileRemoved', { file: removedFile, index });
	}

	function openFileDialog() {
		fileInput.click();
	}
</script>

<div class="w-full">
	<!-- Área de arrastrar y soltar -->
	<div
		class="
      relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-200
      {isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
    "
		on:dragover={handleDragOver}
		on:dragleave={handleDragLeave}
		on:drop={handleDrop}
		on:click={openFileDialog}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && openFileDialog()}
	>
		<div class="flex flex-col items-center space-y-4">
			<div class="text-4xl">📁</div>
			<div>
				<h3 class="text-lg font-semibold text-gray-900">{title}</h3>
				<p class="mt-1 text-sm text-gray-600">{description}</p>
				<p class="mt-2 text-xs text-gray-500">
					Tipos permitidos: {acceptedTypes}
				</p>
			</div>
			<Button variant="secondary">Seleccionar archivos</Button>
		</div>
	</div>

	<!-- Input oculto -->
	<input
		bind:this={fileInput}
		type="file"
		accept={acceptedTypes}
		{multiple}
		class="hidden"
		on:change={handleFileInput}
	/>

	<!-- Lista de archivos -->
	{#if files.length > 0}
		<div class="mt-6">
			<h4 class="mb-3 text-sm font-medium text-gray-900">
				Archivos seleccionados ({files.length})
			</h4>
			<div class="space-y-2">
				{#each files as file, index}
					<div class="flex items-center justify-between rounded-lg bg-gray-50 p-3">
						<div class="flex items-center space-x-3">
							<span class="text-lg">{getFileIcon(file.name)}</span>
							<div class="flex-1">
								<p class="text-sm font-medium text-gray-900">{file.name}</p>
								<p class="text-xs text-gray-600">{formatFileSize(file.size)}</p>
							</div>
						</div>
						<Button variant="danger" size="sm" on:click={() => removeFile(index)}>🗑️</Button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
