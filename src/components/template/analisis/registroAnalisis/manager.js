import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DetailPatient from "./detailPatient";
import { calculateIMC, getTitle, validateAngle } from "src/utils/utils";
import { Title } from "src/components/atoms";
import Evaluation from "./evaluation";
import DiagnosisExplorationPhysical from "./diagnosis-exploration-physical";
import FooterButton from "./footer-button";
import RegisterPackets from "./registerPackets";
import { useGetAllPacketsOrUnitSessions } from "../../mnt-paquetes/hooks";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { COLOR_BLUE_MAB, COLOR_BUTTON_MAB, COLOR_GREEN, COLOR_GRIS, COLOR_YELLOW } from "src/config/config";
import { ServicePostRegisterFirstClinicalAnalysis } from "src/service/solicitudAttention/service.solicitudAttention";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import MuscleEvaluationMotionTesting from "./muscle-evaluation-rang-motion";
import GaitAnalysisComponent from "./gait-analysis-componente";
import PostureEvaluationComponent from "./posture-evaluation-component";
import TreatmentPlanComponent from "./treatment-plan-component";
import { useGetAllPathologiesInCombo } from "src/hooks/common/common-hook";

const steps = ['Datos generales', 'Exploración física y antecedentes patológicos', 'Evaluación muscular', 'Prueba de arcos de movilidad', 'Análisis de la marcha', 'Plan de tratamiento'];
export default function Manager(props) {
  const location = useLocation();
  let navigate = useNavigate();
  const { packetsOrUnitSession } = useGetAllPacketsOrUnitSessions(props);
  const { pathologiesInCombo } = useGetAllPathologiesInCombo(props);

  const [objPatient, setObjPatient] = useState({});
  const [openSwitchTieneOper, setOpenSwitchTieneOper] = useState(false);
  const [openSwitchTieneEnf, setOpenSwitchTieneEnf] = useState(false);
  const [openSwitchTieneAlergiaMedic, setOpenSwitchTieneAlergiaMedic] = useState(false);
  const [idSelectPacket, setIdSelectPacket] = useState(0);
  const [colorUmbral, setColorUmbral] = useState(COLOR_GRIS)
  const [idFrecuencia, setIdFrecuencia] = useState(0);
  //REGISTRO DEL ANÁLISIS CLÍNICO
  const [weight, setWeight] = useState(0.00);
  const [descriptionEnf, setDescriptionEnf] = useState('');
  const [descriptionOperation, setDescriptionOperation] = useState('');
  const [descExploraFisica, setDescExploraFisica] = useState('');
  const [numeroUmbralDolor, setNumeroUmbralDolor] = useState(0);
  const [descriptionDiag, setDescriptionDiag] = useState('');
  const [descriptionMedic, setDescriptionMedic] = useState('');
  const [informationAdic, setInformationAdic] = useState('');

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  //Step 2
  const [weightStep2, setWeightStep2] = useState(0.00);
  const [statureStep2, setStatureStep2] = useState(0.00);
  const [imcStep2, setImcStep2] = useState(0.00);
  const [prevTreatmentStep2, setPrevTreatmentStep2] = useState('');
  const [reasonConsultStep2, setReasonConsultStep2] = useState('');
  const [haveDiabe, setHaveDiave] = useState('');
  const [haveAlergia, setHaveAlergia] = useState('');
  const [haveHta, setHaveHta] = useState('');
  const [haveCancer, setHaveCancer] = useState('');
  const [haveTransusion, setHaveTransfusion] = useState('');
  const [haveEnfReu, setHaveEnfReu] = useState('');
  const [haveEncames, setHaveEncames] = useState('');
  const [haveAccidente, setHaveAccidente] = useState('');
  const [haveCardio, setHaveCardio] = useState('');
  const [haveCirugia, setHaveCirugia] = useState('');
  const [haveFract, setHaveFract] = useState('');
  const [haveContractMusc, setHaveContractMusc] = useState('');
  const [signVitalStep2, setSignVitalStep2] = useState('');
  const [tabaquismoStep2, setTabaquismoStep2] = useState('');
  const [alcohoStep2, setAlcohoStep2] = useState('');
  const [drogasStep2, setDrogasStep2] = useState('');
  const [actFisicStep2, setActFisicStep2] = useState('');
  const [automedicStep2, setAutomedicStep2] = useState('');
  const [pasatiempoStep2, setPasatiempoStep2] = useState('');
  const [reflejosStep2, setReflejosStep2] = useState('');
  const [sensibiStep2, setSensibiStep2] = useState('');
  const [lengOrienStep2, setLengOrientStep2] = useState('');
  const [otrosStep2, setOtrosStep2] = useState('');
  //Step3
  const [initialValorationStep3, setInitialValorationStep3] = useState('');
  const [valorMSupEv1IzqEvaluMusc, setValorMSupEv1IzqEvaluMusc] = useState(0);
  const [valorMSupEv1DerEvaluMusc, setValorMSupEv1DerEvaluMusc] = useState(0);
  const [valorMSupEv2IzqEvaluMusc, setValorMSupEv2IzqEvaluMusc] = useState(0);
  const [valorMSupEv2DerEvaluMusc, setValorMSupEv2DerEvaluMusc] = useState(0);
  const [valorMInfEv1IzqEvaluMusc, setValorMInfEv1IzqEvaluMusc] = useState(0);
  const [valorMInfEv1DerEvaluMusc, setValorMInfEv1DerEvaluMusc] = useState(0);
  const [valorMInfEv2IzqEvaluMusc, setValorMInfEv2IzqEvaluMusc] = useState(0);
  const [valorMInfEv2DerEvaluMusc, setValorMInfEv2DerEvaluMusc] = useState(0);
  // handleOnChangeTroncoEv1IzqEvaluMusc
  const [valorTroncoEv1IzqEvaluMusc, setValorTroncoEv1IzqEvaluMusc] = useState(0);
  const [valorTroncoEv1DerEvaluMusc, setValorTroncoEv1DerEvaluMusc] = useState(0);
  const [valorTroncoEv2IzqEvaluMusc, setValorTroncoEv2IzqEvaluMusc] = useState(0);
  const [valorTroncoEv2DerEvaluMusc, setValorTroncoEv2DerEvaluMusc] = useState(0);
  const [valorCuelloEv1IzqEvaluMusc, setValorCuelloEv1IzqEvaluMusc] = useState(0);
  const [valorCuelloEv1DerEvaluMusc, setValorCuelloEv1DerEvaluMusc] = useState(0);
  const [valorCuelloEv2IzqEvaluMusc, setValorCuelloEv2IzqEvaluMusc] = useState(0);
  const [valorCuelloEv2DerEvaluMusc, setValorCuelloEv2DerEvaluMusc] = useState(0);
  const [valorMSupEv1IzqEvaluGonio, setValorMSupEv1IzqEvaluGonio] = useState(0);
  const [valorMSupEv1DerEvaluGonio, setValorMSupEv1DerEvaluGonio] = useState(0);
  const [valorMSupEv2IzqEvaluGonio, setValorMSupEv2IzqEvaluGonio] = useState(0);
  const [valorMSupEv2DerEvaluGonio, setValorMSupEv2DerEvaluGonio] = useState(0);
  const [valorMInfEv1IzqEvaluGonio, setValorMInfEv1IzqEvaluGonio] = useState(0);
  const [valorMInfEv1DerEvaluGonio, setValorMInfEv1DerEvaluGonio] = useState(0);
  const [valorMInfEv2IzqEvaluGonio, setValorMInfEv2IzqEvaluGonio] = useState(0);
  const [valorMInfEv2DerEvaluGonio, setValorMInfEv2DerEvaluGonio] = useState(0);
  const [valorTroncoEv1IzqEvaluGonio, setValorTroncoEv1IzqEvaluGonio] = useState(0);
  const [valorTroncoEv1DerEvaluGonio, setValorTroncoEv1DerEvaluGonio] = useState(0);
  const [valorTroncoEv2IzqEvaluGonio, setValorTroncoEv2IzqEvaluGonio] = useState(0);
  const [valorTroncoEv2DerEvaluGonio, setValorTroncoEv2DerEvaluGonio] = useState(0);
  const [valorCuelloEv1IzqEvaluGonio, setValorCuelloEv1IzqEvaluGonio] = useState(0);
  const [valorCuelloEv1DerEvaluGonio, setValorCuelloEv1DerEvaluGonio] = useState(0);
  const [valorCuelloEv2IzqEvaluGonio, setValorCuelloEv2IzqEvaluGonio] = useState(0);
  const [valorCuelloEv2DerEvaluGonio, setValorCuelloEv2DerEvaluGonio] = useState(0);
  //STEP4
  const [valorHombroPruArcFlex1, setValorHombroPruArcFlex1] = useState('');
  const [valorHombroPruArcExten1, setValorHombroPruArcExten1] = useState('');
  const [valorHombroPruArcABD1, setValorHombroPruArcABD1] = useState('');
  const [valorHombroPruArcADD1, setValorHombroPruArcADD1] = useState('');
  const [valorHombroPruArcFlex2, setValorHombroPruArcFlex2] = useState('');
  const [valorHombroPruArcExten2, setValorHombroPruArcExten2] = useState('');
  const [valorHombroPruArcABD2, setValorHombroPruArcABD2] = useState('');
  const [valorHombroPruArcADD2, setValorHombroPruArcADD2] = useState('');
  const [valorHombroPruArcFlex3, setValorHombroPruArcFlex3] = useState('');
  const [valorHombroPruArcExten3, setValorHombroPruArcExten3] = useState('');
  
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    // Swal.fire({
    //   title: '¿Desea guardar el registro del análisis clínico?',
    //   text: `Usted está guardando el registro clínico del paciente ${objPatient.person.surnames}/${objPatient.person.names}`,
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, guardar',
    //   cancelButtonText: 'Cancelar'
    // }).then(async (result) => {
    //   if (result.isConfirmed) {
    //     navigate("/primer-analisis");
    //   }
    // });

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  //FIN DEL REGISTRO DEL ANÁLISIS CLÍNICO
  useEffect(() => {
    setObjPatient(location.state.row)
  }, [location.state.row]);
  getTitle('Primer Análisis - ' + objPatient.person?.surnames);
  //Funciones
  const handleBack = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }
  const handleBackArrow = (e) => {
    navigate('/primer-analisis');
  }

  // const handleChangeTieneEnfermedad = (e) => {
  //   setOpenSwitchTieneEnf(!openSwitchTieneEnf);
  // }
  // const handleChangeOper = (e) => {
  //   setOpenSwitchTieneOper(!openSwitchTieneOper);
  // }
  // const handleChangeTieneAlergiaMedic = (e) => {
  //   setOpenSwitchTieneAlergiaMedic(!openSwitchTieneAlergiaMedic)
  // }
  // const handleClickItemPackets = (e, id) => {
  //   setIdSelectPacket(id);
  // }
  // const handleClickItemPeriodo = (e, id) => {
  //   setIdFrecuencia(id);
  // }
  // const handleCancelRegister = (e) => {
  //   Swal.fire({
  //     title: '¿Desea cancelar el registro del análisis clínico?',
  //     text: `Usted está cancelando el registro clínico del paciente ${objPatient.person.surnames}/${objPatient.person.names}`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, cancelar',
  //     cancelButtonText: 'Cancelar'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       navigate("/primer-analisis");
  //     }
  //   });
  // }
  // const handleSaveAnalysis = (e) => {
  //   if (openSwitchTieneEnf && !descriptionEnf) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de ingresar la(s) enfermedad(es) que el paciente tenga.',
  //     })
  //     return;
  //   }
  //   if (openSwitchTieneOper && !descriptionOperation) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de ingresar la(s) operacion(es) que el paciente tenga.',
  //     })
  //     return;
  //   }
  //   if (!descExploraFisica) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de ingresar la descripción de exploración física del paciente.',
  //     })
  //     return;
  //   }
  //   if (parseInt(numeroUmbralDolor) === 0) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de seleccionar el umbral del dolor del paciente.',
  //     })
  //     return;
  //   }
  //   if (openSwitchTieneAlergiaMedic && !descriptionMedic) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de ingresar las medicinas que toma usted.',
  //     })
  //     return;
  //   }
  //   if (parseInt(idSelectPacket) === 0) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de seleccionar el tipo de paquete.',
  //     })
  //     return;
  //   }
  //   if (parseInt(idFrecuencia) === 0) {
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Advertencia',
  //       text: 'Debe de seleccionar el tipo de frecuencia.',
  //     })
  //     return;
  //   }
  //   let data = {
  //     patientId: objPatient.patientId,
  //     clinicalHistory: {
  //       weight: parseFloat(weight),
  //       disease: descriptionEnf,
  //       descriptionOperation: descriptionOperation,
  //       physicalExploration: descExploraFisica,
  //       shadowPain: numeroUmbralDolor,
  //       descriptionDiagnostica: descriptionDiag,
  //       descriptionMedic: descriptionMedic,
  //       informationAdditional: informationAdic,
  //       takeMedicina: openSwitchTieneAlergiaMedic,
  //       hasDisease: openSwitchTieneEnf,
  //       hasOperation: openSwitchTieneOper,
  //       frecuencyId: idFrecuencia,
  //       packetsOrUnitSessions: {
  //         packetsOrUnitSessionsId: idSelectPacket
  //       }
  //     }
  //   }
  //   Swal.fire({
  //     title: '¿Desea guardar el registro del análisis clínico?',
  //     text: `Usted está guardando el registro clínico del paciente ${objPatient.person.surnames}/${objPatient.person.names}`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, guardar',
  //     cancelButtonText: 'Cancelar'
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       let insert = await ServicePostRegisterFirstClinicalAnalysis(data);
  //       if (insert.ok) {
  //         Swal.fire(
  //           'Registro exitoso',
  //           `El registro para el paciente ${objPatient.person.surnames}/${objPatient.person.names}, ha sido registrado de manera exitosa. Indicar al paciente pasar con la Asistente de Fisioterapia, para la programación y cancelación de sus sesiones.`,
  //           'success'
  //         );
  //         setTimeout(() => {
  //           navigate("/primer-analisis");
  //         }, 3000);
  //       }
  //     }
  //   });
  // }
  const handleChangeRangoUmbral = (e) => {
    const umbral = parseInt(e.target.value);

    const colorPorUmbral = {
      '8': COLOR_BUTTON_MAB,
      '9': COLOR_BUTTON_MAB,
      '10': COLOR_BUTTON_MAB,
      '4': COLOR_YELLOW,
      '5': COLOR_YELLOW,
      '6': COLOR_YELLOW,
      '7': COLOR_YELLOW,
      '1': COLOR_GREEN,
      '2': COLOR_GREEN,
      '3': COLOR_GREEN,
      '0': COLOR_GRIS,
    };

    const colorUmbral = colorPorUmbral[umbral] || COLOR_GRIS;

    setColorUmbral(colorUmbral);
    setNumeroUmbralDolor(umbral);
  }
  // //REGISTRO DEL ANÁLISIS CLÍNICO
  // const handleChangeWeight = (e) => {
  //   setWeight(e.target.value);
  // }
  // const handleChangeEnfermedad = (e) => {
  //   setDescriptionEnf(e.target.value);
  // }
  // const handleChangeOperation = (e) => {
  //   setDescriptionOperation(e.target.value);
  // }
  // const handleChangeExploracionFisica = (e) => {
  //   setDescExploraFisica(e.target.value);
  // }
  // const handleChangeDescDiag = (e) => {
  //   setDescriptionDiag(e.target.value);
  // }
  // const handleChangeDescMedic = (e) => {
  //   setDescriptionMedic(e.target.value);
  // }
  // const handleChangeInformationAdi = (e) => {
  //   setInformationAdic(e.target.value);
  // }
  //FIN DEL REGISTRO DEL ANÁLISIS CLÍNICO
  //Fin de Funciones

  /* STEP 2 */
  const handleOnChangeStature = (e) => {
    setStatureStep2(e.target.value);
  }
  const handleOnChangeWeight = (e) => {
    setWeightStep2(e.target.value);
  }
  const handleCalculateImc = (_) => {
    setImcStep2(calculateIMC(weightStep2, statureStep2));
  }
  const handleOnChangePrevTreatments = (e) => {
    setPrevTreatmentStep2(e.target.value);
  }
  const handleOnChangeReasonConsult = (e) => {
    setReasonConsultStep2(e.target.value);
  }
  const handleOnChangeDiabetes = (e) => {
    setHaveDiave(e.target.value);
  }
  const handleOnChangeAlergia = (e) => {
    setHaveAlergia(e.target.value);
  }
  const handleOnChangeHta = (e) => {
    setHaveHta(e.target.value);
  }
  const handleOnChangeCancer = (e) => {
    setHaveCancer(e.target.value);
  }
  const handleOnChangeTransfusiones = (e) => {
    setHaveTransfusion(e.target.value);
  }
  const handleOnChangeEnfReu = (e) => {
    setHaveEnfReu(e.target.value);
  }
  const handleOnChangeEncames = (e) => {
    setHaveEncames(e.target.value);
  }
  const handleOnChangeAccidente = (e) => {
    setHaveAccidente(e.target.value);
  }
  const handleOnChangeCardio = (e) => {
    setHaveCardio(e.target.value);
  }
  const handleOnChangeCirugia = (e) => {
    setHaveCirugia(e.target.value);
  }
  const handleOnChangeFract = (e) => {
    setHaveFract(e.target.value);
  }
  const handleOnChangeContractMusc = (e) => {
    setHaveContractMusc(e.target.value);
  }
  const handleChangeSigVital = (e) => {
    setSignVitalStep2(e.target.value);
  }
  const handleOnChangeTabaq = (e) => {
    setTabaquismoStep2(e.target.value);
  }
  const handleOnChangeAlcoho = (e) => {
    setAlcohoStep2(e.target.value);
  }
  const handleOnChangeDrog = (e) => {
    setDrogasStep2(e.target.value);
  }
  const handleOnChangeActFisic = (e) => {
    setActFisicStep2(e.target.value);
  }
  const handleOnChangeAutomedic = (e) => {
    setAutomedicStep2(e.target.value);
  }
  const handleOnChangePasatiempo = (e) => {
    setPasatiempoStep2(e.target.value);
  }
  const handleChangeReflejos = (e) => {
    setReflejosStep2(e.target.value);
  }
  const handleChangeSensibilidad = (e) => {
    setSensibiStep2(e.target.value);
  }
  const handleChangeLengOrient = (e) => {
    setLengOrientStep2(e.target.value);
  }
  const handleChangeOtros = (e) => {
    setOtrosStep2(e.target.value);
  }
  /* STEP 3*/
  const handleOnChangeInitialValoration = (e) => {
    setInitialValorationStep3(e.target.value);
  }
  const handleOnChangeMSupEv1IzqEvaluMusc = (e) => {
    setValorMSupEv1IzqEvaluMusc(e?.value);
  }
  const handleOnChangeMSupEv1DerEvaluMusc = (e) => {
    setValorMSupEv1DerEvaluMusc(e?.value);
  }
  const handleOnChangeMSupEv2IzqEvaluMusc = (e) => {
    setValorMSupEv2IzqEvaluMusc(e?.value);
  }
  const handleOnChangeMSupEv2DerEvaluMusc = (e) => {
    setValorMSupEv2DerEvaluMusc(e?.value);
  }
  const handleOnChangeMInfEv1IzqEvaluMusc = (e) => {
    setValorMInfEv1IzqEvaluMusc(e?.value);
  }
  const handleOnChangeMInfEv1DerEvaluMusc = (e) => {
    setValorMInfEv1DerEvaluMusc(e?.value);
  }
  const handleOnChangeMInfEv2IzqEvaluMusc = (e) => {
    setValorMInfEv2IzqEvaluMusc(e?.value);
  }
  const handleOnChangeMInfEv2DerEvaluMusc = (e) => {
    setValorMInfEv2DerEvaluMusc(e?.value);
  }
  const handleOnChangeTroncoEv1IzqEvaluMusc = (e) => {
    setValorTroncoEv1IzqEvaluMusc(e?.value);
  }
  const handleOnChangeTroncoEv1DerEvaluMusc = (e) => {
    setValorTroncoEv1DerEvaluMusc(e?.value);
  }
  const handleOnChangeTroncoEv2IzqEvaluMusc = (e) => {
    setValorTroncoEv2IzqEvaluMusc(e?.value);
  }
  const handleOnChangeTroncoEv2DerEvaluMusc = (e) => {
    setValorTroncoEv2DerEvaluMusc(e?.value);
  }
  const handleOnChangeCuelloEv1IzqEvaluMusc = (e) => {
    setValorCuelloEv1IzqEvaluMusc(e?.value);
  }
  const handleOnChangeCuelloEv1DerEvaluMusc = (e) => {
    setValorCuelloEv1DerEvaluMusc(e?.value);
  }
  const handleOnChangeCuelloEv2IzqEvaluMusc = (e) => {
    setValorCuelloEv2IzqEvaluMusc(e?.value);
  }
  const handleOnChangeCuelloEv2DerEvaluMusc = (e) => {
    setValorCuelloEv2DerEvaluMusc(e?.value);
  }
  const handleOnChangeMSupEv1IzqEvaluGonio = (e) => {
    setValorMSupEv1IzqEvaluGonio(e?.value);
  }
  const handleOnChangeMSupEv1DerEvaluGonio = (e) => {
    setValorMSupEv1DerEvaluGonio(e?.value);
  }
  const handleOnChangeMSupEv2IzqEvaluGonio = (e) => {
    setValorMSupEv2IzqEvaluGonio(e?.value);
  }
  const handleOnChangeMSupEv2DerEvaluGonio = (e) => {
    setValorMSupEv2DerEvaluGonio(e?.value);
  }
  const handleOnChangeMInfEv1IzqEvaluGonio = (e) => {
    setValorMInfEv1IzqEvaluGonio(e?.value);
  }
  const handleOnChangeMInfEv1DerEvaluGonio = (e) => {
    setValorMInfEv1DerEvaluGonio(e?.value);
  }
  const handleOnChangeMInfEv2IzqEvaluGonio = (e) => {
    setValorMInfEv2IzqEvaluGonio(e?.value);
  }
  const handleOnChangeMInfEv2DerEvaluGonio = (e) => {
    setValorMInfEv2DerEvaluGonio(e?.value);
  }
  const handleOnChangeTroncoEv1IzqEvaluGonio = (e) => {
    setValorTroncoEv1IzqEvaluGonio(e?.value);
  }
  const handleOnChangeTroncoEv1DerEvaluGonio = (e) => {
    setValorTroncoEv1DerEvaluGonio(e?.value);
  }
  const handleOnChangeTroncoEv2IzqEvaluGonio = (e) => {
    setValorTroncoEv2IzqEvaluGonio(e?.value);
  }
  const handleOnChangeTroncoEv2DerEvaluGonio = (e) => {
    setValorTroncoEv2DerEvaluGonio(e?.value);
  }
  const handleOnChangeCuelloEv1IzqEvaluGonio = (e) => {
    setValorCuelloEv1IzqEvaluGonio(e?.value);
  }
  const handleOnChangeCuelloEv1DerEvaluGonio = (e) => {
    setValorCuelloEv1DerEvaluGonio(e?.value);
  }
  const handleOnChangeCuelloEv2IzqEvaluGonio = (e) => {
    setValorCuelloEv2IzqEvaluGonio(e?.value);
  }
  const handleOnChangeCuelloEv2DerEvaluGonio = (e) => {
    setValorCuelloEv2DerEvaluGonio(e?.value);
  }
  const handleOnChangePruArcHombroFlex1 = (e) => {
    let angle = (e.target.value);
    if(!validateAngle(angle)) {
      document.getElementById("idPruArcHombroFlex1").value = '';
      return;
    }
    setValorHombroPruArcFlex1(angle);
  }
  const handleOnChangePruArcHombroExten1 = (e) => {
    let angle = (e.target.value);
    if(!validateAngle(angle)) {
      document.getElementById("idPruArcHombroExten1").value = '';
      return;
    }
    setValorHombroPruArcExten1(angle);
  }
  const handleOnChangePruArcHombroABD1 = (e) => {
    let angle = (e.target.value);
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroABD1').value = '';
      return;
    }
    setValorHombroPruArcABD1(angle);
  }
  const handleOnChangePruArcHombroADD1 = (e) => {
    let angle = (e.target.value);
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroADD1').value = '';
      return;
    }
    setValorHombroPruArcADD1(angle);
  }
  const handleOnChangePruArcHombroFlex2 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroFlex2').value = '';
      return;
    }
    setValorHombroPruArcFlex2(angle);
  }
  const handleOnChangePruArcHombroExt2 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroExt2').value = '';
      return;
    }
    setValorHombroPruArcExten2(angle);
  }
  const handleOnChangePruArcHombroABD2 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroABD2').value = '';
      return;
    }
    setValorHombroPruArcABD2(angle);
  }
  const handleOnChangePruArcHombroADD2 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroADD2').value = '';
      return;
    }
    setValorHombroPruArcADD2(angle);
  }
  const handleOnChangePruArcHombroFlex3 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroFlex3').value = '';
      return;
    }
    setValorHombroPruArcFlex3(angle);
  }
  const handleOnChangePruArcHombroExten3 = (e) => {
    let angle = e.target.value;
    if(!validateAngle(angle)) {
      document.getElementById('idPruArcHombroExten3').value = '';
      return;
    }
    setValorHombroPruArcExten3(angle);
  }
  return (
    <div className="container-fluid mt-1 mb-1">
      <Title value={'REGISTRO DE ANÁLISIS CLÍNICO'} type={'h1'} arrowBack handleBack={handleBackArrow} />
      <div className="row">
        <div className="col-md-12 mt-4">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => (
                <Step key={label} completed={isStepSkipped(index) ? false : undefined}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  Todos los pasos completados - has terminado.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2 }}>
                  <Button onClick={handleReset}>Resetear</Button>
                </Box>
              </>

            ) : (
              <React.Fragment>
                <RenderStepComponente
                  activeStep={activeStep + 1}
                  objPatient={objPatient}
                  packetsOrUnitSession={packetsOrUnitSession}
                  pathologiesInCombo={pathologiesInCombo}
                  //STEP 2
                  handleOnChangeStature={handleOnChangeStature}
                  handleOnChangeWeight={handleOnChangeWeight}
                  handleCalculateImc={handleCalculateImc}
                  objPhysicalExplo={{
                    imcStep2: imcStep2,
                    weightStep2: weightStep2,
                    statureStep2: statureStep2,
                    prevTreatmentStep2: prevTreatmentStep2,
                    reasonConsultStep2: reasonConsultStep2,
                    haveDiabe: haveDiabe,
                    haveAlergia: haveAlergia,
                    haveHta: haveHta,
                    haveCancer: haveCancer,
                    haveTransusion: haveTransusion,
                    haveEnfReu: haveEnfReu,
                    haveEncames: haveEncames,
                    haveAccidente: haveAccidente,
                    haveCardio: haveCardio,
                    haveCirugia: haveCirugia,
                    haveFract: haveFract,
                    haveContractMusc: haveContractMusc,
                    signVitalStep2: signVitalStep2,
                    tabaquismoStep2: tabaquismoStep2,
                    alcohoStep2: alcohoStep2,
                    drogasStep2: drogasStep2,
                    actFisicStep2: actFisicStep2,
                    automedicStep2: automedicStep2,
                    pasatiempoStep2: pasatiempoStep2,
                    reflejosStep2: reflejosStep2,
                    sensibiStep2: sensibiStep2,
                    lengOrienStep2: lengOrienStep2,
                    otrosStep2: otrosStep2,
                    colorUmbral: colorUmbral,
                    numeroUmbralDolor: numeroUmbralDolor
                  }}
                  handleOnChangePrevTreatments={handleOnChangePrevTreatments}
                  handleOnChangeReasonConsult={handleOnChangeReasonConsult}
                  handleOnChangeDiabetes={handleOnChangeDiabetes}
                  handleOnChangeAlergia={handleOnChangeAlergia}
                  handleOnChangeHta={handleOnChangeHta}
                  handleOnChangeCancer={handleOnChangeCancer}
                  handleOnChangeTransfusiones={handleOnChangeTransfusiones}
                  handleOnChangeEnfReu={handleOnChangeEnfReu}
                  handleOnChangeEncames={handleOnChangeEncames}
                  handleOnChangeAccidente={handleOnChangeAccidente}
                  handleOnChangeCardio={handleOnChangeCardio}
                  handleOnChangeCirugia={handleOnChangeCirugia}
                  handleOnChangeFract={handleOnChangeFract}
                  handleOnChangeContractMusc={handleOnChangeContractMusc}
                  handleChangeSigVital={handleChangeSigVital}
                  handleOnChangeTabaq={handleOnChangeTabaq}
                  handleOnChangeAlcoho={handleOnChangeAlcoho}
                  handleOnChangeDrog={handleOnChangeDrog}
                  handleOnChangeActFisic={handleOnChangeActFisic}
                  handleOnChangeAutomedic={handleOnChangeAutomedic}
                  handleOnChangePasatiempo={handleOnChangePasatiempo}
                  handleChangeReflejos={handleChangeReflejos}
                  handleChangeSensibilidad={handleChangeSensibilidad}
                  handleChangeLengOrient={handleChangeLengOrient}
                  handleChangeOtros={handleChangeOtros}
                  handleChangeRangoUmbral={handleChangeRangoUmbral}
                  //STEP3
                  handleOnChangeInitialValoration={handleOnChangeInitialValoration}
                  objMuscleAssessment={{
                    initialValorationStep3: initialValorationStep3,
                    valorMSupEv1IzqEvaluMusc: valorMSupEv1IzqEvaluMusc,
                    valorMSupEv1DerEvaluMusc: valorMSupEv1DerEvaluMusc,
                    valorMSupEv2IzqEvaluMusc: valorMSupEv2IzqEvaluMusc,
                    valorMSupEv2DerEvaluMusc: valorMSupEv2DerEvaluMusc,
                    valorMInfEv1IzqEvaluMusc: valorMInfEv1IzqEvaluMusc,
                    valorMInfEv1DerEvaluMusc: valorMInfEv1DerEvaluMusc,
                    valorMInfEv2IzqEvaluMusc: valorMInfEv2IzqEvaluMusc,
                    valorMInfEv2DerEvaluMusc: valorMInfEv2DerEvaluMusc,
                    valorTroncoEv1IzqEvaluMusc: valorTroncoEv1IzqEvaluMusc,
                    valorTroncoEv1DerEvaluMusc: valorTroncoEv1DerEvaluMusc,
                    valorTroncoEv2IzqEvaluMusc: valorTroncoEv2IzqEvaluMusc,
                    valorTroncoEv2DerEvaluMusc: valorTroncoEv2DerEvaluMusc,
                    valorCuelloEv1IzqEvaluMusc: valorCuelloEv1IzqEvaluMusc,
                    valorCuelloEv1DerEvaluMusc: valorCuelloEv1DerEvaluMusc,
                    valorCuelloEv2IzqEvaluMusc: valorCuelloEv2IzqEvaluMusc,
                    valorCuelloEv2DerEvaluMusc: valorCuelloEv2DerEvaluMusc,
                    valorMSupEv1IzqEvaluGonio: valorMSupEv1IzqEvaluGonio,
                    valorMSupEv1DerEvaluGonio: valorMSupEv1DerEvaluGonio,
                    valorMSupEv2IzqEvaluGonio: valorMSupEv2IzqEvaluGonio,
                    valorMSupEv2DerEvaluGonio: valorMSupEv2DerEvaluGonio,
                    valorMInfEv1IzqEvaluGonio: valorMInfEv1IzqEvaluGonio,
                    valorMInfEv1DerEvaluGonio: valorMInfEv1DerEvaluGonio,
                    valorMInfEv2IzqEvaluGonio: valorMInfEv2IzqEvaluGonio,
                    valorMInfEv2DerEvaluGonio: valorMInfEv2DerEvaluGonio,
                    valorTroncoEv1IzqEvaluGonio: valorTroncoEv1IzqEvaluGonio,
                    valorTroncoEv1DerEvaluGonio: valorTroncoEv1DerEvaluGonio,
                    valorTroncoEv2IzqEvaluGonio: valorTroncoEv2IzqEvaluGonio,
                    valorTroncoEv2DerEvaluGonio: valorTroncoEv2DerEvaluGonio,
                    valorCuelloEv1IzqEvaluGonio: valorCuelloEv1IzqEvaluGonio,
                    valorCuelloEv1DerEvaluGonio: valorCuelloEv1DerEvaluGonio,
                    valorCuelloEv2IzqEvaluGonio: valorCuelloEv2IzqEvaluGonio,
                    valorCuelloEv2DerEvaluGonio: valorCuelloEv2DerEvaluGonio,
                  }}
                  handleOnChangeMSupEv1IzqEvaluMusc={handleOnChangeMSupEv1IzqEvaluMusc}
                  handleOnChangeMSupEv1DerEvaluMusc={handleOnChangeMSupEv1DerEvaluMusc}
                  handleOnChangeMSupEv2IzqEvaluMusc={handleOnChangeMSupEv2IzqEvaluMusc}
                  handleOnChangeMSupEv2DerEvaluMusc={handleOnChangeMSupEv2DerEvaluMusc}
                  handleOnChangeMInfEv1IzqEvaluMusc={handleOnChangeMInfEv1IzqEvaluMusc}
                  handleOnChangeMInfEv1DerEvaluMusc={handleOnChangeMInfEv1DerEvaluMusc}
                  handleOnChangeMInfEv2IzqEvaluMusc={handleOnChangeMInfEv2IzqEvaluMusc}
                  handleOnChangeMInfEv2DerEvaluMusc={handleOnChangeMInfEv2DerEvaluMusc}
                  handleOnChangeTroncoEv1IzqEvaluMusc={handleOnChangeTroncoEv1IzqEvaluMusc}
                  handleOnChangeTroncoEv1DerEvaluMusc={handleOnChangeTroncoEv1DerEvaluMusc}
                  handleOnChangeTroncoEv2IzqEvaluMusc={handleOnChangeTroncoEv2IzqEvaluMusc}
                  handleOnChangeTroncoEv2DerEvaluMusc={handleOnChangeTroncoEv2DerEvaluMusc}
                  handleOnChangeCuelloEv1IzqEvaluMusc={handleOnChangeCuelloEv1IzqEvaluMusc}
                  handleOnChangeCuelloEv1DerEvaluMusc={handleOnChangeCuelloEv1DerEvaluMusc}
                  handleOnChangeCuelloEv2IzqEvaluMusc={handleOnChangeCuelloEv2IzqEvaluMusc}
                  handleOnChangeCuelloEv2DerEvaluMusc={handleOnChangeCuelloEv2DerEvaluMusc}
                  handleOnChangeMSupEv1IzqEvaluGonio={handleOnChangeMSupEv1IzqEvaluGonio}
                  handleOnChangeMSupEv1DerEvaluGonio={handleOnChangeMSupEv1DerEvaluGonio}
                  handleOnChangeMSupEv2IzqEvaluGonio={handleOnChangeMSupEv2IzqEvaluGonio}
                  handleOnChangeMSupEv2DerEvaluGonio={handleOnChangeMSupEv2DerEvaluGonio}
                  handleOnChangeMInfEv1IzqEvaluGonio={handleOnChangeMInfEv1IzqEvaluGonio}
                  handleOnChangeMInfEv1DerEvaluGonio={handleOnChangeMInfEv1DerEvaluGonio}
                  handleOnChangeMInfEv2IzqEvaluGonio={handleOnChangeMInfEv2IzqEvaluGonio}
                  handleOnChangeMInfEv2DerEvaluGonio={handleOnChangeMInfEv2DerEvaluGonio}
                  handleOnChangeTroncoEv1IzqEvaluGonio={handleOnChangeTroncoEv1IzqEvaluGonio}
                  handleOnChangeTroncoEv1DerEvaluGonio={handleOnChangeTroncoEv1DerEvaluGonio}
                  handleOnChangeTroncoEv2IzqEvaluGonio={handleOnChangeTroncoEv2IzqEvaluGonio}
                  handleOnChangeTroncoEv2DerEvaluGonio={handleOnChangeTroncoEv2DerEvaluGonio}
                  handleOnChangeCuelloEv1IzqEvaluGonio={handleOnChangeCuelloEv1IzqEvaluGonio}
                  handleOnChangeCuelloEv1DerEvaluGonio={handleOnChangeCuelloEv1DerEvaluGonio}
                  handleOnChangeCuelloEv2IzqEvaluGonio={handleOnChangeCuelloEv2IzqEvaluGonio}
                  handleOnChangeCuelloEv2DerEvaluGonio={handleOnChangeCuelloEv2DerEvaluGonio}
                  //STEP 4
                  handleOnChangePruArcHombroFlex1={handleOnChangePruArcHombroFlex1}
                  objArchesMobilityTest={{
                    valorHombroPruArcFlex1: valorHombroPruArcFlex1,
                    valorHombroPruArcExten1: valorHombroPruArcExten1,
                    valorHombroPruArcABD1: valorHombroPruArcABD1,
                    valorHombroPruArcADD1: valorHombroPruArcADD1,
                    valorHombroPruArcFlex2: valorHombroPruArcFlex2,
                    valorHombroPruArcExten2: valorHombroPruArcExten2,
                    valorHombroPruArcABD2: valorHombroPruArcABD2,
                    valorHombroPruArcADD2: valorHombroPruArcADD2,
                    valorHombroPruArcFlex3: valorHombroPruArcFlex3,
                    valorHombroPruArcExten3: valorHombroPruArcExten3,
                  }}
                  handleOnChangePruArcHombroExten1={handleOnChangePruArcHombroExten1}
                  handleOnChangePruArcHombroABD1={handleOnChangePruArcHombroABD1}
                  handleOnChangePruArcHombroADD1={handleOnChangePruArcHombroADD1}
                  handleOnChangePruArcHombroFlex2={handleOnChangePruArcHombroFlex2}
                  handleOnChangePruArcHombroExt2={handleOnChangePruArcHombroExt2}
                  handleOnChangePruArcHombroABD2={handleOnChangePruArcHombroABD2}
                  handleOnChangePruArcHombroADD2={handleOnChangePruArcHombroADD2}
                  handleOnChangePruArcHombroFlex3={handleOnChangePruArcHombroFlex3}
                  handleOnChangePruArcHombroExten3={handleOnChangePruArcHombroExten3}
                />
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Volver
                  </Button>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleNext} variant="contained" color="warning" className="mb-4 mt-4">
                    {activeStep === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>
      </div>
    </div>
  )
}
const RenderStepComponente = ({
  activeStep = 0,
  objPatient = {},
  packetsOrUnitSession = [],
  pathologiesInCombo = [],
  //Step2
  handleCalculateImc,
  handleOnChangeWeight,
  handleOnChangeStature,
  objPhysicalExplo = {},
  handleOnChangeReasonConsult,
  handleOnChangePrevTreatments,
  handleOnChangeDiabetes,
  handleOnChangeAlergia,
  handleOnChangeHta,
  handleOnChangeCancer,
  handleOnChangeTransfusiones,
  handleOnChangeEnfReu,
  handleOnChangeEncames,
  handleOnChangeAccidente,
  handleOnChangeCardio,
  handleOnChangeCirugia,
  handleOnChangeFract,
  handleOnChangeContractMusc,
  handleChangeSigVital,
  handleOnChangeTabaq,
  handleOnChangeAlcoho,
  handleOnChangeDrog,
  handleOnChangeActFisic,
  handleOnChangeAutomedic,
  handleOnChangePasatiempo,
  handleChangeReflejos,
  handleChangeSensibilidad,
  handleChangeLengOrient,
  handleChangeOtros,
  handleChangeRangoUmbral,
  //Step3
  handleOnChangeInitialValoration,
  handleOnChangeMSupEv1IzqEvaluMusc,
  objMuscleAssessment = {},
  handleOnChangeMSupEv1DerEvaluMusc,
  handleOnChangeMSupEv2IzqEvaluMusc,
  handleOnChangeMSupEv2DerEvaluMusc,
  handleOnChangeMInfEv1IzqEvaluMusc,
  handleOnChangeMInfEv1DerEvaluMusc,
  handleOnChangeMInfEv2IzqEvaluMusc,
  handleOnChangeMInfEv2DerEvaluMusc,
  handleOnChangeTroncoEv1IzqEvaluMusc,
  handleOnChangeTroncoEv1DerEvaluMusc,
  handleOnChangeTroncoEv2IzqEvaluMusc,
  handleOnChangeTroncoEv2DerEvaluMusc,
  handleOnChangeCuelloEv1IzqEvaluMusc,
  handleOnChangeCuelloEv1DerEvaluMusc,
  handleOnChangeCuelloEv2IzqEvaluMusc,
  handleOnChangeCuelloEv2DerEvaluMusc,
  handleOnChangeMSupEv1IzqEvaluGonio,
  handleOnChangeMSupEv1DerEvaluGonio,
  handleOnChangeMSupEv2IzqEvaluGonio,
  handleOnChangeMSupEv2DerEvaluGonio,
  handleOnChangeMInfEv1IzqEvaluGonio,
  handleOnChangeMInfEv1DerEvaluGonio,
  handleOnChangeMInfEv2IzqEvaluGonio,
  handleOnChangeMInfEv2DerEvaluGonio,
  handleOnChangeTroncoEv1IzqEvaluGonio,
  handleOnChangeTroncoEv1DerEvaluGonio,
  handleOnChangeTroncoEv2IzqEvaluGonio,
  handleOnChangeTroncoEv2DerEvaluGonio,
  handleOnChangeCuelloEv1IzqEvaluGonio,
  handleOnChangeCuelloEv1DerEvaluGonio,
  handleOnChangeCuelloEv2IzqEvaluGonio,
  handleOnChangeCuelloEv2DerEvaluGonio,
  //STEP4
  handleOnChangePruArcHombroFlex1,
  objArchesMobilityTest = {},
  handleOnChangePruArcHombroExten1,
  handleOnChangePruArcHombroABD1,
  handleOnChangePruArcHombroADD1,
  handleOnChangePruArcHombroFlex2,
  handleOnChangePruArcHombroExt2,
  handleOnChangePruArcHombroABD2,
  handleOnChangePruArcHombroADD2,
  handleOnChangePruArcHombroFlex3,
  handleOnChangePruArcHombroExten3
}) => {
  switch (activeStep) {
    case 1:
      return (
        <InformationPatient
          objPatient={objPatient}
        />
      )
    case 2:
      return (
        <ExplorationPhysicPathologicalHistory
          handleOnChangeStature={handleOnChangeStature}
          handleOnChangeWeight={handleOnChangeWeight}
          handleCalculateImc={handleCalculateImc}
          objPhysicalExplo={objPhysicalExplo}
          handleOnChangeReasonConsult={handleOnChangeReasonConsult}
          handleOnChangePrevTreatments={handleOnChangePrevTreatments}
          handleOnChangeDiabetes={handleOnChangeDiabetes}
          handleOnChangeAlergia={handleOnChangeAlergia}
          handleOnChangeHta={handleOnChangeHta}
          handleOnChangeCancer={handleOnChangeCancer}
          handleOnChangeTransfusiones={handleOnChangeTransfusiones}
          handleOnChangeEnfReu={handleOnChangeEnfReu}
          handleOnChangeEncames={handleOnChangeEncames}
          handleOnChangeAccidente={handleOnChangeAccidente}
          handleOnChangeCardio={handleOnChangeCardio}
          handleOnChangeCirugia={handleOnChangeCirugia}
          handleOnChangeFract={handleOnChangeFract}
          handleOnChangeContractMusc={handleOnChangeContractMusc}
          handleChangeSigVital={handleChangeSigVital}
          handleOnChangeTabaq={handleOnChangeTabaq}
          handleOnChangeAlcoho={handleOnChangeAlcoho}
          handleOnChangeDrog={handleOnChangeDrog}
          handleOnChangeActFisic={handleOnChangeActFisic}
          handleOnChangeAutomedic={handleOnChangeAutomedic}
          handleOnChangePasatiempo={handleOnChangePasatiempo}
          handleChangeReflejos={handleChangeReflejos}
          handleChangeSensibilidad={handleChangeSensibilidad}
          handleChangeLengOrient={handleChangeLengOrient}
          handleChangeOtros={handleChangeOtros}
          handleChangeRangoUmbral={handleChangeRangoUmbral}
        />
      )
    case 3:
      return (
        <MuscleEvaluationAndRangeOfMotionTesting
          handleOnChangeInitialValoration={handleOnChangeInitialValoration}
          handleOnChangeMSupEv1IzqEvaluMusc={handleOnChangeMSupEv1IzqEvaluMusc}
          objMuscleAssessment={objMuscleAssessment}
          handleOnChangeMSupEv1DerEvaluMusc={handleOnChangeMSupEv1DerEvaluMusc}
          handleOnChangeMSupEv2IzqEvaluMusc={handleOnChangeMSupEv2IzqEvaluMusc}
          handleOnChangeMSupEv2DerEvaluMusc={handleOnChangeMSupEv2DerEvaluMusc}
          handleOnChangeMInfEv1IzqEvaluMusc={handleOnChangeMInfEv1IzqEvaluMusc}
          handleOnChangeMInfEv1DerEvaluMusc={handleOnChangeMInfEv1DerEvaluMusc}
          handleOnChangeMInfEv2IzqEvaluMusc={handleOnChangeMInfEv2IzqEvaluMusc}
          handleOnChangeMInfEv2DerEvaluMusc={handleOnChangeMInfEv2DerEvaluMusc}
          handleOnChangeTroncoEv1IzqEvaluMusc={handleOnChangeTroncoEv1IzqEvaluMusc}
          handleOnChangeTroncoEv1DerEvaluMusc={handleOnChangeTroncoEv1DerEvaluMusc}
          handleOnChangeTroncoEv2IzqEvaluMusc={handleOnChangeTroncoEv2IzqEvaluMusc}
          handleOnChangeTroncoEv2DerEvaluMusc={handleOnChangeTroncoEv2DerEvaluMusc}
          handleOnChangeCuelloEv1IzqEvaluMusc={handleOnChangeCuelloEv1IzqEvaluMusc}
          handleOnChangeCuelloEv1DerEvaluMusc={handleOnChangeCuelloEv1DerEvaluMusc}
          handleOnChangeCuelloEv2IzqEvaluMusc={handleOnChangeCuelloEv2IzqEvaluMusc}
          handleOnChangeCuelloEv2DerEvaluMusc={handleOnChangeCuelloEv2DerEvaluMusc}
          handleOnChangeMSupEv1IzqEvaluGonio={handleOnChangeMSupEv1IzqEvaluGonio}
          handleOnChangeMSupEv1DerEvaluGonio={handleOnChangeMSupEv1DerEvaluGonio}
          handleOnChangeMSupEv2IzqEvaluGonio={handleOnChangeMSupEv2IzqEvaluGonio}
          handleOnChangeMSupEv2DerEvaluGonio={handleOnChangeMSupEv2DerEvaluGonio}
          handleOnChangeMInfEv1IzqEvaluGonio={handleOnChangeMInfEv1IzqEvaluGonio}
          handleOnChangeMInfEv1DerEvaluGonio={handleOnChangeMInfEv1DerEvaluGonio}
          handleOnChangeMInfEv2IzqEvaluGonio={handleOnChangeMInfEv2IzqEvaluGonio}
          handleOnChangeMInfEv2DerEvaluGonio={handleOnChangeMInfEv2DerEvaluGonio}
          handleOnChangeTroncoEv1IzqEvaluGonio={handleOnChangeTroncoEv1IzqEvaluGonio}
          handleOnChangeTroncoEv1DerEvaluGonio={handleOnChangeTroncoEv1DerEvaluGonio}
          handleOnChangeTroncoEv2IzqEvaluGonio={handleOnChangeTroncoEv2IzqEvaluGonio}
          handleOnChangeTroncoEv2DerEvaluGonio={handleOnChangeTroncoEv2DerEvaluGonio}
          handleOnChangeCuelloEv1IzqEvaluGonio={handleOnChangeCuelloEv1IzqEvaluGonio}
          handleOnChangeCuelloEv1DerEvaluGonio={handleOnChangeCuelloEv1DerEvaluGonio}
          handleOnChangeCuelloEv2IzqEvaluGonio={handleOnChangeCuelloEv2IzqEvaluGonio}
          handleOnChangeCuelloEv2DerEvaluGonio={handleOnChangeCuelloEv2DerEvaluGonio}
        />
      )
    case 4:
      return (
        <PostureEvaluation
          handleOnChangePruArcHombroFlex1={handleOnChangePruArcHombroFlex1}
          objArchesMobilityTest={objArchesMobilityTest}
          handleOnChangePruArcHombroExten1={handleOnChangePruArcHombroExten1}
          handleOnChangePruArcHombroABD1={handleOnChangePruArcHombroABD1}
          handleOnChangePruArcHombroADD1={handleOnChangePruArcHombroADD1}
          handleOnChangePruArcHombroFlex2={handleOnChangePruArcHombroFlex2}
          handleOnChangePruArcHombroExt2={handleOnChangePruArcHombroExt2}
          handleOnChangePruArcHombroABD2={handleOnChangePruArcHombroABD2}
          handleOnChangePruArcHombroADD2={handleOnChangePruArcHombroADD2}
          handleOnChangePruArcHombroFlex3={handleOnChangePruArcHombroFlex3}
          handleOnChangePruArcHombroExten3={handleOnChangePruArcHombroExten3}
        />
      )
    case 5:
      return (
        <GaitAnalysis />
      )
    case 6:
      return (
        <TreatmentPlan
          packetsOrUnitSession={packetsOrUnitSession}
          pathologiesInCombo={pathologiesInCombo}
        />
      )
    default:
      break;
  }
}
RenderStepComponente.propTypes = {
  activeStep: PropTypes.number,
  objPatient: PropTypes.object,
  packetsOrUnitSession: PropTypes.array,
  pathologiesInCombo: PropTypes.array,
  handleOnChangeStature: PropTypes.func,
  handleOnChangeWeight: PropTypes.func,
  handleCalculateImc: PropTypes.func,
  //STEP2
  objPhysicalExplo: PropTypes.object,
  handleOnChangeReasonConsult: PropTypes.func,
  handleOnChangePrevTreatments: PropTypes.func,
  handleOnChangeDiabetes: PropTypes.func,
  handleOnChangeAlergia: PropTypes.func,
  handleOnChangeHta: PropTypes.func,
  handleOnChangeCancer: PropTypes.func,
  handleOnChangeTransfusiones: PropTypes.func,
  handleOnChangeEnfReu: PropTypes.func,
  handleOnChangeEncames: PropTypes.func,
  handleOnChangeAccidente: PropTypes.func,
  handleOnChangeCardio: PropTypes.func,
  handleOnChangeCirugia: PropTypes.func,
  handleOnChangeFract: PropTypes.func,
  handleOnChangeContractMusc: PropTypes.func,
  handleChangeSigVital: PropTypes.func,
  handleOnChangeTabaq: PropTypes.func,
  handleOnChangeAlcoho: PropTypes.func,
  handleOnChangeDrog: PropTypes.func,
  handleOnChangeActFisic: PropTypes.func,
  handleOnChangeAutomedic: PropTypes.func,
  handleOnChangePasatiempo: PropTypes.func,
  handleChangeReflejos: PropTypes.func,
  handleChangeSensibilidad: PropTypes.func,
  handleChangeLengOrient: PropTypes.func,
  handleChangeOtros: PropTypes.func,
  handleChangeRangoUmbral: PropTypes.func,
  //STEP3
  handleOnChangeInitialValoration: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluMusc: PropTypes.func,
  objMuscleAssessment: PropTypes.object,
  handleOnChangeMSupEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluGonio: PropTypes.func,
  //STEP4
  handleOnChangePruArcHombroFlex1: PropTypes.func,
  objArchesMobilityTest: PropTypes.object,
  handleOnChangePruArcHombroExten1: PropTypes.func,
  handleOnChangePruArcHombroABD1: PropTypes.func,
  handleOnChangePruArcHombroADD1: PropTypes.func,
  handleOnChangePruArcHombroFlex2: PropTypes.func,
  handleOnChangePruArcHombroExt2: PropTypes.func,
  handleOnChangePruArcHombroABD2: PropTypes.func,
  handleOnChangePruArcHombroADD2: PropTypes.func,
  handleOnChangePruArcHombroFlex3: PropTypes.func,
  handleOnChangePruArcHombroExten3: PropTypes.func,
};

