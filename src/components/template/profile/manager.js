import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailUser from "./detail-user";
import { useGetByUserNameEmployeed } from "src/api/hooks/employeed/employeed-hook";
import TabsUser from "./tabs-user";
import { ServiceGetAllScheduleEmployeed } from "src/service/schedule/service.schedule";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { formatDate } from "src/utils/functions";
import { ServiceUploadProfile } from "src/service/employeed/service.employeed";
import { Modal } from "src/components/molecules";
import PreviewImg from "./preview-img";

export default function Manager(props) {
  const navigate = useNavigate()
  const params = useParams();
  const { employeedDetail } = useGetByUserNameEmployeed(params.username);
  const [value, setValue] = useState('1');
  const [rowsScheduleSessions, setRowsScheduleSessions] = useState([]);
  const [selectedImageTmp, setSelectedImage] = useState(null);
  const [selectedImageTmpPrev, setSelectedImagePrev] = useState(null);
  const [openModalPreview, setOpenModalPreview] = useState(false);

  const handleChange = async (_, newValue) => {
    const { employeedId } = employeedDetail;
    switch (parseInt(newValue)) {
      case 4:
        let lstRowSchedule = await ServiceGetAllScheduleEmployeed(employeedId);
        setRowsScheduleSessions(lstRowSchedule)
        break;
      default:
        break;
    }
    setValue(newValue);
  };

  const handleClickSendMessage = (e) => {
    const { employeedId, isStaff, userName } = employeedDetail;
    if (isStaff) {
      navigate(`/message/e/${employeedId}`, {
        state: {
          userName
        }
      })
    } else {
      navigate(`/message/u/${employeedId}`, {
        state: {
          userName
        }
      })
    }
  }
   
  const handleImageChange = (e) => {
    setOpenModalPreview(true);
  }
  const handleSaveProfile = () => {
    Swal.fire({
      title: `¿Desea que la foto previamente cargada, sea su nueva foto de perfil?`,
      text: `Usted está editando su foto de perfil`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si, actualizar`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        let update = await handleImageUpload();
        //Actualizamos la foto de perfil del header
        if (update) {
          setOpenModalPreview(false);
          Swal.fire(
            `Actualización exitosa`,
            `La foto se ha actualizado con éxito.`,
            'success'
          );
        }
      } else {
        setSelectedImagePrev(null);
      }
    });
  }
  const handleImageUpload = async () => {
    let result = false;
    let id = parseInt(employeedDetail.employeedId);
    if (selectedImageTmp) {
      const formData = new FormData();
      formData.append('file', selectedImageTmp);
      formData.append('id', id);
      try {
        let upload = await ServiceUploadProfile(formData);
        if (upload.ok && upload.status === 200) {
          result = upload.ok;
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.log('No file selected', selectedImageTmp);
    }
    return result;
  };
  // const handleEditarPerfil = (e) => {
  //   console.log('actualizar datos');
  // }
  const validateFileType = (file) => {
    // Array con tipos de archivo permitidos
    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    return allowedFileTypes.includes(file.type);
  };
  const handleImageChangeUpload = (e) => {
     const file = e.target.files[0];
    if (file) {
      if (!validateFileType(file)) {
        Swal.fire({
          icon: 'warning',
          title: 'Advertencia',
          text: `Por favor, selecciona un archivo de imagen válido.`,
        })
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImagePrev(reader.result)
      };
      reader.readAsDataURL(file);
    }
  }
  const handleCloseModalUpdateProfile = (e) => {
    setOpenModalPreview(false);
    setSelectedImagePrev(null);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <DetailUser
            employeedDetail={employeedDetail}
            handleClickSendMessage={handleClickSendMessage}
            handleImageChange={handleImageChange}
            selectedImageTmp={selectedImageTmpPrev}
            handleEditarPerfil={handleSaveProfile}
          />
        </div>
        <div className="col-md-12">
          <TabsUser
            employeedDetail={employeedDetail}
            value={value}
            handleChange={handleChange}
            rowsScheduleSessions={rowsScheduleSessions}
          />
        </div>
      </div>
      {
        openModalPreview && (
          <Modal
            title={`Actualización de foto de perfil`}
            size={"modal-xs"}
            close
            openModal={openModalPreview}
            onClose={handleCloseModalUpdateProfile}
          >
            <PreviewImg
              selectedImageTmp={selectedImageTmpPrev}
              handleImageChangeUpload={handleImageChangeUpload}
              handleSaveProfile={handleSaveProfile}
              handleCloseModalUpdateProfile={handleCloseModalUpdateProfile}
            />
          </Modal>
        )
      }
    </div>
  )
}