export const getFilePreview = (
  file: File | string,
  callback: (path: string) => void
) => {
  if (typeof file === 'string') {
    return callback(file);
  }

  const reader = new FileReader();
  reader.onload = ({ result }) => callback(result as string);
  reader.readAsDataURL(file);
};
