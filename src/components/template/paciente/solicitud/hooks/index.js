
import { useEffect, useState } from 'react';
import { ServiceGetAllDocuments, ServiceGetAllEmployeed, ServiceGetDisponibiltyEmployeed } from '../services/index';

export const useGetAllDocuments = () => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    async function getAllDocuments() {
      let documents = await ServiceGetAllDocuments();
      setDocuments(documents);
    }
    getAllDocuments();
  }, []);
  return { documents }
}
export const useGetAllEmployeed = () => {
  const [employeeds, setEmployeeds] = useState([]);
  useEffect(() => {
    async function getAllEmployeeds() {
      let employeed = await ServiceGetAllEmployeed();
      setEmployeeds(employeed);
    }
    getAllEmployeeds();
  }, []);
  return {employeeds}
}
export const useGetDisponibilityEmployeed = (date, employeedId) => {
  const [employeedsDisponibilty, setEmployeedsDisponibility] = useState([]);
  useEffect(() => {
    async function getAllEmployeeds() {
      let employeed = await ServiceGetDisponibiltyEmployeed(date, employeedId);
      setEmployeedsDisponibility(employeed);
    }
    getAllEmployeeds();
  }, [date, employeedId]);
  return {employeedsDisponibilty}
}