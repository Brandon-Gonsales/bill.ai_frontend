<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import Button from './button.svelte';
	import XmarkIcon from '$lib/icons/outline/xmarkIcon.svelte';

	export let show = false;
	export let nombre = '';
	export let nit = '';
	export let es_compra = true;

	const dispatch = createEventDispatcher<{
		confirm: { nombre: string; nit: string; es_compra: boolean };
		cancel: void;
	}>();

	let localNombre = nombre;
	let localNit = nit;

	const handleConfirm = () => {
		if (!localNombre.trim() || !localNit.trim()) return;
		dispatch('confirm', { nombre: localNombre, nit: localNit, es_compra });
	};

	const handleCancel = () => dispatch('cancel');

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) handleCancel();
	};

	$: isValid = localNombre.trim().length > 0 && localNit.trim().length > 0;
</script>

{#if show}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
		on:click={handleBackdropClick}
		transition:fade={{ duration: 200 }}
		role="dialog"
		aria-modal="true"
	>
		<div
			class="w-full max-w-md rounded-2xl bg-light-primary shadow-2xl dark:bg-dark-primary"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<!-- Header -->
			<div class="border-b border-light-four px-6 py-5 dark:border-dark-four">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-xl font-semibold text-light-black dark:text-dark-white">
							Información de procesamiento
						</h3>
					</div>
					<Button onclick={handleCancel} variant="ghost" aria-label="Cerrar">
						<XmarkIcon className="size-6" />
					</Button>
				</div>
			</div>

			<!-- Body -->
			<div class="space-y-5 px-6 py-6">
				<!-- Nombre Input -->
				<div>
					<label
						for="nombre"
						class="mb-2 block text-sm font-medium text-light-black dark:text-dark-white"
					>
						Nombre / Razón Social
					</label>
					<input
						id="nombre"
						type="text"
						bind:value={localNombre}
						placeholder="Ej: Juan Pérez o Mi Empresa S.A."
						class="w-full rounded-lg border border-light-four px-4 py-3 text-light-black placeholder-gray-400 transition-colors focus:border-light-four_d focus:ring-2 focus:ring-light-four_d focus:outline-none dark:border-dark-four dark:text-dark-white"
						on:keydown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
					/>
				</div>

				<!-- NIT Input -->
				<div>
					<label for="nit" class="mb-2 block text-sm font-medium text-gray-700"> NIT </label>
					<input
						id="nit"
						type="text"
						bind:value={localNit}
						placeholder="Ej: 1234567890"
						class="w-full rounded-lg border border-light-four px-4 py-3 text-light-black placeholder-gray-400 transition-colors focus:border-light-four_d focus:ring-2 focus:ring-light-four_d focus:outline-none dark:border-dark-four dark:text-dark-white"
						on:keydown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
					/>
				</div>

				<!-- 🧩 Toggle Compra/Venta -->
				<div class="flex items-center justify-between">
					<div class="flex gap-1">
						<h2 class="block text-sm text-light-black dark:text-dark-white">Tipo de operación:</h2>
						<p class="text-sm font-bold text-light-black dark:text-dark-white">
							Factura <span class=" text-light-black dark:text-dark-white"
								>{es_compra ? 'compra' : 'venta'}</span
							>.
						</p>
					</div>

					<!-- Toggle Switch -->
					<button
						type="button"
						role="switch"
						aria-checked={es_compra}
						on:click={() => (es_compra = !es_compra)}
						class="relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:ring-2 focus:ring-light-tertiary focus:ring-offset-2 focus:outline-none dark:focus:ring-dark-tertiary"
						class:bg-light-tertiary={es_compra}
						class:bg-light-four={!es_compra}
						class:bg-dark-tertiary={es_compra}
						class:bg-dark-four={!es_compra}
					>
						<span
							class="inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform"
							class:translate-x-6={es_compra}
							class:translate-x-1={!es_compra}
						></span>
					</button>
				</div>
			</div>

			<!-- Footer -->
			<div
				class="flex justify-between gap-3 border-t border-light-four px-6 py-4 dark:border-dark-four"
			>
				<Button onclick={handleCancel} variant="secondary" fullWidth>Cancelar</Button>
				<Button onclick={handleConfirm} disabled={!isValid} variant="primary" fullWidth>
					Procesar facturas
				</Button>
			</div>
		</div>
	</div>
{/if}
