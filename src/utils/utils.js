
export const getTitle = (value) => {
  return document.title = `Sana Belleza - ${value}`;
}
export const getValueInBrackets = (cadena) => {
  if (cadena.includes('[')) {
    var cadenaTemp = cadena.split('[');
    cadena = cadenaTemp[1];
    if (cadena.includes(']')) {
      cadenaTemp = cadena.split(']');
      cadena = cadenaTemp[0];
    }
  }
  return cadena;
}
export function fillWithZeros(value) {
  return value < 10 ? '0' + value : value;
}
export function getYear() {
  return new Date().getFullYear();
}
export function getMonth() {
  return new Date().getMonth() + 1;
}
export function getDay() {
  return new Date().getDate();
}
export function getDateNow() {
  return new Date(Date.now());
}
export function convertDateTimeToDate(fullDate) {
  return new Date(fullDate).toLocaleDateString()
}
export function formatDecimales(value = 0) {
  return value.toFixed(2);
}
export const formatoNumero = (valor) => {
  return valor < 10 ? '0' + valor : valor;
};