import React from "react";
import ImgProfile from "src/components/organism/img-profile";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonFormControl } from "src/components/molecules";
import CancelIcon from '@mui/icons-material/Cancel';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function PreviewImg({
  selectedImageTmp = null,
  handleImageChangeUpload,
  handleSaveProfile,
  handleCloseModalUpdateProfile
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <ImgProfile
            selectedImageTmp={selectedImageTmp}
            width={'100%'}
            defaultImage={selectedImageTmp === null}
          />
        </div>
        <div className="col-md-3"></div>
        <div className="col-md-12 text-center mt-2 mb-2">
          <Button component="label" variant="contained" size={'small'} startIcon={<CloudUploadIcon />} onChange={handleImageChangeUpload}>
            Subir
            <VisuallyHiddenInput type="file" accept="image/*" />
          </Button>
          <div className="row mt-4">
            <div className="col-md-5 mt-2 mb-2">
            </div>
            <div className="col-md-7 mt-2 mb-2">
              <div className="row">
                <div className="col-md-6">
                  <Button component="label" variant="contained" size={'medium'} color="success" startIcon={<SaveIcon />} onClick={handleSaveProfile}>
                    Guardar
                  </Button>
                </div>
                <div className="col-md-6">
                  <Button component="label" variant="contained" size={'medium'} color="error" startIcon={<CancelIcon />} onClick={handleCloseModalUpdateProfile}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
PreviewImg.propTypes = {
  selectedImageTmp: PropTypes.object,
  handleImageChangeUpload: PropTypes.func,
  handleSaveProfile: PropTypes.func,
  handleCloseModalUpdateProfile: PropTypes.func,
};