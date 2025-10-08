<script lang="ts">
	import { goto } from '$app/navigation';

	let isSignIn = true;
	let showPassword = false;
	let email = '';
	let password = '';

	function handleSubmit() {
		console.log('Submitted:', { email, password, type: isSignIn ? 'signin' : 'signup' });
	}
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-500 to-slate-900 p-4"
>
	<div class="w-full max-w-md">
		<div class="rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
			<!-- Logo -->
			<div class="mb-8 flex justify-center">
				<div
					class="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg transition-transform hover:scale-105"
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-12 w-12">
						<path d="M12 2L2 7L12 12L22 7L12 2Z" fill="white" opacity="0.9" />
						<path
							d="M2 17L12 22L22 17"
							stroke="white"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M2 12L12 17L22 12"
							stroke="white"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
			</div>

			<!-- Title -->
			<h2 class="mb-2 text-center text-3xl font-bold text-white">
				{isSignIn ? 'Welcome Back' : 'Create Account'}
			</h2>
			<p class="mb-8 text-center text-purple-200">
				{isSignIn ? 'Sign in to continue' : 'Sign up to get started'}
			</p>

			<!-- Form Fields -->
			<div class="space-y-6">
				<!-- Email Input -->
				<div>
					<label class="mb-2 block text-sm font-medium text-purple-100"> Email </label>
					<div class="relative">
						<svg
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-purple-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
						<input
							type="email"
							bind:value={email}
							class="w-full rounded-lg border border-white/20 bg-white/5 py-3 pr-4 pl-11 text-white placeholder-purple-300/50 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
							placeholder="you@example.com"
						/>
					</div>
				</div>

				<!-- Password Input -->
				<div>
					<label class="mb-2 block text-sm font-medium text-purple-100"> Password </label>
					<div class="relative">
						<svg
							class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-purple-300"
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
							type={showPassword ? 'text' : 'password'}
							bind:value={password}
							class="w-full rounded-lg border border-white/20 bg-white/5 py-3 pr-11 pl-11 text-white placeholder-purple-300/50 transition-all focus:border-transparent focus:ring-2 focus:ring-purple-400 focus:outline-none"
							placeholder="••••••••"
						/>
						<button
							type="button"
							on:click={() => (showPassword = !showPassword)}
							class="absolute top-1/2 right-3 -translate-y-1/2 transform text-purple-300 transition-colors hover:text-white"
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
				{#if isSignIn}
					<div class="flex justify-end">
						<button
							type="button"
							class="text-sm text-purple-300 transition-colors hover:text-purple-200"
						>
							Forgot password?
						</button>
					</div>
				{/if}

				<!-- Submit Button -->
				<button
					on:click={handleSubmit}
					class="w-full rounded-lg bg-gradient-to-r from-slate-50 to-gray-400 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-slate-100 hover:to-gray-500"
				>
					{isSignIn ? 'Sign In' : 'Sign Up'}
				</button>
			</div>

			<!-- Toggle Sign In/Sign Up -->
			<div class="mt-6 text-center">
				<p class="text-purple-200">
					{isSignIn ? "Don't have an account? " : 'Already have an account? '}
					<button
						on:click={() => goto('auth/sign-up')}
						class="font-semibold text-purple-300 transition-colors hover:text-white"
					>
						{isSignIn ? 'Sign Up' : 'Sign In'}
					</button>
				</p>
			</div>
		</div>

		<!-- Footer Note -->
		<p class="mt-6 text-center text-xs text-purple-300/60">
			Protected by enterprise-grade security
		</p>
	</div>
</div>
