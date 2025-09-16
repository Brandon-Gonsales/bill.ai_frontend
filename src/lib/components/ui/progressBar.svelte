<script lang="ts">
	export let progress: number = 0;
	export let animated = true;
	export let showPercentage = true;
	export let color: 'blue' | 'green' | 'red' = 'blue';

	const colors = {
		blue: 'bg-blue-600',
		green: 'bg-green-600',
		red: 'bg-red-600'
	};

	$: clampedProgress = Math.max(0, Math.min(100, progress));
</script>

<div class="w-full">
	{#if showPercentage}
		<div class="mb-2 flex items-center justify-between">
			<span class="text-sm font-medium text-gray-700">Progreso</span>
			<span class="text-sm text-gray-600">{Math.round(clampedProgress)}%</span>
		</div>
	{/if}

	<div class="h-3 w-full rounded-full bg-gray-200">
		<div
			class="
        h-3 rounded-full transition-all duration-300 ease-out
        {colors[color]}
        {animated ? 'transition-all duration-300' : ''}
      "
			style="width: {clampedProgress}%"
		></div>
	</div>
</div>