const TreatmentPlan = ({
  packetsOrUnitSession = [],
  pathologiesInCombo = []
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <TreatmentPlanComponent
            packetsOrUnitSession={packetsOrUnitSession}
            pathologiesInCombo={pathologiesInCombo}
          />
        </div>
      </div>
    </div>
  )
}
TreatmentPlan.propTypes = {
  packetsOrUnitSession: PropTypes.array,
  pathologiesInCombo: PropTypes.array,
};

const InformationPatient = ({
  objPatient = {}
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <DetailPatient
            objPatient={objPatient}
          />
        </div>
      </div>
    </div>
  )
}
InformationPatient.propTypes = {
  objPatient: PropTypes.object,
};

const ExplorationPhysicPathologicalHistory = ({
  handleCalculateImc,
  handleOnChangeWeight,
  handleOnChangeStature,
  objPhysicalExplo = {},
  handleOnChangeReasonConsult,
  handleOnChangePrevTreatments,
  handleOnChangeDiabetes,
  handleOnChangeAlergia,
  handleOnChangeHta,
  handleOnChangeCancer,
  handleOnChangeTransfusiones,
  handleOnChangeEnfReu,
  handleOnChangeEncames,
  handleOnChangeAccidente,
  handleOnChangeCardio,
  handleOnChangeCirugia,
  handleOnChangeFract,
  handleOnChangeContractMusc,
  handleChangeSigVital,
  handleOnChangeTabaq,
  handleOnChangeAlcoho,
  handleOnChangeDrog,
  handleOnChangeActFisic,
  handleOnChangeAutomedic,
  handleOnChangePasatiempo,
  handleChangeReflejos,
  handleChangeSensibilidad,
  handleChangeLengOrient,
  handleChangeOtros,
  handleChangeRangoUmbral
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <DiagnosisExplorationPhysical
            handleOnChangeStature={handleOnChangeStature}
            handleOnChangeWeight={handleOnChangeWeight}
            handleCalculateImc={handleCalculateImc}
            objPhysicalExplo={objPhysicalExplo}
            handleOnChangeReasonConsult={handleOnChangeReasonConsult}
            handleOnChangePrevTreatments={handleOnChangePrevTreatments}
            handleOnChangeDiabetes={handleOnChangeDiabetes}
            handleOnChangeAlergia={handleOnChangeAlergia}
            handleOnChangeHta={handleOnChangeHta}
            handleOnChangeCancer={handleOnChangeCancer}
            handleOnChangeTransfusiones={handleOnChangeTransfusiones}
            handleOnChangeEnfReu={handleOnChangeEnfReu}
            handleOnChangeEncames={handleOnChangeEncames}
            handleOnChangeAccidente={handleOnChangeAccidente}
            handleOnChangeCardio={handleOnChangeCardio}
            handleOnChangeCirugia={handleOnChangeCirugia}
            handleOnChangeFract={handleOnChangeFract}
            handleOnChangeContractMusc={handleOnChangeContractMusc}
            handleChangeSigVital={handleChangeSigVital}
            handleOnChangeTabaq={handleOnChangeTabaq}
            handleOnChangeAlcoho={handleOnChangeAlcoho}
            handleOnChangeDrog={handleOnChangeDrog}
            handleOnChangeActFisic={handleOnChangeActFisic}
            handleOnChangeAutomedic={handleOnChangeAutomedic}
            handleOnChangePasatiempo={handleOnChangePasatiempo}
            handleChangeReflejos={handleChangeReflejos}
            handleChangeSensibilidad={handleChangeSensibilidad}
            handleChangeLengOrient={handleChangeLengOrient}
            handleChangeOtros={handleChangeOtros}
            handleChangeRangoUmbral={handleChangeRangoUmbral}
          />
        </div>
      </div>
    </div>
  )
}
ExplorationPhysicPathologicalHistory.propTypes = {
  handleOnChangeStature: PropTypes.func,
  handleOnChangeWeight: PropTypes.func,
  handleCalculateImc: PropTypes.func,
  objPhysicalExplo: PropTypes.object,
  handleOnChangePrevTreatments: PropTypes.func,
  handleOnChangeReasonConsult: PropTypes.func,
  handleOnChangeDiabetes: PropTypes.func,
  handleOnChangeAlergia: PropTypes.func,
  handleOnChangeHta: PropTypes.func,
  handleOnChangeCancer: PropTypes.func,
  handleOnChangeTransfusiones: PropTypes.func,
  handleOnChangeEnfReu: PropTypes.func,
  handleOnChangeEncames: PropTypes.func,
  handleOnChangeAccidente: PropTypes.func,
  handleOnChangeCardio: PropTypes.func,
  handleOnChangeCirugia: PropTypes.func,
  handleOnChangeFract: PropTypes.func,
  handleOnChangeContractMusc: PropTypes.func,
  handleChangeSigVital: PropTypes.func,
  handleOnChangeTabaq: PropTypes.func,
  handleOnChangeAlcoho: PropTypes.func,
  handleOnChangeDrog: PropTypes.func,
  handleOnChangeActFisic: PropTypes.func,
  handleOnChangeAutomedic: PropTypes.func,
  handleOnChangePasatiempo: PropTypes.func,
  handleChangeReflejos: PropTypes.func,
  handleChangeSensibilidad: PropTypes.func,
  handleChangeLengOrient: PropTypes.func,
  handleChangeOtros: PropTypes.func,
  handleChangeRangoUmbral: PropTypes.func,
};

