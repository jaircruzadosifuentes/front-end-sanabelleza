
import { useEffect, useState } from 'react';
import { ServiceGetAllPacketsOrUnitSessions } from '../services/index';
 
export const useGetAllPacketsOrUnitSessions = () => {
  const [packetsOrUnitSession, setPacketsOrUnitSession] = useState([]);
  useEffect(() => {
    async function GetAllPacketsOrUnitSessions() {
      let listPackets = await ServiceGetAllPacketsOrUnitSessions();
      setPacketsOrUnitSession(listPackets);
    }
    GetAllPacketsOrUnitSessions();
  }, []);
  return { packetsOrUnitSession }
}