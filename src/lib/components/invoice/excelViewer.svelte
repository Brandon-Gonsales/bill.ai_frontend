<script lang="ts">
	import { FileService } from "$lib/services/fileService.service";
	import { templateStore } from "$lib/stores/templateStore";
	import { addToast } from "$lib/stores/toastStore";
	import Button from "../ui/Button.svelte";
	import Card from "../ui/card.svelte";
	import FileUpload from "../ui/FileUpload.svelte";

  
  export let downloadUrl: string | null = null;
  export let processedCount = 0;
  export let visible = false;
  let selectedFile: File | null = null;
  let uploading = false;
  let uploaded = false;
  const uploadTemplate =()=>{
    
  }

  function downloadExcel() {
    if (downloadUrl) {
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `processed_invoices_${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  function handleFileError(event: CustomEvent<{ message: string }>) {
    addToast({
      type: 'error',
      title: 'Error de archivo',
      message: event.detail.message
    });
  }   

  function clearSelection() {
    selectedFile = null;
  }

  const handleFileSelect =()=>{
    
  }

</script>
<Card>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-semibold text-gray-900">1. Cargar Plantilla de Excel</h3>
      <p class="mt-1 text-sm text-gray-600">
        Sube tu plantilla de Excel con las columnas que deseas extraer de las facturas
      </p>
    </div>

    {#if !selectedFile}
      <FileUpload
        accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        on:files={handleFileSelect}
        on:error={handleFileError}
      >
        <svelte:fragment slot="description">
          Excel (.xlsx, .xls) - Máximo 10MB
        </svelte:fragment>
      </FileUpload>
    {:else}
      <div class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex-shrink-0">
              <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p class="text-sm text-gray-500">
                {FileService.formatFileSize(selectedFile.size)}
              </p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <Button variant="secondary" size="sm" on:click={clearSelection}>
              Cambiar
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={uploading}
              disabled={uploading}
              on:click={uploadTemplate}
            >
              {uploading ? 'Subiendo...' : 'Subir Plantilla'}
            </Button>
          </div>
        </div>
      </div>
    {/if}

    {#if $templateStore.uploaded && $templateStore.fields.length > 0}
      <div class="bg-green-50 border border-green-200 rounded-lg p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h4 class="text-sm font-medium text-green-800">
              Plantilla cargada correctamente
            </h4>
            <div class="mt-2 text-sm text-green-700">
              <p>Campos detectados:</p>
              <div class="mt-1 flex flex-wrap gap-1">
                {#each $templateStore.fields as field}
                  <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {field}
                  </span>
                {/each}
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</Card>
{#if visible}
  <Card>
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900">3. Resultado del Procesamiento</h3>
        <p class="mt-1 text-sm text-gray-600">
          Tu archivo Excel ha sido generado con los datos extraídos de las facturas
        </p>
      </div>

      <div class="bg-green-50 border border-green-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4 flex-1">
            <h4 class="text-lg font-semibold text-green-800">
              ¡Procesamiento Completado!
            </h4>
            <p class="text-sm text-green-600 mt-1">
              Se procesaron {processedCount} archivo{processedCount > 1 ? 's' : ''} exitosamente
            </p>
          </div>
        </div>

        <div class="mt-6 flex justify-center">
          <Button
            variant="success"
            size="lg"
            on:click={downloadExcel}
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Descargar Excel
          </Button>
        </div>
      </div>

      <div class="bg-gray-50 rounded-lg p-4">
        <h5 class="text-sm font-medium text-gray-900 mb-3">Información del archivo:</h5>
        <div class="space-y-2 text-sm text-gray-600">
          <div class="flex justify-between">
            <span>Archivos procesados:</span>
            <span class="font-medium">{processedCount}</span>
          </div>
          <div class="flex justify-between">
            <span>Fecha de procesamiento:</span>
            <span class="font-medium">{new Date().toLocaleDateString('es-ES')}</span>
          </div>
          <div class="flex justify-between">
            <span>Formato:</span>
            <span class="font-medium">Excel (.xlsx)</span>
          </div>
        </div>
      </div>

      <div class="border-t pt-4">
        <p class="text-xs text-gray-500">
          💡 <strong>Tip:</strong> Puedes abrir el archivo Excel generado en cualquier programa de hojas de cálculo 
          como Microsoft Excel, Google Sheets, o LibreOffice Calc para revisar y editar los datos extraídos.
        </p>
      </div>
    </div>
  </Card>
{/if}