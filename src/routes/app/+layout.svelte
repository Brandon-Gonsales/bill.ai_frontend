<script lang="ts">
	import { themeStore } from '$lib/stores/themeStore';
	import { onMount } from 'svelte';
	import { clickOutside } from '$lib/utils/clickOutside';

	let isMenuOpen = false;
	let userName = 'Usuario Demo';
	let userInitials = 'UD';

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	const closeMenu = () => {
		isMenuOpen = false;
	};

	const handleLogout = () => {
		console.log('Logout clicked');
		closeMenu();
		// Aquí irá tu lógica de logout
	};

	const handleThemeToggle = () => {
		themeStore.toggleTheme();
	};

	onMount(() => {
		// Obtener las iniciales del nombre
		const initials = userName
			.split(' ')
			.map((word) => word[0])
			.join('')
			.toUpperCase()
			.slice(0, 2);
		userInitials = initials;
	});
</script>

<!-- User Profile Menu -->
<div class="fixed top-4 right-4 z-50">
	<div class="relative">
		<!-- Profile Button -->
		<button
			on:click={toggleMenu}
			class="flex h-11 w-11 items-center justify-center rounded-full bg-light-secondary p-4 text-sm font-semibold text-light-white shadow-lg transition-all duration-200 hover:bg-light-secondary_d focus:ring-2 focus:ring-light-tertiary focus:ring-offset-2 focus:outline-none dark:bg-dark-secondary dark:text-dark-primary dark:hover:bg-dark-secondary_d dark:focus:ring-dark-tertiary dark:focus:ring-offset-dark-primary"
			aria-label="Menu de usuario"
			aria-expanded={isMenuOpen}
		>
			{userInitials}
		</button>

		<!-- Dropdown Menu -->
		{#if isMenuOpen}
			<div
				use:clickOutside={closeMenu}
				class="animate-slideDown absolute right-0 mt-2 w-56 rounded-lg border border-light-four bg-light-white shadow-xl dark:border-dark-primary dark:bg-dark-primary_d"
			>
				<!-- User Info -->
				<div class="border-b border-light-four px-4 py-3 dark:border-dark-primary">
					<p class="text-sm font-semibold text-light-black dark:text-dark-secondary">
						{userName}
					</p>
					<p class="mt-0.5 text-xs text-light-tertiary dark:text-dark-tertiary">usuario@demo.com</p>
				</div>

				<!-- Menu Items -->
				<div class="py-2">
					<!-- Theme Toggle -->
					<button
						on:click={handleThemeToggle}
						class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-light-black transition-colors duration-150 hover:bg-light-primary dark:text-dark-secondary dark:hover:bg-dark-primary"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
							/>
						</svg>
						<span>Cambiar tema</span>
					</button>

					<!-- Logout -->
					<button
						on:click={handleLogout}
						class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-light-error transition-colors duration-150 hover:bg-light-primary dark:text-dark-error dark:hover:bg-dark-primary"
					>
						<svg
							class="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							/>
						</svg>
						<span>Cerrar sesión</span>
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-slideDown {
		animation: slideDown 0.2s ease-out;
	}
</style>
