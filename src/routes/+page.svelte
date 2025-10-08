<script lang="ts">
	import { goto } from '$app/navigation';
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

<div class="min-h-screen bg-white">
	<!-- Header/Navbar -->
	<header class="fixed top-0 z-50 w-full border-b border-gray-200 bg-white">
		<nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<FilePencilIcon class="h-8 w-8 text-red-600" />
					<span class="ml-2 text-xl font-bold text-gray-900">InvoiceProcessor</span>
				</div>

				<!-- Desktop Navigation -->
				<div class="hidden items-center space-x-8 md:flex">
					<a href="#features" class="text-gray-600 hover:text-gray-900">Características</a>
					<a href="#pricing" class="text-gray-600 hover:text-gray-900">Precios</a>
					<a href="#about" class="text-gray-600 hover:text-gray-900">Nosotros</a>
					<button
						on:click={navigateToLogin}
						class="rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
					>
						Iniciar Sesión
					</button>
				</div>

				<!-- Mobile menu button -->
				<button class="md:hidden" on:click={toggleMobileMenu}>
					{#if mobileMenuOpen}
						<XIcon class="h-6 w-6" />
					{:else}
						<Menu2Icon class="h-6 w-6" />
					{/if}
				</button>
			</div>

			<!-- Mobile Navigation -->
			{#if mobileMenuOpen}
				<div class="border-t border-gray-200 py-4 md:hidden">
					<div class="flex flex-col space-y-4">
						<a href="#features" class="text-gray-600 hover:text-gray-900">Características</a>
						<a href="#pricing" class="text-gray-600 hover:text-gray-900">Precios</a>
						<a href="#about" class="text-gray-600 hover:text-gray-900">Nosotros</a>
						<button
							on:click={navigateToLogin}
							class="w-full rounded-lg bg-red-600 px-6 py-2 font-medium text-white transition-colors hover:bg-red-700"
						>
							Iniciar Sesión
						</button>
					</div>
				</div>
			{/if}
		</nav>
	</header>

	<!-- Hero Section -->
	<section class="bg-gradient-to-b from-red-50 to-white px-4 pt-32 pb-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl text-center">
			<h1 class="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
				Procesa tus facturas
				<span class="block text-red-600">en segundos</span>
			</h1>
			<p class="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
				Convierte facturas en PDF, imágenes o Word a archivos Excel organizados automáticamente.
				Simple, rápido y preciso.
			</p>
			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<button
					on:click={navigateToLogin}
					class="flex items-center rounded-lg bg-red-600 px-8 py-4 text-lg font-medium text-white shadow-lg transition-colors hover:bg-red-700"
				>
					Comenzar Gratis
					<ChevronRightIcon class="ml-2 h-5 w-5" />
				</button>
				<button
					on:click={navigateToLogin}
					class="rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-medium text-gray-700 transition-colors hover:border-gray-400"
				>
					Ver Demo
				</button>
			</div>

			<!-- Hero Image/Illustration -->
			<div class="relative mt-16">
				<div class="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-2xl">
					<div class="mb-6 grid grid-cols-3 gap-4">
						<div class="flex flex-col items-center justify-center rounded-lg bg-red-100 p-6">
							<FileTextIcon class="mb-2 h-12 w-12 text-red-600" />
							<span class="text-sm font-medium text-gray-700">PDF</span>
						</div>
						<div class="flex flex-col items-center justify-center rounded-lg bg-red-100 p-6">
							<FileTextIcon class="mb-2 h-12 w-12 text-red-600" />
							<span class="text-sm font-medium text-gray-700">Imagen</span>
						</div>
						<div class="flex flex-col items-center justify-center rounded-lg bg-red-100 p-6">
							<FileTextIcon class="mb-2 h-12 w-12 text-red-600" />
							<span class="text-sm font-medium text-gray-700">Word</span>
						</div>
					</div>
					<div class="mb-6 flex items-center justify-center">
						<ChevronRightIcon class="h-8 w-8 text-red-600" />
					</div>
					<div class="flex items-center justify-center rounded-lg bg-green-100 p-6">
						<FileTextIcon class="mr-3 h-12 w-12 text-green-600" />
						<span class="text-lg font-medium text-gray-700">Archivo Excel Procesado</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section id="features" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900">¿Por qué elegirnos?</h2>
				<p class="text-xl text-gray-600">Procesamiento inteligente de facturas con IA</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="rounded-xl bg-red-50 p-8 transition-shadow hover:shadow-lg">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
						<BoltIcon class="h-6 w-6 text-white" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-gray-900">Procesamiento Rápido</h3>
					<p class="text-gray-600">
						Procesa cientos de facturas en segundos gracias a nuestra tecnología de IA avanzada.
					</p>
				</div>

				<div class="rounded-xl bg-red-50 p-8 transition-shadow hover:shadow-lg">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
						<ShieldIcon class="h-6 w-6 text-white" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-gray-900">100% Seguro</h3>
					<p class="text-gray-600">
						Tus documentos están protegidos con encriptación de nivel empresarial y se eliminan
						automáticamente.
					</p>
				</div>

				<div class="rounded-xl bg-red-50 p-8 transition-shadow hover:shadow-lg">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-600">
						<FileTextIcon class="h-6 w-6 text-white" />
					</div>
					<h3 class="mb-3 text-xl font-bold text-gray-900">Múltiples Formatos</h3>
					<p class="text-gray-600">
						Acepta PDF, imágenes (JPG, PNG) y documentos Word. Todo en un solo lugar.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Pricing Section -->
	<section id="pricing" class="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900">Planes y Precios</h2>
				<p class="text-xl text-gray-600">Elige el plan perfecto para tu negocio</p>
			</div>

			<div class="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
				<!-- Free Plan -->
				<div
					class="rounded-xl border-2 border-gray-200 bg-white p-8 transition-shadow hover:shadow-lg"
				>
					<h3 class="mb-2 text-2xl font-bold text-gray-900">Gratis</h3>
					<div class="mb-6">
						<span class="text-4xl font-bold text-gray-900">$0</span>
						<span class="text-gray-600">/mes</span>
					</div>
					<ul class="mb-8 space-y-3">
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-green-600" />
							<span class="text-gray-600">1000 facturas por mes</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-green-600" />
							<span class="text-gray-600">PDF e imágenes</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-green-600" />
							<span class="text-gray-600">Exportar a Excel</span>
						</li>
					</ul>
					<button
						on:click={navigateToLogin}
						class="w-full rounded-lg border-2 border-red-600 px-6 py-3 font-medium text-red-600 transition-colors hover:bg-red-50"
					>
						Comenzar Gratis
					</button>
				</div>

				<!-- Premium Plan -->
				<div
					class="relative rounded-xl bg-gradient-to-br from-red-600 to-red-700 p-8 text-white transition-shadow hover:shadow-xl"
				>
					<div
						class="absolute top-4 right-4 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-gray-900"
					>
						Popular
					</div>
					<h3 class="mb-2 text-2xl font-bold">Premium</h3>
					<div class="mb-6">
						<span class="text-4xl font-bold">$9</span>
						<span class="text-red-100">/mes</span>
					</div>
					<ul class="mb-8 space-y-3">
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-white" />
							<span>Facturas ilimitadas</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-white" />
							<span>Todos los formatos (PDF, Word, Imágenes)</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-white" />
							<span>Procesamiento prioritario</span>
						</li>
						<li class="flex items-center">
							<CheckIcon class="mr-3 h-5 w-5 text-white" />
							<span>Soporte premium 24/7</span>
						</li>
					</ul>
					<button
						on:click={navigateToLogin}
						class="w-full rounded-lg bg-white px-6 py-3 font-medium text-red-600 transition-colors hover:bg-gray-100"
					>
						Actualizar a Premium
					</button>
				</div>
			</div>
		</div>
	</section>

	<!-- About Section -->
	<section id="about" class="bg-white px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900">Sobre DataHub Analytics</h2>
				<p class="mb-4 text-xl font-semibold text-red-600">
					Innovación con Inteligencia Artificial
				</p>
				<p class="mx-auto max-w-3xl text-lg text-gray-600">
					Transformamos ideas en soluciones tecnológicas inteligentes
				</p>
			</div>

			<div class="mb-16 grid gap-12 md:grid-cols-2">
				<div>
					<h3 class="mb-4 text-2xl font-bold text-gray-900">Quiénes Somos</h3>
					<p class="mb-4 text-gray-600">
						Somos una empresa de desarrollo de software especializada en la creación de soluciones
						innovadoras con inteligencia artificial integrada.
					</p>
					<p class="text-gray-600">
						Con años de experiencia en el sector tecnológico, ayudamos a empresas de todos los
						tamaños a transformar sus procesos mediante la automatización inteligente y el análisis
						de datos avanzado.
					</p>
				</div>
				<div class="grid grid-cols-2 gap-6">
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold text-red-600">10+</div>
						<div class="text-gray-600">Años de Experiencia</div>
					</div>
					<div class="text-center">
						<div class="mb-2 text-4xl font-bold text-red-600">100+</div>
						<div class="text-gray-600">Proyectos Completados</div>
					</div>
					<div class="col-span-2 text-center">
						<div class="mb-2 text-4xl font-bold text-red-600">50+</div>
						<div class="text-gray-600">Clientes Satisfechos</div>
					</div>
				</div>
			</div>

			<div class="mb-12 grid gap-8 md:grid-cols-2">
				<div class="rounded-xl bg-red-50 p-6">
					<h4 class="mb-3 text-xl font-bold text-gray-900">Nuestra Misión</h4>
					<p class="text-gray-600">
						Democratizar el acceso a tecnologías de inteligencia artificial, proporcionando
						soluciones innovadoras y accesibles que impulsen el crecimiento y la eficiencia de
						nuestros clientes.
					</p>
				</div>
				<div class="rounded-xl bg-red-50 p-6">
					<h4 class="mb-3 text-xl font-bold text-gray-900">Nuestra Visión</h4>
					<p class="text-gray-600">
						Ser líderes en innovación tecnológica, reconocidos por crear software inteligente que
						transforma industrias y mejora la vida de las personas a través de la tecnología.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- CTA Section -->
	<section class="bg-gradient-to-r from-red-600 to-red-700 px-4 py-20 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-4xl text-center">
			<h2 class="mb-6 text-4xl font-bold text-white">
				¿Listo para simplificar tu procesamiento de facturas?
			</h2>
			<p class="mb-8 text-xl text-red-100">
				Únete a miles de usuarios que ya confían en nuestra plataforma
			</p>
			<button
				on:click={navigateToLogin}
				class="rounded-lg bg-white px-8 py-4 text-lg font-medium text-red-600 shadow-xl transition-colors hover:bg-gray-100"
			>
				Crear Cuenta Gratis
			</button>
		</div>
	</section>

	<!-- Footer -->
	<footer class="bg-gray-900 px-4 py-12 text-white sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<div class="mb-8 grid gap-8 md:grid-cols-4">
				<div>
					<div class="mb-4 flex items-center">
						<FileTextIcon class="h-8 w-8 text-red-600" />
						<span class="ml-2 text-xl font-bold">InvoiceProcessor</span>
					</div>
					<p class="text-gray-400">Procesamiento inteligente de facturas con IA</p>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Producto</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="#features" class="hover:text-white">Características</a></li>
						<li><a href="#pricing" class="hover:text-white">Precios</a></li>
						<li><a href="#" class="hover:text-white">API</a></li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Empresa</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="#about" class="hover:text-white">Sobre Nosotros</a></li>
						<li><a href="#" class="hover:text-white">Blog</a></li>
						<li><a href="#" class="hover:text-white">Contacto</a></li>
					</ul>
				</div>
				<div>
					<h4 class="mb-4 font-bold">Legal</h4>
					<ul class="space-y-2 text-gray-400">
						<li><a href="#" class="hover:text-white">Privacidad</a></li>
						<li><a href="#" class="hover:text-white">Términos</a></li>
						<li><a href="#" class="hover:text-white">Cookies</a></li>
					</ul>
				</div>
			</div>
			<div class="border-t border-gray-800 pt-8 text-center text-gray-400">
				<p>&copy; 2025 DataHub Analytics. Todos los derechos reservados.</p>
			</div>
		</div>
	</footer>
</div>
