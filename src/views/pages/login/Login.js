import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ServicePostAccessSystem } from 'src/service/employeed/service.employeed'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { fuGuardarDatosUsuario } from 'src/utils/utils'
import { useGetAllConfigs } from 'src/hooks/common/common-hook'

const Login = () => {
  let navigate = useNavigate()
  const { configs } = useGetAllConfigs();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsuario = (e) => {
    setUsuario(e.target.value);
  }
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleKeyUpPassword = async (e) => {
    if (e.keyCode === 13) {
      await handleAccederAlSistema()
    }
  }
  const handleAccederAlSistema = async (e) => {
    let login = await ServicePostAccessSystem(usuario, password)
    if (!usuario) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar el usuario',
      });
      return;
    }
    if (!password) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debe de ingresar el password',
      });
      return;
    }
    if (parseInt(login.employeedId) === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Usuario no existe o las credenciales son incorrectas, de persistir el error, por favor comunicarte con el Administrador(a) del Sistema.',
      });
      return;
    }
    if (parseInt(login.employeedId) > 0) {
      let objetoUsuario = {
        id: login?.employeedId,
        names: login?.person?.names,
        surnames: login?.person?.surnames,
        profileImage: login?.person?.profilePicture,
        userName: login?.userName,
        typeUser: login?.typeUser,
        role: login?.role?.name,
        employeedCashRegisterId: login?.employeedCashRegisterId
      }
      fuGuardarDatosUsuario(JSON.stringify(objetoUsuario));
      if(login?.typeUser === 'P') {
        navigate('/dashboard-paciente')
      }
      else {
        navigate('/dashboard')
      }
    }
  }
  return (
    <div className="min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={12}>
            <CCardGroup>
              <CCard className="p-1">
                <CCardBody>
                  <CForm>
                    <h1>LOGIN - {configs.title}</h1>
                    <p className="text-medium-emphasis">Iniciar sesión en su cuenta</p>
                    <span>Usuario:</span>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="" autoFocus autoComplete="username" onChange={handleChangeUsuario} style={{ textTransform: 'uppercase' }} />
                    </CInputGroup>
                    <span>Password:</span>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder=""
                        autoComplete="current-password"
                        onChange={handleChangePassword}
                        onKeyUp={handleKeyUpPassword}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleAccederAlSistema}>
                          Acceder
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={4} className="mt-1">
                        <CButton color="link" className="px-0">
                          ¿Olvidó su password?
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol xs={12} className='mt-1'>
                        <small className="text-medium-emphasis">
                          Todos los derechos reservados. Copyright © {new Date().getFullYear()} {configs.title}
                        </small>
                        <br />
                        <small className="text-medium-emphasis">
                          Versión {configs.version}
                        </small>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white" style={{ width: '100%', height: '100%' }}>
                <picture>
                  <img
                    src='/images/fisioterapia-y-rehabilitacion.png'
                    width={'100%'}
                    height={'100%'}
                    className='img-fluid rounded-right'
                    alt='login'
                  />
                </picture>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
