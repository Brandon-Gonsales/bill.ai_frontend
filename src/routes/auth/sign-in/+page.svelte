<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui';
	import { ChevronLeftIcon, EyeIcon, EyeOffIcon } from '$lib/icons/outline';
	import CheckIcon from '$lib/icons/outline/checkIcon.svelte';
	import FileTextIcon from '$lib/icons/outline/fileTextIcon.svelte';
	import UserIcon from '$lib/icons/outline/userIcon.svelte';
	import { ExclamationCircleIcon, LockIcon } from '$lib/icons/solid';
	import { authService } from '$lib/services';

	let showPassword = false;
	let username = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;

	async function handleSubmit() {
		console.log(username, password);

		goto('/app/process-invoice');

	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<div class="relative flex min-h-screen">
	<!-- Efecto de transición/blur en el centro -->
	<div
		class="pointer-events-none absolute top-0 left-1/2 z-10 hidden h-full w-48 -translate-x-1/2 lg:block"
	>
		<div
			class="h-full w-full bg-gradient-to-r from-light-tertiary/30 via-light-tertiary/50 to-light-primary/50 blur-3xl dark:from-dark-tertiary/30 dark:via-dark-tertiary/50 dark:to-dark-primary/50"
		></div>
	</div>

	<!-- Left Side - Branding -->
	<div
		class="relative z-20 hidden flex-col justify-between bg-gradient-to-tl from-light-tertiary_d to-light-tertiary p-12 lg:flex lg:w-1/2 dark:from-dark-tertiary_d dark:to-dark-tertiary"
	>
		<div>
			<div class="mb-12 flex items-center">
				<FileTextIcon class="h-8 w-8 text-light-primary dark:text-dark-primary" />
				<span class="ml-2 text-xl font-bold text-light-primary dark:text-dark-primary">Bill AI</span
				>
			</div>

			<h1 class="mb-6 text-4xl font-bold text-light-primary dark:text-dark-primary">
				Procesa tus facturas<br />en segundos
			</h1>
			<p class="mb-8 text-lg text-light-primary dark:text-dark-primary">
				Convierte facturas en PDF, imágenes o Word a archivos Excel organizados automáticamente.
			</p>

			<div class="space-y-4">
				<div class="flex items-start">
					<CheckIcon class="mt-1 mr-3 h-6 w-6 text-light-primary dark:text-dark-primary" />
					<div>
						<h3 class="mb-1 font-semibold text-light-primary dark:text-dark-primary">
							Procesamiento Rápido
						</h3>
						<p class="text-sm text-light-primary dark:text-dark-primary">
							Tecnología de IA avanzada
						</p>
					</div>
				</div>
				<div class="flex items-start">
					<CheckIcon class="mt-1 mr-3 h-6 w-6 text-light-primary dark:text-dark-primary" />
					<div>
						<h3 class="mb-1 font-semibold text-light-primary dark:text-dark-primary">
							100% Seguro
						</h3>
						<p class="text-sm text-light-primary dark:text-dark-primary">
							Encriptación de nivel empresarial
						</p>
					</div>
				</div>
				<div class="flex items-start">
					<CheckIcon class="mt-1 mr-3 h-6 w-6 text-light-primary dark:text-dark-primary" />
					<div>
						<h3 class="mb-1 font-semibold text-light-primary dark:text-dark-primary">
							Múltiples Formatos
						</h3>
						<p class="text-sm text-light-primary dark:text-dark-primary">PDF y imágenes</p>
					</div>
				</div>
				<div class="flex items-start">
					<CheckIcon class="mt-1 mr-3 h-6 w-6 text-light-primary dark:text-dark-primary" />
					<div>
						<h3 class="mb-1 font-semibold text-light-primary dark:text-dark-primary">
							Múltiples Formatos
						</h3>
						<p class="text-sm text-light-primary dark:text-dark-primary">PDF y imágenes</p>
					</div>
				</div>
			</div>
		</div>

		<div class="text-sm text-light-primary dark:text-dark-primary">© 2025 DataHub Analytics</div>
	</div>

	<!-- Right Side - Login Form -->
	<div
		class="relative z-20 flex flex-1 items-center justify-center bg-gradient-to-tl from-light-primary to-light-primary_d p-8 dark:from-dark-primary dark:to-dark-primary_d"
	>
		<div class="w-full max-w-md">
			<!-- Mobile Logo -->
			<div class="mb-8 flex items-center justify-center lg:hidden">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					class="mr-3 h-10 w-10 text-light-tertiary dark:text-dark-tertiary"
				>
					<path
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="text-2xl font-bold text-light-secondary dark:text-dark-secondary">Bill AI</span
				>
			</div>

			<div class="mb-8">
				<h2 class="mb-2 text-center text-3xl font-bold text-light-black dark:text-dark-white">
					Iniciar Sesión
				</h2>
				<p class="text-center text-light-black dark:text-dark-white">
					Ingresa tus credenciales para continuar
				</p>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div class="mb-6 flex items-start rounded-lg border border-red-200 bg-red-50 p-4">
					<ExclamationCircleIcon
						class="mt-0.5 mr-3 h-5 w-5 text-light-error dark:text-dark-error"
					/>
					<p class="text-sm text-light-error dark:text-dark-error">{errorMessage}</p>
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-6">
				<!-- Username -->
				<div>
					<label
						for="username"
						class="mb-2 block text-sm font-medium text-light-black dark:text-dark-white"
					>
						Usuario
					</label>
					<div class="relative">
						<UserIcon
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-light-four dark:text-dark-four"
						/>
						<input
							id="username"
							type="text"
							bind:value={username}
							onkeypress={handleKeyPress}
							class="w-full rounded-lg border border-light-four py-3 pr-4 pl-11 transition-all outline-none placeholder:text-light-four focus:border-transparent focus:ring-2 focus:ring-light-secondary dark:border-dark-four dark:placeholder:text-dark-four/20"
							placeholder="tu.usuario"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Password -->
				<div>
					<label
						for="password"
						class="mb-2 block text-sm font-medium text-light-black dark:text-dark-white"
					>
						Contraseña
					</label>
					<div class="relative">
						<LockIcon
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-light-four dark:text-dark-four"
						/>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							onkeypress={handleKeyPress}
							class="w-full rounded-lg border border-light-four py-3 pr-11 pl-11 transition-all outline-none placeholder:text-light-four focus:border-transparent focus:ring-2 focus:ring-light-secondary dark:border-dark-four dark:placeholder:text-dark-four/20"
							placeholder="••••••••"
							disabled={isLoading}
						/>
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
							disabled={isLoading}
						>
							{#if showPassword}
								<EyeIcon class="h-5 w-5" />
							{:else}
								<EyeOffIcon class="h-5 w-5" />
							{/if}
						</button>
					</div>
				</div>

				<!-- Forgot Password -->
				<div class="flex justify-end">
					<button
						type="button"
						class="text-sm font-medium text-light-tertiary transition-colors hover:text-light-tertiary_d"
					>
						¿Olvidaste tu contraseña?
					</button>
				</div>

				<Button onclick={handleSubmit} disabled={isLoading} fullWidth {isLoading}
					>Iniciar Sesión</Button
				>
			</form>

			<!-- Sign Up Link -->
			<div class="mt-8 text-center">
				<p class="text-light-black dark:text-dark-white">
					¿No tienes una cuenta?
					<button
						type="button"
						onclick={() => goto('/auth/sign-up')}
						class="ml-1 font-semibold text-light-tertiary transition-colors hover:text-light-tertiary_d dark:text-dark-tertiary dark:hover:text-dark-tertiary_d"
					>
						Regístrate gratis
					</button>
				</p>
			</div>

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<button
					type="button"
					onclick={() => goto('/')}
					class="inline-flex items-center text-sm text-light-secondary transition-colors hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
				>
					<ChevronLeftIcon class="mr-1 h-4 w-4" />
					Volver al inicio
				</button>
			</div>
		</div>
	</div>
</div>
