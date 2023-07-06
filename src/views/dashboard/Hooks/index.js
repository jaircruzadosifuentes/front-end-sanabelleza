import { useEffect, useState } from "react";
import { ServiceGetCountPatientsType } from "src/service/common/service.common";
import { ServiceGetAllPatientsInPercentajeTreatment } from "src/service/patient/service.patient";

export const useGetCountPatientsType = () => {
  const [patients, setPatientes] = useState([]);
  useEffect(() => {
    async function getCountPatientsType() {
      let data = await ServiceGetCountPatientsType();
      setPatientes(data);
    }
    getCountPatientsType();
  }, []);
  return { patients }
}
export const useGetAllPatientsInPercentajeTreatment = (patientId) => {
  const [patientsTreatMent, setPatientesTreatMent] = useState([]);
  useEffect(() => {
    async function getAllPatientsInPercentajeTreatment() {
      let data = await ServiceGetAllPatientsInPercentajeTreatment(patientId);
      setPatientesTreatMent(data);
    }
    getAllPatientsInPercentajeTreatment();
  }, [patientId]);
  return { patientsTreatMent }
}