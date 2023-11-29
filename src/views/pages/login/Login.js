// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'
// import { ServicePostAccessSystem } from 'src/service/employeed/service.employeed'
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import { fuGuardarDatosUsuario, getTitle } from 'src/utils/utils'
// import { useGetAllConfigs } from 'src/hooks/common/common-hook'
// import { COLOR_GREEN } from 'src/config/config'

// const Login = () => {
//   let navigate = useNavigate()
//   const { configs } = useGetAllConfigs();

//   const [usuario, setUsuario] = useState('');
//   const [password, setPassword] = useState('');

//   const handleChangeUsuario = (e) => {
//     setUsuario(e.target.value);
//   }
//   const handleChangePassword = (e) => {
//     setPassword(e.target.value);
//   }
//   const handleKeyUpPassword = async (e) => {
//     if (e.keyCode === 13) {
//       await handleAccederAlSistema()
//     }
//   }
//   const handleAccederAlSistema = async (e) => {
//     let login = await ServicePostAccessSystem(usuario, password)
//     if (!usuario) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Advertencia',
//         text: 'Debe de ingresar el usuario',
//       });
//       return;
//     }
//     if (!password) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Advertencia',
//         text: 'Debe de ingresar el password',
//       });
//       return;
//     }
//     if (parseInt(login.employeedId) === 0) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Advertencia',
//         text: 'Usuario no existe o las credenciales son incorrectas, de persistir el error, por favor comunicarte con el Administrador(a) del Sistema.',
//       });
//       return;
//     }
//     if (parseInt(login.employeedId) > 0) {
//       let objetoUsuario = {
//         id: login?.employeedId,
//         names: login?.person?.names,
//         surnames: login?.person?.surnames,
//         profileImage: login?.person?.profilePicture,
//         userName: login?.userName,
//         typeUser: login?.typeUser,
//         role: login?.role?.name,
//         employeedCashRegisterId: login?.employeedCashRegisterId
//       }
//       fuGuardarDatosUsuario(JSON.stringify(objetoUsuario));
//       if (login?.typeUser === 'P') {
//         navigate('/dashboard-paciente')
//       }
//       else {
//         navigate('/dashboard')
//       }
//     }
//   }
//   getTitle('Login');
//   return (
//     <div className='container-fluid'>
//       <div className='row'>
//         <div className='col-md-6' style={{ background: COLOR_GREEN, margin: 0 }}>

//         </div>
//         <div className='col-md-6 ' style={{ paddingLeft: 0, paddingRight: 0 }}>
//           <CCard className="p-3">
//             <CCardBody>
//               <h1>LOGIN - {configs.title}</h1>
//               <p className="text-medium-emphasis">Iniciar sesión en su cuenta</p>
//               <span>Usuario:</span>
//               <CInputGroup className="mb-3">
//                 <CInputGroupText>
//                   <CIcon icon={cilUser} />
//                 </CInputGroupText>
//                 <CFormInput placeholder="" autoFocus autoComplete="username" onChange={handleChangeUsuario} style={{ textTransform: 'uppercase' }} />
//               </CInputGroup>
//               <span>Password:</span>
//               <CInputGroup className="mb-4">
//                 <CInputGroupText>
//                   <CIcon icon={cilLockLocked} />
//                 </CInputGroupText>
//                 <CFormInput
//                   type="password"
//                   placeholder=""
//                   autoComplete="current-password"
//                   onChange={handleChangePassword}
//                   onKeyUp={handleKeyUpPassword}
//                 />
//               </CInputGroup>
//               <CRow>
//                 <CCol xs={6}>
//                   <CButton color="primary" className="px-4" onClick={handleAccederAlSistema}>
//                     Acceder
//                   </CButton>
//                 </CCol>
//               </CRow>
//               <CRow>
//                 <CCol xs={4} className="mt-1">
//                   <CButton color="link" className="px-0">
//                     ¿Olvidó su password?
//                   </CButton>
//                 </CCol>
//               </CRow>
//               <CRow>
//                 <CCol xs={12} className='mt-1'>
//                   <small className="text-medium-emphasis">
//                     Todos los derechos reservados. Copyright © {new Date().getFullYear()} {configs.title}
//                   </small>
//                   <br />
//                   <small className="text-medium-emphasis">
//                     Versión {configs.version}
//                   </small>
//                 </CCol>
//               </CRow>
//             </CCardBody>
//           </CCard>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Login
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { ServicePostAccessSystem } from 'src/service/employeed/service.employeed'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { fuGuardarDatosUsuario, getTitle } from 'src/utils/utils'
import { useGetAllConfigs } from 'src/hooks/common/common-hook'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Copyright({
  configs = {}
}) {
  return (
    <div className='container'>
      <div className='row text-center'>
        <div className='col-md-12'>
          <span>
            {'Copyright © '}
            {configs.title}
            {' '}
            {new Date().getFullYear()}
            {'.'}
          </span>
        </div>
        <div className='col-md-12'>
          <small>
            {configs.rubro}
          </small>
        </div>
        <div className='col-md-12'>
          <small>
            Versión {configs.version}
          </small>
        </div>
      </div>
      <br />
    </div>
  );
}

Copyright.propTypes = {
  configs: PropTypes.object,
}
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login() {
  const { configs } = useGetAllConfigs();
  let navigate = useNavigate()
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
    if(!usuario) {
      return;
    }
    if(!password) {
      return;
    }
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
      if (login?.typeUser === 'P') {
        navigate('/dashboard-paciente')
      }
      else {
        navigate('/dashboard')
      }
    }
  }

  getTitle('Acceso al sistema');
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={1} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 0, width: '35%', height: '35%' }} 
              src='https://static.vecteezy.com/system/resources/previews/012/185/873/original/physical-therapy-logo-design-concept-free-vector.jpg'
            >
            </Avatar>
            <Typography component="h1" variant="h5">
              <span>
                Ingresa tus credenciales
              </span>
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Usuario"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChangeUsuario}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChangePassword}
                onKeyUp={handleKeyUpPassword}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleAccederAlSistema}
                sx={{ mt: 3, mb: 2 }}
              >
                <span>
                  Iniciar sesión
                </span>
              </Button>
              <Grid container>
                <Grid item xs>
                  <a href="#">
                    ¿Has olvidado tu contraseña?
                  </a>
                </Grid>
              </Grid>
              <br />
              <Copyright sx={{ mt: 5 }} configs={configs} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}