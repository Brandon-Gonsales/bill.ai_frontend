<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let accept = '';
  export let multiple = false;
  export let disabled = false;
  export let maxSize = 10 * 1024 * 1024; // 10MB default
  export let dragActive = false;

  const dispatch = createEventDispatcher<{
    files: { files: FileList };
    error: { message: string };
  }>();

  let fileInput: HTMLInputElement;

  function handleDragOver(e: DragEvent) {
    e.preventDefault();
    if (!disabled) dragActive = true;
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    dragActive = false;
    
    if (disabled) return;

    const files = e.dataTransfer?.files;
    if (files) {
      validateAndDispatchFiles(files);
    }
  }

  function handleFileSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      validateAndDispatchFiles(target.files);
    }
  }

  function validateAndDispatchFiles(files: FileList) {
    for (let file of Array.from(files)) {
      if (file.size > maxSize) {
        dispatch('error', { message: `El archivo ${file.name} excede el tamaño máximo permitido` });
        return;
      }
    }
    dispatch('files', { files });
  }

  function openFileDialog() {
    if (!disabled) {
      fileInput.click();
    }
  }
</script>

<div
  class="border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
         {dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}
         {disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-400 hover:bg-gray-50'}"
  on:dragover={handleDragOver}
  on:dragleave={handleDragLeave}
  on:drop={handleDrop}
  on:click={openFileDialog}
  on:keydown={(e) => e.key === 'Enter' && openFileDialog()}
  role="button"
  tabindex="0"
>
  <input
    bind:this={fileInput}
    type="file"
    {accept}
    {multiple}
    {disabled}
    class="hidden"
    on:change={handleFileSelect}
  />
  
  <div class="space-y-4">
    <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    
    <div>
      <p class="text-sm text-gray-600">
        <span class="font-medium text-blue-600 hover:text-blue-500">Haz clic para subir</span>
        o arrastra y suelta
      </p>
      <p class="text-xs text-gray-500 mt-1">
        <slot name="description">
          {accept ? `Archivos: ${accept}` : 'Cualquier archivo'}
        </slot>
      </p>
    </div>
  </div>
</div>