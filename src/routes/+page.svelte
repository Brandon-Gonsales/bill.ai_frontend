<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui';
	import { CheckIcon, XIcon } from '$lib/icons/outline';
	import ChevronRightIcon from '$lib/icons/outline/chevronRightIcon.svelte';
	import FileTextIcon from '$lib/icons/outline/fileTextIcon.svelte';
	import Menu2Icon from '$lib/icons/outline/menu2Icon.svelte';
	import { ShieldIcon } from '$lib/icons/solid';
	import BoltIcon from '$lib/icons/solid/boltIcon.svelte';
	import FilePencilIcon from '$lib/icons/solid/filePencilIcon.svelte';

	let mobileMenuOpen = false;

	const toggleMobileMenu = () => {
		mobileMenuOpen = !mobileMenuOpen;
	};

	const navigateToLogin = () => {
		goto('/auth/sign-in');
	};
</script>

<div class="">
	<header
		class="fixed top-0 z-50 w-full border-b border-light-four bg-light-primary dark:border-dark-four dark:bg-dark-primary"
	>
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<FilePencilIcon class="h-8 w-8 text-light-tertiary dark:text-dark-tertiary" />
					<span class="ml-2 text-xl font-bold text-light-secondary dark:text-dark-secondary"
						>Bill AI</span
					>
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden items-center space-x-8 md:flex">
					<a
						href="#features"
						class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
						>Características</a
					>
					<a
						href="#pricing"
						class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
						>Precios</a
					>
					<a
						href="#about"
						class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
						>Nosotros</a
					>
					<Button onclick={navigateToLogin}>Iniciar Sesión</Button>
				</div>

				<!-- Mobile menu button -->
				<button class="md:hidden" on:click={toggleMobileMenu}>
					{#if mobileMenuOpen}
						<XIcon class="h-6 w-6 text-light-tertiary dark:text-dark-tertiary" />
					{:else}
						<Menu2Icon class="h-6 w-6 text-light-tertiary dark:text-dark-tertiary" />
					{/if}
				</button>
			</div>

			<!-- Mobile Navigation -->
			{#if mobileMenuOpen}
				<div class="border-t border-light-four py-4 md:hidden dark:border-dark-four">
					<div class="flex flex-col space-y-4">
						<a
							href="#features"
							class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
							>Características</a
						>
						<a
							href="#pricing"
							class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
							>Precios</a
						>
						<a
							href="#about"
							class="text-light-secondary hover:text-light-secondary_d dark:text-dark-secondary dark:hover:text-dark-secondary_d"
							>Nosotros</a
						>
						<Button onclick={navigateToLogin}>Iniciar Sesión</Button>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl text-center">
			<h1 class="mb-6 text-5xl font-bold text-light-black md:text-6xl dark:text-dark-white">
				Procesa tus facturas
				<span class="block text-light-tertiary dark:text-dark-tertiary">en segundos</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-light-black dark:text-dark-white">
				Convierte facturas en PDF o imágenes a archivos Excel organizados automáticamente. Simple,
				rápido y preciso.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button onclick={navigateToLogin} variant="primary">
					Comenzar Gratis
					{#snippet rightIcon()}<ChevronRightIcon class="ml-2 h-6 w-6" />{/snippet}
				</Button>
				<Button onclick={navigateToLogin} variant="secondary">Ver Demo</Button>
			</div>

			<div class="relative mt-16">
				<div class="mx-auto max-w-4xl p-8">
					<div class="mb-6 grid grid-cols-2 gap-4">
						<div
							class="flex flex-col items-center justify-center rounded-lg bg-gradient-to-r from-light-primary to-light-primary_d p-6 dark:from-light-primary_d dark:to-light-primary_d"
						>
							<FileTextIcon class="mb-2 h-12 w-12 text-light-tertiary dark:text-dark-tertiary" />
							<span class="text-sm font-medium text-light-secondary dark:text-dark-secondary"
								>PDF</span
							>
						</div>
						<div
							class="flex flex-col items-center justify-center rounded-lg bg-gradient-to-l from-light-primary to-light-primary_d p-6 dark:from-light-primary_d dark:to-light-primary_d"
						>
							<FileTextIcon class="mb-2 h-12 w-12 text-light-tertiary dark:text-dark-tertiary" />
							<span class="text-sm font-medium text-light-secondary dark:text-dark-secondary"
								>Imagenes</span
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section
		id="features"
		class=" px-4 py-20 sm:px-6 lg:px-8 dark:from-light-primary_d dark:to-light-primary_d"
	>
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-light-black dark:text-dark-white">
					¿Por qué elegirnos?
				</h2>
				<p class="text-xl text-light-black dark:text-dark-white">
					Procesamiento inteligente de facturas con IA
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div
					class="rounded-xl border border-light-four p-8 transition-shadow hover:shadow-lg dark:border-dark-four"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-light-tertiary dark:bg-dark-tertiary"
					>
						<BoltIcon class="h-6 w-6 text-light-primary dark:text-dark-primary" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-light-black dark:text-dark-white">
						Procesamiento Rápido
					</h3>
					<p class="text-light-black dark:text-dark-white">
						Procesa cientos de facturas en segundos gracias a nuestra tecnología de IA avanzada.
					</p>
				</div>

				<div
					class="rounded-xl border border-light-four p-8 transition-shadow hover:shadow-lg dark:border-dark-four"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-light-tertiary dark:bg-dark-tertiary"
					>
						<ShieldIcon class="h-6 w-6 text-light-primary dark:text-dark-primary" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-light-black dark:text-dark-white">100% Seguro</h3>
					<p class="text-light-black dark:text-dark-white">
						Tus documentos están protegidos con encriptación de nivel empresarial y se eliminan
						automáticamente.
					</p>
				</div>

				<div
					class="rounded-xl border border-light-four p-8 transition-shadow hover:shadow-lg dark:border-dark-four"
				>
					<div
						class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-light-tertiary dark:bg-dark-tertiary"
					>
						<FileTextIcon class="h-6 w-6 text-light-primary dark:text-dark-primary" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-light-black dark:text-dark-white">
						Múltiples Formatos
					</h3>
					<p class="text-light-black">Acepta PDF e imágenes (JPG, PNG). Todo en un solo lugar.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-light-black">Planes y Precios</h2>
				<p class="text-xl text-light-black">Elige el plan perfecto para tu negocio</p>
			</div>

			<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
				<!-- Free Plan -->
				<div class="rounded-xl border border-light-four p-8 transition-shadow hover:shadow-lg">
					<h3 class="mb-2 text-2xl font-bold text-light-secondary">Gratis</h3>
					<div class="mb-6">
						<span class="text-4xl font-bold text-light-secondary">$0</span>
						<span class="text-light-secondary_d">/mes</span>
					</div>
					<ul class="mb-8 space-y-3">
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-tertiary" />
							<span class="text-light-black">1000 facturas por mes</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-tertiary" />
							<span class="text-light-black">PDF e imágenes</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-tertiary" />
							<span class="text-light-black">Exportar a Excel</span>
						</li>
					</ul>
					<Button variant="outline" fullWidth onclick={navigateToLogin}>Comenzar Gratis</Button>
				</div>

				<!-- Premium Plan -->
				<div
					class="relative rounded-xl bg-gradient-to-br from-light-four to-light-primary p-8 text-light-primary transition-shadow hover:shadow-xl dark:from-dark-four dark:to-dark-primary dark:text-dark-primary"
				>
					<div
						class="absolute top-4 right-4 rounded-full bg-light-primary px-3 py-1 text-sm font-bold text-light-secondary dark:bg-dark-primary dark:text-dark-secondary"
					>
						Popular
					</div>
					<h3 class="mb-2 text-2xl font-bold text-light-tertiary dark:text-dark-tertiary">
						Premium
					</h3>
					<div class="mb-6">
						<span class="text-4xl font-bold text-light-tertiary dark:text-dark-tertiary">$9</span>
						<span class="text-light-tertiary_d dark:text-dark-tertiary">/mes</span>
					</div>
					<ul class="mb-8 space-y-3">
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-secondary dark:text-dark-secondary" />
							<span class="text-light-black dark:text-dark-white">Facturas ilimitadas</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-secondary dark:text-dark-secondary" />
							<span class="text-light-black dark:text-dark-white"
								>Todos los formatos (PDF, Word, Imágenes)</span
							>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-secondary dark:text-dark-secondary" />
							<span class="text-light-black dark:text-dark-white">Procesamiento prioritario</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-light-secondary dark:text-dark-secondary" />
							<span class="text-light-black dark:text-dark-white">Soporte premium 24/7</span>
						</li>
					</ul>
					<Button onclick={navigateToLogin} variant="primary" fullWidth>Actualizar a Premium</Button
					>
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-light-black dark:text-dark-white">
					Sobre DataHub Analytics
				</h2>
				<p class="mb-4 text-xl font-semibold text-light-tertiary dark:text-dark-tertiary">
					Innovación con Inteligencia Artificial
				</p>
				<p class="mx-auto max-w-3xl text-lg text-light-black dark:text-dark-white">
					Transformamos ideas en soluciones tecnológicas inteligentes
				</p>
			</div>

			<div class="mb-16 grid gap-12 md:grid-cols-2">
				<div class="text-light-black dark:text-dark-white">
					<h3 class="mb-4 text-2xl font-bold text-light-black dark:text-dark-white">
						Quiénes Somos
					</h3>
					<p class="mb-4">
						Somos una empresa de desarrollo de software especializada en la creación de soluciones
						innovadoras con inteligencia artificial integrada.
					</p>
					<p class="">
						Con años de experiencia en el sector tecnológico, ayudamos a empresas de todos los
						tamaños a transformar sus procesos mediante la automatización inteligente y el análisis
						de datos avanzado.
					</p>
				</div>
				<div class="grid grid-cols-2 gap-6">
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold text-light-tertiary dark:text-dark-tertiary">
							1+
						</div>
						<div class="text-light-black dark:text-dark-white">Años de Experiencia</div>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold text-light-tertiary dark:text-dark-tertiary">
							20+
						</div>
						<div class="text-light-black dark:text-dark-white">Proyectos Completados</div>
					</div>
					<div class="col-span-2 text-center">
						<div class="mb-2 text-4xl font-bold text-light-tertiary dark:text-dark-tertiary">
							50+
						</div>
						<div class="text-light-black dark:text-dark-white">Clientes Satisfechos</div>
					</div>
				</div>
			</div>

			<div class="mb-12 grid gap-8 md:grid-cols-2">
				<div class="rounded-xl border border-light-four p-6">
					<h4 class="mb-3 text-xl font-bold text-light-black dark:text-dark-white">
						Nuestra Misión
					</h4>
					<p class="text-light-black dark:text-dark-white">
						Democratizar el acceso a tecnologías de inteligencia artificial, proporcionando
						soluciones innovadoras y accesibles que impulsen el crecimiento y la eficiencia de
						nuestros clientes.
					</p>
				</div>
				<div class="rounded-xl border border-light-four p-6">
					<h4 class="mb-3 text-xl font-bold text-light-black dark:text-dark-white">
						Nuestra Visión
					</h4>
					<p class="text-light-black dark:text-dark-white">
						Ser líderes en innovación tecnológica, reconocidos por crear software inteligente que
						transforma industrias y mejora la vida de las personas a través de la tecnología.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section
		class="bg-gradient-to-r from-light-tertiary_d to-light-four_d px-4 py-20 sm:px-6 lg:px-8 dark:from-dark-tertiary_d dark:to-dark-four_d"
	>
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-4xl font-bold text-light-primary dark:text-dark-primary">
				¿Listo para simplificar tu procesamiento de facturas?
			</h2>
			<p class="mb-8 text-xl text-light-primary dark:text-dark-primary">
				Únete a miles de usuarios que ya confían en nuestra plataforma
			</p>
			<button
				on:click={navigateToLogin}
				class="rounded-lg bg-light-primary px-8 py-4 text-lg font-medium text-light-secondary shadow-xl transition-colors hover:bg-light-primary_d dark:text-dark-secondary dark:hover:bg-dark-primary_d"
			>
				Crear Cuenta Gratis
			</button>
		</div>
	</section>

	<!-- Footer -->
	<footer
		class="bg-gradient-to-r from-light-tertiary_d to-light-four_d px-4 py-12 text-white sm:px-6 lg:px-8 dark:from-dark-tertiary_d dark:to-dark-four_d"
	>
		<div class="mx-auto max-w-7xl">
			<div class="mb-8 grid gap-8 md:grid-cols-4">
				<div>
					<div class="mb-4 flex items-center">
						<FileTextIcon class="h-8 w-8 text-light-primary dark:text-dark-primary" />
						<span class="ml-2 text-xl font-bold">Bill AI </span>
					</div>
					<p class="text-light-primary_d dark:text-dark-primary_d">
						Procesamiento inteligente de facturas con IA
					</p>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Producto</h4>
					<ul class="space-y-2 text-light-primary_d dark:text-dark-primary_d">
						<li><a href="#features" class="">Características</a></li>
						<li><a href="#pricing" class="">Precios</a></li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Empresa</h4>
					<ul class="space-y-2 text-light-primary_d dark:text-dark-primary_d">
						<li><a href="#about" class="">Sobre Nosotros</a></li>
						<li><a href="#" class="">Blog</a></li>
						<li><a href="#" class="">Contacto</a></li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Legal</h4>
					<ul class="space-y-2 text-light-primary_d dark:text-dark-primary_d">
						<li><a href="#" class="">Privacidad</a></li>
						<li><a href="#" class="">Términos</a></li>
						<li><a href="#" class="">Cookies</a></li>
					</ul>
				</div>
			</div>
			<div
				class="border-t border-light-four pt-8 text-center text-light-primary_d dark:border-dark-four dark:text-dark-primary_d"
			>
				<p>&copy; 2025 DataHub Analytics. Todos los derechos reservados.</p>
			</div>
		</div>
	</footer>
</div>
