
import { useEffect, useState } from 'react';
import { ServiceGetAllPatientsClinicalCareEnds, ServiceGetAllPayMethods, ServiceGetAllSchedulePatient } from '../services';

export const useGetAllPatientsClinicalCareEnds = () => {
  const [listPatients, setListPatients] = useState([]);
  useEffect(() => {
    async function getAllPatientsClinicalCareEnds() {
      let list = await ServiceGetAllPatientsClinicalCareEnds();
      setListPatients(list);
    }
    getAllPatientsClinicalCareEnds();
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