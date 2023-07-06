
import { useEffect, useState } from 'react';
import { ServiceGetAllPatientsInTreatment } from 'src/service/patient/service.patient';

export const useGetAllPatientsInTreatment= () => {
  const [listPatInTreatment, setListPatInTreatment] = useState([]);
  useEffect(() => {
    async function getAllPatientsInTreatment() {
      let data = await ServiceGetAllPatientsInTreatment();
      setListPatInTreatment(data);
    }
    getAllPatientsInTreatment();
  }, []);
  return { listPatInTreatment, setListPatInTreatment }
}