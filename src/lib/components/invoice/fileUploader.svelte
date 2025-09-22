<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedFiles: File[] = [];

	const dispatch = createEventDispatcher<{
		filesSelected: File[];
	}>();

	let fileInput: HTMLInputElement;
	let isDragOver = false;

	const handleFileSelect = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (target.files) {
			const files = Array.from(target.files);
			selectedFiles = files;
			dispatch('filesSelected', files);
		}
	};

	const handleDrop = (event: DragEvent) => {
		event.preventDefault();
		isDragOver = false;

		if (event.dataTransfer?.files) {
			const files = Array.from(event.dataTransfer.files);
			selectedFiles = files;
			dispatch('filesSelected', files);
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

<div class="p-8">
	{#if selectedFiles.length === 0}
		<!-- Empty State -->
		<div
			class="py-16 text-center transition-colors duration-200 {isDragOver
				? 'bg-red-50'
				: 'hover:bg-gray-50'}"
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

			<div class="space-y-4">
				<div class="text-6xl">📄</div>
				<div>
					<h3 class="mb-2 text-xl font-semibold text-gray-900">Selecciona tus facturas</h3>
					<p class="mb-4 text-gray-600">
						Arrastra y suelta tus archivos aquí o haz clic para seleccionar
					</p>
					<button
						class="rounded-lg bg-red-600 px-6 py-3 font-medium text-white transition-colors hover:bg-red-700"
					>
						Seleccionar archivos
					</button>
				</div>
				<p class="text-sm text-gray-500">Formatos soportados: PDF, JPG, JPEG, PNG</p>
			</div>
		</div>
	{:else}
		<!-- Files Selected State -->
		<div class="space-y-6">
			<div class="text-center">
				<div class="mb-3 text-4xl">📁</div>
				<h3 class="mb-2 text-xl font-semibold text-gray-900">
					{selectedFiles.length} archivo{selectedFiles.length > 1 ? 's' : ''} seleccionado{selectedFiles.length >
					1
						? 's'
						: ''}
				</h3>
				<button
					on:click={() => fileInput.click()}
					class="font-medium text-red-600 hover:text-red-700"
				>
					Agregar más archivos
				</button>
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
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each selectedFiles as file, index}
					<div class="group relative rounded-lg border border-gray-200 bg-gray-50 p-4">
						<button
							on:click={() => removeFile(index)}
							class="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-red-600"
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
							<h4 class="mb-1 truncate text-sm font-medium text-gray-900" title={file.name}>
								{file.name}
							</h4>
							<p class="text-xs text-gray-500">
								{formatFileSize(file.size)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
