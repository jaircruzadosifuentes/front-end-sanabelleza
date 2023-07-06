
import { useEffect, useState } from 'react';
import { ServiceGetAllPatientsPatientWithAppoiment, ServiceGetAllPatientsPendApro } from '../services/index';

export const useGetAllPatientsPendApro = () => {
  const [listPatientsPendPro, setListPatientsPendPro] = useState([]);
  useEffect(() => {
    async function getAllPatientsPendApro() {
      let listPatients = await ServiceGetAllPatientsPendApro();
      setListPatientsPendPro(listPatients);
    }
    getAllPatientsPendApro();
  }, []);
  return { listPatientsPendPro, setListPatientsPendPro }
}
export const useGetAllPatientsPatientWithAppoiment = () => {
  const [listPatientsWithAppoiment, setListPatientWithAppoiment] = useState([]);
  useEffect(() => {
    async function getAllPatientsPatientWithAppoiment() {
      let data = await ServiceGetAllPatientsPatientWithAppoiment();
      setListPatientWithAppoiment(data);
    }
    getAllPatientsPatientWithAppoiment();
  }, []);
  return { listPatientsWithAppoiment, setListPatientWithAppoiment }
}