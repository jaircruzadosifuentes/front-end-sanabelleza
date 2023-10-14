import React, { useState } from "react";
import EnvironmentSystem from "./environment-system";
import { useGetAllConfigs, useGetAllOptionsGeneral, useGetAllOptionsItemGeneral } from "src/hooks/common/common-hook";
import EnvironmentEmployeed from "./environment-employeed";
import EnvironmentHead from "./environment-head";
import EnvironmentAddRemove from "./environment-add";
import { ServiceAddOptionEmployeed, ServiceGetOptionsByCodeEmployeed, ServiceGetOptionsItemsByCodeEmployeed, ServicePutAddOptionFather, ServicePutConfig, ServicePutRemoveAddOptionEmployeed } from "src/service/common/service.common";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnvironmentGeneral from "./environment-general";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function Manager(props) {
  const { options } = useGetAllOptionsGeneral(props);
  const { configs, configsList } = useGetAllConfigs(props);
  const { optionsItem } = useGetAllOptionsItemGeneral(props);
  const [employeed, setEmployeed] = useState('');
  const [optionsPadre, setOptionsPadre] = useState([]);
  const [optionsHijo, setOptionsHijo] = useState([]);

  const [optionPadreElimina, setOptionPadreElimina] = useState([]);
  const [optionHijoElimina, setOptionHijoElimina] = useState([]);

  const [optionPadreAgrega, setOptionPadreAgrega] = useState([]);
  const [optionHijoAgrega, setOptionHijoAgrega] = useState([]);

  const [value, setValue] = React.useState(0);
  const [valueManager, setValueManager] = React.useState(0);
  //hooks para modificar variables
  const [title, setTitle] = useState('');
  const [ruc, setRuc] = useState('');
  const [address, setAddress] = useState('');
  const [intPermi, setIntPermi] = useState(0);
  const [tiemCitIni, setTiemCitIni] = useState(0);
  const [tiemCitaPr, setTiemCitPr] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const handleChangeManager = (_, newValue) => {
    setValueManager(newValue);
  };

  const handleAddItemListEmployeed = (e, hijo, padre) => {
    if (!optionPadreAgrega.includes(padre)) {
      setOptionPadreAgrega(optionPadreAgrega.concat(padre))
    }
    if (!optionHijoAgrega.includes(hijo)) {
      setOptionHijoAgrega(optionHijoAgrega.concat(hijo))
    }
    setValue(1);
  }
  const handleChangeCodeEmployeed = (e) => {
    setEmployeed(e.target.value);
  }
  const handleRemoveItemListEmployeed = (e, hijo, padre) => {
    if (!optionPadreElimina.includes(padre)) {
      setOptionPadreElimina(optionPadreElimina.concat(padre))
    }
    if (!optionHijoElimina.includes(hijo)) {
      setOptionHijoElimina(optionHijoElimina.concat(hijo))
    }
    setValue(0);
  }
  const handleSearchItemsForCodeEmployeed = async (e) => {
    if (!employeed) {
      return;
    }
    let lstOptionsPadre = await ServiceGetOptionsByCodeEmployeed(employeed.toUpperCase());
    setOptionsPadre(lstOptionsPadre)
    let lstOptionsItem = await ServiceGetOptionsItemsByCodeEmployeed(employeed.toUpperCase());
    setOptionsHijo(lstOptionsItem)
  }
  const handleKeyUpCodeEmployeed = async (e) => {
    if (e.keyCode === 13) {
      await handleSearchItemsForCodeEmployeed()
    }
  }
  const checkIfThereIsAParentNode = () => {
    let result = false;
    optionPadreAgrega.map(padre => {
      optionsPadre.map(op => {
        result = padre.name === op.name
      })
    });
    return result;
  }
  const handleRemoveAddItem = async () => {
    optionHijoElimina.map(async hijo => {
      await ServicePutRemoveAddOptionEmployeed(hijo.optionItemId);
    });
    optionHijoAgrega.map(async hijo => {
      let optionId = devolverOptionPapaId(hijo.option.optionId);
      await ServiceAddOptionEmployeed(hijo.optionItemId, optionId, employeed.toUpperCase());
    });
    return 1;
  }
  const devolverOptionPapaId = (hijoId) => {
    let optionPapaId = 0
    optionPadreAgrega.map(p => {
      if (parseInt(p.optionId) === parseInt(hijoId)) {
        optionPapaId = p.optionId;
      }
    });
    return optionPapaId
  }
  const handleGuardarItems = async () => {

    if(!employeed || employeed === '') {
      return;
    }
    if(optionHijoAgrega.length === 0 && optionHijoElimina.length === 0) {
      return;
    }
    Swal.fire({
      title: `¿Desea actualizar las opciones del trabajador ${employeed}`,
      text: `Usted está actualizando las opciones`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, actualizar`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        //Primero agregamos papás si no existen en las opciones del trabajador
        if (!checkIfThereIsAParentNode()) {
          optionPadreAgrega.map(async padre => {
            await ServicePutAddOptionFather(employeed.toUpperCase(), padre.optionId)
          })
        }
        let update = await handleRemoveAddItem();
        if (update === 1) {
          Swal.fire(
            `Actualización exitosa`,
            `Las opciones del trabajador ${employeed}, han sido actualizadas con éxito.`,
            'success'
          );
          setTimeout(async () => {
            await handleSearchItemsForCodeEmployeed();
            setOptionPadreElimina([]);
            setOptionHijoElimina([]);
            setOptionPadreAgrega([]);
            setOptionHijoAgrega([]);
          }, 3000);
        }
      }
    });
  }
  const handleRemoveItemListEmployeedAdd = (e, optionHijo, optionPadre) => {
    if (value === 0) {
      setOptionHijoElimina((optionHijoElimina) =>
        optionHijoElimina.filter((option) => parseInt(option.optionItemId) !== parseInt(optionHijo.optionItemId))
      );
      if (optionHijoElimina.length === 1) {
        setOptionPadreElimina(optionPadreElimina.filter(padre => parseInt(padre.optionId) !== parseInt(optionPadre.optionId)))
      }
    } else {
      setOptionHijoAgrega((optionHijoAgrega) =>
        optionHijoAgrega.filter((option) => parseInt(option.optionItemId) !== parseInt(optionHijo.optionItemId))
      );
      if (optionHijoAgrega.length === 1) {
        setOptionPadreAgrega(optionPadreAgrega.filter(padre => parseInt(padre.optionId) !== parseInt(optionPadre.optionId)))
      }
    }
  }
  //Registro de variables generales
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  }
  const handleChangeRuc = (e) => {
    setRuc(e.target.value);
  }
  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  }
  const handleChangeCitPro = (e) => {
    setTiemCitPr(parseInt(e.target.value));
  }
  const handleChangeCitaIni = (e) => {
    setTiemCitIni(parseInt(e.target.value));
  }
  const handleChangeIntentPermi = (e) => {
    setIntPermi(parseInt(e.target.value));
  }
  const handleChangeUpdateEnvironment = async (e) => {
    let result = true;
    getListUpdateConfig().map(async config => {
      let update = await ServicePutConfig(config);
      result = update.ok
    });
    if(result) {
      Swal.fire(
        `Actualización exitosa`,
        `Las variables del sistema han sido actualizadas.`,
        'success'
      );
      setTimeout(() => {
        window.location.href = '/mantenimiento/var/sistema';
      }, 2000);
      return;
    }
  }
  const getListUpdateConfig = () => {
    let objDataConfig = {};
    let listConfigUpdate = [];
    configsList.map(c => {
      switch (c.name) {
        case 'title':
          objDataConfig = {
            value: title === '' ? configs.title : title,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig)
          break;
        case 'ruc':
          objDataConfig = {
            value: ruc === '' ? configs.ruc : ruc,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig);
          break;
        case 'address':
          objDataConfig = {
            value: address === '' ? configs.address : address,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig);
          break;
        case 'intentos_permitidos':
          objDataConfig = {
            value: intPermi === 0 || !intPermi ? configs.intentos_permitidos : intPermi,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig);
          break;
        case 'tiempo_cita_inicial':
          objDataConfig = {
            value: tiemCitIni === 0 || !tiemCitIni ? configs.tiempo_cita_inicial : tiemCitIni,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig);
          break;
        case 'tiempo_cita_programada':
          objDataConfig = {
            value: tiemCitaPr === 0 || !tiemCitaPr ? configs.tiempo_cita_programada : tiemCitaPr,
            name: c.name
          }
          listConfigUpdate.push(objDataConfig);
          break;
        default:
          break;
      }
    });
    return listConfigUpdate;
  }

  return (
    <div className="container-fluid">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueManager} onChange={handleChangeManager} aria-label="basic tabs example">
            <Tab label="Configuraciones generales del sistema" {...a11yProps(0)} />
            <Tab label="MANTENEDOR DE OPCIONES GENERALES DEL SISTEMA" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={valueManager} index={0}>
          <EnvironmentGeneral
            config={configs}
            handleChangeTitle={handleChangeTitle}
            handleChangeRuc={handleChangeRuc}
            handleChangeAddress={handleChangeAddress}
            handleChangeCitPro={handleChangeCitPro}
            handleChangeCitaIni={handleChangeCitaIni}
            handleChangeIntentPermi={handleChangeIntentPermi}
            handleChangeUpdateEnvironment={handleChangeUpdateEnvironment}
          />
        </CustomTabPanel>
        <CustomTabPanel value={valueManager} index={1}>
          <EnvironmentHead
            employed={employeed}
            handleChangeCodeEmployeed={handleChangeCodeEmployeed}
            handleSearchItemsForCodeEmployeed={handleSearchItemsForCodeEmployeed}
            handleKeyUpCodeEmployeed={handleKeyUpCodeEmployeed}
          />
          <div className="row">
            <div className="col-md-4">
              <EnvironmentSystem
                options={options}
                optionsItem={optionsItem}
                handleAddItemListEmployeed={handleAddItemListEmployeed}
                employeed={employeed}
              />
            </div>
            <div className="col-md-4">
              <EnvironmentAddRemove
                employeed={employeed}
                options={optionPadreElimina}
                optionsItem={optionHijoElimina}
                optionsAdd={optionPadreAgrega}
                optionsItemAdd={optionHijoAgrega}
                handleGuardarItems={handleGuardarItems}
                value={value}
                handleChange={handleChange}
                handleRemoveItemListEmployeed={handleRemoveItemListEmployeedAdd}
              />
            </div>
            <div className="col-md-4">
              {
                optionsPadre.length > 0 || optionsHijo.length ?
                  <EnvironmentEmployeed
                    options={optionsPadre}
                    optionsItem={optionsHijo}
                    handleRemoveItemListEmployeed={handleRemoveItemListEmployeed}
                    employeed={employeed}
                  /> :
                  <span>No hay opciones para mostrar</span>
              }
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>

        </CustomTabPanel>
      </Box>

    </div>
  )
}