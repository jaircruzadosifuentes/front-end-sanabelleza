
import { useEffect, useState } from "react";
import { ServiceGetAllPayMethods, ServiceGetInComboAfpSure, ServiceGetInComboModalityContract, ServiceGetInComboRole, ServiceGetInComboTypeOfContract } from "src/service/common/service.common";

export const useGetAllPayMethods = () => {
  const [payMethods, setPayMethods] = useState([]);
  useEffect(() => {
    async function getAllPayMethods() {
      let listPayMethods = await ServiceGetAllPayMethods();
      setPayMethods(listPayMethods);
    }
    getAllPayMethods();
  }, []);
  return {payMethods, setPayMethods}
}
export const useGetAllTypeOfContract = () => {
  const [typeOfContracts, setTypeOfContracts] = useState([]);
  useEffect(() => {
    async function getAllTypeOfContract() {
      let listTypes = await ServiceGetInComboTypeOfContract();
      setTypeOfContracts(listTypes);
    }
    getAllTypeOfContract();
  }, [])
  return {typeOfContracts}
}
export const useGetAllModalityContract = () => {
  const [modalityContracts, setModalityContracts] = useState([]);
  useEffect(() => {
    async function getAllModalityContract() {
      let listModality = await ServiceGetInComboModalityContract();
      setModalityContracts(listModality);
    }
    getAllModalityContract();
  }, []);
  return {modalityContracts}
}
export const useGetAllRoleInCombo = () => {
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    async function getAllRoleInCombo() {
      let listRole = await ServiceGetInComboRole();
      setRoles(listRole);
    }
    getAllRoleInCombo();
  }, []);
  return {roles}
}
export const useGetAllAfpSure = () => {
  const [afpSures, setAfpSures] = useState([]);
  useEffect(() => {
    async function getAllAfpSure() {
      let listAfpSure = await ServiceGetInComboAfpSure();
      setAfpSures(listAfpSure);
    }
    getAllAfpSure();
  }, []);
  return{afpSures}
}