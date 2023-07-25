import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilClipboard,
  cilGroup,
  cilSpeedometer,
  cilWindowRestore,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'Inicio',
    },
  },
  {
    component: CNavTitle,
    name: 'Módulo del paciente',
  },
  {
    component: CNavGroup,
    name: 'Registro de Atención',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Solicitud',
        to: '/registro-solicitud',
      },
      {
        component: CNavItem,
        name: 'Aprobación y/o Rechazo',
        to: '/aprobacion-rechazo-solicitud',
      },
      // {
      //   component: CNavItem,
      //   name: 'Rechazo',
      //   to: '/rechazo-solicitud',
      // },
      {
        component: CNavItem,
        name: 'Finaliza Atención',
        to: '/finaliza-atencion-solicitud',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'TTO. Fisioterapeútico',
    to: '/buttons',
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Análisis Clínico',
        to: '/primer-analisis',
      },
      {
        component: CNavItem,
        name: 'Tratamientos en Proceso',
        to: '/pacientes-con-analisis-clinico',
      },
      {
        component: CNavItem,
        name: 'Tratamientos Finalizado',
        to: '/pacientes/tratamiento/finalizado',
      },
      
    ],
  },
  // {
  //   component: CNavTitle,
  //   name: 'Módulo Ventanilla',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Ventanilla',
  //   to: '/buttons',
  //   icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Horarios en Tiempo Real',
  //       to: '/ventanilla-horarios',
  //     },
  //   ],
  // },
  {
    component: CNavTitle,
    name: 'Módulo de RRHH',
  },
  {
    component: CNavGroup,
    name: 'Contrato de Empleado',
    to: '/buttons',
    icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Solicitud',
        to: '/contrato/solicitud',
      },
      {
        component: CNavItem,
        name: 'Aprobación',
        to: '/contrato/aprobacion',
      },
      {
        component: CNavItem,
        name: 'Empleados con Contrato',
        to: '/contrato/empleados/contratados',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Módulo de Pagos',
  },
  {
    component: CNavGroup,
    name: 'Pagos',
    to: '/buttons',
    icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Pagos Pendientes',
        to: '/pagos/pendientes',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Módulo de configuración',
  },
  {
    component: CNavGroup,
    name: 'Config. Generales',
    to: '/buttons',
    icon: <CIcon icon={cilWindowRestore} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Paquetes y Frecuencia',
        to: '/mantenimiento-paquetes',
      },
      {
        component: CNavItem,
        name: 'Variables del Sistema',
        to: '/mantenimiento/var/sistema',
      },
      {
        component: CNavItem,
        name: 'Cargos',
        to: '/mantenimiento/cargos',
      },
    ],
  },
  // {
  //   component: CNavGroup,
  //   name: 'Forms',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Form Control',
  //       to: '/forms/form-control',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Select',
  //       to: '/forms/select',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Checks & Radios',
  //       to: '/forms/checks-radios',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Range',
  //       to: '/forms/range',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Input Group',
  //       to: '/forms/input-group',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Floating Labels',
  //       to: '/forms/floating-labels',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Layout',
  //       to: '/forms/layout',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Validation',
  //       to: '/forms/validation',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Charts',
  //   to: '/charts',
  //   icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Icons',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Free',
  //       to: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'NEW',
  //       },
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Flags',
  //       to: '/icons/flags',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'CoreUI Brands',
  //       to: '/icons/brands',
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Notifications',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Alerts',
  //       to: '/notifications/alerts',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Badges',
  //       to: '/notifications/badges',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Modal',
  //       to: '/notifications/modals',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Toasts',
  //       to: '/notifications/toasts',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Widgets',
  //   to: '/widgets',
  //   icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //     text: 'NEW',
  //   },
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Pages',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Login',
  //       to: '/login',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Register',
  //       to: '/register',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 404',
  //       to: '/404',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Error 500',
  //       to: '/500',
  //     },
  //   ],
  // },
  // {
  //   component: CNavItem,
  //   name: 'Docs',
  //   href: 'https://coreui.io/react/docs/templates/installation/',
  //   icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  // },
]

export default _nav
