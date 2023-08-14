const { useEffect, useState } = require("react");
const { ServiceGetAllPatientsInWaiting, ServiceGetAllPatientsInAttention } = require("src/service/patient/service.patient");

export const useGetAllPatientsInWaiting = () => {
  const [patientsInWaiting, setPatientsInWaiting] = useState([]);
  useEffect(() => {
    async function getAllPatientsInWaiting() {
      let listPatientsInWaiting = await ServiceGetAllPatientsInWaiting();
      setPatientsInWaiting(listPatientsInWaiting)
    }
    getAllPatientsInWaiting();
  }, []);
  return {patientsInWaiting};
}
export const useGetAllPatientsInAttention= () => {
  const [patientsInAttention, setPatientsInAttention] = useState([]);
  useEffect(() => {
    async function getAllPatientsInAttention() {
      let listPatientsInAttention = await ServiceGetAllPatientsInAttention();
      setPatientsInAttention(listPatientsInAttention)
    }
    getAllPatientsInAttention();
  }, []);
  return {patientsInAttention};
}