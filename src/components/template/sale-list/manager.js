import React, { useState } from "react";
import { Title } from "src/components/atoms";
import { useGetAllMovementsSaleBuyOut } from "src/hooks/movements/movements-hook";
import List from "./list";
import Filter from "src/components/organism/filter";
import { ButtonFormControl, InputFormControl, SelectedFormControl } from "src/components/molecules";
import { useGetInSelectVoucherDocument } from "src/hooks/common/common-hook";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';

export default function Manager(props) {
  const { vouchers } = useGetInSelectVoucherDocument(props);
  const { saleBuyOuts } = useGetAllMovementsSaleBuyOut(props);
  const [result, setResult] = useState([]);
  const [selectedValue, setSelectedValue] = React.useState('v');

  const handleSearchForSurNames = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = saleBuyOuts.filter((item) => {
      if (item.personEmit.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeFilterTipDoc = (e) => {
    let searchVal = e?.value;
    const filterBySearch = saleBuyOuts.filter((item) => {
      if (item.voucherDocumentId === (searchVal)) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleChangeFilSerie = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = saleBuyOuts.filter((item) => {
      if (item.serie.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  const handleChangeFilNumber = (e) => {
    let searchVal = e.target.value;
    const filterBySearch = saleBuyOuts.filter((item) => {
      if (item.number.toLowerCase().includes(searchVal.toLowerCase())) {
        return item;
      }
      return null;
    })
    setResult(filterBySearch);
  }
  return (
    <div className="row">
      <div className="col-md-12">
        <Title value={`VENTAS GENERALES`} type={'h1'} />
      </div>
      <div className="row">
        <div className="col-md-12">
          <Box sx={{ display: 'flex', gap: 2, marginTop: '0.5em', marginBottom: '0.5em' }}>
            <Radio
              checked={selectedValue === 'v'}
              onChange={handleChange}
              value="v"
              name="radio-buttons"
              label="VENTA"
            />
            {/* <Radio
              checked={selectedValue === 'c'}
              onChange={handleChange}
              value="c"
              name="radio-buttons"
              label="COMPRA"
            /> */}
          </Box>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-4">
          <Filter
            label="Buscar por nombre o apellido"
            handleSearchForSurNames={handleSearchForSurNames}
          />
        </div>
        <SelectedFormControl
          className="col-md-2 mt-1"
          placeHolder="Tipo de documento"
          titleLabel="Tipo de documento"
          options={vouchers}
          handleChange={handleChangeFilterTipDoc}
        />

        <InputFormControl
          type="text"
          className="col-md-2 mt-1"
          isLabel
          label="Serie"
          upperCase
          onChange={handleChangeFilSerie}
          maxLength={6}
        />
        <InputFormControl
          type="text"
          className="col-md-2 mt-1"
          isLabel
          label="Número"
          upperCase
          onChange={handleChangeFilNumber}
          maxLength={8}
        />
        <div className="col-md-2 mt-4">
          <ButtonFormControl
            title="Buscar"
            color='btn btn-primary'
            top="mt-2"
            type={9}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="row">
          <List
            rows={result.length > 0 ? result : saleBuyOuts}
          />
        </div>
      </div>
    </div>
  )
}