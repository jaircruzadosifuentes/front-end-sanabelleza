
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
export function convertDateFormatCorrect(fullDate) {
  let date = new Date(fullDate);
  let annio = date.getFullYear();
  let mount = date.getMonth() + 1;
  let day = date.getDay();
  return (annio + '-' + fillWithZeros(mount) + '-' + fillWithZeros(day));
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
export function calculateIMC(peso, altura) {
  altura = altura / 100; 
  let imc = peso / (altura * altura);
  return imc;
}
export function IMCDescription(value) {
  let under = 18.5;
  let healthy = 24.9;
  let overweight = 29.9;
  let obesity1 = 34.9;
  let obesity2 = 39.9;
  let obesity3 = 40
  let description = ''
  if(value < under) {
    description = 'Por debajo';
  } else if(value >= under && value <= healthy) {
    description = 'Saludable';
  } else if(value > healthy && value <= overweight) {
    description = 'Sobrepeso';
  } else if(value > overweight && value <= obesity1) {
    description = 'Obesidad I';
  } else if(value > obesity1 && value <= obesity2) {
    description = 'Obesidad II';
  } else if(value > obesity3) {
    description = 'Obesidad III';
  }
  return description;
}
export function IMCColor(value) {
  let under = 18.5;
  let healthy = 24.9;
  let overweight = 29.9;
  let obesity1 = 34.9;
  let obesity2 = 39.9;
  let obesity3 = 40
  let color = ''
  if(value < under) {
    color = '#08a5a1';
  } else if(value >= under && value <= healthy) {
    color = '#23a200';
  } else if(value > healthy && value <= overweight) {
    color = '#f0a10e';
  } else if(value > overweight && value <= obesity1) {
    color = '#f15c06';
  } else if(value > obesity1 && value <= obesity2) {
    color = '#b80e9c';
  } else if(value > obesity3) {
    color = '#9b0bd6';
  }
  return color;
}
export function validateAngle(angulo) {
  // Expresión regular para validar números enteros o decimales
  const regex = /^-?(0*(?:[0-9]|[1-9][0-9]*)(\.[0-9]+)?|[1-9][0-9]*(\.[0-9]+)?)$/;

  if (regex.test(angulo)) {
    // Convertir a número para validar el rango
    const valor = parseFloat(angulo);

    // Verificar si el número está en el rango de -360 a 360 grados
    if (valor >= -360 && valor <= 360) {
      return true;
    }
  }
  return false;
}