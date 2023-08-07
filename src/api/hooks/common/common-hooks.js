
import { useEffect, useState } from "react";
import { ServiceGetAllPayMethods } from "src/service/common/service.common";

export const useGetAllPayMethods = () => {
  const [payMethods, setPayMethods] = useState([]);
  useEffect(() => {
    async function getAllPayMethods() {
      let listPayMethods = await ServiceGetAllPayMethods();
      setPayMethods(listPayMethods);
    }
    getAllPayMethods();
  }, []);
  return {payMethods, setPsetPayMethodsayments}
}