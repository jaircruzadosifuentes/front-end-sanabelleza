import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

//PACIENTE - SOLICITUD
const SolicitudRegistroPaciente = React.lazy(() => import('./views/paciente/solicitud/solicitud-layout'));
const AprobacionSolicitudPaciente = React.lazy(() => import('./views/paciente/aprobacion/aprobacion-layout'));
// const RechazoSolicitudPaciente = React.lazy(() => import('./views/paciente/rechazo/rechazo-layout'));
//VENTANILLA
const VentanillaHorarios = React.lazy(() => import('./views/ventanilla/ventanilla-layout'));
//PAQUETES
const MntPaquetes = React.lazy(() => import('./views/mantenimiento/paquetes/paquete-layout'));
const MntRoles = React.lazy(() => import('./views/mantenimiento/role-layout'));
//FINALIZA ATENCIÓN
const FinalizaAtencionSolicitud = React.lazy(() => import('./views/paciente/finalizaAtencion/finaliza-atencion-layout'));
//PENDIENTES DE ANALISIS
const PrimerAnalisisClinico = React.lazy(() => import('./views/analisis/primerAnalisis/primer-analisis-layout'));
const RegistroAnalisis = React.lazy(() => import('./views/analisis/registroAnalisis/registro-analisis-layout'));
//LISTA DE PACIENTES CON ANÁLISIS CLÍNICO
const PatientsWithAnalytics = React.lazy(() => import('./views/analisis/patienteWithAnalytics/patientWithAnalytics'));
const ClinicalTreatment = React.lazy(() => import('./views/analisis/clinical-treatment/clinical-treatment-layout'));
const FinishedTreatment = React.lazy(() => import('./views/analisis/finished-treatment/finished-treatment-layout'));
//Pagos
const PagosLayout = React.lazy(() => import('./views/pagos/pagos-layout'));
//Empleados
const EmpleadosLayout = React.lazy(() => import('./views/employeed/employeed-layout'));
const EmployeedSolicitudeLayout = React.lazy(() => import('./views/employeed/employeed-solicitude-layout'));
const EmployeedAprobacionLayout = React.lazy(() => import('./views/employeed/employeed-aproval-layout'));
const EmployeedProfileLayout = React.lazy(() => import('./views/employeed/employeed-profile-layout'));
const MessagesLayout = React.lazy(() => import('./views/messages/messages-layout'))
const DashboardPacienteLayout = React.lazy(() => import('./views/dashboard-paciente/dashboard-paciente-layout'))

export const GetComponentBasedOnRoute = (name) => {
  const COMPONENT_BASE_ON_ROUTE = {
    'Dashboard': Dashboard,
    'SolicitudRegistroPaciente': SolicitudRegistroPaciente,
    'AprobacionSolicitudPaciente': AprobacionSolicitudPaciente,
    'VentanillaHorarios': VentanillaHorarios,
    'MntPaquetes': MntPaquetes,
    'MntRoles': MntRoles,
    'FinalizaAtencionSolicitud': FinalizaAtencionSolicitud,
    'PrimerAnalisisClinico': PrimerAnalisisClinico,
    'RegistroAnalisis': RegistroAnalisis,
    'PatientsWithAnalytics': PatientsWithAnalytics,
    'ClinicalTreatment': ClinicalTreatment,
    'FinishedTreatment': FinishedTreatment,
    'PagosLayout': PagosLayout,
    'EmpleadosLayout': EmpleadosLayout,
    'EmployeedSolicitudeLayout': EmployeedSolicitudeLayout,
    'EmployeedAprobacionLayout': EmployeedAprobacionLayout,
    'MessagesLayout': MessagesLayout,
    'DashboardPacienteLayout': DashboardPacienteLayout,
    'EmployeedProfileLayout': EmployeedProfileLayout,
  }
  const COMPONENT_DEFAULT_BASE_ON_ROUTE = Dashboard
  return COMPONENT_BASE_ON_ROUTE[name] || COMPONENT_DEFAULT_BASE_ON_ROUTE;
}
const routes = [
  { path: '/', exact: true, name: 'Inicio' },
  { path: '/dashboard', name: 'Dashboard', element: GetComponentBasedOnRoute('Dashboard') },
  // PACIENTE - SOLICITUD
  { path: '/registro-solicitud', name: 'Solicitud de atención', element: GetComponentBasedOnRoute('SolicitudRegistroPaciente') },
  { path: '/aprobacion-rechazo-solicitud', name: 'Aprobación y/o Rechazo de la solicitud de atención', element: GetComponentBasedOnRoute('AprobacionSolicitudPaciente') },
  { path: '/paciente/en-espera', name: 'Pacientes en cola', element: GetComponentBasedOnRoute('VentanillaHorarios') },
  // PAQUETES
  { path: '/mantenimiento/paquetes-frecuencias', name: 'Mantenimiento de paquetes y frecuencias', element: GetComponentBasedOnRoute('MntPaquetes') },
  { path: '/mantenimiento/cargos', name: 'Mantenimiento de cargos', element: GetComponentBasedOnRoute('MntRoles') },
  // FINALIZA ATENCIÓN
  { path: '/finaliza-atencion-solicitud', name: 'Finaliza Atención de solicitud', element: GetComponentBasedOnRoute('FinalizaAtencionSolicitud') },
  //PENDIENTES DE ANALISIS
  { path: '/primer-analisis', name: 'Listado de pacientes para su primer analisis clínico.', element: GetComponentBasedOnRoute('PrimerAnalisisClinico') },
  { path: '/registro-analisis', name: 'Registro de análisis clínico', element: GetComponentBasedOnRoute('RegistroAnalisis') },
  { path: '/pacientes/tratamiento/proceso', name: 'Pacientes con Análisis clínico', element: GetComponentBasedOnRoute('PatientsWithAnalytics') },
  { path: '/tratamiento-clinico', name: 'Tratamiento Clínico', element: GetComponentBasedOnRoute('ClinicalTreatment') },
  { path: '/pacientes/tratamiento/finalizado', name: 'Tratamientos finalizados', element: GetComponentBasedOnRoute('FinishedTreatment') },
  { path: '/pagos/pendientes', name: 'Módulo de pagos', element: GetComponentBasedOnRoute('PagosLayout') },
  { path: '/contrato/empleados/contratados', name: 'Módulo de Empleados', element: GetComponentBasedOnRoute('EmpleadosLayout') },
  { path: '/contrato/solicitud', name: 'Registro de un nuevo empleado', element: GetComponentBasedOnRoute('EmployeedSolicitudeLayout') },
  { path: '/contrato/aprobacion', name: 'Listado de Contratos de Empleados para aprobar (Jefatura)', element: GetComponentBasedOnRoute('EmployeedAprobacionLayout') },
  { path: '/message/:tipo/:id', name: 'Mensajería', element: GetComponentBasedOnRoute('MessagesLayout') },
  { path: '/dashboard-paciente', name: 'Menú principal del paciente', element: GetComponentBasedOnRoute('DashboardPacienteLayout') },
  { path: '/u/:username', name: 'Perfil del Empleado', element: GetComponentBasedOnRoute('EmployeedProfileLayout') },
]
export default routes
