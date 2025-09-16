<script lang="ts">
	import type { AppState } from '$lib/interfaces/api.interface';

	export let currentStep: AppState['currentStep'];

	const steps = [
		{ id: 'template', title: 'Cargar Plantilla', icon: '📊' },
		{ id: 'upload', title: 'Cargar Facturas', icon: '📄' },
		{ id: 'processing', title: 'Procesando', icon: '⚙️' },
		{ id: 'results', title: 'Resultados', icon: '✅' }
	] as const;

	function getStepStatus(stepId: (typeof steps)[number]['id']) {
		const currentIndex = steps.findIndex((s) => s.id === currentStep);
		const stepIndex = steps.findIndex((s) => s.id === stepId);

		if (stepIndex < currentIndex) return 'completed';
		if (stepIndex === currentIndex) return 'current';
		return 'pending';
	}
</script>

<div class="bg-white py-6">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<nav aria-label="Progress">
			<ol class="flex items-center">
				{#each steps as step, index}
					{@const status = getStepStatus(step.id)}
					<li class="relative {index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}">
						<!-- Connector line -->
						{#if index !== steps.length - 1}
							<div class="absolute inset-0 flex items-center" aria-hidden="true">
								<div
									class="h-0.5 w-full bg-gray-200 {status === 'completed' ? 'bg-blue-600' : ''}"
								></div>
							</div>
						{/if}

						<!-- Step -->
						<div class="relative flex items-center justify-center">
							<div
								class="
                  flex h-10 w-10 items-center justify-center rounded-full text-lg font-medium
                  {status === 'completed' ? 'bg-blue-600 text-white' : ''}
                  {status === 'current' ? 'border-2 border-blue-600 bg-blue-100 text-blue-600' : ''}
                  {status === 'pending' ? 'bg-gray-100 text-gray-400' : ''}
                "
							>
								{step.icon}
							</div>
						</div>

						<!-- Step title -->
						<div class="absolute top-12 left-1/2 w-24 -translate-x-1/2 transform text-center">
							<span
								class="
                text-xs font-medium
                {status === 'current' ? 'text-blue-600' : ''}
                {status === 'completed' ? 'text-gray-900' : ''}
                {status === 'pending' ? 'text-gray-400' : ''}
              "
							>
								{step.title}
							</span>
						</div>
					</li>
				{/each}
			</ol>
		</nav>
	</div>
</div>
