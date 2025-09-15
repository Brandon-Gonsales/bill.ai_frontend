import type { ExcelTemplate } from '$lib/interfaces/template.interface';
import { writable } from 'svelte/store';

export const templateStore = writable<ExcelTemplate>({
  file: null,
  fields: [],
  uploaded: false,
  isValid: false
});