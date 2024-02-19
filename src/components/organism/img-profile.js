import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import { Tooltip } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { COLOR_BLUE_MAB } from "src/config/config";
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
export default function ImgProfile({
  profile = {},
  isBordered = false,
  width = '110%',
  isUploadImg = false,
  handleImageChange,
  selectedImageTmp = null,
  defaultImage = false
}) {
  const [skeletonShow, setSkeletonShow] = useState(true);
  setTimeout(() => {
    setSkeletonShow(false); // Cambiar el estado a false para indicar que se cargó la imagen
  }, 500); // Simulación de un retraso de carga de 2 segundos
  const RenderSkeleton = () => (
    <Skeleton
      variant="circular"
      style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
      width={'110%'}
      height={'100%'}
      className="float-right"
    />
  );
  const RenderUploadImage = () => {
    return (
      <>
        {
          isUploadImg ?
            <Badge
              style={{ width: width, height: '100%' }}
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Avatar alt={`imagen`} style={{ borderBlockEnd: 'solid 2px', cursor: 'pointer', backgroundColor: '#ECEBEB' }}>
                  <Tooltip title={`Actualizar imagen`}>
                    <Button component="label" variant="contained" style={{ background: COLOR_BLUE_MAB }} onClick={handleImageChange}>
                      <AddAPhotoIcon />
                    </Button>
                  </Tooltip>
                </Avatar>
              }
            >
              {
                skeletonShow ? <RenderSkeleton /> :
                  <img
                    alt={profile.name}
                    src={selectedImageTmp ? selectedImageTmp : profile.profilePicture}
                    className="float-right"
                    title={`${profile.surnames}/${profile.names}`}
                    height={'100%'}
                    width={'110%'}
                    style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
                  />
              }
            </Badge> : defaultImage ?
              <img
                alt={profile.name}
                src={"../../images/avatars/default.png"}
                className="float-right"
                title={`${profile.surnames}/${profile.names}`}
                height={'100%'}
                width={width}
                style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
              />
              :
              skeletonShow ?
                <img
                  alt={profile.name}
                  src={"../../images/avatars/default.png"}
                  className="float-right"
                  title={`${profile.surnames}/${profile.names}`}
                  height={'100%'}
                  width={width}
                  style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
                /> :
                <img
                  alt={profile.name}
                  src={selectedImageTmp ? selectedImageTmp : profile.profilePicture}
                  className="float-right"
                  title={`${profile.surnames}/${profile.names}`}
                  height={'100%'}
                  width={width}
                  style={{ borderRadius: isBordered ? '10em' : '50%', display: 'flex' }}
                />
        }
      </>
    )
  }
  return (
    <>
      {RenderUploadImage()}
    </>
  )
}
ImgProfile.propTypes = {
  profile: PropTypes.object,
  selectedImageTmp: PropTypes.object,
  isBordered: PropTypes.bool,
  isUploadImg: PropTypes.bool,
  defaultImage: PropTypes.bool,
  width: PropTypes.string,
  handleImageChange: PropTypes.func,
};