const MuscleEvaluationAndRangeOfMotionTesting = ({
  handleOnChangeInitialValoration,
  handleOnChangeMSupEv1IzqEvaluMusc,
  objMuscleAssessment,
  handleOnChangeMSupEv1DerEvaluMusc,
  handleOnChangeMSupEv2IzqEvaluMusc,
  handleOnChangeMSupEv2DerEvaluMusc,
  handleOnChangeMInfEv1IzqEvaluMusc,
  handleOnChangeMInfEv1DerEvaluMusc,
  handleOnChangeMInfEv2IzqEvaluMusc,
  handleOnChangeMInfEv2DerEvaluMusc,
  handleOnChangeTroncoEv1IzqEvaluMusc,
  handleOnChangeTroncoEv1DerEvaluMusc,
  handleOnChangeTroncoEv2IzqEvaluMusc,
  handleOnChangeTroncoEv2DerEvaluMusc,
  handleOnChangeCuelloEv1IzqEvaluMusc,
  handleOnChangeCuelloEv1DerEvaluMusc,
  handleOnChangeCuelloEv2IzqEvaluMusc,
  handleOnChangeCuelloEv2DerEvaluMusc,
  handleOnChangeMSupEv1IzqEvaluGonio,
  handleOnChangeMSupEv1DerEvaluGonio,
  handleOnChangeMSupEv2IzqEvaluGonio,
  handleOnChangeMSupEv2DerEvaluGonio,
  handleOnChangeMInfEv1IzqEvaluGonio,
  handleOnChangeMInfEv1DerEvaluGonio,
  handleOnChangeMInfEv2IzqEvaluGonio,
  handleOnChangeMInfEv2DerEvaluGonio,
  handleOnChangeTroncoEv1IzqEvaluGonio,
  handleOnChangeTroncoEv1DerEvaluGonio,
  handleOnChangeTroncoEv2IzqEvaluGonio,
  handleOnChangeTroncoEv2DerEvaluGonio,
  handleOnChangeCuelloEv1IzqEvaluGonio,
  handleOnChangeCuelloEv1DerEvaluGonio,
  handleOnChangeCuelloEv2IzqEvaluGonio,
  handleOnChangeCuelloEv2DerEvaluGonio
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <MuscleEvaluationMotionTesting
            handleOnChangeInitialValoration={handleOnChangeInitialValoration}
            handleOnChangeMSupEv1IzqEvaluMusc={handleOnChangeMSupEv1IzqEvaluMusc}
            objMuscleAssessment={objMuscleAssessment}
            handleOnChangeMSupEv1DerEvaluMusc={handleOnChangeMSupEv1DerEvaluMusc}
            handleOnChangeMSupEv2IzqEvaluMusc={handleOnChangeMSupEv2IzqEvaluMusc}
            handleOnChangeMSupEv2DerEvaluMusc={handleOnChangeMSupEv2DerEvaluMusc}
            handleOnChangeMInfEv1IzqEvaluMusc={handleOnChangeMInfEv1IzqEvaluMusc}
            handleOnChangeMInfEv1DerEvaluMusc={handleOnChangeMInfEv1DerEvaluMusc}
            handleOnChangeMInfEv2IzqEvaluMusc={handleOnChangeMInfEv2IzqEvaluMusc}
            handleOnChangeMInfEv2DerEvaluMusc={handleOnChangeMInfEv2DerEvaluMusc}
            handleOnChangeTroncoEv1IzqEvaluMusc={handleOnChangeTroncoEv1IzqEvaluMusc}
            handleOnChangeTroncoEv1DerEvaluMusc={handleOnChangeTroncoEv1DerEvaluMusc}
            handleOnChangeTroncoEv2IzqEvaluMusc={handleOnChangeTroncoEv2IzqEvaluMusc}
            handleOnChangeTroncoEv2DerEvaluMusc={handleOnChangeTroncoEv2DerEvaluMusc}
            handleOnChangeCuelloEv1IzqEvaluMusc={handleOnChangeCuelloEv1IzqEvaluMusc}
            handleOnChangeCuelloEv1DerEvaluMusc={handleOnChangeCuelloEv1DerEvaluMusc}
            handleOnChangeCuelloEv2IzqEvaluMusc={handleOnChangeCuelloEv2IzqEvaluMusc}
            handleOnChangeCuelloEv2DerEvaluMusc={handleOnChangeCuelloEv2DerEvaluMusc}
            handleOnChangeMSupEv1IzqEvaluGonio={handleOnChangeMSupEv1IzqEvaluGonio}
            handleOnChangeMSupEv1DerEvaluGonio={handleOnChangeMSupEv1DerEvaluGonio}
            handleOnChangeMSupEv2IzqEvaluGonio={handleOnChangeMSupEv2IzqEvaluGonio}
            handleOnChangeMSupEv2DerEvaluGonio={handleOnChangeMSupEv2DerEvaluGonio}
            handleOnChangeMInfEv1IzqEvaluGonio={handleOnChangeMInfEv1IzqEvaluGonio}
            handleOnChangeMInfEv1DerEvaluGonio={handleOnChangeMInfEv1DerEvaluGonio}
            handleOnChangeMInfEv2IzqEvaluGonio={handleOnChangeMInfEv2IzqEvaluGonio}
            handleOnChangeMInfEv2DerEvaluGonio={handleOnChangeMInfEv2DerEvaluGonio}
            handleOnChangeTroncoEv1IzqEvaluGonio={handleOnChangeTroncoEv1IzqEvaluGonio}
            handleOnChangeTroncoEv1DerEvaluGonio={handleOnChangeTroncoEv1DerEvaluGonio}
            handleOnChangeTroncoEv2IzqEvaluGonio={handleOnChangeTroncoEv2IzqEvaluGonio}
            handleOnChangeTroncoEv2DerEvaluGonio={handleOnChangeTroncoEv2DerEvaluGonio}
            handleOnChangeCuelloEv1IzqEvaluGonio={handleOnChangeCuelloEv1IzqEvaluGonio}
            handleOnChangeCuelloEv1DerEvaluGonio={handleOnChangeCuelloEv1DerEvaluGonio}
            handleOnChangeCuelloEv2IzqEvaluGonio={handleOnChangeCuelloEv2IzqEvaluGonio}
            handleOnChangeCuelloEv2DerEvaluGonio={handleOnChangeCuelloEv2DerEvaluGonio}
          />
        </div>
      </div>
    </div>
  )
}
MuscleEvaluationAndRangeOfMotionTesting.propTypes = {
  handleOnChangeInitialValoration: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluMusc: PropTypes.func,
  objMuscleAssessment: PropTypes.object,
  handleOnChangeMSupEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluMusc: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluMusc: PropTypes.func,
  handleOnChangeMSupEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMSupEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeMInfEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeTroncoEv2DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv1DerEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2IzqEvaluGonio: PropTypes.func,
  handleOnChangeCuelloEv2DerEvaluGonio: PropTypes.func,
};

