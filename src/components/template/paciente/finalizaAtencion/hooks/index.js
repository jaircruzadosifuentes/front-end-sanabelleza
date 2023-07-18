
import { useEffect, useState } from 'react';
import { ServiceGetAllPayMethods, ServiceGetAllSchedulePatient, ServiceGetPacientesConPrimeraAtencionClinica } from '../services';

export const useGetPacientesConPrimeraAtencionClinica = () => {
  const [listPatients, setListPatients] = useState([]);
  useEffect(() => {
    async function getPacientesConPrimeraAtencionClinica() {
      let list = await ServiceGetPacientesConPrimeraAtencionClinica();
      setListPatients(list);
    }
    getPacientesConPrimeraAtencionClinica();
  }, []);
  return { listPatients, setListPatients }
}
// export const useGetAllPatientsPatientWithAppoiment = () => {
//   const [listPatientsWithAppoiment, setListPatientWithAppoiment] = useState([]);
//   useEffect(() => {
//     async function getAllPatientsPatientWithAppoiment() {
//       let data = await ServiceGetAllPatientsPatientWithAppoiment();
//       setListPatientWithAppoiment(data);
//     }
//     getAllPatientsPatientWithAppoiment();
//   }, []);
//   return { listPatientsWithAppoiment, setListPatientWithAppoiment }
// }
export const useGetAllPayMethods = () => {
  const [payMethods, setPayMethods] = useState([]);
  useEffect(() => {
    async function getAllPayMethods() {
      let data = await ServiceGetAllPayMethods();
      setPayMethods(data);
    }
    getAllPayMethods();
  }, []);
  return { payMethods }
}
export const useGetAllSchedulePatient = (patientId) => {
  const [schedules, setSchedules] = useState([]);
  useEffect(() => {
    async function getAllSchedulePatient() {
      let data = await ServiceGetAllSchedulePatient(patientId);
      setSchedules(data);
    }
    getAllSchedulePatient();
  }, [patientId]);
  return { schedules }
}