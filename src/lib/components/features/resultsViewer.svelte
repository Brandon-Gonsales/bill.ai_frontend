<script lang="ts">
	import Card from '../ui/Card.svelte';
	import Button from '../ui/Button.svelte';
	import { appStore } from '../../stores/appStore.js';
	import { downloadBlob } from '$lib/utils/fileUtils';

	function handleDownload() {
		if ($appStore.processedData) {
			const timestamp = new Date().toISOString().split('T')[0];
			const filename = `facturas_procesadas_${timestamp}.xlsx`;
			downloadBlob($appStore.processedData, filename);
		}
	}

	function processMore() {
		appStore.setCurrentStep('upload');
	}

	function startOver() {
		if (confirm('¿Estás seguro de que quieres empezar de nuevo?')) {
			appStore.reset();
		}
	}
</script>

<Card>
	<div class="text-center">
		<div class="mb-4 text-6xl">✅</div>
		<h2 class="mb-2 text-2xl font-bold text-gray-900">¡Procesamiento Completado!</h2>
		<p class="mb-8 text-gray-600">
			Tus facturas han sido procesadas exitosamente y convertidas a Excel
		</p>

		<div class="space-y-4">
			<Button variant="success" size="lg" fullWidth on:click={handleDownload}>
				📥 Descargar Excel
			</Button>

			<div class="flex gap-4">
				<Button variant="secondary" fullWidth on:click={processMore}>
					📄 Procesar Más Facturas
				</Button>

				<Button variant="secondary" fullWidth on:click={startOver}>🔄 Empezar de Nuevo</Button>
			</div>
		</div>
	</div>
</Card>
