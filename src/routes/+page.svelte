<!-- src/routes/+page.svelte -->
<script lang="ts">
	import InvoiceProcessor from '$lib/components/features/invoiceProcessor.svelte';
	import ResultsViewer from '$lib/components/features/resultsViewer.svelte';
	import TemplateUpload from '$lib/components/features/templateUpload.svelte';
	import Header from '$lib/components/layout/header.svelte';
	import StepIndicator from '$lib/components/layout/stepIndicator.svelte';

	import { appStore, processingStore } from '$lib/stores/appStore.js';
	import { onMount } from 'svelte';

	// Reset stores on mount to ensure clean state
	onMount(() => {
		appStore.reset();
		processingStore.reset();
	});
</script>

<svelte:head>
	<title>Conversor de Facturas a Excel</title>
	<meta
		name="description"
		content="Convierte facturas PDF e imágenes a Excel de forma automática usando OCR"
	/>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<Header />

	<StepIndicator currentStep={$appStore.currentStep} />

	<main class="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
		<!-- Paso 1: Cargar Plantilla -->
		{#if $appStore.currentStep === 'template'}
			<TemplateUpload />
		{/if}

		<!-- Paso 2: Cargar y Procesar Facturas -->
		{#if $appStore.currentStep === 'upload' || $appStore.currentStep === 'processing'}
			<InvoiceProcessor />
		{/if}

		<!-- Paso 3: Mostrar Resultados -->
		{#if $appStore.currentStep === 'results'}
			<ResultsViewer />
		{/if}
	</main>

	<!-- Footer -->
	<footer class="mt-16 border-t border-gray-200 bg-white py-8">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div class="text-center text-sm text-gray-500">
				<p>Conversor de Facturas a Excel</p>
				<p class="mt-1">
					Soporta archivos PDF, PNG, JPG y JPEG • Tecnología OCR con EasyOCR y Gemini
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	/* Estilos globales para mejorar la experiencia visual */
	:global(body) {
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	/* Animaciones suaves */
	:global(.transition-all) {
		transition-property: all;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 300ms;
	}

	/* Hover effects mejorados */
	:global(.hover-lift:hover) {
		transform: translateY(-2px);
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 10px 10px -5px rgba(0, 0, 0, 0.04);
	}

	/* Scroll suave */
	:global(html) {
		scroll-behavior: smooth;
	}

	/* Mejora de accesibilidad para focus */
	:global(*:focus) {
		outline: 2px solid #3b82f6;
		outline-offset: 2px;
	}

	/* Responsive improvements */
	@media (max-width: 640px) {
		main {
			padding-left: 1rem;
			padding-right: 1rem;
		}
	}
</style>
