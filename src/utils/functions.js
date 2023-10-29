import { fuDevolverDatosUsuario } from "./utils";

export const formatFullHour = (createdAt) => {
  let date = new Date(createdAt).toLocaleDateString('en-GB');
  let dateHour = new Date(createdAt).toLocaleTimeString();
  return date.toString() + " - " + dateHour.toString();
}

export const employeedCashRegisterId = () => {
  return parseInt(`${JSON.parse(fuDevolverDatosUsuario()).employeedCashRegisterId}`);
} 
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return [
    padTo2Digits(date.getDate()),
    padTo2Digits(date.getMonth() + 1),
    date.getFullYear(),
  ].join('/');
} 

export function getHoraActual() {
  let date = new Date();
  let hour = date.getHours();
  let minutes = padTo2Digits(date.getMinutes());
  let seconds = padTo2Digits(date.getSeconds());
  return `${hour}:${minutes}:${seconds}`;
}
export function getDateNowWithFormat() {
  let date = new Date();
  let day = date.getDate();
  let mount = date.getMonth() + 1;
  let year = date.getFullYear();
  return year + '-' + padTo2Digits(mount) + '-' + padTo2Digits(day);
}