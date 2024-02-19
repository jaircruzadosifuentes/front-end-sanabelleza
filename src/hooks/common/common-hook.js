import { useEffect, useState } from "react"
import { ServiceGetAllConfigs, ServiceGetCategoriesInSelect, ServiceGetInSelectVoucherDocument, ServiceGetOptionsByCodeEmployeed, ServiceGetOptionsGeneral, ServiceGetOptionsItemGeneral, ServiceGetOptionsItemsByCodeEmployeed, ServiceGetPathologies, ServiceGetSubCategoriesInSelect } from "src/service/common/service.common"

export const useGetAllOptionsGeneral = () => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    async function getAllOptionsGeneral() {
      let lstOptions = await ServiceGetOptionsGeneral();
      setOptions(lstOptions);
    }
    getAllOptionsGeneral();
  }, []);
  return {options}
}
export const useGetInSelectVoucherDocument = () => {
  const [vouchers, setVouchers] = useState([]);
  useEffect(() => {
    async function getInSelectVoucherDocument() {
      let lstVouchers = await ServiceGetInSelectVoucherDocument();
      setVouchers(lstVouchers);
    }
    getInSelectVoucherDocument();
  }, []);
  return {vouchers}
}
export const useGetAllOptionsItemGeneral = () => {
  const [optionsItem, setOptions] = useState([]);
  useEffect(() => {
    async function getAllOptionsItemGeneral() {
      let lstOptions = await ServiceGetOptionsItemGeneral();
      setOptions(lstOptions);
    }
    getAllOptionsItemGeneral();
  }, []);
  return {optionsItem}
}
export const useGetByCodeEmployeedOptions = (code) => {
  const [optionsEmployeed, setOptionsEmployeed] = useState([]);
  useEffect(() => {
    async function getByCodeEmployeedOptions() {
      let lstOptions = await ServiceGetOptionsByCodeEmployeed(code);
      setOptionsEmployeed(lstOptions);
    }
    getByCodeEmployeedOptions();
  }, [code]);
  return {optionsEmployeed}
}
export const useGetByCodeEmployeedOptionsItem = (code) => {
  const [optionsItemEmployeed, setOptions] = useState([]);
  useEffect(() => {
    async function getByCodeEmployeedOptionsItem() {
      let lstOptions = await ServiceGetOptionsItemsByCodeEmployeed(code);
      setOptions(lstOptions);
    }
    getByCodeEmployeedOptionsItem();
  }, [code]);
  return {optionsItemEmployeed}
}
export const useGetAllConfigs = () => {
  const [configs, setConfigs] = useState({});
  const [configsList, setConfigsList] = useState([]);
  useEffect(() => {
    async function getAllConfigs() {
      let objConfig = {};
      let lstConfigs = await ServiceGetAllConfigs();
      setConfigsList(lstConfigs)
      lstConfigs.map(m => {
        objConfig[m.name] = m.value;
        return m;
      });
      setConfigs(objConfig)
    }
    getAllConfigs();
  }, []);
  return {configs, configsList}
}
export const useGetAllCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getAllCategory() {
      let lstCategory = await ServiceGetCategoriesInSelect();
      setCategories(lstCategory);
    }
    getAllCategory();
  }, []);
  return {categories}
}
export const useGetSubCategoryByCategoryId = (categoryId) => {
  const [subCategories, setSubCategories] = useState([]);
  useEffect(() => {
    async function getSubCategory() {
      let lstSubCategory = await ServiceGetSubCategoriesInSelect(categoryId);
      setSubCategories(lstSubCategory);
    }
    getSubCategory();
  }, [categoryId]);
  return {subCategories}
}
export const useGetAllPathologiesInCombo = () => {
  const [pathologiesInCombo, setPathologiesInCombo] = useState([]);
  useEffect(() => {
    async function getAllPathologies() {
      let lstPathologies = await ServiceGetPathologies();
      lstPathologies.map(pa => {
        pa.value = pa.pathologiesId;
        pa.label = pa.description
      })
      setPathologiesInCombo(lstPathologies);
    }
    getAllPathologies();
  }, []);
  return {pathologiesInCombo}
}