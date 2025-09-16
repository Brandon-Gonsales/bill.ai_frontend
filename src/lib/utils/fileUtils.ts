export function validateFileType(file: File, acceptedTypes: string): boolean {
	const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
	return acceptedTypes.toLowerCase().includes(fileExtension);
}

export function formatFileSize(bytes: number): string {
	if (bytes === 0) return '0 Bytes';

	const k = 1024;
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function downloadBlob(blob: Blob, filename: string): void {
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
	document.body.removeChild(a);
}

export function getFileIcon(filename: string): string {
	const extension = filename.split('.').pop()?.toLowerCase();

	switch (extension) {
		case 'pdf':
			return '📄';
		case 'png':
		case 'jpg':
		case 'jpeg':
			return '🖼️';
		case 'xlsx':
		case 'xls':
			return '📊';
		default:
			return '📎';
	}
}

export function isImageFile(filename: string): boolean {
	const extension = filename.split('.').pop()?.toLowerCase();
	return ['png', 'jpg', 'jpeg'].includes(extension || '');
}

export function isPdfFile(filename: string): boolean {
	const extension = filename.split('.').pop()?.toLowerCase();
	return extension === 'pdf';
}
