'use client';

export const saveFile = (blob: Blob, filename: string) => {
  if ('msSaveOrOpenBlob' in navigator) {
    (navigator.msSaveOrOpenBlob as any)(blob, filename);
  } else {
    const a = document.createElement('a');
    document.body.appendChild(a);

    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}