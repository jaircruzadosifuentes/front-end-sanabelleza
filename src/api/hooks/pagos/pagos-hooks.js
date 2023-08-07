import { useEffect, useState } from "react";
import { ServiceGetPayments } from "src/service/payment/service.payment";

export const useGetAllPayments = () => {
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    async function getAllPayments() {
      let listPaymentService = await ServiceGetPayments();
      setPayments(listPaymentService);
    }
    getAllPayments();
  }, []);
  return {payments, setPayments}
}