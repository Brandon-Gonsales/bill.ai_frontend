<!-- src/lib/components/layout/Header.svelte -->
<script lang="ts">
	import { appStore } from '../../stores/appStore.js';
	import Button from '../ui/Button.svelte';

	function resetApp() {
		if (confirm('¿Estás seguro de que quieres reiniciar el proceso?')) {
			appStore.reset();
		}
	}
</script>

<header class="border-b border-gray-200 bg-white shadow-sm">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center space-x-3">
				<div class="text-2xl">📊</div>
				<div>
					<h1 class="text-xl font-bold text-gray-900">Conversor de Facturas</h1>
					<p class="text-sm text-gray-600">Convierte facturas PDF/imágenes a Excel</p>
				</div>
			</div>

			<div class="flex items-center space-x-4">
				<Button variant="secondary" size="sm" on:click={resetApp}>🔄 Reiniciar</Button>
			</div>
		</div>
	</div>
</header>
