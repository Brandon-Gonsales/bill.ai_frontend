<script lang="ts">
	export let value: string = '';
	export let options: { value: string; label: string }[] = [];
	export let placeholder: string = 'Seleccionar...';
	export let disabled = false;
	export let error = false;
</script>

<select
	bind:value
	{disabled}
	class="
    w-full rounded-lg border bg-white px-3 py-2
    focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none
    disabled:cursor-not-allowed disabled:opacity-50
    {error ? 'border-red-500' : 'border-gray-300'}
  "
	{...$$restProps}
>
	<option value="" disabled>{placeholder}</option>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
