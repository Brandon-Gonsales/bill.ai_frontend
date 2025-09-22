<script lang="ts">
	import { downloadFile, processedFiles } from '$lib/stores/processedFilesStore';

	const formatDate = (date: Date): string => {
		return new Intl.DateTimeFormat('es-ES', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	};

	const formatFileSize = (blob: Blob): string => {
		const bytes = blob.size;
		if (bytes === 0) return '0 Bytes';
		const k = 1024;
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
	};
</script>

<div class="rounded-2xl bg-white p-6 shadow-lg">
	<h2 class="mb-6 flex items-center gap-2 text-2xl font-semibold text-gray-800">
		📥 Archivos Procesados
	</h2>

	{#if $processedFiles.length === 0}
		<div class="py-8 text-center">
			<div class="mb-3 text-4xl">📂</div>
			<p class="text-gray-500">No hay archivos procesados</p>
			<p class="mt-1 text-sm text-gray-400">Los archivos aparecerán aquí después de procesarlos</p>
		</div>
	{:else}
		<div class="max-h-96 space-y-3 overflow-y-auto">
			{#each $processedFiles as file (file.id)}
				<div class="rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-md">
					<div class="space-y-3">
						<!-- Encabezado del archivo -->
						<div class="flex items-start justify-between">
							<div class="flex min-w-0 flex-1 items-center gap-2">
								<span class="text-xl">📊</span>
								<div class="min-w-0 flex-1">
									<h3 class="truncate font-medium text-gray-800" title={file.name}>
										{file.name}
									</h3>
									<p class="text-xs text-gray-500">
										{formatDate(file.processedAt)}
									</p>
								</div>
							</div>
							<span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-400">
								{formatFileSize(file.blob)}
							</span>
						</div>

						<!-- Archivos originales -->
						<div class="text-xs text-gray-600">
							<p class="mb-1 font-medium">📄 Archivos procesados:</p>
							<div class="space-y-1">
								{#each file.originalFiles.slice(0, 2) as originalFile}
									<p class="truncate pl-2" title={originalFile}>• {originalFile}</p>
								{/each}
								{#if file.originalFiles.length > 2}
									<p class="pl-2 text-gray-400">
										+ {file.originalFiles.length - 2} más...
									</p>
								{/if}
							</div>
						</div>

						<!-- Botón de descarga -->
						<button
							on:click={() => downloadFile(file)}
							class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
						>
							⬇️ Descargar
						</button>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
