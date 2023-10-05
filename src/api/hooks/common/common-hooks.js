
import { useEffect, useState } from "react";
import { GetIconBasedOnComponent, GetTypeComponent } from "src/layout/Nav";
import { GetComponentBasedOnRoute } from "src/layout/Routes";
import { ServiceGetAllPayMethods, ServiceGetAreasInSelect, ServiceGetInComboAfpSure, ServiceGetInComboModalityContract, ServiceGetInComboRole, ServiceGetInComboTypeOfContract, ServiceGetOptions, ServiceGetReportMensualCategoryTTO, ServiceGetRoles, ServiceGetRoutes } from "src/service/common/service.common";

// FIN DE ROUTES

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
export const useGetAllRoles = () => {
  const [lstRoles, setLstRoles] = useState([]);
  useEffect(() => {
    async function getAllRoles() {
      let listRole = await ServiceGetRoles();
      setLstRoles(listRole);
    }
    getAllRoles();
  }, []);
  return {lstRoles, setLstRoles}
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
export const useGetAllAreas = () => {
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    async function getAllAreas() {
      let lstAreas = await ServiceGetAreasInSelect();
      setAreas(lstAreas);
    }
    getAllAreas();
  }, []);
  return {areas}
}
export const useGetCategoryTTOReportMensual = () => {
  const [categoryTTOReportMen, setCategoryTTOReportMen] = useState([]);
  useEffect(() => {
    async function getCategoryTTOReportMensual () {
      let listCategory = await ServiceGetReportMensualCategoryTTO();
      setCategoryTTOReportMen(listCategory)
    }
    getCategoryTTOReportMensual();
  }, []);
  return {categoryTTOReportMen}
}
export const useGetAllOptions = (employeedId) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function getAllOptions() {
      let listOptions = await ServiceGetOptions(employeedId);
      listOptions.map(m => {
        m.component = GetTypeComponent(m.component);
        m.icon = GetIconBasedOnComponent(m.icon);
        m.items?.map(i => {
          i.component = GetTypeComponent(i.component);
        });
      })
      setOptions(listOptions);
    }
    getAllOptions();
  }, [employeedId]);
  return {options, setOptions}
}
export const useGetRoutes = (employeedId) => {
  const [routes, setRoutes] = useState([]);
  useEffect(() => {
    async function getAllRoutes() {
      let listRoutes = await ServiceGetRoutes(employeedId);
      listRoutes.map(r => {
        r.element = GetComponentBasedOnRoute(r.element)
      })
      setRoutes(listRoutes);
    }
    getAllRoutes();
  }, [employeedId]);
  return {routes, setRoutes}
}