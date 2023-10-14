import { useEffect, useState } from "react";
import { ServiceGetAllMovementsSaleBuyOut } from "src/service/movements/service.movements";

export const useGetAllMovementsSaleBuyOut = () => {
  const [saleBuyOuts, setSaleBuyOuts] = useState([]);
  useEffect(() => {
    async function getAllMovementSaleBuyOut() {
      let lstSaleBuyOut = await ServiceGetAllMovementsSaleBuyOut();
      setSaleBuyOuts(lstSaleBuyOut);
    }
    getAllMovementSaleBuyOut();
  }, []);
  return {saleBuyOuts}
}