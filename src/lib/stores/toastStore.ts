import { writable } from 'svelte/store';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

export const toasts = writable<Toast[]>([]);

export const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = Math.random().toString(36).substr(2, 9);
  const newToast: Toast = { ...toast, id };
  
  toasts.update(current => [...current, newToast]);
  
  if (toast.duration !== 0) {
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }
};

export const removeToast = (id: string) => {
  toasts.update(current => current.filter(toast => toast.id !== id));
};