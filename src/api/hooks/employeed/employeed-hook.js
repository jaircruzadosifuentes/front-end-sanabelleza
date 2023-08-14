const { useEffect, useState } = require("react");
const { ServiceGetAllEmployeed, ServiceGetAllEmployeedPendingAproval, ServiceGetByUserNameEmployeed } = require("src/service/employeed/service.employeed");

export const useGetAllEmployeed = () => {
  const [employeeds, setEmployeeds] = useState([]);
  useEffect(() => {
    async function getAllEmployeed() {
      let listEmployeed = await ServiceGetAllEmployeed();
      setEmployeeds(listEmployeed)
    }
    getAllEmployeed();
  }, []);
  return {employeeds};
}
 
export const useGetAllEmployeedPendingAproval = () => {
  const [employeedsPendingAproval, setEmployeedsPendingAproval] = useState([]);
  useEffect(() => {
    async function getAllEmployeedPendingAproval() {
      let listEmployeed = await ServiceGetAllEmployeedPendingAproval();
      setEmployeedsPendingAproval(listEmployeed)
    }
    getAllEmployeedPendingAproval();
  }, []);
  return {employeedsPendingAproval, setEmployeedsPendingAproval};
}
export const useGetByUserNameEmployeed = (userName) => {
  const [employeedDetail, setEmployeedDetail] = useState({});
  useEffect(() =>{
    async function getByUserNameEmployeed () {
      console.log(userName);
      let employeedDetail = await ServiceGetByUserNameEmployeed(userName);
      setEmployeedDetail(employeedDetail)
    }
    getByUserNameEmployeed();
  }, [userName]);
  return {employeedDetail}
}