import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Label } from 'src/components/atoms';
import { InputFormControl, SelectedFormControl, TextAreaFormControl } from 'src/components/molecules';
import { Radio } from '@mui/joy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SaveIcon from '@mui/icons-material/Save';
import PropTypes from 'prop-types';
import SpanFormControl from 'src/components/atoms/SpanFormControl';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useGetAllAfpSure, useGetAllModalityContract, useGetAllRoleInCombo, useGetAllTypeOfContract } from 'src/api/hooks/common/common-hooks';
import { useState } from 'react';
import { formatDecimales } from 'src/utils/utils';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useGetAllDocuments } from '../paciente/solicitud/hooks';
import { ServicePostRegisterEmployeed } from 'src/service/employeed/service.employeed';

const steps = ['Ingreso de datos personales', 'Ingreso de experiencia y trámites legales', 'Resumen del contrato y registro del sueldo base'];

export default function SolicitudeForm(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  //Hooks
  const [salary, setSalary] = useState(0.00);
  const { typeOfContracts } = useGetAllTypeOfContract(props);
  const { modalityContracts } = useGetAllModalityContract(props);
  const { documents } = useGetAllDocuments(props);
  const { roles } = useGetAllRoleInCombo(props);
  const { afpSures } = useGetAllAfpSure(props);
  const [apellidos, setApellidos] = useState('');
  const [nombres, setNombres] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [tipoDocumentoId, setTipoDocumentoId] = useState(0);
  const [nroDocumento, setNroDocumento] = useState('');
  const [sexo, setSexo] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [ultimaEmpresa, setUltimaEmpresa] = useState('');
  const [aunTrabajo, setAunTrabajo] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [detalleActi, setDetalleActi] = useState('');
  const [afpId, setAfpId] = useState(0);
  const [codigoAsociado, setCodigoAsociado] = useState('');
  const [fechaVinculacionAfp, setFechaVinculacionAfp] = useState('');
  const [tipoContratoId, setTipoContratoId] = useState(0);
  const [modalidadId, setModalidadId] = useState(0);
  const [rolId, setRolId] = useState(0);
  const [fechaIngreso, setFechaIngreso] = useState('');

  const [objetoRegistro, setObjetoRegistro] = useState({
    apellidos: '',
    nombres: '',
    fechaNacimiento: '',
    tipoDocumentoId: 0,
    nroDocumento: '',
    sexo: '',
    celular: '',
    email: '',
    empresa: {
      ultimaEmpresa: '',
      aunTrabajo: '',
      fechaInicio: '',
      fechaFin: '',
      detalleActi: '',
      afpId: 0,
      codigoAsociado: '',
      fechaVinculacionAfp: ''
    },
    tipoContratoId: 0,
    modalidadId: 0,
    rolId: 0,
    fechaIngreso: ''
  })
  //Fin Hooks
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  const handleSaveEmployeed = (e) => {
    let data = {
      person: {
        surnames: objetoRegistro?.apellidos,
        names: objetoRegistro?.nombres,
        birthDate: objetoRegistro?.fechaNacimiento,
        personDocument: {
          document: {
            value: objetoRegistro?.tipoDocumentoId
          },
          nroDocument: objetoRegistro?.nroDocumento
        },
        personCellphone: {
          cellPhoneNumber: objetoRegistro?.celular
        },
        personEmail: {
          emailDescription: objetoRegistro?.email
        },
        gender: objetoRegistro?.sexo
      },
      experience: {
        company: objetoRegistro.empresa.ultimaEmpresa,
        stillWorks: objetoRegistro.empresa.aunTrabajo === 's' ? false: true,
        startDate: objetoRegistro.empresa.fechaInicio,
        finishDate: objetoRegistro.empresa.fechaFin,
        activities: objetoRegistro.empresa.detalleActi
      },
      afpSure: {
        value: objetoRegistro.empresa.afpId,
      },
      associateCode: objetoRegistro.empresa.codigoAsociado,
      afpLinkDate: objetoRegistro.empresa.fechaVinculacionAfp,
      typeOfContract: {
        value: tipoContratoId
      },
      modalityContract: {
        value: modalidadId
      },
      role: {
        value: rolId
      },
      admisionDate: fechaIngreso
    };
    Swal.fire({
      title: '¿Desea registrar la solicitud de contrato?',
      text: `Usted está registrando la solicitud de contrato del Empleado.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, guardar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let insert = await ServicePostRegisterEmployeed(data);
        if (insert) {
          Swal.fire(
            'Registro exitoso',
            'La solicitud del contrato ha sido registrado con éxito.',
            'success'
          )
          handleNextAll();
        }
        else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: `Error: ${insert.status}. Comuniquese con Sistemas.`,
          })
          return;
        }
      }
    })
  }
  const handleNext = (e) => {
    if (activeStep === steps.length - 1) {
      setObjetoRegistro({
        nombres: nombres,
        apellidos: apellidos,
        fechaNacimiento: fechaNacimiento,
        tipoDocumentoId: tipoDocumentoId,
        nroDocumento: nroDocumento,
        sexo: sexo,
        celular: celular,
        email: email,
        empresa: {
          ultimaEmpresa: ultimaEmpresa,
          aunTrabajo: aunTrabajo,
          fechaInicio: fechaInicio,
          fechaFin: fechaFin,
          detalleActi: detalleActi,
          afpId: afpId,
          codigoAsociado: codigoAsociado,
          fechaVinculacionAfp: fechaVinculacionAfp
        },
        tipoContratoId: tipoContratoId,
        modalidadId: modalidadId,
        rolId: rolId,
        fechaIngreso: fechaIngreso
      })
    } else {
      handleNextAll();
    }
  };
  const handleNextAll = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
    setObjetoRegistro({
      nombres: nombres,
      apellidos: apellidos,
      fechaNacimiento: fechaNacimiento,
      tipoDocumentoId: tipoDocumentoId,
      nroDocumento: nroDocumento,
      sexo: sexo,
      celular: celular,
      email: email,
      empresa: {
        ultimaEmpresa: ultimaEmpresa,
        aunTrabajo: aunTrabajo,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        detalleActi: detalleActi,
        afpId: afpId,
        codigoAsociado: codigoAsociado,
        fechaVinculacionAfp: fechaVinculacionAfp
      },
      tipoContratoId: tipoContratoId,
      modalidadId: modalidadId,
      rolId: rolId,
      fechaIngreso: fechaIngreso
    });
  }
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  //Funciones
  const handleChangeChargeOcupation = (e) => {
    setSalary(e?.salary)
    setRolId(e?.value);
  }
  const handleChangeApellidos = (e) => {
    setApellidos(e.target.value);
  }
  const handleChangeNombres = (e) => {
    setNombres(e.target.value);
  }
  const handleChangeFechaNacimiento = (e) => {
    setFechaNacimiento(e.target.value)
  }
  const handleChangeTipoDocumento = (e) => {
    setTipoDocumentoId(e?.value);
  }
  const handleChangeNroDocumento = (e) => {
    setNroDocumento(e.target.value);
  }
  const handleChangeSexo = (e) => {
    setSexo(e.target.value);
  }
  const handleChangeCelular = (e) => {
    setCelular(e.target.value);
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  const handleChangeUltimaEmpresa = (e) => {
    setUltimaEmpresa(e.target.value);
  }
  const handleChangeAunTrabajo = (e) => {
    let aunTrabajoValor = e.target.value;
    setAunTrabajo(aunTrabajoValor);
  }
  const handleChangeFechaInicio = (e) => {
    setFechaInicio(e.target.value);
  }
  const handleChangeFechaFin = (e) => {
    setFechaFin(e.target.value);
  }
  const handleChangeDetActiRealizadas = (e) => {
    setDetalleActi(e.target.value);
  }
  const handleChangeAfpAsociado = (e) => {
    setAfpId(e?.value);
  }
  const handleChangeCodigoAsociado = (e) => {
    setCodigoAsociado(e.target.value);
  }
  const handleChangeFechaVinculacionAfp = (e) => {
    setFechaVinculacionAfp(e.target.value);
  }
  const handleChangeTipoContrato = (e) => {
    setTipoContratoId(e?.value);
  }
  const handleChangeModalidad = (e) => {
    setModalidadId(e?.value);
  }
  const handleChangeFechaIngreso = (e) => {
    setFechaIngreso(e.target.value);
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Opcional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            <Alert severity="success">
              <AlertTitle>Registro exitoso</AlertTitle>
              Has completados todos los pasos, la solicitud ha sido creada con éxito — <strong>La solicitud debe de ser aprobada por su Jefatura!</strong>
            </Alert>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset} variant='contained'>Nuevo Registro
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Paso {activeStep + 1}</Typography>
          <MostrarControlesPorPaso
            activeStep={(activeStep + 1)}
            typeOfContracts={typeOfContracts}
            modalityContracts={modalityContracts}
            documents={documents}
            roles={roles}
            handleChangeChargeOcupation={handleChangeChargeOcupation}
            salary={salary}
            afpSures={afpSures}
            objetoRegistro={{
              nombres: nombres,
              apellidos: apellidos,
              fechaNacimiento: fechaNacimiento,
              tipoDocumentoId: tipoDocumentoId,
              nroDocumento: nroDocumento,
              sexo: sexo,
              celular: celular,
              email: email,
              empresa: {
                ultimaEmpresa: ultimaEmpresa,
                aunTrabajo: aunTrabajo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                detalleActi: detalleActi,
                afpId: afpId,
                codigoAsociado: codigoAsociado,
                fechaVinculacionAfp: fechaVinculacionAfp
              },
              tipoContratoId: tipoContratoId,
              modalidadId: modalidadId,
              rolId: rolId,
              fechaIngreso: fechaIngreso
            }}
            handleChangeApellidos={handleChangeApellidos}
            handleChangeNombres={handleChangeNombres}
            handleChangeFechaNacimiento={handleChangeFechaNacimiento}
            handleChangeTipoDocumento={handleChangeTipoDocumento}
            handleChangeNroDocumento={handleChangeNroDocumento}
            handleChangeSexo={handleChangeSexo}
            handleChangeCelular={handleChangeCelular}
            handleChangeEmail={handleChangeEmail}
            handleChangeUltimaEmpresa={handleChangeUltimaEmpresa}
            //Paso 2
            handleChangeAunTrabajo={handleChangeAunTrabajo}
            handleChangeFechaInicio={handleChangeFechaInicio}
            handleChangeFechaFin={handleChangeFechaFin}
            handleChangeDetActiRealizadas={handleChangeDetActiRealizadas}
            handleChangeAfpAsociado={handleChangeAfpAsociado}
            handleChangeCodigoAsociado={handleChangeCodigoAsociado}
            handleChangeFechaVinculacionAfp={handleChangeFechaVinculacionAfp}
            //Paso 3
            handleChangeTipoContrato={handleChangeTipoContrato}
            handleChangeModalidad={handleChangeModalidad}
            handleChangeFechaIngreso={handleChangeFechaIngreso}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              variant='contained'
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Regresar
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Saltar
              </Button>
            )}
            {
              activeStep === steps.length - 1 ?
                <Button onClick={handleSaveEmployeed} variant='contained' color={`success`}>
                  Finalizar&nbsp;
                  <SaveIcon />
                </Button> :
                <Button onClick={handleNext} variant='contained' color={`primary`}>
                  Siguiente&nbsp;
                  <ArrowForwardIcon />
                </Button>

            }
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
const MostrarControlesPorPaso = ({
  activeStep = 0,
  typeOfContracts = [],
  modalityContracts = [],
  documents = [],
  roles = [],
  afpSures = [],
  handleChangeChargeOcupation,
  salary = 0.00,
  handleChangeApellidos,
  objetoRegistro = {},
  handleChangeNombres,
  handleChangeFechaNacimiento,
  handleChangeTipoDocumento,
  handleChangeNroDocumento,
  handleChangeSexo,
  handleChangeEmail,
  handleChangeCelular,
  handleChangeUltimaEmpresa,
  //Paso 2
  handleChangeAunTrabajo,
  handleChangeFechaInicio,
  handleChangeFechaFin,
  handleChangeDetActiRealizadas,
  handleChangeAfpAsociado,
  handleChangeCodigoAsociado,
  handleChangeFechaVinculacionAfp,
  //Paso 3
  handleChangeTipoContrato,
  handleChangeModalidad,
  handleChangeFechaIngreso
}) => {
  switch (activeStep) {
    case 1:
      return (
        <MostrarControlesDatosPersonales
          handleChangeApellidos={handleChangeApellidos}
          handleChangeNombres={handleChangeNombres}
          handleChangeFechaNacimiento={handleChangeFechaNacimiento}
          handleChangeTipoDocumento={handleChangeTipoDocumento}
          handleChangeNroDocumento={handleChangeNroDocumento}
          handleChangeEmail={handleChangeEmail}
          handleChangeCelular={handleChangeCelular}
          handleChangeSexo={handleChangeSexo}
          objetoRegistro={objetoRegistro}
          documents={documents}
        />
      )
    case 2:
      return (
        <MostrarControlesExpHojaVida
          afpSures={afpSures}
          handleChangeUltimaEmpresa={handleChangeUltimaEmpresa}
          objetoRegistro={objetoRegistro}
          handleChangeAunTrabajo={handleChangeAunTrabajo}
          handleChangeFechaInicio={handleChangeFechaInicio}
          handleChangeFechaFin={handleChangeFechaFin}
          handleChangeDetActiRealizadas={handleChangeDetActiRealizadas}
          handleChangeAfpAsociado={handleChangeAfpAsociado}
          handleChangeCodigoAsociado={handleChangeCodigoAsociado}
          handleChangeFechaVinculacionAfp={handleChangeFechaVinculacionAfp}
        />
      )
    case 3:
      return (
        <MostrarControlesContratoYSueldo
          typeOfContracts={typeOfContracts}
          modalityContracts={modalityContracts}
          roles={roles}
          handleChangeChargeOcupation={handleChangeChargeOcupation}
          salary={salary}
          objetoRegistro={objetoRegistro}
          handleChangeTipoContrato={handleChangeTipoContrato}
          handleChangeModalidad={handleChangeModalidad}
          handleChangeFechaIngreso={handleChangeFechaIngreso}
        />
      )
    default:
      break;
  }
}
MostrarControlesPorPaso.propTypes = {
  activeStep: PropTypes.number,
  typeOfContracts: PropTypes.array,
  documents: PropTypes.array,
  roles: PropTypes.array,
  modalityContracts: PropTypes.array,
  afpSures: PropTypes.array,
  handleChangeApellidos: PropTypes.func,
  handleChangeFechaIngreso: PropTypes.func,
  handleChangeUltimaEmpresa: PropTypes.func,
  handleChangeChargeOcupation: PropTypes.func,
  handleChangeNroDocumento: PropTypes.func,
  handleChangeNombres: PropTypes.func,
  handleChangeFechaNacimiento: PropTypes.func,
  handleChangeCelular: PropTypes.func,
  handleChangeAunTrabajo: PropTypes.func,
  aunTrabajo: PropTypes.string,
  handleChangeEmail: PropTypes.func,
  handleChangeTipoDocumento: PropTypes.func,
  handleChangeFechaInicio: PropTypes.func,
  handleChangeFechaFin: PropTypes.func,
  handleChangeDetActiRealizadas: PropTypes.func,
  handleChangeAfpAsociado: PropTypes.func,
  handleChangeSexo: PropTypes.func,
  handleChangeCodigoAsociado: PropTypes.func,
  handleChangeFechaVinculacionAfp: PropTypes.func,
  handleChangeTipoContrato: PropTypes.func,
  handleChangeModalidad: PropTypes.func,
  salary: PropTypes.number,
  objetoRegistro: PropTypes.object,
};
const MostrarControlesDatosPersonales = ({
  handleChangeApellidos,
  handleChangeNombres,
  handleChangeFechaNacimiento,
  handleChangeTipoDocumento,
  handleChangeNroDocumento,
  handleChangeEmail,
  handleChangeCelular,
  handleChangeSexo,
  objetoRegistro,
  documents
}) => {
  return (
    <>
      <div className="form-group">
        <Label title={'DATOS PRINCIPALES'} isBold />
        <div className="row">
          <InputFormControl
            type="text"
            autoFocus
            className="col-md-4"
            label="Apellidos"
            isLabel
            onChange={handleChangeApellidos}
            defaultValue={objetoRegistro.apellidos}
          />
          <InputFormControl
            type="text"
            className="col-md-4"
            isLabel
            label="Nombres"
            onChange={handleChangeNombres}
            defaultValue={objetoRegistro.nombres}
          />
          <InputFormControl
            type="date"
            className="col-md-4"
            isLabel
            label="Fecha Nacimiento"
            onChange={handleChangeFechaNacimiento}
            defaultValue={objetoRegistro.fechaNacimiento}
          />
        </div>
        <div className="row">
          <SelectedFormControl
            className="col-md-2"
            placeHolder="Tipo de Documento"
            titleLabel="Tipo de Documento"
            options={documents}
            handleChange={handleChangeTipoDocumento}
            defaultValue={documents.filter(d => parseInt(d.value) === objetoRegistro.tipoDocumentoId)}
          />
          <InputFormControl
            type="text"
            className="col-md-2"
            isLabel
            label="Nro Documento"
            onChange={handleChangeNroDocumento}
            defaultValue={objetoRegistro.nroDocumento}
            maxLength={8}
          />
          <div className="col-md-4 mt-4">
            <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
              <Radio
                value="m"
                name="radio-buttons"
                label="Masculino"
                checked={objetoRegistro.sexo === 'm'}
                onChange={handleChangeSexo}
              />
              <Radio
                value="f"
                name="radio-buttons"
                label="Femenino"
                onChange={handleChangeSexo}
                checked={objetoRegistro.sexo === 'f'}
              />
            </Box>
          </div>
        </div>
        <br />
        <Label title={'DATOS OPCIONALES'} isBold />
        <div className="row">
          <InputFormControl
            type="text"
            className="col-md-2"
            label="Celular"
            isLabel
            onChange={handleChangeCelular}
            defaultValue={objetoRegistro.celular}
            maxLength={9}
          />
          <InputFormControl
            type="text"
            className="col-md-4"
            label="Correo Electrónico"
            isLabel
            onChange={handleChangeEmail}
            defaultValue={objetoRegistro.email}
          />

        </div>
        <hr />
      </div>
    </>
  )
}
MostrarControlesDatosPersonales.propTypes = {
  handleChangeApellidos: PropTypes.func,
  handleChangeNombres: PropTypes.func,
  handleChangeFechaNacimiento: PropTypes.func,
  handleChangeTipoDocumento: PropTypes.func,
  handleChangeNroDocumento: PropTypes.func,
  handleChangeCelular: PropTypes.func,
  handleChangeEmail: PropTypes.func,
  handleChangeSexo: PropTypes.func,
  objetoRegistro: PropTypes.object,
  documents: PropTypes.array,
};

const MostrarControlesExpHojaVida = ({
  afpSures = [],
  handleChangeUltimaEmpresa,
  objetoRegistro = {},
  handleChangeAunTrabajo,
  handleChangeFechaInicio,
  handleChangeFechaFin,
  handleChangeDetActiRealizadas,
  handleChangeAfpAsociado,
  handleChangeCodigoAsociado,
  handleChangeFechaVinculacionAfp
}) => {
  return (
    <>
      <div className="form-group">
        <Label title={'ULTIMO TRABAJO LABORAL'} isBold />
        <div className="row">
          <InputFormControl
            type="text"
            autoFocus
            className="col-md-4"
            label="Empresa"
            isLabel
            onChange={handleChangeUltimaEmpresa}
            defaultValue={objetoRegistro.empresa.ultimaEmpresa}
          />
          <div className="col-md-2 mt-4">
            <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
              <Radio
                value="a"
                name="radio-buttons"
                label="Aun trabajo aquí"
                checked={objetoRegistro.empresa.aunTrabajo === 'a'}
                onChange={handleChangeAunTrabajo}
              />
            </Box>
          </div>
          <div className="col-md-2 mt-4">
            <Box sx={{ display: 'flex', gap: 2, marginTop: '1em', marginBottom: '1em' }}>
              <Radio
                value="s"
                name="radio-buttons"
                label="Ya no trabajo aquí"
                checked={objetoRegistro.empresa.aunTrabajo === 's'}
                onChange={handleChangeAunTrabajo}
              />
            </Box>
          </div>
          <InputFormControl
            type="date"
            className="col-md-2"
            isLabel
            label="Fecha Inicio"
            onChange={handleChangeFechaInicio}
            defaultValue={objetoRegistro.empresa.fechaInicio}
          />
          {
            objetoRegistro.empresa.aunTrabajo !== 'a' ?
              <InputFormControl
                type="date"
                className="col-md-2"
                isLabel
                label="Fecha Fin"
                onChange={handleChangeFechaFin}
                defaultValue={objetoRegistro.empresa.fechaFin}
              /> : ''
          }
        </div>
        <div className="row">
          <TextAreaFormControl
            className="col-md-6"
            label="Detalle las actividades realizadas"
            onChange={handleChangeDetActiRealizadas}
            defaultValue={objetoRegistro.empresa.detalleActi}
          />
        </div>
        <hr />
        <Label title={'DATOS DE AFP ASOCIADO'} isBold />
        <div className="row">
          <SelectedFormControl
            className="col-md-2"
            placeHolder="Seleccione AFP"
            titleLabel="Selecione AFP Asociado"
            options={afpSures}
            handleChange={handleChangeAfpAsociado}
            defaultValue={afpSures.filter(a => parseInt(a.value) === objetoRegistro.empresa.afpId)}
          />
          <InputFormControl
            type="text"
            className="col-md-2"
            isLabel
            label="Codigo de asociado"
            onChange={handleChangeCodigoAsociado}
            defaultValue={objetoRegistro.empresa.codigoAsociado}
          />
          <InputFormControl
            type="date"
            className="col-md-2"
            isLabel
            label="Fecha de Vinculación"
            onChange={handleChangeFechaVinculacionAfp}
            defaultValue={objetoRegistro.empresa.fechaVinculacionAfp}
          />
        </div>
      </div>
    </>
  )
}
MostrarControlesExpHojaVida.propTypes = {
  afpSures: PropTypes.array,
  handleChangeUltimaEmpresa: PropTypes.func,
  objetoRegistro: PropTypes.object,
  handleChangeAunTrabajo: PropTypes.func,
  handleChangeFechaInicio: PropTypes.func,
  handleChangeFechaFin: PropTypes.func,
  handleChangeDetActiRealizadas: PropTypes.func,
  handleChangeAfpAsociado: PropTypes.func,
  handleChangeCodigoAsociado: PropTypes.func,
  handleChangeFechaVinculacionAfp: PropTypes.func,
};

const MostrarControlesContratoYSueldo = ({
  typeOfContracts = [],
  modalityContracts = [],
  roles = [],
  handleChangeChargeOcupation,
  salary = 0.00,
  objetoRegistro = {},
  handleChangeTipoContrato,
  handleChangeModalidad,
  handleChangeFechaIngreso
}) => {
  return (
    <>
      <div className='form-group'>
        <div className='row'>
          <div className='col-md-6'>
            <Label title={'DATOS DEL POSTULANTE'} isBold />
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Nombres y Apellidos: ' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.apellidos} ${objetoRegistro.nombres}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='DNI:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.nroDocumento}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Celular:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.celular}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Email:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.email}`} />
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <Label title={'EXPERIENCIA LABORAL'} isBold />
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Empresa:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.empresa.ultimaEmpresa}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Fecha Inicio - Fecha Fin:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.empresa.fechaInicio} a ${objetoRegistro.empresa.fechaFin}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='¿Trabaja actualmente?' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={`${objetoRegistro.empresa.aunTrabajo === 'a' ? 'SI' : 'NO'}`} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-8'>
                <SpanFormControl title='Ver Curriculum Vitae:' />
              </div>
              <div className='col-md-4'>
                <SpanFormControl title={``} />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className='row'>
          <div className='col-md-12'>
            <Label title={'REGISTRO DE SUELDO BASE'} isBold />
          </div>
          <SelectedFormControl
            className="col-md-2"
            placeHolder="Tipo de contrato"
            titleLabel="Tipo de contrato:"
            options={typeOfContracts}
            handleChange={handleChangeTipoContrato}
            defaultValue={typeOfContracts.filter(t => parseInt(t.value) === objetoRegistro.tipoContratoId)}

          />
          <SelectedFormControl
            className="col-md-2"
            placeHolder="Seleccione Modalidad"
            titleLabel="Seleccione Modalidad"
            options={modalityContracts}
            handleChange={handleChangeModalidad}
            defaultValue={modalityContracts.filter(m => parseInt(m.value) === objetoRegistro.modalidadId)}
          />
          <SelectedFormControl
            className="col-md-3"
            placeHolder="Seleccione Cargo a Ocupar"
            titleLabel="Seleccione Cargo a Ocupar"
            options={roles}
            handleChange={handleChangeChargeOcupation}
            defaultValue={roles.filter(r => parseInt(r.value) === objetoRegistro.rolId)}
          />

          <div className='col-md-3'>
            <div className='row'>
              <div className='col-md-12'>
                <SpanFormControl title={`Sueldo base, definido por RRHH:`} /> <br />
              </div>
              <div className='col-md-12 mt-3'>
                <SpanFormControl title={`S/.${formatDecimales(salary)}`} />
              </div>
            </div>
          </div>
          <InputFormControl
            type="date"
            className="col-md-2"
            isLabel
            label="Fecha de Ingreso"
            isBold
            onChange={handleChangeFechaIngreso}
            defaultValue={objetoRegistro.fechaIngreso}
          />
        </div>
      </div>
    </>
  )
}
MostrarControlesContratoYSueldo.propTypes = {
  typeOfContracts: PropTypes.array,
  modalityContracts: PropTypes.array,
  handleChangeChargeOcupation: PropTypes.func,
  handleChangeTipoContrato: PropTypes.func,
  handleChangeModalidad: PropTypes.func,
  handleChangeFechaIngreso: PropTypes.func,
  roles: PropTypes.array,
  salary: PropTypes.number,
  objetoRegistro: PropTypes.object,
};