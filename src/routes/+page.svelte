<script lang="ts">
	import InvoiceProcessor from '$lib/components/features/invoiceProcessor.svelte';
	import TemplateUpload from '$lib/components/features/templateUpload.svelte';
	import Header from '$lib/components/layout/header.svelte';

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

	<!-- <StepIndicator currentStep={$appStore.currentStep} /> -->

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
		<!-- {#if $appStore.currentStep === 'results'}
			<ResultsViewer />
		{/if} -->
	</main>
</div>
