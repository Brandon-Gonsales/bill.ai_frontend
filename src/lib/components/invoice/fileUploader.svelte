<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from '../ui';
	import FileTextIcon from '$lib/icons/outline/fileTextIcon.svelte';

	export let selectedFiles: File[] = [];

	const dispatch = createEventDispatcher<{
		filesSelected: File[];
	}>();

	let fileInput: HTMLInputElement;
	let isDragOver = false;

	const handleFileSelect = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const newFiles = Array.from(target.files);

			// Si ya hay archivos, agregar los nuevos, si no, reemplazar
			if (selectedFiles.length > 0) {
				// Filtrar archivos duplicados por nombre
				const existingNames = selectedFiles.map((f) => f.name);
				const uniqueNewFiles = newFiles.filter((f) => !existingNames.includes(f.name));
				selectedFiles = [...selectedFiles, ...uniqueNewFiles];
			} else {
				selectedFiles = newFiles;
			}

			dispatch('filesSelected', selectedFiles);

			// Limpiar el input para permitir seleccionar el mismo archivo de nuevo si se elimina
			target.value = '';
		}
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		isDragOver = false;

		if (event.dataTransfer?.files) {
			const newFiles = Array.from(event.dataTransfer.files);

			// Si ya hay archivos, agregar los nuevos, si no, reemplazar
			if (selectedFiles.length > 0) {
				// Filtrar archivos duplicados por nombre
				const existingNames = selectedFiles.map((f) => f.name);
				const uniqueNewFiles = newFiles.filter((f) => !existingNames.includes(f.name));
				selectedFiles = [...selectedFiles, ...uniqueNewFiles];
			} else {
				selectedFiles = newFiles;
			}

			dispatch('filesSelected', selectedFiles);
		}
	};

	const handleDragOver = (event: DragEvent) => {
		event.preventDefault();
		isDragOver = true;
	};

	const handleDragLeave = () => {
		isDragOver = false;
	};

	const removeFile = (index: number) => {
		selectedFiles = selectedFiles.filter((_, i) => i !== index);
		dispatch('filesSelected', selectedFiles);
	};

	const formatFileSize = (bytes: number): string => {
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};
</script>

<div class="p-4">
	{#if selectedFiles.length === 0}
		<!-- Empty State -->
		<div
			class="py-16 text-center transition-colors duration-200 {isDragOver ? '' : ''}"
			on:drop={handleDrop}
			on:dragover={handleDragOver}
			on:dragleave={handleDragLeave}
			role="button"
			tabindex="0"
			on:click={() => fileInput.click()}
			on:keydown={(e) => e.key === 'Enter' && fileInput.click()}
		>
			<input
				bind:this={fileInput}
				type="file"
				multiple
				accept=".pdf,.jpg,.jpeg,.png"
				on:change={handleFileSelect}
				class="hidden"
			/>

			<div class="flex flex-col space-y-4">
				<div class="mx-auto">
					<FileTextIcon class="size-12 text-light-four dark:text-dark-four" />
				</div>
				<div>
					<h3 class="mb-2 text-xl font-semibold text-light-black dark:text-dark-white">
						Selecciona tus facturas
					</h3>
					<p class="mb-4 text-light-black dark:text-dark-white">
						Arrastra y suelta tus archivos aquí o haz clic para seleccionar
					</p>
					<Button variant="primary">Seleccionar archivos</Button>
				</div>
				<p class="text-sm text-light-black dark:text-dark-white">
					Formatos soportados: PDF, JPG, JPEG, PNG
				</p>
			</div>
		</div>
	{:else}
		<!-- Files Selected State -->
		<div class="space-y-6">
			<div class="text-center">
				<div class="mb-3 text-4xl">📁</div>
				<h3 class="mb-2 text-xl font-semibold text-light-black dark:text-dark-white">
					{selectedFiles.length} archivo{selectedFiles.length > 1 ? 's' : ''} seleccionado{selectedFiles.length >
					1
						? 's'
						: ''}
				</h3>
				<Button onclick={() => fileInput.click()} variant="outline">Agregar más archivos</Button>
				<input
					bind:this={fileInput}
					type="file"
					multiple
					accept=".pdf,.jpg,.jpeg,.png"
					on:change={handleFileSelect}
					class="hidden"
				/>
			</div>

			<!-- Files Grid -->
			<div class="flex flex-wrap justify-center gap-4">
				{#each selectedFiles as file, index}
					<div class="group relative rounded-lg border border-light-four p-4 dark:border-dark-four">
						<button
							on:click={() => removeFile(index)}
							class="d absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-xs text-light-primary opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
						>
							×
						</button>

						<div class="text-center">
							<div class="mb-2 text-3xl">
								{#if file.type.includes('pdf')}
									📄
								{:else if file.type.includes('image')}
									🖼️
								{:else}
									📁
								{/if}
							</div>
							<h4
								class="mb-1 truncate text-sm font-medium text-light-black dark:text-dark-white"
								title={file.name}
							>
								{file.name}
							</h4>
							<p class="text-xs text-light-black dark:text-dark-white">
								{formatFileSize(file.size)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
