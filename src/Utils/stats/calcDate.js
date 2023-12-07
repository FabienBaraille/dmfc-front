export const transformDate = (date, mode) => {
  const dateToTransform = new Date(date);
  const day = dateToTransform.getDate() < 10 ? `0${dateToTransform.getDate()}` : `${dateToTransform.getDate()}`;
  const month = dateToTransform.getMonth()+1 < 10 ? `0${dateToTransform.getMonth()+1}` : `${dateToTransform.getMonth()+1}`;
  const second = dateToTransform.getSeconds() < 10 ? `0${dateToTransform.getSeconds()}` : `${dateToTransform.getSeconds()}`;
  const minutes= dateToTransform.getMinutes() < 10 ? `0${dateToTransform.getMinutes()}` : `${dateToTransform.getMinutes()}`;
  const dateTransformed = mode === 'create' ?
    `${dateToTransform.getFullYear()}-${month}-${day}${dateToTransform.getHours()}:${minutes}:${second}` : 
    mode === 'news' ?
    `${day}/${month}/${dateToTransform.getFullYear()}` : 
    `${day}/${month}/${dateToTransform.getFullYear()} - ${dateToTransform.getHours()}:${minutes}`;
  return dateTransformed;
}
