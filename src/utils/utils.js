export const handleUpload = fileObject => {
  if (fileObject.length > 4) {
    alert("Max. of 4 files allowed.");
  }
  console.log(fileObject);
  return false;
};
