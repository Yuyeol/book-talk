export const urlToFileList = async (url: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], url.split("/").pop() as string, {
    type: blob.type,
  });
  return fileToFileList(file);
};
const fileToFileList = (file: File) => {
  var dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  return dataTransfer.files;
};
