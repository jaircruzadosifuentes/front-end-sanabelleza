
import { useEffect, useState } from 'react';
import { ServiceGetAllPatientsFinishedTreatment } from 'src/service/patient/service.patient';

export const useGetAllPatientsInTreatment= () => {
  const [listPatInTreatment, setListPatInTreatment] = useState([]);
  useEffect(() => {
    async function getAllPatientsInTreatment() {
      let data = await ServiceGetAllPatientsFinishedTreatment();
      setListPatInTreatment(data);
    }
    getAllPatientsInTreatment();
  }, []);
  return { listPatInTreatment, setListPatInTreatment }
}