const PostureEvaluation = ({
  handleOnChangePruArcHombroFlex1,
  objArchesMobilityTest = {},
  handleOnChangePruArcHombroExten1,
  handleOnChangePruArcHombroABD1,
  handleOnChangePruArcHombroADD1,
  handleOnChangePruArcHombroFlex2,
  handleOnChangePruArcHombroExt2,
  handleOnChangePruArcHombroABD2,
  handleOnChangePruArcHombroADD2,
  handleOnChangePruArcHombroFlex3,
  handleOnChangePruArcHombroExten3
}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <PostureEvaluationComponent
            handleOnChangePruArcHombroFlex1={handleOnChangePruArcHombroFlex1}
            objArchesMobilityTest={objArchesMobilityTest}
            handleOnChangePruArcHombroExten1={handleOnChangePruArcHombroExten1}
            handleOnChangePruArcHombroABD1={handleOnChangePruArcHombroABD1}
            handleOnChangePruArcHombroADD1={handleOnChangePruArcHombroADD1}
            handleOnChangePruArcHombroFlex2={handleOnChangePruArcHombroFlex2}
            handleOnChangePruArcHombroExt2={handleOnChangePruArcHombroExt2}
            handleOnChangePruArcHombroABD2={handleOnChangePruArcHombroABD2}
            handleOnChangePruArcHombroADD2={handleOnChangePruArcHombroADD2}
            handleOnChangePruArcHombroFlex3={handleOnChangePruArcHombroFlex3}
            handleOnChangePruArcHombroExten3={handleOnChangePruArcHombroExten3}
          />
        </div>
      </div>
    </div>
  )
}
PostureEvaluation.propTypes = {
  handleOnChangePruArcHombroFlex1: PropTypes.func,
  objArchesMobilityTest: PropTypes.object,
  handleOnChangePruArcHombroExten1: PropTypes.func,
  handleOnChangePruArcHombroABD1: PropTypes.func,
  handleOnChangePruArcHombroADD1: PropTypes.func,
  handleOnChangePruArcHombroFlex2: PropTypes.func,
  handleOnChangePruArcHombroExt2: PropTypes.func,
  handleOnChangePruArcHombroABD2: PropTypes.func,
  handleOnChangePruArcHombroADD2: PropTypes.func,
  handleOnChangePruArcHombroFlex3: PropTypes.func,
  handleOnChangePruArcHombroExten3: PropTypes.func,
};

const GaitAnalysis = ({

}) => {
  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-12">
          <GaitAnalysisComponent />
        </div>
      </div>
    </div>
  )
}