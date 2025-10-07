<script lang="ts">
	// Modal.svelte
	import { createEventDispatcher } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	export let show = false;
	export let nombre = '';
	export let nit = '';

	const dispatch = createEventDispatcher<{
		confirm: { nombre: string; nit: string };
		cancel: void;
	}>();

	let localNombre = nombre;
	let localNit = nit;

	const handleConfirm = () => {
		if (!localNombre.trim() || !localNit.trim()) {
			return;
		}
		dispatch('confirm', { nombre: localNombre, nit: localNit });
	};

	const handleCancel = () => {
		dispatch('cancel');
	};

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			handleCancel();
		}
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
			class="w-full max-w-md rounded-2xl bg-white shadow-2xl"
			transition:scale={{ duration: 200, start: 0.95 }}
		>
			<!-- Header -->
			<div class="border-b border-gray-200 px-6 py-5">
				<div class="flex items-start justify-between">
					<div>
						<h3 class="text-xl font-semibold text-gray-900">Información de procesamiento</h3>
						<p class="mt-1 text-sm text-gray-600">Ingresa los datos para procesar las facturas</p>
					</div>
					<button
						on:click={handleCancel}
						class="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
						aria-label="Cerrar"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>

			<!-- Body -->
			<div class="space-y-5 px-6 py-6">
				<!-- Info Banner -->
				<div class="flex gap-3 rounded-lg bg-blue-50 p-4">
					<svg class="h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
							clip-rule="evenodd"
						/>
					</svg>
					<p class="text-sm text-blue-800">
						Como no has subido una plantilla, necesitamos estos datos para procesar las facturas
					</p>
				</div>

				<!-- Nombre Input -->
				<div>
					<label for="nombre" class="mb-2 block text-sm font-medium text-gray-700">
						Nombre / Razón Social
					</label>
					<input
						id="nombre"
						type="text"
						bind:value={localNombre}
						placeholder="Ej: Juan Pérez o Mi Empresa S.A."
						class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
						on:keydown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
					/>
				</div>

				<!-- NIT Input -->
				<div>
					<label for="nit" class="mb-2 block text-sm font-medium text-gray-700">
						NIT / CI / CEX
					</label>
					<input
						id="nit"
						type="text"
						bind:value={localNit}
						placeholder="Ej: 1234567890"
						class="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-red-500 focus:ring-2 focus:ring-red-500/20 focus:outline-none"
						on:keydown={(e) => e.key === 'Enter' && isValid && handleConfirm()}
					/>
				</div>
			</div>

			<!-- Footer -->
			<div class="flex gap-3 border-t border-gray-200 px-6 py-4">
				<button
					on:click={handleCancel}
					class="flex-1 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
				>
					Cancelar
				</button>
				<button
					on:click={handleConfirm}
					disabled={!isValid}
					class="flex-1 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
				>
					Procesar facturas
				</button>
			</div>
		</div>
	</div>
{/if}
