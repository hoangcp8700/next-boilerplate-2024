export const blobToBase64 = (
  blob: Blob,
): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
};

export function convertBase64ToImageFile(
  base64Image: string,
  fileName: string,
) {
  // Convert Base64 to Blob
  const byteString = atob(base64Image.split(',')[1]);
  const mimeType = base64Image.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([arrayBuffer], { type: mimeType });

  // Convert Blob to File
  const file = new File([blob], fileName, { type: mimeType });

  return file;
}

export function isBase64ImageUrl(url: string) {
  return url.startsWith('data:image/');
}
