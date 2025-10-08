import { writable } from 'svelte/store';

export interface TemplateData {
	message: string;
	campos_detectados: string[];
}

// Estado inicial
const initialData: TemplateData = {
	message: '',
	campos_detectados: []
};

// ✅ Creamos un store con métodos personalizados
function createTemplateStore() {
	const { subscribe, set, update } = writable<TemplateData>(initialData);

	return {
		subscribe,

		// 🔹 Establece nuevos datos
		setTemplateData: (data: TemplateData) => set(data),

		// 🔹 Actualiza sólo los campos detectados
		updateCampos: (campos: string[]) =>
			update((current) => ({ ...current, campos_detectados: campos })),

		// 🔹 Limpia completamente el store (restaurar al estado inicial)
		clear: () => set({ ...initialData })
	};
}

// 🏪 Exportamos una única instancia global del store
export const templateStore = createTemplateStore();
