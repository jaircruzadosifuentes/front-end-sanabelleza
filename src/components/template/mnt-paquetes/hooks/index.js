
import { useEffect, useState } from 'react';
import { ServiceGetAllPacketsOrUnitSessions } from '../services/index';
import { ServiceGetAllFrecuency } from 'src/service/common/service.common';
 
export const useGetAllPacketsOrUnitSessions = () => {
  const [packetsOrUnitSession, setPacketsOrUnitSession] = useState([]);
  useEffect(() => {
    async function GetAllPacketsOrUnitSessions() {
      let listPackets = await ServiceGetAllPacketsOrUnitSessions();
      setPacketsOrUnitSession(listPackets);
    }
    GetAllPacketsOrUnitSessions();
  }, []);
  return { packetsOrUnitSession, setPacketsOrUnitSession }
}
export const useGetAllFrecuencies = () => {
  const [frecuencies, setFrecuencies] = useState([]);
  useEffect(() => {
    async function GetAllFrecuencies() {
      let listFrecuencies = await ServiceGetAllFrecuency();
      setFrecuencies(listFrecuencies);
    }
    GetAllFrecuencies();
  }, []);
  return { frecuencies, setFrecuencies }
}