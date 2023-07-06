
import { useEffect, useState } from 'react';
import { ServiceGetAlLPatientsNewAttentionByEmployeedId } from 'src/service/patient/service.patient';

export const useGetAllPatientsNewAttentionByEmployeedId = (employeedId) => {
  const [listPatients, setListPatients] = useState([]);
  useEffect(() => {
    async function getAllPatientsPendApro() {
      let listNewAttentionsPatients = await ServiceGetAlLPatientsNewAttentionByEmployeedId(employeedId);
      setListPatients(listNewAttentionsPatients);
    }
    getAllPatientsPendApro();
  }, [employeedId]);
  return { listPatients }
}