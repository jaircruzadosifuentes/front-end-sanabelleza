
export const getTitle = (value) => {
  return document.title = `${value}`;
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
  return new Date(fullDate).toLocaleDateString('en-GB')
}
export function formatDecimales(value = 0) {
  return (Math.round(value * 100) / 100).toFixed(2) ;
}
export const formatoNumero = (valor) => {
  return valor < 10 ? '0' + valor : valor;
};
export const fuGuardarDatosUsuario = (data) => {
  localStorage.setItem('_user_', data)
}
export const fuDevolverDatosUsuario = () => {
  return localStorage.getItem('_user_');
}
export const fuLimpiarSesiones = () => {
  localStorage.clear();
} 
export const fuDevolverIdEmpleado = () => {
  return parseInt(JSON.parse(fuDevolverDatosUsuario().id));
}