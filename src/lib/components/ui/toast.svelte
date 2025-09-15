<script lang="ts">
	import { removeToast, type Toast } from '$lib/stores/toastStore';
  import { fly } from 'svelte/transition';

  export let toast: Toast;

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'i'
  };

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };
</script>

<div
  transition:fly={{ x: 300, duration: 300 }}
  class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden"
>
  <div class="p-4">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <div class="w-6 h-6 rounded-full {colors[toast.type]} flex items-center justify-center text-white text-sm font-bold">
          {icons[toast.type]}
        </div>
      </div>
      <div class="ml-3 w-0 flex-1 pt-0.5">
        <p class="text-sm font-medium text-gray-900">{toast.title}</p>
        <p class="mt-1 text-sm text-gray-500">{toast.message}</p>
      </div>
      <div class="ml-4 flex-shrink-0 flex">
        <button
          class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          on:click={() => removeToast(toast.id)}
        >
          <span class="sr-only">Cerrar</span>
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>