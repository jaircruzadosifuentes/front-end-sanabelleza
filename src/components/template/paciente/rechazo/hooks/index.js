
import { useEffect, useState } from 'react';
import { ServiceGetAllPatientsPendApro } from '../services/index';

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