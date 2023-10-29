import React from 'react';
// ROUTES
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'))

//PACIENTE - SOLICITUD
const SolicitudRegistroPaciente = React.lazy(() => import('../views/paciente/solicitud/solicitud-layout'));
const AprobacionSolicitudPaciente = React.lazy(() => import('../views/paciente/aprobacion/aprobacion-layout'));
// const RechazoSolicitudPaciente = React.lazy(() => import('./views/paciente/rechazo/rechazo-layout'));
//VENTANILLA
const VentanillaHorarios = React.lazy(() => import('../views/ventanilla/ventanilla-layout'));
//PAQUETES
const MntPaquetes = React.lazy(() => import('../views/mantenimiento/paquetes/paquete-layout'));
const MntRoles = React.lazy(() => import('../views/mantenimiento/role-layout'));
const MntEnvironmentSystemLayout = React.lazy(() => import('../views/mantenimiento/environmet-system-layout'));
//FINALIZA ATENCIÓN
const FinalizaAtencionSolicitud = React.lazy(() => import('../views/paciente/finalizaAtencion/finaliza-atencion-layout'));
//PENDIENTES DE ANALISIS
const PrimerAnalisisClinico = React.lazy(() => import('../views/analisis/primerAnalisis/primer-analisis-layout'));
const RegistroAnalisis = React.lazy(() => import('../views/analisis/registroAnalisis/registro-analisis-layout'));
//LISTA DE PACIENTES CON ANÁLISIS CLÍNICO
const PatientsWithAnalytics = React.lazy(() => import('../views/analisis/patienteWithAnalytics/patientWithAnalytics'));
const ClinicalTreatment = React.lazy(() => import('../views/analisis/clinical-treatment/clinical-treatment-layout'));
const FinishedTreatment = React.lazy(() => import('../views/analisis/finished-treatment/finished-treatment-layout'));
//Pagos
const PagosLayout = React.lazy(() => import('../views/pagos/pagos-layout'));
//Empleados
const EmpleadosLayout = React.lazy(() => import('../views/employeed/employeed-layout'));
const EmployeedSolicitudeLayout = React.lazy(() => import('../views/employeed/employeed-solicitude-layout'));
const EmployeedAprobacionLayout = React.lazy(() => import('../views/employeed/employeed-aproval-layout'));
const EmployeedProfileLayout = React.lazy(() => import('../views/employeed/employeed-profile-layout'));
const MessagesLayout = React.lazy(() => import('../views/messages/messages-layout'))
const DashboardPatientLayout = React.lazy(() => import('../views/dashboard-paciente/dashboard-paciente-layout'));
//Caja chica
const AccountingLayout = React.lazy(() => import('../views/accounting/accounting-layout'));
const PettyCashOpeningLayout = React.lazy(() => import('../views/accounting/petty-cash-opening-layout'));
//Ventas
const SaleLayout = React.lazy(() => import('../views/sale/sale-layout'));
const SaleListLayout = React.lazy(() => import('../views/sale/sale-list-layout'));
//Logística
const LogisticKardexLayout = React.lazy(() => import('../views/logistic/kardex/kardex-layout'));

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
    'DashboardPatientLayout': DashboardPatientLayout,
    'EmployeedProfileLayout': EmployeedProfileLayout,
    'MntEnvironmentSystemLayout': MntEnvironmentSystemLayout,
    'AccountingLayout': AccountingLayout,
    'SaleLayout': SaleLayout,
    'SaleListLayout': SaleListLayout,
    'LogisticKardexLayout': LogisticKardexLayout,
    'PettyCashOpeningLayout': PettyCashOpeningLayout,
  }
  const COMPONENT_DEFAULT_BASE_ON_ROUTE = Dashboard
  return COMPONENT_BASE_ON_ROUTE[name] || COMPONENT_DEFAULT_BASE_ON_ROUTE;
}
