<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui';
	import { authService } from '$lib/services';

	let showPassword = false;
	let username = '';
	let password = '';
	let errorMessage = '';
	let isLoading = false;

	async function handleSubmit() {
		if (!username || !password) {
			errorMessage = 'Por favor completa todos los campos';
			return;
		}

		isLoading = true;
		errorMessage = '';

		try {
			const result = authService.signIn(username, password);

			if (result.success) {
				goto('/app/process-invoice');
			} else {
				errorMessage = result.error ?? 'Credenciales incorrectas';
			}
		} catch (error) {
			errorMessage = 'Error al iniciar sesión';
		} finally {
			isLoading = false;
		}
	}

	function handleKeyPress(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	}
</script>

<div class="flex min-h-screen">
	<!-- Left Side - Branding -->
	<div
		class="hidden flex-col justify-between bg-gradient-to-br from-light-tertiary to-light-four p-12 lg:flex lg:w-1/2"
	>
		<div>
			<div class="mb-12 flex items-center text-white">
				<svg viewBox="0 0 24 24" fill="none" class="mr-3 h-10 w-10">
					<path
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="text-2xl font-bold">Bill AI</span>
			</div>

			<h1 class="mb-6 text-4xl font-bold text-white">
				Procesa tus facturas<br />en segundos
			</h1>
			<p class="mb-8 text-lg text-red-100">
				Convierte facturas en PDF, imágenes o Word a archivos Excel organizados automáticamente.
			</p>

			<div class="space-y-4">
				<div class="flex items-start">
					<svg
						class="mt-1 mr-3 h-6 w-6 text-red-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<div>
						<h3 class="mb-1 font-semibold text-white">Procesamiento Rápido</h3>
						<p class="text-sm text-red-100">Tecnología de IA avanzada</p>
					</div>
				</div>
				<div class="flex items-start">
					<svg
						class="mt-1 mr-3 h-6 w-6 text-red-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<div>
						<h3 class="mb-1 font-semibold text-white">100% Seguro</h3>
						<p class="text-sm text-red-100">Encriptación de nivel empresarial</p>
					</div>
				</div>
				<div class="flex items-start">
					<svg
						class="mt-1 mr-3 h-6 w-6 text-red-200"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<div>
						<h3 class="mb-1 font-semibold text-white">Múltiples Formatos</h3>
						<p class="text-sm text-red-100">PDF, imágenes y Word</p>
					</div>
				</div>
			</div>
		</div>

		<div class="text-sm text-red-100">© 2025 DataHub Analytics</div>
	</div>

	<!-- Right Side - Login Form -->
	<div class="flex flex-1 items-center justify-center p-8">
		<div class="w-full max-w-md">
			<!-- Mobile Logo -->
			<div class="mb-8 flex items-center justify-center lg:hidden">
				<svg viewBox="0 0 24 24" fill="none" class="mr-3 h-10 w-10 text-red-600">
					<path
						d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="text-2xl font-bold text-gray-900">InvoiceProcessor</span>
			</div>

			<div class="mb-8">
				<h2 class="mb-2 text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
				<p class="text-gray-600">Ingresa tus credenciales para continuar</p>
			</div>

			<!-- Error Message -->
			{#if errorMessage}
				<div class="mb-6 flex items-start rounded-lg border border-red-200 bg-red-50 p-4">
					<svg
						class="mt-0.5 mr-3 h-5 w-5 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<p class="text-sm text-red-800">{errorMessage}</p>
				</div>
			{/if}

			<form on:submit|preventDefault={handleSubmit} class="space-y-6">
				<!-- Username -->
				<div>
					<label for="username" class="mb-2 block text-sm font-medium text-gray-700">
						Usuario
					</label>
					<div class="relative">
						<svg
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
						<input
							id="username"
							type="text"
							bind:value={username}
							on:keypress={handleKeyPress}
							class="w-full rounded-lg border border-light-four py-3 pr-4 pl-11 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-light-secondary"
							placeholder="tu.usuario"
							disabled={isLoading}
						/>
					</div>
				</div>

				<!-- Password -->
				<div>
					<label for="password" class="mb-2 block text-sm font-medium text-gray-700">
						Contraseña
					</label>
					<div class="relative">
						<svg
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
							/>
						</svg>
						<input
							id="password"
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							on:keypress={handleKeyPress}
							class="w-full rounded-lg border border-light-four py-3 pr-11 pl-11 transition-all outline-none focus:border-transparent focus:ring-2 focus:ring-light-secondary"
							placeholder="••••••••"
							disabled={isLoading}
						/>
						<button
							type="button"
							on:click={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
							disabled={isLoading}
						>
							{#if showPassword}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
									/>
								</svg>
							{:else}
								<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
									/>
								</svg>
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

				<!-- Submit Button -->
				<Button type="submit" disabled={isLoading} {isLoading} fullWidth>
					{#if isLoading}
						<svg class="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
								fill="none"
							/>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						Iniciando sesión...
					{:else}
						Iniciar Sesión
					{/if}
				</Button>
			</form>

			<!-- Sign Up Link -->
			<div class="mt-8 text-center">
				<p class="text-gray-600">
					¿No tienes una cuenta?
					<button
						type="button"
						on:click={() => goto('/auth/sign-up')}
						class="ml-1 font-semibold text-light-tertiary transition-colors hover:text-light-tertiary_d"
					>
						Regístrate gratis
					</button>
				</p>
			</div>

			<!-- Back to Home -->
			<div class="mt-6 text-center">
				<button
					type="button"
					on:click={() => goto('/')}
					class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
				>
					<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					Volver al inicio
				</button>
			</div>
		</div>
	</div>
</div>
